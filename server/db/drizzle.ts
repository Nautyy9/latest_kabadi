import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to initialize the database connection');
}

// Create a singleton postgres client and drizzle instance
const client = postgres(process.env.DATABASE_URL, {
  // Supabase works well with postgres-js; disable prepared statements to avoid some env issues
  prepare: false,
  max: 10,
});

export const db = drizzle(client);

export async function pingDb(): Promise<boolean> {
  try {
    // simple ping
    await client`select 1`;
    return true;
  } catch {
    return false;
  }
}

export async function closeDb() {
  await client.end({ timeout: 5 });
}
