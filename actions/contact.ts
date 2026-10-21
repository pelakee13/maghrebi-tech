"use server";

import { headers } from 'next/headers';
import { contactSchema } from '@/lib/schemas';
import { notifier } from '@/lib/notify';
import { rateLimit } from '@/lib/rate-limit';

export type FieldKey = 'name' | 'email' | 'message';
export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      code: 'validation';
      fields: Partial<Record<FieldKey, string>>;
      values: { name: string; email: string; message: string };
    }
  | {
      status: 'error';
      code: 'spam' | 'rate_limited' | 'delivery_failed';
      values: { name: string; email: string; message: string };
    };

const MIN_FILL_MS = 3000;

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
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

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
    locale: String(formData.get('locale') ?? ''),
    website: String(formData.get('website') ?? ''),
    startedAt: formData.get('startedAt') ?? undefined,
  };
  const values = { name: raw.name, email: raw.email, message: raw.message };

  // Honeypot filled -> bot. Return a generic error (no hint of the rule).
  if (raw.website.length > 0) return { status: 'error', code: 'spam', values };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<FieldKey, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === 'name' || key === 'email' || key === 'message') && !fields[key]) {
        fields[key] = issue.message;
      }
    }
    // A bad locale or similar non-field problem is treated as spam-like.
    if (Object.keys(fields).length === 0) return { status: 'error', code: 'spam', values };
    return { status: 'error', code: 'validation', fields, values };
  }

  const { startedAt, locale, message } = parsed.data;
  if (typeof startedAt === 'number' && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: 'error', code: 'spam', values };
  }

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
  if (!rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return { status: 'error', code: 'rate_limited', values };
  }

  if (!(await verifyTurnstile(String(formData.get('cf-turnstile-response') ?? '') || undefined))) {
    return { status: 'error', code: 'spam', values };
  }

  const result = await notifier.notify({ locale, messageLength: message.length });
  if (!result.ok) return { status: 'error', code: 'delivery_failed', values };
  return { status: 'success' };
}
