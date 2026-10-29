'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Flag } from '@/components/ui/Flag';

/** counterparts[fromLocale][`section:slug`] = slug in the other locale, or null when none exists. */
const COUNTRY = { fa: 'ir', en: 'gb' } as const;

export type ArticleCounterparts = Record<string, Record<string, string | null>>;

export function LanguageSwitcher({ counterparts }: { counterparts: ArticleCounterparts }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname(); // locale-less, e.g. /blog/my-post
  const other = locale === 'fa' ? 'en' : 'fa';

  let href = pathname;
  const match = pathname.match(/^\/(blog|courses)\/([^/]+)$/);
  if (match?.[1] && match[2]) {
    const section = match[1];
    const counterpart = counterparts[locale]?.[`${section}:${match[2]}`];
    // No counterpart -> section list, avoids a dead end (FR-002).
    href = counterpart ? `/${section}/${counterpart}` : `/${section}`;
  }

  return (
    <Link
      href={href}
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={t('switchLabel')}
      className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-accent hover:bg-surface"
    >
      <Flag country={COUNTRY[locale === 'fa' ? 'fa' : 'en']} />
      <Flag country={COUNTRY[other]} />
      <span>{t('switchTo')}</span>
    </Link>
  );
}
