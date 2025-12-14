import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// Lazily initialize DB so the app can boot without DATABASE_URL (Render envs, local dev)
const dbUrl = process.env.DATABASE_URL;
let client: ReturnType<typeof postgres> | null = null;

if (dbUrl) {
  client = postgres(dbUrl, {
    // Supabase works well with postgres-js; disable prepared statements to avoid some env issues
    prepare: false,
    max: 10,
  });
}

export const db = client ? drizzle(client) : undefined as unknown as ReturnType<typeof drizzle>;

export async function pingDb(): Promise<boolean> {
  try {
    if (!client) return false;
    await client`select 1`;
    return true;
  } catch {
    return false;
  }
}

export async function closeDb() {
  if (client) {
    await client.end({ timeout: 5 });
  }
}
