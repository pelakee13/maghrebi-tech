import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import { courseFormat, courseOverview, courseSessions, isSkippable } from '@/lib/course-data';
import { slideThumb } from '@/lib/course-media';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Section } from '@/components/ui/Section';
import { Badge, Card } from '@/components/ui/Card';
import { ExternalButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'courses' });
  return buildMetadata({ locale, path: '/courses', title: t('title'), description: t('lead') + ' ' + (locale === 'fa' ? 'آموزش هوش مصنوعی امین مغربی.' : 'AI training by Amin Maghrebi.') });
}

export default async function CoursesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('courses');
  const loc = locale === 'fa' ? 'fa' : 'en';

  const syllabus = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: t('title'),
    description: courseOverview[loc],
    inLanguage: locale,
    provider: { '@type': 'Person', name: site.name[loc], url: `${site.url}/${locale}` },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: 'PT10H',
    },
    syllabusSections: courseSessions.map((s) => ({
      '@type': 'Syllabus',
      name: `${t('session')} ${s.order}: ${s.title[loc]}`,
      description: s.summary[loc],
      ...(s.status === 'published'
        ? { url: `${site.url}/${locale}/courses/${s.slug}` }
        : {}),
    })),
  };

  return (
    <>
      <JsonLd data={syllabus} />
      <Section title={t('title')} lead={t('lead')}>
        <p className="max-w-2xl leading-8 text-fg-muted">{courseOverview[loc]}</p>

        <div className="mt-10 grid gap-4">
          {courseSessions.map((s, i) => {
            const published = s.status === 'published';
            const thumb = published ? slideThumb(s.slug, loc) : null;
            return (
              <Card key={s.slug} className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {published ? (
                  thumb ? (
                    <a href={`/${locale}/courses/${s.slug}`} className="block w-full shrink-0 sm:w-56">
                      <Image
                        src={thumb}
                        alt={`${t('coverSlide')} ${s.order}: ${s.title[loc]}`}
                        width={640}
                        height={360}
                        priority={i === 0}
                        loading={i === 0 ? undefined : 'lazy'}
                        sizes="(min-width: 640px) 224px, 100vw"
                        className="aspect-[16/9] w-full rounded-lg object-cover"
                      />
                    </a>
                  ) : null
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[16/9] w-full shrink-0 items-center justify-center rounded-lg bg-surface-2 sm:w-56"
                  >
                    <span className="text-3xl font-bold text-fg-muted">{s.order}</span>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-fg-muted">{t('session')} {s.order}</span>
                    {!published && <Badge>{t('comingSoon')}</Badge>}
                  </div>
                  <h2 className="text-xl font-semibold leading-snug">
                    {published ? (
                      <a href={`/${locale}/courses/${s.slug}`} className="hover:text-accent">
                        {s.title[loc]}
                      </a>
                    ) : (
                      s.title[loc]
                    )}
                  </h2>
                  <p className="text-sm leading-7 text-fg-muted">{s.summary[loc]}</p>
                  {!published && (
                    <ul className="mt-1 list-inside list-disc text-sm leading-7 text-fg-muted">
                      {s.learningOutcomes.map((o) => (
                        <li key={o.en}>{o[loc]}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <h2 className="mt-14 text-2xl font-bold sm:text-3xl">{t('formatTitle')}</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {courseFormat
            .filter((row) => !isSkippable(row.value[loc]))
            .map((row) => (
              <div key={row.label.en}>
                <dt className="text-sm font-semibold">{row.label[loc]}</dt>
                <dd className="mt-1 text-sm leading-7 text-fg-muted">{row.value[loc]}</dd>
              </div>
            ))}
        </dl>
        <div className="mt-6">
          <ExternalButtonLink href={site.telegram.url}>{t('registerCta')} ({site.telegram.handle})</ExternalButtonLink>
        </div>
      </Section>
    </>
  );
}
