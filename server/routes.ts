import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPickupRequestSchema, insertContactMessageSchema, insertCareerApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pickup Request API
  app.post("/api/pickup-requests", async (req, res) => {
    try {
      const validatedData = insertPickupRequestSchema.parse(req.body);
      const request = await storage.createPickupRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create pickup request" });
      }
    }
  });

  app.get("/api/pickup-requests", async (req, res) => {
    try {
      const requests = await storage.getPickupRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pickup requests" });
    }
  });

  // Contact Message API
  app.post("/api/contact-messages", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send message" });
      }
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Career Application API
  app.post("/api/career-applications", async (req, res) => {
    try {
      const validatedData = insertCareerApplicationSchema.parse(req.body);
      const application = await storage.createCareerApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid application data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit application" });
      }
    }
  });

  app.get("/api/career-applications", async (req, res) => {
    try {
      const applications = await storage.getCareerApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
