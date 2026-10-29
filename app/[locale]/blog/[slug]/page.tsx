import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getArticle, getArticles, getCounterpartSlug } from '@/lib/content';
import { articleJsonLd, buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink } from '@/components/ui/Button';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getArticles(locale).map((a) => ({ locale, slug: a.meta.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const article = getArticle(locale, slug);
  if (!article) return {};
  const other = routing.locales.find((l) => l !== locale)!;
  const counterpart = getCounterpartSlug(locale, slug, other);
  // Only declare an alternate when a counterpart really exists.
  const languagesOverride = counterpart
    ? { [locale]: `${site.url}/${locale}/blog/${slug}`, [other]: `${site.url}/${other}/blog/${counterpart}` }
    : { [locale]: `${site.url}/${locale}/blog/${slug}` };
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: article.meta.title,
    description: article.meta.summary,
    type: 'article',
    publishedTime: article.meta.date,
    languagesOverride,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const article = getArticle(locale, slug);
  if (!article) notFound();
  const c = await getTranslations('common');
  const t = await getTranslations('blog');
  const fmt = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' });

  return (
    <Container className="max-w-3xl py-14 sm:py-20" as="article">
      <JsonLd
        data={articleJsonLd({ locale, slug, title: article.meta.title, description: article.meta.summary, date: article.meta.date })}
      />
      <p className="text-sm text-fg-muted">
        <time dateTime={article.meta.date}>{fmt.format(new Date(`${article.meta.date}T00:00:00Z`))}</time> · {article.minutes} {c('minutes')}
      </p>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{article.meta.title}</h1>
      <div className="mt-8">
        <MdxRenderer source={article.body} />
      </div>
      {/* Related posts: same-locale articles except this one */}
      <h2 className="mt-12 text-xl font-semibold">{t('relatedTitle')}</h2>
      <ul className="mt-4 space-y-2">
        {getArticles(locale)
          .filter((a) => a.meta.slug !== slug)
          .slice(0, 3)
          .map((a) => (
            <li key={a.meta.slug}>
              <a href={`/${locale}/blog/${a.meta.slug}`} className="text-accent hover:underline">
                {a.meta.title}
              </a>
            </li>
          ))}
      </ul>
      {/* CTA under every post */}
      <Card className="mt-10">
        <h2 className="text-lg font-semibold">{t('ctaTitle')}</h2>
        <p className="mt-2 text-sm leading-7 text-fg-muted">{t('ctaText')}</p>
        <div className="mt-4">
          <ButtonLink href="/contact">{c('contactMe')}</ButtonLink>
        </div>
      </Card>
      <div className="mt-12">
        <ButtonLink href="/blog" variant="secondary">
          {c('backToList')}
        </ButtonLink>
      </div>
    </Container>
  );
}
