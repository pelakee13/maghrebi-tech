"use client";

import { useActionState, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { submitQuickReview, type QuickFormState } from '@/actions/quick-review';
import { Button, ExternalButtonLink } from '@/components/ui/Button';
import { Turnstile } from './Turnstile';
import { site } from '@/lib/site';

const initial: QuickFormState = { status: 'idle' };
const fieldClass =
  'mt-1 w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent';

/** 3-field frictionless quick form used inside the homepage CTA section. */
export function QuickReviewForm() {
  const t = useTranslations('quickForm');
  const f = useTranslations('form');
  const locale = useLocale();
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
  const values = state.status === 'error' ? state.values : { name: '', contact: '', process: '' };
  const globalError = state.status === 'error' && state.code !== 'validation' ? state.code : null;

  return (
    <div className="mx-auto max-w-2xl">
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
          <label className="text-sm font-medium" htmlFor="quick-process">
            {t('process')}
          </label>
          <textarea
            id="quick-process"
            name="process"
            rows={3}
            defaultValue={values.process}
            className={fieldClass}
            aria-invalid={Boolean(fields.process)}
          />
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
