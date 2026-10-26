import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getArticles, getCourses, getCourseCounterpartSlug, getCounterpartSlug } from '@/lib/content';
import { site } from '@/lib/site';

const STATIC_PATHS = ['', '/about', '/services', '/portfolio', '/courses', '/blog', '/resume', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}${path}`])),
        },
      });
    }
  }

  for (const kind of ['blog', 'courses'] as const) {
    for (const locale of routing.locales) {
      const other = routing.locales.find((l) => l !== locale)!;
      const items =
        kind === 'blog'
          ? getArticles(locale).map((a) => ({ slug: a.meta.slug, date: a.meta.updated ?? a.meta.date }))
          : getCourses(locale).map((c) => ({ slug: c.meta.slug, date: undefined }));
      for (const item of items) {
        const counterpart =
          kind === 'blog'
            ? getCounterpartSlug(locale, item.slug, other)
            : getCourseCounterpartSlug(locale, item.slug, other);
        entries.push({
          url: `${site.url}/${locale}/${kind}/${item.slug}`,
          ...(item.date ? { lastModified: item.date } : {}),
          ...(counterpart
            ? {
                alternates: {
                  languages: {
                    [locale]: `${site.url}/${locale}/${kind}/${item.slug}`,
                    [other]: `${site.url}/${other}/${kind}/${counterpart}`,
                  },
                },
              }
            : {}),
        });
      }
    }
  }
  return entries;
}
