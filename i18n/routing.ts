import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  localePrefix: 'always',
  // Never override the Persian default using the Accept-Language header.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeDir = (locale: string): 'rtl' | 'ltr' => (locale === 'fa' ? 'rtl' : 'ltr');
