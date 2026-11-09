export type ContactNotification = {
  locale: string;
  messageLength: number;
  /** Visitor name — used only in the email body, never logged. */
  name?: string;
  /** Visitor email — used for Reply-To and the email body, never logged. */
  email?: string;
  /** Message body — used only in the email body, never logged. */
  message?: string;
  /** Which form produced the submission (for the subject line). */
  form?: 'contact' | 'quick';
};

/** Delivery abstraction. EmailNotifier sends; LogNotifier keeps an anonymised record. */
export interface Notifier {
  notify(n: ContactNotification): Promise<{ ok: boolean }>;
}

/**
 * Log notifier: writes one anonymised line. It deliberately never receives or logs the
 * visitor's name, email or message body.
 */
export class LogNotifier implements Notifier {
  async notify(n: ContactNotification): Promise<{ ok: boolean }> {
    console.info(
      JSON.stringify({
        event: 'contact_submission',
        at: new Date().toISOString(),
        locale: n.locale,
        messageLength: n.messageLength,
        outcome: 'logged',
      }),
    );
    return { ok: true };
  }
}

type EmailConfig = { apiKey: string; to: string; from: string };

function resolveEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return {
    apiKey,
    to: process.env.CONTACT_TO_EMAIL || 'amin.mb21@gmail.com',
    // maghrebi.tech is NOT yet verified in Resend, so the interim sender is Resend's
    // default onboarding address (it delivers to the account owner only). Once the
    // domain is verified, set CONTACT_FROM_EMAIL=form@maghrebi.tech.
    from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
  };
}

/**
 * Email notifier via the Resend API (https://resend.com).
 *
 * - Requires RESEND_API_KEY. If it is missing, every submission fails loudly in the
 *   server log and the visitor sees the form's error state: a submission must never
 *   appear to succeed while going nowhere.
 * - RESEND_DRY_RUN=1 is a test-only hook (e2e): the email is recorded in the server
 *   log instead of being sent, so CI never sends real mail.
 * - The fetch implementation is injectable so unit tests can mock the Resend call.
 */
export class EmailNotifier implements Notifier {
  constructor(private readonly fetchImpl: typeof fetch = fetch) {}

  async notify(n: ContactNotification): Promise<{ ok: boolean }> {
    const cfg = resolveEmailConfig();
    if (!cfg) {
      console.error(
        JSON.stringify({
          event: 'contact_email_failed',
          at: new Date().toISOString(),
          reason: 'RESEND_API_KEY missing',
        }),
      );
      return { ok: false };
    }

    const subject =
      n.form === 'quick'
        ? `maghrebi.tech — quick review request (${n.locale})`
        : n.locale === 'fa'
          ? 'maghrebi.tech — پیام فرم تماس (fa)'
          : 'maghrebi.tech — contact form (en)';
    const body = [
      n.locale === 'fa' ? 'زبان صفحه: فارسی (fa)' : `Page language: ${n.locale}`,
      '',
      `Name / نام: ${n.name ?? '(not provided)'}`,
      `Email / ایمیل: ${n.email ?? '(not provided)'}`,
      '',
      '--- Message / پیام ---',
      n.message ?? `(message body unavailable, length: ${n.messageLength})`,
    ].join('\n');

    if (process.env.RESEND_DRY_RUN === '1') {
      console.info(
        JSON.stringify({
          event: 'contact_email_dry_run',
          at: new Date().toISOString(),
          to: cfg.to,
          subject,
          locale: n.locale,
          messageLength: n.messageLength,
        }),
      );
      return { ok: true };
    }

    try {
      const res = await this.fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: cfg.from,
          to: [cfg.to],
          subject,
          text: body,
          ...(n.email && /.+@.+\..+/.test(n.email) ? { reply_to: [n.email] } : {}),
        }),
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        console.error(
          JSON.stringify({
            event: 'contact_email_failed',
            at: new Date().toISOString(),
            status: res.status,
            detail: detail.slice(0, 500),
          }),
        );
        return { ok: false };
      }
      console.info(
        JSON.stringify({
          event: 'contact_email_sent',
          at: new Date().toISOString(),
          to: cfg.to,
          locale: n.locale,
        }),
      );
      return { ok: true };
    } catch (err) {
      console.error(
        JSON.stringify({
          event: 'contact_email_failed',
          at: new Date().toISOString(),
          error: err instanceof Error ? err.message : String(err),
        }),
      );
      return { ok: false };
    }
  }
}

/**
 * Email first, anonymised log record chained after it — a copy of every submission
 * exists in the log whether or not the email went out.
 */
class ChainedNotifier implements Notifier {
  constructor(
    private readonly primary: Notifier,
    private readonly record: Notifier,
  ) {}

  async notify(n: ContactNotification): Promise<{ ok: boolean }> {
    let result: { ok: boolean };
    try {
      result = await this.primary.notify(n);
    } catch {
      result = { ok: false };
    }
    try {
      await this.record.notify(n);
    } catch {
      /* the log record must never mask the delivery result */
    }
    return result;
  }
}

export const notifier: Notifier = new ChainedNotifier(new EmailNotifier(), new LogNotifier());
