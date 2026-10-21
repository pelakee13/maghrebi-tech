import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import fs from 'node:fs';
import path from 'node:path';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { MdxRenderer } from '@/components/content/MdxRenderer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { meta } = getPage(locale, 'resume');
  return buildMetadata({ locale, path: '/resume', title: meta.title, description: meta.description });
}

export default async function ResumePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const { meta, body } = getPage(locale, 'resume');
  const t = await getTranslations('resume');

  // Render the download button only when the PDF for this locale actually exists (no broken links).
  const pdfPath = site.resume[locale as 'fa' | 'en'];
  const hasPdf = fs.existsSync(path.join(process.cwd(), 'public', pdfPath));

  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{meta.title}</h1>
        {hasPdf && (
          <a
            href={pdfPath}
            download
            data-testid="resume-download"
            className="inline-flex items-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-on-accent hover:bg-accent-strong"
          >
            {t('download')}
          </a>
        )}
      </div>
      <MdxRenderer source={body} />
    </Container>
  );
}
