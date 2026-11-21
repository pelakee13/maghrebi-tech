"use client";

import { useActionState, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { submitContact, type ContactState } from '@/actions/contact';
import { PROJECT_TYPES, type ProjectType } from '@/lib/project-types';
import { Button } from '@/components/ui/Button';
import { Turnstile } from './Turnstile';

const initial: ContactState = { status: 'idle' };
const fieldClass =
  'mt-1 w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent';

// No messages key exists for the topic selector or the new message label/helper,
// so they are locale-conditional literals here (coordinator to move to messages).
const TOPIC_LABELS: Record<ProjectType, { fa: string; en: string }> = {
  'website-design': { fa: 'طراحی و توسعهٔ وب‌سایت', en: 'Website design and development' },
  automation: { fa: 'اتوماسیون', en: 'Automation' },
  'telegram-bot': { fa: 'ربات تلگرام', en: 'Telegram bot' },
  support: { fa: 'پشتیبانی و نگهداری', en: 'Support and maintenance' },
  training: { fa: 'آموزش هوش مصنوعی', en: 'AI training' },
  other: { fa: 'سایر', en: 'Other' },
};

export function ContactForm({ initialProjectType }: { initialProjectType?: ProjectType }) {
  const t = useTranslations('form');
  const locale = useLocale();
  const isFa = locale === 'fa';
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
  const values =
    state.status === 'error'
      ? state.values
      : { name: '', email: '', message: '', projectType: initialProjectType ?? '' };
  const globalError = state.status === 'error' && state.code !== 'validation' ? state.code : null;
  const messageDescribedBy = ['message-help', fields.message ? 'message-err' : undefined]
    .filter(Boolean)
    .join(' ');

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
        <label htmlFor="projectType" className="text-sm font-medium">
          {isFa ? 'موضوع درخواست' : 'Project type'}
        </label>
        <select id="projectType" name="projectType" defaultValue={values.projectType} className={fieldClass}>
          <option value="">{isFa ? 'بدون موضوع مشخص' : 'No specific topic'}</option>
          {PROJECT_TYPES.map((value) => (
            <option key={value} value={value}>
              {isFa ? TOPIC_LABELS[value].fa : TOPIC_LABELS[value].en}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          {isFa ? 'دربارهٔ پروژه‌تان بگویید' : 'Tell me about your project'}
        </label>
        <textarea id="message" name="message" rows={6} required defaultValue={values.message}
          aria-invalid={!!fields.message} aria-describedby={messageDescribedBy} className={fieldClass} />
        <p id="message-help" className="mt-1 text-sm text-fg-muted">
          {isFa
            ? 'چه سایتی نیاز دارید یا کدام کار تکراری تیم‌تان را می‌خواهید ساده‌تر کنید؟'
            : 'What kind of website do you need, or which repetitive task would you like to simplify?'}
        </p>
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
