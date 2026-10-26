"use server";

import { headers } from 'next/headers';
import { z } from 'zod';
import { notifier } from '@/lib/notify';
import { rateLimit } from '@/lib/rate-limit';

export type QuickFieldKey = 'name' | 'contact' | 'process';
export type QuickFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      code: 'validation';
      fields: Partial<Record<QuickFieldKey, string>>;
      values: QuickValues;
    }
  | {
      status: 'error';
      code: 'spam' | 'rate_limited' | 'delivery_failed';
      values: QuickValues;
    };

export type QuickValues = { name: string; contact: string; process: string };

const MIN_FILL_MS = 3000;

const quickReviewSchema = z.object({
  name: z.string().trim().min(2, 'name_short').max(80, 'name_long'),
  contact: z.string().trim().min(3, 'contact_required').max(120, 'contact_long'),
  process: z.string().trim().min(10, 'process_short').max(2000, 'process_long'),
  locale: z.enum(['fa', 'en']),
  website: z.string().max(0).optional().default(''),
  startedAt: z.coerce.number().int().optional(),
});

export async function submitQuickReview(_prev: QuickFormState, formData: FormData): Promise<QuickFormState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    contact: String(formData.get('contact') ?? ''),
    process: String(formData.get('process') ?? ''),
    locale: String(formData.get('locale') ?? ''),
    website: String(formData.get('website') ?? ''),
    startedAt: formData.get('startedAt') ?? undefined,
  };
  const values: QuickValues = { name: raw.name, contact: raw.contact, process: raw.process };

  // Honeypot filled -> bot. Return a generic error (no hint of the rule).
  if (raw.website.length > 0) return { status: 'error', code: 'spam', values };

  const parsed = quickReviewSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<QuickFieldKey, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === 'name' || key === 'contact' || key === 'process') && !fields[key]) {
        fields[key] = issue.message;
      }
    }
    if (Object.keys(fields).length === 0) return { status: 'error', code: 'spam', values };
    return { status: 'error', code: 'validation', fields, values };
  }

  const { startedAt, locale, process } = parsed.data;
  if (typeof startedAt === 'number' && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: 'error', code: 'spam', values };
  }

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
  if (!rateLimit(`quick:${ip}`, 5, 60 * 60 * 1000)) {
    return { status: 'error', code: 'rate_limited', values };
  }

  // LogNotifier never logs name/contact/body — only anonymised metadata.
  const result = await notifier.notify({ locale, messageLength: process.length });
  if (!result.ok) return { status: 'error', code: 'delivery_failed', values };
  return { status: 'success' };
}
