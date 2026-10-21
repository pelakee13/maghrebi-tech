export type ContactNotification = { locale: string; messageLength: number };

/** Delivery abstraction. v1 only logs; an EmailNotifier (Resend/SMTP) can implement this later. */
export interface Notifier {
  notify(n: ContactNotification): Promise<{ ok: boolean }>;
}

/**
 * v1 notifier: writes one anonymised line. It deliberately never receives or logs the
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

export const notifier: Notifier = new LogNotifier();
