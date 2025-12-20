import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// Lazily initialize DB so the app can boot without DATABASE_URL (Render envs, local dev)
let dbUrl = process.env.DATABASE_URL;
let client: ReturnType<typeof postgres> | null = null;

function safeLogConnection(url: string) {
  try {
    const u = new URL(url);
    const host = u.host;
    const sslmode = u.searchParams.get('sslmode') || 'default';
    console.log(`[db] Using DATABASE_URL host=${host} sslmode=${sslmode}`);
  } catch {
    console.log('[db] Using DATABASE_URL (could not parse for safe logging)');
  }
}

// In development, relax SSL verification if sslmode=require is present; this avoids local cert issues
if (process.env.NODE_ENV !== 'production' && dbUrl && dbUrl.includes('sslmode=require')) {
  dbUrl = dbUrl.replace('sslmode=require', 'sslmode=no-verify');
}

if (dbUrl) {
  safeLogConnection(dbUrl);
  const isProd = process.env.NODE_ENV === 'production';
  const wantNoVerify = process.env.PGSSL_NO_VERIFY === 'true' || !isProd;
  const sslOption: any = isProd ? 'require' : { rejectUnauthorized: false };
  client = postgres(dbUrl, {
    // Explicit SSL handling: postgres-js doesn't always honor sslmode in URL
    ssl: sslOption,
    prepare: false,
    max: 10,
  });
  console.log(`[db] SSL mode: ${isProd ? 'require' : 'no-verify'}`);
} else {
  console.warn('[db] No DATABASE_URL configured. Using in-memory storage.');
}

export const db = client ? drizzle(client) : undefined as unknown as ReturnType<typeof drizzle>;

export async function pingDb(): Promise<boolean> {
  try {
    if (!client) return false;
    await client`select 1`;
    return true;
  } catch (e: any) {
    console.warn('[db] ping failed:', e?.message || e);
    return false;
  }
}

export async function closeDb() {
  if (client) {
    await client.end({ timeout: 5 });
  }
}
