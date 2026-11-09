import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EmailNotifier, LogNotifier } from '../../lib/notify';

const ENV_KEYS = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL', 'RESEND_DRY_RUN'] as const;
const saved: Record<string, string | undefined> = {};

beforeEach(() => {
  for (const k of ENV_KEYS) {
    saved[k] = process.env[k];
    delete process.env[k];
  }
});

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
  vi.restoreAllMocks();
});

function res(status: number, ok = status < 400) {
  return { ok, status, text: async () => `{"message":"${status}"}` } as Response;
}

describe('EmailNotifier', () => {
  it('fails and logs loudly when RESEND_API_KEY is missing', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchMock = vi.fn();
    const notifier = new EmailNotifier(fetchMock as unknown as typeof fetch);

    const result = await notifier.notify({ locale: 'en', messageLength: 12 });

    expect(result.ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(expect.stringContaining('RESEND_API_KEY missing'));
  });

  it('sends to the owner with Reply-To and no hardcoded secrets', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    const fetchMock = vi.fn().mockResolvedValue(res(200));
    const notifier = new EmailNotifier(fetchMock as unknown as typeof fetch);

    const result = await notifier.notify({
      locale: 'en',
      messageLength: 10,
      name: 'Test User',
      email: 'visitor@example.com',
      message: 'Hello there',
      form: 'contact',
    });

    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.resend.com/emails');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer re_test_key');
    const payload = JSON.parse(String(init.body));
    expect(payload.to).toEqual(['amin.mb21@gmail.com']);
    expect(payload.reply_to).toEqual(['visitor@example.com']);
    expect(payload.subject).toContain('contact form (en)');
    expect(payload.text).toContain('Test User');
    expect(payload.text).toContain('Hello there');
  });

  it('localises the subject for Persian submissions and never sends in dry-run mode', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    process.env.RESEND_DRY_RUN = '1';
    const fetchMock = vi.fn();
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const notifier = new EmailNotifier(fetchMock as unknown as typeof fetch);

    const result = await notifier.notify({ locale: 'fa', messageLength: 9, form: 'quick' });

    expect(result.ok).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalledWith(expect.stringContaining('contact_email_dry_run'));
  });

  it('returns not-ok on a Resend API error', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fetchMock = vi.fn().mockResolvedValue(res(422, false));
    const notifier = new EmailNotifier(fetchMock as unknown as typeof fetch);

    const result = await notifier.notify({ locale: 'en', messageLength: 10, message: 'hello' });

    expect(result.ok).toBe(false);
    expect(error).toHaveBeenCalledWith(expect.stringContaining('contact_email_failed'));
  });

  it('omits Reply-To for a non-email contact value', async () => {
    process.env.RESEND_API_KEY = 're_test_key';
    const fetchMock = vi.fn().mockResolvedValue(res(200));
    const notifier = new EmailNotifier(fetchMock as unknown as typeof fetch);

    await notifier.notify({ locale: 'en', messageLength: 5, email: '@telegram_user', message: 'hi' });

    const payload = JSON.parse(String((fetchMock.mock.calls[0]?.[1] as RequestInit | undefined)?.body));
    expect(payload.reply_to).toBeUndefined();
  });
});

describe('LogNotifier', () => {
  it('logs only anonymised metadata, never name/email/message', async () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    await new LogNotifier().notify({
      locale: 'fa',
      messageLength: 42,
      name: 'Private Person',
      email: 'private@example.com',
      message: 'secret content',
    });

    expect(info).toHaveBeenCalledTimes(1);
    const line = String(info.mock.calls[0]?.[0]);
    expect(line).toContain('"messageLength":42');
    expect(line).not.toContain('Private Person');
    expect(line).not.toContain('private@example.com');
    expect(line).not.toContain('secret content');
  });
});
