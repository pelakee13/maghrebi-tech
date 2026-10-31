import type { Metadata } from 'next';
import { site } from './site';
import { routing } from '@/i18n/routing';

const OG_LOCALE: Record<string, string> = { fa: 'fa_IR', en: 'en_US' };

/** path is the locale-less path, e.g. '' (home), '/about', '/blog/my-post'. */
export function buildMetadata(opts: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  languagesOverride?: Record<string, string>;
  /** Optional page-specific og:image; falls back to the global og-image.png. */
  ogImage?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const { locale, path, title, description } = opts;
  const url = `${site.url}/${locale}${path}`;
  const languages: Record<string, string> =
    opts.languagesOverride ??
    Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`]));
  languages['x-default'] = languages['en'] ?? Object.values(languages)[0] ?? `${site.url}/en${path}`;
  const image = opts.ogImage ?? { url: `${site.url}/og-image.png`, width: 1600, height: 840, alt: site.name[locale === 'fa' ? 'fa' : 'en'] };

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name[locale === 'fa' ? 'fa' : 'en'],
      locale: OG_LOCALE[locale] ?? 'fa_IR',
      type: opts.type ?? 'website',
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }],
    },
  };
}

export function personJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name[locale === 'fa' ? 'fa' : 'en'],
    url: `${site.url}/${locale}`,
    email: site.email,
    sameAs: site.socials.map((s) => s.url).filter(Boolean),
  };
}

export function professionalServiceJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name[locale === 'fa' ? 'fa' : 'en'],
    url: `${site.url}/${locale}`,
    email: site.email,
    areaServed: 'Worldwide',
    availableLanguage: ['en', 'fa'],
    knowsAbout: [
      'Business automation',
      'Telegram bot development',
      'Web app development',
      'Mobile app development',
      'AI training',
    ],
    serviceType: [
      'Business automation',
      'Telegram bot development',
      'Web app development',
      'AI training',
    ],
  };
}

export function articleJsonLd(opts: { locale: string; slug: string; title: string; description: string; date: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    inLanguage: opts.locale,
    mainEntityOfPage: `${site.url}/${opts.locale}/blog/${opts.slug}`,
    author: { '@type': 'Person', name: site.name[opts.locale === 'fa' ? 'fa' : 'en'] },
  };
}
