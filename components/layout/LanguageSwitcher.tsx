'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

/** counterparts[fromLocale][slug] = slug in the other locale, or null when none exists. */
export type ArticleCounterparts = Record<string, Record<string, string | null>>;

export function LanguageSwitcher({ counterparts }: { counterparts: ArticleCounterparts }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname(); // locale-less, e.g. /blog/my-post
  const other = locale === 'fa' ? 'en' : 'fa';

  let href = pathname;
  const match = pathname.match(/^\/blog\/([^/]+)$/);
  if (match?.[1]) {
    const counterpart = counterparts[locale]?.[match[1]];
    // No counterpart -> blog list, avoids a dead end (FR-002).
    href = counterpart ? `/blog/${counterpart}` : '/blog';
  }

  return (
    <Link
      href={href}
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={t('switchLabel')}
      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-accent hover:bg-surface"
    >
      {t('switchTo')}
    </Link>
  );
}
