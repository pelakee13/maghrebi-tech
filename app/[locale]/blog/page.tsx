import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getArticles } from '@/lib/content';
import { readingMinutes } from '@/lib/content-utils';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { ArticleCard } from '@/components/content/ArticleCard';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildMetadata({
    locale,
    path: '/blog',
    title: t('title'),
    description: t('lead') + ' ' + (locale === 'fa' ? 'مقالات و آموزش‌های امین مغربی.' : 'Articles and tutorials by Amin Maghrebi.'),
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const c = await getTranslations('common');
  const articles = getArticles(locale);
  const fmt = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' });

  return (
    <Section title={t('title')} lead={t('lead')}>
      {articles.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-8 text-center text-fg-muted">{t('empty')}</p>
      ) : (
        <div className="grid gap-5">
          {articles.map(({ meta, body }) => (
            <ArticleCard
              key={meta.slug}
              meta={meta}
              dateLabel={fmt.format(new Date(`${meta.date}T00:00:00Z`))}
              minutesLabel={`${readingMinutes(body)} ${c('minutes')}`}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
