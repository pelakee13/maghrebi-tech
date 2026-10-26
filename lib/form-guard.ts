import { rateLimit } from './rate-limit';

export const MIN_FILL_MS = 3000;

/** Turnstile check: passes when the feature is not configured. */
export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // optional: disabled unless configured
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token }),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

export type GuardResult = 'ok' | 'spam' | 'rate_limited';

/**
 * Shared anti-bot gate for every form: minimum fill time, rate limit, Turnstile.
 * Honeypot fields are already rejected by the zod schemas (`website: max(0)`).
 */
export async function guardSubmission(input: {
  startedAt: number | undefined;
  ip: string;
  bucket: string;
  turnstileToken?: string;
}): Promise<GuardResult> {
  if (typeof input.startedAt === 'number' && Date.now() - input.startedAt < MIN_FILL_MS) return 'spam';
  if (!rateLimit(`${input.bucket}:${input.ip}`, 5, 60 * 60 * 1000)) return 'rate_limited';
  return (await verifyTurnstile(input.turnstileToken)) ? 'ok' : 'spam';
}
