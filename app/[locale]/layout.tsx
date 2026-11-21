import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, localeDir } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { assertLocaleParity, getArticles, getCounterpartSlug } from '@/lib/content';
import { getPublishedSessions } from '@/lib/course-data';
import type { ArticleCounterparts } from '@/components/layout/LanguageSwitcher';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
// Vazirmatn (Amin's choice, 2026-11-21): a single variable file, real weight 600.
// IRANSans stays on disk for the resume-print script only; it is no longer
// loaded as a webfont — only the selected family ships.
const vazirmatn = localFont({
  src: [{ path: '../../assets/fonts/Vazirmatn/Vazirmatn-Variable.woff2', weight: '100 900', style: 'normal' }],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function buildCounterparts(): ArticleCounterparts {
  const result: ArticleCounterparts = {};
  for (const from of routing.locales) {
    const to = routing.locales.find((l) => l !== from)!;
    result[from] = Object.fromEntries([
      ...getArticles(from).map((a) => [`blog:${a.meta.slug}`, getCounterpartSlug(from, a.meta.slug, to) ?? null] as const),
      // Course slugs are shared across locales (single source of truth).
      ...getPublishedSessions().map((s) => [`courses:${s.slug}`, s.slug] as const),
    ]);
  }
  return result;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  // Build fails if a service/project exists in only one locale (data-model integrity rule).
  assertLocaleParity();
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale} dir={localeDir(locale)} className={`${inter.variable} ${vazirmatn.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
          >
            {t('skip')}
          </a>
          <Header counterparts={buildCounterparts()} />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
