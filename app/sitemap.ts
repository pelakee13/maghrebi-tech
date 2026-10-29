import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getArticles, getCounterpartSlug } from '@/lib/content';
import { getPublishedSessions } from '@/lib/course-data';
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

  // Lessons: published sessions only; slugs are identical across locales.
  for (const s of getPublishedSessions()) {
    entries.push({
      url: `${site.url}/en/courses/${s.slug}`,
      ...(s.publishedAt ? { lastModified: s.publishedAt } : {}),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${site.url}/${l}/courses/${s.slug}`])),
      },
    });
  }

  for (const locale of routing.locales) {
    const other = routing.locales.find((l) => l !== locale)!;
    for (const a of getArticles(locale)) {
      const counterpart = getCounterpartSlug(locale, a.meta.slug, other);
      entries.push({
        url: `${site.url}/${locale}/blog/${a.meta.slug}`,
        lastModified: a.meta.updated ?? a.meta.date,
        ...(counterpart
          ? {
              alternates: {
                languages: {
                  [locale]: `${site.url}/${locale}/blog/${a.meta.slug}`,
                  [other]: `${site.url}/${other}/blog/${counterpart}`,
                },
              },
            }
          : {}),
      });
    }
  }
  return entries;
}
