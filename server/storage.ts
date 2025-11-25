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

export const storage = new MemStorage();
