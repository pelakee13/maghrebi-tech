import { describe, expect, it } from 'vitest';
import { contactSchema } from '../../lib/schemas';
import { rateLimit, resetRateLimit } from '../../lib/rate-limit';

const ok = { name: 'Amin', email: 'a@b.co', message: 'Hello, this is a valid message.', locale: 'fa', website: '' };

describe('contact schema', () => {
  it('accepts valid input and trims', () => {
    const r = contactSchema.safeParse({ ...ok, name: '  Amin  ' });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe('Amin');
  });

  it('enforces name 2-80', () => {
    expect(contactSchema.safeParse({ ...ok, name: 'A' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, name: 'x'.repeat(81) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, name: 'x'.repeat(80) }).success).toBe(true);
  });

  it('enforces a valid email up to 254 chars', () => {
    expect(contactSchema.safeParse({ ...ok, email: 'nope' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, email: `${'a'.repeat(250)}@b.co` }).success).toBe(false);
  });

  it('enforces message 10-2000 after trim', () => {
    expect(contactSchema.safeParse({ ...ok, message: '   short  ' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, message: 'x'.repeat(2001) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, message: 'x'.repeat(2000) }).success).toBe(true);
  });

  it('allows only fa|en locale and an empty honeypot', () => {
    expect(contactSchema.safeParse({ ...ok, locale: 'de' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...ok, website: 'http://spam' }).success).toBe(false);
  });

  it('returns stable error codes', () => {
    const r = contactSchema.safeParse({ ...ok, name: 'A', email: 'x' });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.message).sort()).toEqual(['email_invalid', 'name_short']);
  });
});

describe('rate limit', () => {
  it('allows 5 then blocks within the window', () => {
    resetRateLimit();
    const t0 = 1_000_000;
    for (let i = 0; i < 5; i++) expect(rateLimit('ip', 5, 3_600_000, t0 + i)).toBe(true);
    expect(rateLimit('ip', 5, 3_600_000, t0 + 10)).toBe(false);
    expect(rateLimit('ip', 5, 3_600_000, t0 + 3_600_001 + 5)).toBe(true);
  });
});
