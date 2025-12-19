import {
  type PickupRequest,
  type InsertPickupRequest,
  type ContactMessage,
  type InsertContactMessage,
  type CareerApplication,
  type InsertCareerApplication,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createPickupRequest(request: InsertPickupRequest): Promise<PickupRequest>;
  getPickupRequests(): Promise<PickupRequest[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createCareerApplication(application: InsertCareerApplication): Promise<CareerApplication>;
  getCareerApplications(): Promise<CareerApplication[]>;
  createNewsletterSubscription(sub: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

import { pickupRequests, contactMessages, careerApplications, newsletterSubscriptions } from '@shared/schema';
import { desc, eq } from 'drizzle-orm';

async function getDb() {
  const mod = await import('./db/drizzle');
  // if db is not configured, return undefined; callers handle gracefully
  return (mod as any).db as any | undefined;
}

export class MemStorage implements IStorage {
  private pickupRequests: Map<string, PickupRequest>;
  private contactMessages: Map<string, ContactMessage>;
  private careerApplications: Map<string, CareerApplication>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private newsletterByEmail: Map<string, NewsletterSubscription>;

  constructor() {
    this.pickupRequests = new Map();
    this.contactMessages = new Map();
    this.careerApplications = new Map();
    this.newsletterSubscriptions = new Map();
    this.newsletterByEmail = new Map();
  }

  async createPickupRequest(insertRequest: InsertPickupRequest): Promise<PickupRequest> {
    const id = randomUUID();
    const request: PickupRequest = {
      ...insertRequest,
      id,
      phone: insertRequest.phone ?? null,
      estimatedQuantity: insertRequest.estimatedQuantity ?? null,
      additionalNotes: insertRequest.additionalNotes ?? null,
      createdAt: new Date(),
    };
    this.pickupRequests.set(id, request);
    return request;
  }

  async getPickupRequests(): Promise<PickupRequest[]> {
    return Array.from(this.pickupRequests.values());
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createCareerApplication(insertApplication: InsertCareerApplication): Promise<CareerApplication> {
    const id = randomUUID();
    const application: CareerApplication = {
      ...insertApplication,
      id,
      coverLetter: insertApplication.coverLetter ?? null,
      cvFileName: insertApplication.cvFileName ?? null,
      resumeStoragePath: (insertApplication as any).resumeStoragePath ?? null,
      resumeUrl: (insertApplication as any).resumeUrl ?? null,
      createdAt: new Date(),
    };
    this.careerApplications.set(id, application);
    return application;
  }

  async getCareerApplications(): Promise<CareerApplication[]> {
    return Array.from(this.careerApplications.values());
  }

  async createNewsletterSubscription(insertSub: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const existing = this.newsletterByEmail.get(insertSub.email.toLowerCase());
    if (existing) return existing;
    const id = randomUUID();
    const sub: NewsletterSubscription = {
      id,
      email: insertSub.email,
      createdAt: new Date(),
    };
    this.newsletterSubscriptions.set(id, sub);
    this.newsletterByEmail.set(insertSub.email.toLowerCase(), sub);
    return sub;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }
}

const useMemory = !process.env.DATABASE_URL;

const memStore = new MemStorage();

class DbStorage implements IStorage {
  async createPickupRequest(insertRequest: InsertPickupRequest): Promise<PickupRequest> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const [row] = await db
      .insert(pickupRequests)
      .values({
        name: insertRequest.name,
        email: insertRequest.email,
        phone: insertRequest.phone ?? null,
        address: insertRequest.address,
        scrapTypes: insertRequest.scrapTypes,
        estimatedQuantity: insertRequest.estimatedQuantity ?? null,
        additionalNotes: insertRequest.additionalNotes ?? null,
      })
      .returning();
    return row as PickupRequest;
  }

  async getPickupRequests(): Promise<PickupRequest[]> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const rows = await db.select().from(pickupRequests).orderBy(desc(pickupRequests.createdAt));
    return rows as PickupRequest[];
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const [row] = await db
      .insert(contactMessages)
      .values({
        name: insertMessage.name,
        email: insertMessage.email,
        phone: insertMessage.phone,
        subject: insertMessage.subject,
        message: insertMessage.message,
      })
      .returning();
    return row as ContactMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return rows as ContactMessage[];
  }

  async createCareerApplication(insertApplication: InsertCareerApplication): Promise<CareerApplication> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const [row] = await db
      .insert(careerApplications)
      .values({
        name: insertApplication.name,
        email: insertApplication.email,
        phone: insertApplication.phone,
        position: insertApplication.position,
        coverLetter: insertApplication.coverLetter ?? null,
        cvFileName: insertApplication.cvFileName ?? null,
      })
      .returning();
    return row as CareerApplication;
  }

  async getCareerApplications(): Promise<CareerApplication[]> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const rows = await db.select().from(careerApplications).orderBy(desc(careerApplications.createdAt));
    return rows as CareerApplication[];
  }

  async createNewsletterSubscription(insertSub: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const existing = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, insertSub.email));
    if (existing.length > 0) return existing[0] as NewsletterSubscription;
    const [row] = await db
      .insert(newsletterSubscriptions)
      .values({ email: insertSub.email })
      .returning();
    return row as NewsletterSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    const db = await getDb();
    if (!db) throw new Error('DB unavailable');
    const rows = await db.select().from(newsletterSubscriptions).orderBy(desc(newsletterSubscriptions.createdAt));
    return rows as NewsletterSubscription[];
  }
}

class HybridStorage implements IStorage {
  private dbStore = new DbStorage();
  private memStore = memStore;
  private preferDb = !!process.env.DATABASE_URL;

  private async withFallback<T>(dbOp: () => Promise<T>, memOp: () => Promise<T>): Promise<T> {
    if (this.preferDb) {
      try {
        return await dbOp();
      } catch (err: any) {
        console.warn('[storage] DB operation failed; falling back to memory:', err?.message || err);
        this.preferDb = false;
        return memOp();
      }
    }
    return memOp();
  }

  createPickupRequest(req: InsertPickupRequest) {
    return this.withFallback(
      () => this.dbStore.createPickupRequest(req),
      () => this.memStore.createPickupRequest(req),
    );
  }

  getPickupRequests() {
    return this.withFallback(
      () => this.dbStore.getPickupRequests(),
      () => this.memStore.getPickupRequests(),
    );
  }

  createContactMessage(msg: InsertContactMessage) {
    return this.withFallback(
      () => this.dbStore.createContactMessage(msg),
      () => this.memStore.createContactMessage(msg),
    );
  }

  getContactMessages() {
    return this.withFallback(
      () => this.dbStore.getContactMessages(),
      () => this.memStore.getContactMessages(),
    );
  }

  createCareerApplication(app: InsertCareerApplication) {
    return this.withFallback(
      () => this.dbStore.createCareerApplication(app),
      () => this.memStore.createCareerApplication(app),
    );
  }

  getCareerApplications() {
    return this.withFallback(
      () => this.dbStore.getCareerApplications(),
      () => this.memStore.getCareerApplications(),
    );
  }

  createNewsletterSubscription(sub: InsertNewsletterSubscription) {
    return this.withFallback(
      () => this.dbStore.createNewsletterSubscription(sub),
      () => this.memStore.createNewsletterSubscription(sub),
    );
  }

  getNewsletterSubscriptions() {
    return this.withFallback(
      () => this.dbStore.getNewsletterSubscriptions(),
      () => this.memStore.getNewsletterSubscriptions(),
    );
  }
}

export const storage: IStorage = new HybridStorage();
