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
}): Metadata {
  const { locale, path, title, description } = opts;
  const url = `${site.url}/${locale}${path}`;
  const languages: Record<string, string> =
    opts.languagesOverride ??
    Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`]));
  languages['x-default'] = languages['en'] ?? Object.values(languages)[0] ?? `${site.url}/en${path}`;

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
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
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
