"use server";

import { headers } from 'next/headers';
import { contactSchema } from '@/lib/schemas';
import { isProjectType } from '@/lib/project-types';
import { notifier } from '@/lib/notify';
import { guardSubmission } from '@/lib/form-guard';

export type FieldKey = 'name' | 'email' | 'message';
export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error';
      code: 'validation';
      fields: Partial<Record<FieldKey, string>>;
      values: { name: string; email: string; message: string; projectType: string };
    }
  | {
      status: 'error';
      code: 'spam' | 'rate_limited' | 'delivery_failed';
      values: { name: string; email: string; message: string; projectType: string };
    };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Unknown topic values are ignored (fall back to no topic), never rejected:
  // the topic is optional context, not a validation gate.
  const projectType = isProjectType(formData.get('projectType')) ? String(formData.get('projectType')) : undefined;
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
    locale: String(formData.get('locale') ?? ''),
    projectType,
    website: String(formData.get('website') ?? ''),
    startedAt: formData.get('startedAt') ?? undefined,
  };
  const values = { name: raw.name, email: raw.email, message: raw.message, projectType: projectType ?? '' };

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

  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
  const guard = await guardSubmission({
    startedAt,
    ip,
    bucket: 'contact',
    turnstileToken: String(formData.get('cf-turnstile-response') ?? '') || undefined,
  });
  if (guard !== 'ok') return { status: 'error', code: guard, values };

  const result = await notifier.notify({
    locale,
    messageLength: message.length,
    name: parsed.data.name,
    email: parsed.data.email,
    message,
    projectType: parsed.data.projectType,
    form: 'contact',
  });
  if (!result.ok) return { status: 'error', code: 'delivery_failed', values };
  return { status: 'success' };
}
