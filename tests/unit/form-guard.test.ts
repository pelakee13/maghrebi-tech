import { beforeEach, describe, expect, it } from 'vitest';
import { guardSubmission, MIN_FILL_MS } from '../../lib/form-guard';
import { resetRateLimit } from '../../lib/rate-limit';

beforeEach(() => resetRateLimit());

describe('guardSubmission', () => {
  it('rejects a form filled faster than MIN_FILL_MS', async () => {
    expect(await guardSubmission({ startedAt: Date.now() - 100, ip: '1.1.1.1', bucket: 't' })).toBe('spam');
  });

  it('accepts a human-speed submission', async () => {
    expect(await guardSubmission({ startedAt: Date.now() - MIN_FILL_MS - 10, ip: '1.1.1.1', bucket: 't' })).toBe('ok');
  });

  it('rate limits the 6th request from one ip within the window', async () => {
    for (let i = 0; i < 5; i++) {
      expect(await guardSubmission({ startedAt: undefined, ip: '2.2.2.2', bucket: 't' })).toBe('ok');
    }
    expect(await guardSubmission({ startedAt: undefined, ip: '2.2.2.2', bucket: 't' })).toBe('rate_limited');
  });

  it('keeps buckets separate per form', async () => {
    for (let i = 0; i < 5; i++) await guardSubmission({ startedAt: undefined, ip: '3.3.3.3', bucket: 'contact' });
    expect(await guardSubmission({ startedAt: undefined, ip: '3.3.3.3', bucket: 'quick' })).toBe('ok');
    expect(await guardSubmission({ startedAt: undefined, ip: '3.3.3.3', bucket: 'contact' })).toBe('rate_limited');
  });
});
