"use client";

import { useActionState, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { submitQuickReview, type QuickFormState } from '@/actions/quick-review';
import { PROJECT_TYPES, type ProjectType } from '@/lib/project-types';
import { Button, ExternalButtonLink } from '@/components/ui/Button';
import { Turnstile } from './Turnstile';
import { site } from '@/lib/site';

// No messages key exists for the topic selector or the new message label/helper,
// so they are locale-conditional literals here (same pattern as ContactForm).
const TOPIC_LABELS: Record<ProjectType, { fa: string; en: string }> = {
  'website-design': { fa: 'طراحی و توسعهٔ وب‌سایت', en: 'Website design and development' },
  automation: { fa: 'اتوماسیون', en: 'Automation' },
  'telegram-bot': { fa: 'ربات تلگرام', en: 'Telegram bot' },
  support: { fa: 'پشتیبانی و نگهداری', en: 'Support and maintenance' },
  training: { fa: 'آموزش هوش مصنوعی', en: 'AI training' },
  other: { fa: 'سایر', en: 'Other' },
};

const initial: QuickFormState = { status: 'idle' };
const fieldClass =
  'mt-1 w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent';

/** 3-field frictionless quick form used inside the homepage CTA section. */
export function QuickReviewForm() {
  const t = useTranslations('quickForm');
  const f = useTranslations('form');
  const locale = useLocale();
  const isFa = locale === 'fa';
  const [state, action, pending] = useActionState(submitQuickReview, initial);
  const [startedAt] = useState(() => Date.now());

  if (state.status === 'success') {
    return (
      <p role="status" className="rounded-card border border-success/40 bg-surface p-6 text-success">
        {t('success')}
      </p>
    );
  }

  const err = (key: string | undefined) => (key ? t(`errors.${key}` as never) : null);
  const fields = state.status === 'error' && state.code === 'validation' ? state.fields : {};
  const values = state.status === 'error' ? state.values : { name: '', contact: '', process: '', projectType: '' };
  const globalError = state.status === 'error' && state.code !== 'validation' ? state.code : null;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-5 text-center leading-7 text-fg-muted">{t('intro')}</p>
      <form action={action} noValidate className="space-y-4 text-start" aria-busy={pending}>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="quick-name">
              {f('name')}
            </label>
            <input
              id="quick-name"
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={values.name}
              className={fieldClass}
              aria-invalid={Boolean(fields.name)}
            />
            {fields.name && <p className="mt-1 text-sm text-danger">{err(fields.name)}</p>}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="quick-contact">
              {t('contact')}
            </label>
            <input
              id="quick-contact"
              name="contact"
              type="text"
              autoComplete="email"
              defaultValue={values.contact}
              className={fieldClass}
              aria-invalid={Boolean(fields.contact)}
            />
            {fields.contact && <p className="mt-1 text-sm text-danger">{err(fields.contact)}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="quick-projectType">
            {isFa ? 'موضوع درخواست' : 'Project type'}
          </label>
          <select id="quick-projectType" name="projectType" defaultValue={values.projectType} className={fieldClass}>
            <option value="">{isFa ? 'بدون موضوع مشخص' : 'No specific topic'}</option>
            {PROJECT_TYPES.map((value) => (
              <option key={value} value={value}>
                {isFa ? TOPIC_LABELS[value].fa : TOPIC_LABELS[value].en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="quick-process">
            {isFa ? 'دربارهٔ پروژه‌تان بگویید' : 'Tell me about your project'}
          </label>
          <textarea
            id="quick-process"
            name="process"
            rows={3}
            placeholder={t('processPlaceholder')}
            defaultValue={values.process}
            className={fieldClass}
            aria-invalid={Boolean(fields.process)}
            aria-describedby="quick-process-help"
          />
          <p id="quick-process-help" className="mt-1 text-sm text-fg-muted">
            {isFa
              ? 'چه سایتی نیاز دارید یا کدام کار تکراری تیم‌تان را می‌خواهید ساده‌تر کنید؟'
              : 'What kind of website do you need, or which repetitive task would you like to simplify?'}
          </p>
          {fields.process && <p className="mt-1 text-sm text-danger">{err(fields.process)}</p>}
        </div>

        <Turnstile />

        <Button type="submit" disabled={pending}>
          {t('submit')}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <ExternalButtonLink href={site.telegram.url} variant="ghost">
          {t('orTelegram')} ({site.telegram.handle})
        </ExternalButtonLink>
      </div>
    </div>
  );
}
