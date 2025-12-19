import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const pickupRequests = pgTable("pickup_requests", {
  id: varchar("id").primaryKey().default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address").notNull(),
  scrapTypes: text("scrap_types").array().notNull(),
  estimatedQuantity: text("estimated_quantity"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const careerApplications = pgTable("career_applications", {
  id: varchar("id").primaryKey().default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  coverLetter: text("cover_letter"),
  cvFileName: text("cv_file_name"),
  resumeStoragePath: text("resume_storage_path"),
  resumeUrl: text("resume_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Strong input validation for API payloads
export const insertPickupRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/).optional().nullable(),
  address: z.string().trim().min(10).max(500),
  scrapTypes: z.array(z.string().trim().min(1)).min(1).max(20),
  estimatedQuantity: z.string().trim().min(1).max(50).optional().nullable(),
  additionalNotes: z.string().trim().max(1000).optional().nullable(),
  botField: z.string().max(0).optional(),
});

export const insertContactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(1).max(2000),
  botField: z.string().max(0).optional(),
});

export const insertCareerApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/),
  position: z.string().trim().min(2).max(100),
  coverLetter: z.string().trim().max(5000).optional().nullable(),
  cvFileName: z.string().trim().max(255).optional().nullable(),
  resumeStoragePath: z.string().trim().max(512).optional().nullable(),
  resumeUrl: z.string().trim().url().max(1024).optional().nullable(),
  botField: z.string().max(0).optional(),
});

export type InsertPickupRequest = z.infer<typeof insertPickupRequestSchema>;
export type PickupRequest = typeof pickupRequests.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertCareerApplication = z.infer<typeof insertCareerApplicationSchema>;
export type CareerApplication = typeof careerApplications.$inferSelect;

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`uuid_generate_v4()`),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriptionSchema = z.object({
  email: z.string().trim().email().max(200),
  botField: z.string().max(0).optional(),
});

export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
