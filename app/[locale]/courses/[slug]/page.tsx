import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getCourse, getCourseCounterpartSlug, getCourses } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { MdxRenderer } from '@/components/content/MdxRenderer';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getCourses(locale).map((c) => ({ locale, slug: c.meta.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const course = getCourse(locale, slug);
  if (!course) return {};
  const other = routing.locales.find((l) => l !== locale)!;
  const counterpart = getCourseCounterpartSlug(locale, slug, other);
  const languagesOverride = counterpart
    ? { [locale]: `${site.url}/${locale}/courses/${slug}`, [other]: `${site.url}/${other}/courses/${counterpart}` }
    : { [locale]: `${site.url}/${locale}/courses/${slug}` };
  return buildMetadata({ locale, path: `/courses/${slug}`, title: course.meta.title, description: course.meta.summary, languagesOverride });
}

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default async function CoursePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const course = getCourse(locale, slug);
  if (!course) notFound();
  const t = await getTranslations('courses');
  const fmt = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' });
  const { meta, body } = course;

  const files = meta.files.map((f) => {
    const full = path.join(process.cwd(), 'public', f.url);
    return { ...f, size: fs.existsSync(full) ? formatSize(fs.statSync(full).size) : null };
  });

  return (
    <Container className="max-w-3xl py-14 sm:py-20" as="article">
      <p className="text-sm text-fg-muted">
        <time dateTime={meta.date}>{fmt.format(new Date(`${meta.date}T00:00:00Z`))}</time> · {t('duration')}: {meta.duration}
      </p>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{meta.title}</h1>
      <p className="mt-4 text-lg leading-8 text-fg-muted">{meta.summary}</p>

      <Card className="mt-8">
        <h2 className="text-lg font-semibold">{t('files')}</h2>
        {files.length === 0 ? (
          <p className="mt-3 text-sm text-fg-muted">{t('noFiles')}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {files.map((f) => (
              <li key={f.url} className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm">
                  {f.label}
                  {f.size && <span className="text-fg-muted"> · {f.format.toUpperCase()} · {f.size}</span>}
                </span>
                <a
                  href={f.url}
                  download
                  data-testid="course-download"
                  className="inline-flex items-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-strong"
                >
                  {t('download')}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="mt-8">
        <MdxRenderer source={body} />
      </div>
      <div className="mt-12">
        <ButtonLink href="/courses" variant="secondary">
          {t('back')}
        </ButtonLink>
      </div>
    </Container>
  );
}
