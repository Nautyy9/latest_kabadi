-- Add resume-related columns to career_applications to match shared/schema.ts
ALTER TABLE "career_applications"
  ADD COLUMN IF NOT EXISTS "resume_storage_path" text,
  ADD COLUMN IF NOT EXISTS "resume_url" text;
