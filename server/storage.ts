import {
  type PickupRequest,
  type InsertPickupRequest,
  type ContactMessage,
  type InsertContactMessage,
  type CareerApplication,
  type InsertCareerApplication,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createPickupRequest(request: InsertPickupRequest): Promise<PickupRequest>;
  getPickupRequests(): Promise<PickupRequest[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  createCareerApplication(application: InsertCareerApplication): Promise<CareerApplication>;
  getCareerApplications(): Promise<CareerApplication[]>;
}

import { pickupRequests, contactMessages, careerApplications } from '@shared/schema';
import { desc } from 'drizzle-orm';

async function getDb() {
  const mod = await import('./db/drizzle');
  // if db is not configured, return undefined; callers handle gracefully
  return (mod as any).db as any | undefined;
}

export class MemStorage implements IStorage {
  private pickupRequests: Map<string, PickupRequest>;
  private contactMessages: Map<string, ContactMessage>;
  private careerApplications: Map<string, CareerApplication>;

  constructor() {
    this.pickupRequests = new Map();
    this.contactMessages = new Map();
    this.careerApplications = new Map();
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
      createdAt: new Date(),
    };
    this.careerApplications.set(id, application);
    return application;
  }

  async getCareerApplications(): Promise<CareerApplication[]> {
    return Array.from(this.careerApplications.values());
  }
}

const useMemory = !process.env.DATABASE_URL;

const memStore = new MemStorage();

class DbStorage implements IStorage {
  async createPickupRequest(insertRequest: InsertPickupRequest): Promise<PickupRequest> {
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
    const rows = await db.select().from(pickupRequests).orderBy(desc(pickupRequests.createdAt));
    return rows as PickupRequest[];
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
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
    const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return rows as ContactMessage[];
  }

  async createCareerApplication(insertApplication: InsertCareerApplication): Promise<CareerApplication> {
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
    const rows = await db.select().from(careerApplications).orderBy(desc(careerApplications.createdAt));
    return rows as CareerApplication[];
  }
}

export const storage: IStorage = useMemory ? new MemStorage() : new DbStorage();
