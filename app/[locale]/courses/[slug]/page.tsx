import type { Metadata } from 'next';
import Image from 'next/image';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { courseSessions, getNeighbours, getPublishedSession, isSkippable, notesForRender } from '@/lib/course-data';
import { pdfInfo, slideThumb } from '@/lib/course-media';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ButtonLink, ExternalButtonLink } from '@/components/ui/Button';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { SlideViewer } from '@/components/content/SlideViewer';
import { JsonLd } from '@/components/ui/JsonLd';

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Only published sessions get a page; coming-soon slugs 404. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    courseSessions
      .filter((s) => s.status === 'published')
      .map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const s = getPublishedSession(slug);
  if (!s) return {};
  const loc = locale === 'fa' ? 'fa' : 'en';
  return buildMetadata({
    locale,
    path: `/courses/${slug}`,
    title: s.title[loc],
    description: s.summary[loc],
  });
}

export default async function CoursePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = getPublishedSession(slug);
  if (!session) notFound();
  const loc = locale === 'fa' ? 'fa' : 'en';
  const t = await getTranslations('courses');
  const fmt = new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' });

  const slides = session.slides
    ? Array.from({ length: session.slides.count }, (_, i) => `/courses/${session.slug}/slides/${loc}/slide-${String(i + 1).padStart(2, '0')}.webp`)
    : [];
  const pdfUrl = session.pdf?.[loc];
  const pdf = pdfUrl ? pdfInfo(pdfUrl) : null;
  const thumb = slideThumb(session.slug, loc);

  const { prev, next } = getNeighbours(slug);
  const p = prev ? { s: prev, isPublished: prev.status === 'published' } : null;
  const n = next ? { s: next, isPublished: next.status === 'published' } : null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: session.title[loc],
    description: session.summary[loc],
    inLanguage: locale,
    educationalLevel: session.level[loc],
    timeRequired: 'PT1H',
    isPartOf: { '@type': 'Course', name: t('title'), url: `${site.url}/${locale}/courses` },
    url: `${site.url}/${locale}/courses/${slug}`,
  };

  return (
    <>
      <JsonLd data={ld} />
      <Container className="max-w-3xl py-14 sm:py-20" as="article">
        <p className="text-sm text-fg-muted">
          {t('session')} {session.order}
          {session.publishedAt && (
            <>
              {' · '}
              <time dateTime={session.publishedAt}>{fmt.format(new Date(`${session.publishedAt}T00:00:00Z`))}</time>
            </>
          )}
          {' · '}
          {session.duration[loc]} · {session.level[loc]}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{session.title[loc]}</h1>
        <p className="mt-4 text-lg leading-8 text-fg-muted">{session.summary[loc]}</p>

        <h2 className="mt-10 text-xl font-semibold">{t('learningOutcomes')}</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-fg-muted">
          {session.learningOutcomes.map((o) => (
            <li key={o.en}>{o[loc]}</li>
          ))}
        </ul>

        {slides.length > 0 && (
          <>
            <h2 className="mt-10 text-xl font-semibold">{t('slides')}</h2>
            <div className="mt-4">
              <SlideViewer slides={slides} label={session.title[loc]} />
            </div>
          </>
        )}

        {session.takeaways && (
          <>
            <h2 className="mt-10 text-xl font-semibold">{t('takeaways')}</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-fg-muted">
              {session.takeaways.map((x) => (
                <li key={x.en}>{x[loc]}</li>
              ))}
            </ul>
          </>
        )}

        {session.notes && notesForRender(session.notes[loc]) && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t('notes')}</h2>
            <div className="mt-4">
              <MdxRenderer source={notesForRender(session.notes[loc])} />
            </div>
          </section>
        )}

        {session.exercise && !isSkippable(session.exercise[loc]) && (
          <Card className="mt-10">
            <h2 className="text-lg font-semibold">{t('exercise')}</h2>
            <p className="mt-2 text-sm leading-7 text-fg-muted">{session.exercise[loc]}</p>
          </Card>
        )}

        {pdfUrl && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold">{t('files')}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              {thumb && (
                <Image
                  src={thumb}
                  alt={`${t('coverSlide')} ${session.order}: ${session.title[loc]}`}
                  width={640}
                  height={360}
                  loading="lazy"
                  className="aspect-[16/9] w-40 rounded-lg object-cover"
                />
              )}
              <div>
                <a
                  href={pdfUrl}
                  download
                  data-testid="course-download"
                  className="inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm hover:bg-surface"
                >
                  {t('download')} (PDF)
                </a>
                <p className="mt-2 text-xs text-fg-muted">
                  {pdf && (
                    <>
                      {pdf.sizeLabel}
                      {pdf.pages ? ` · ${pdf.pages} ${t('pages')}` : ''}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          {p ? (
            p.isPublished ? (
              <ButtonLink href={`/courses/${p.s.slug}`} variant="ghost">
                ← {t('previous')}: {p.s.title[loc]}
              </ButtonLink>
            ) : (
              <span className="text-sm text-fg-muted">
                {t('previous')}: {p.s.title[loc]} — {t('comingSoon')}
              </span>
            )
          ) : (
            <span />
          )}
          {n ? (
            n.isPublished ? (
              <ButtonLink href={`/courses/${n.s.slug}`} variant="ghost">
                {t('next')}: {n.s.title[loc]} →
              </ButtonLink>
            ) : (
              <span className="text-sm text-fg-muted">
                {t('next')}: {n.s.title[loc]} — {t('comingSoon')}
              </span>
            )
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-8">
          <ButtonLink href="/courses" variant="secondary">
            {t('back')}
          </ButtonLink>
        </div>

        <Card className="mt-12">
          <h2 className="text-lg font-semibold">{t('ctaTitle')}</h2>
          <p className="mt-2 text-sm leading-7 text-fg-muted">{t('ctaText')}</p>
          <div className="mt-4">
            <ExternalButtonLink href={site.telegram.url}>{t('workshopCta')} ({site.telegram.handle})</ExternalButtonLink>
          </div>
        </Card>
      </Container>
    </>
  );
}
