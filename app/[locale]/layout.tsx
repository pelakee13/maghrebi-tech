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
import type { ArticleCounterparts } from '@/components/layout/LanguageSwitcher';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const vazir = localFont({
  src: '../../assets/fonts/Vazirmatn-Variable.woff2',
  display: 'swap',
  variable: '--font-vazir',
  weight: '100 900',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function buildCounterparts(): ArticleCounterparts {
  const result: ArticleCounterparts = {};
  for (const from of routing.locales) {
    const to = routing.locales.find((l) => l !== from)!;
    result[from] = Object.fromEntries(
      getArticles(from).map((a) => [a.meta.slug, getCounterpartSlug(from, a.meta.slug, to) ?? null]),
    );
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
    <html lang={locale} dir={localeDir(locale)} className={`${inter.variable} ${vazir.variable}`}>
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
