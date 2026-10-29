"use client";

import { useActionState, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { submitContact, type ContactState } from '@/actions/contact';
import { Button } from '@/components/ui/Button';
import { Turnstile } from './Turnstile';

const initial: ContactState = { status: 'idle' };
const fieldClass =
  'mt-1 w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent';

export function ContactForm() {
  const t = useTranslations('form');
  const locale = useLocale();
  const [state, action, pending] = useActionState(submitContact, initial);
  // Captured once at render: submissions faster than 3 s are treated as bots.
  const [startedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === 'success') {
    return (
      <p role="status" className="rounded-card border border-success/40 bg-surface p-6 text-success">
        {t('success')}
      </p>
    );
  }

  const err = (key: string | undefined) => (key ? t(`errors.${key}` as never) : null);
  const fields = state.status === 'error' && state.code === 'validation' ? state.fields : {};
  const values = state.status === 'error' ? state.values : { name: '', email: '', message: '' };
  const globalError = state.status === 'error' && state.code !== 'validation' ? state.code : null;

  return (
    <form ref={formRef} action={action} noValidate className="space-y-5" aria-busy={pending}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from users and assistive tech */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {globalError && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-surface p-4 text-sm text-danger">
          {err(globalError)}
        </p>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
        <input id="name" name="name" type="text" autoComplete="name" required defaultValue={values.name}
          aria-invalid={!!fields.name} aria-describedby={fields.name ? 'name-err' : undefined} className={fieldClass} />
        {fields.name && <p id="name-err" className="mt-1 text-sm text-danger">{err(fields.name)}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
        <input id="email" name="email" type="email" dir="ltr" autoComplete="email" required defaultValue={values.email}
          aria-invalid={!!fields.email} aria-describedby={fields.email ? 'email-err' : undefined} className={fieldClass} />
        {fields.email && <p id="email-err" className="mt-1 text-sm text-danger">{err(fields.email)}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
        <textarea id="message" name="message" rows={6} required defaultValue={values.message}
          aria-invalid={!!fields.message} aria-describedby={fields.message ? 'message-err' : undefined} className={fieldClass} />
        {fields.message && <p id="message-err" className="mt-1 text-sm text-danger">{err(fields.message)}</p>}
      </div>

      <Turnstile />

      <p className="text-xs leading-6 text-fg-muted">{t('consent')}</p>

      <Button type="submit" disabled={pending}>
        {pending ? t('sending') : t('send')}
      </Button>
    </form>
  );
}
