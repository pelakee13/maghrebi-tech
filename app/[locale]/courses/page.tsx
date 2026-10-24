import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getCourses } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { CourseCard } from '@/components/content/CourseCard';

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
  const courses = getCourses(locale);
  const fmt = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' });

  return (
    <Section title={t('title')} lead={t('lead')}>
      {courses.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-8 text-center text-fg-muted">{t('empty')}</p>
      ) : (
        <div className={courses.length > 1 ? 'grid gap-5 md:grid-cols-2' : 'grid gap-5'}>
          {courses.map(({ meta }) => (
            <CourseCard
              key={meta.slug}
              meta={meta}
              dateLabel={fmt.format(new Date(`${meta.date}T00:00:00Z`))}
              labels={{ duration: t('duration'), open: t('open'), formats: [...new Set(meta.files.map((f) => f.format.toUpperCase()))] }}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
