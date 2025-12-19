import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPickupRequestSchema, insertContactMessageSchema, insertCareerApplicationSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { z } from "zod";
import { pingDb } from "./db/drizzle";
import { register as metricsRegister, httpRequestDuration } from './metrics';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import crypto from 'crypto';

export async function registerRoutes(app: Express): Promise<Server> {
  // Metrics endpoint (Prometheus)
  app.get('/metrics', async (_req, res) => {
    res.set('Content-Type', metricsRegister.contentType);
    res.end(await metricsRegister.metrics());
  });

  // Liveness (process up)
  app.get('/api/live', (_req, res) => {
    res.json({ ok: true });
  });

  // Readiness (DB available)
  app.get('/api/ready', async (_req, res) => {
    const ok = await pingDb();
    if (!ok) return res.status(503).json({ ok: false });
    res.json({ ok: true });
  });

  // Back-compat Healthcheck (same as readiness)
  app.get("/api/health", async (_req, res) => {
    const ok = await pingDb();
    if (!ok) return res.status(503).json({ ok: false });
    res.json({ ok: true });
  });

  // Observe request durations for API endpoints
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) return next();
    const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });
    res.on('finish', () => {
      end({ status_code: String(res.statusCode) });
    });
    next();
  });

  // Pickup Request API
  app.post("/api/pickup-requests", async (req, res) => {
    try {
      const validatedData = insertPickupRequestSchema.parse(req.body);
      const request = await storage.createPickupRequest(validatedData);

      if ((validatedData as any).botField) {
        return res.status(201).json(request);
      }

      import('./mailer')
        .then(({ sendPickupRequestNotification }) => sendPickupRequestNotification({
          name: request.name,
          email: request.email,
          phone: request.phone,
          address: request.address,
          scrapTypes: request.scrapTypes,
          estimatedQuantity: request.estimatedQuantity,
          additionalNotes: request.additionalNotes,
        }))
        .catch((err) => console.warn('[mailer] failed to send pickup notification', err?.message || err));

      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        console.error('[api] create pickup failed:', (error as any)?.stack || error);
        res.status(500).json({ error: "Failed to create pickup request" });
      }
    }
  });

  app.get("/api/pickup-requests", async (req, res) => {
    try {
      const requests = await storage.getPickupRequests();
      res.json(requests);
    } catch (error) {
      console.error('[api] list pickups failed:', (error as any)?.stack || error);
      res.status(500).json({ error: "Failed to fetch pickup requests" });
    }
  });

  // Contact Message API
  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);

      if ((validatedData as any).botField) {
        return res.status(201).json(message);
      }

      // Fire-and-forget email notification; do not block response
      import('./mailer')
        .then(({ sendContactNotification }) => sendContactNotification({
          name: message.name,
          email: message.email,
          phone: message.phone,
          subject: message.subject,
          message: message.message,
        }))
        .then((info) => {
          if ((info as any)?.skipped) {
            console.warn('[mailer] skipped sending email: SMTP not configured');
          }
        })
        .catch((err) => {
          console.warn('[mailer] failed to send contact notification', err?.message || err);
        });

      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        console.error('[api] create contact failed:', (error as any)?.stack || error);
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('[api] list contacts failed:', (error as any)?.stack || error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Newsletter Subscription API
  const newsletterLimiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
  app.post("/api/newsletter-subscriptions", newsletterLimiter, async (req, res) => {
    try {
      const validated = insertNewsletterSubscriptionSchema.parse(req.body);
      const created = await storage.createNewsletterSubscription({ email: validated.email });

      if ((validated as any).botField) {
        return res.status(201).json(created);
      }

      // Optional: send a confirmation email (double opt-in could be implemented here)
      // Skipping email to avoid sending unsolicited email without explicit opt-in workflow.

      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid email address", details: error.errors });
      } else {
        console.error('[api] newsletter subscribe failed:', (error as any)?.stack || error);
        res.status(500).json({ error: "Failed to subscribe" });
      }
    }
  });

  // Career Application API (multipart or JSON)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowed.includes(file.mimetype)) {
        return cb(new Error('Unsupported file type'));
      }
      cb(null, true);
    }
  });

  const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || 'us-east-1',
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
  });

  app.post("/api/career-applications", upload.single('resume'), async (req, res) => {
    try {
      // Parse fields regardless of content-type
      const body: any = req.body || {};
      const basePayload = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        position: body.position,
        coverLetter: body.coverLetter || null,
        cvFileName: body.cvFileName || null,
        botField: body.botField,
      };

      // Validate basic fields first
      const validatedData = insertCareerApplicationSchema.parse(basePayload);

      let resumeStoragePath: string | null = null;
      let resumeUrl: string | null = null;
      let cvFileName = validatedData.cvFileName || null;

      // If a file is attached, upload to S3 (Supabase Storage)
      if (req.file && req.file.buffer && process.env.S3_BUCKET && process.env.S3_ENDPOINT) {
        const ext = path.extname(req.file.originalname).toLowerCase() || '.bin';
        const today = new Date();
        const key = `resumes/${today.getFullYear()}/${String(today.getMonth()+1).padStart(2,'0')}/${String(today.getDate()).padStart(2,'0')}/${crypto.randomUUID()}${ext}`;
        const bucket = process.env.S3_BUCKET as string;
        await s3.send(new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        }));
        resumeStoragePath = `${bucket}/${key}`;
        cvFileName = req.file.originalname;
        // Build a public URL if using Supabase public bucket
        const supabaseBase = process.env.SUPABASE_PUBLIC_URL;
        if (supabaseBase) {
          // expected: https://<project>.supabase.co
          resumeUrl = `${supabaseBase}/storage/v1/object/public/${bucket}/${key}`;
        }
      }

      const application = await storage.createCareerApplication({
        ...validatedData,
        cvFileName: cvFileName,
        resumeStoragePath,
        resumeUrl,
      } as any);

      if ((validatedData as any).botField) {
        return res.status(201).json(application);
      }

      import('./mailer')
        .then(({ sendCareerApplicationNotification }) => sendCareerApplicationNotification({
          name: application.name,
          email: application.email,
          phone: application.phone,
          position: application.position,
          coverLetter: application.coverLetter,
          cvFileName: application.cvFileName,
        }))
        .catch((err) => console.warn('[mailer] failed to send career application notification', err?.message || err));

      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid application data", details: error.errors });
      } else {
        console.error('[api] create application failed:', (error as any)?.stack || error);
        res.status(500).json({ error: (error as any)?.message || "Failed to submit application" });
      }
    }
  });

  app.get("/api/career-applications", async (req, res) => {
    try {
      const applications = await storage.getCareerApplications();
      res.json(applications);
    } catch (error) {
      console.error('[api] list applications failed:', (error as any)?.stack || error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // Dev-only: trigger sample notifications for testing
  if (app.get('env') !== 'production') {
    app.post('/api/test-notifications', async (_req, res) => {
      try {
        const contact = await storage.createContactMessage({
          name: 'Test User',
          email: 'test@example.com',
          phone: '+1 555 0100',
          subject: 'Test Contact',
          message: 'This is a test contact message from theKabadi test endpoint.',
        });

        const pickup = await storage.createPickupRequest({
          name: 'Pickup Tester',
          email: 'pickup@test.com',
          phone: '+1 555 0101',
          address: '123 Green Street, Eco City',
          scrapTypes: ['Paper', 'Plastic'],
          estimatedQuantity: '25 kg',
          additionalNotes: 'Leave at gate.',
        });

        const career = await storage.createCareerApplication({
          name: 'Applicant Test',
          email: 'applicant@test.com',
          phone: '+1 555 0102',
          position: 'Recycling Specialist',
          coverLetter: 'I care deeply about sustainability and process.',
          cvFileName: 'resume.pdf',
        });

        const newsletter = await storage.createNewsletterSubscription({
          email: 'subscriber@test.com'
        });

        import('./mailer')
          .then(async ({ sendContactNotification, sendPickupRequestNotification, sendCareerApplicationNotification }) => {
            await Promise.allSettled([
              sendContactNotification(contact),
              sendPickupRequestNotification(pickup),
              sendCareerApplicationNotification({
                name: career.name,
                email: career.email,
                phone: career.phone,
                position: career.position,
                coverLetter: career.coverLetter,
                cvFileName: career.cvFileName,
              }),
            ]);
          })
          .catch((err) => console.warn('[mailer] failed to trigger test notifications', err?.message || err));

        res.json({ ok: true, message: 'Test notifications enqueued (check mail inbox and server logs).' });
      } catch (err: any) {
        res.status(500).json({ ok: false, error: err?.message || 'Failed to enqueue test notifications' });
      }
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
