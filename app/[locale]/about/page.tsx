import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getPage } from '@/lib/content';
import { buildMetadata, personJsonLd, professionalServiceJsonLd } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink } from '@/components/ui/Button';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { meta } = getPage(locale, 'about');
  return buildMetadata({ locale, path: '/about', title: meta.title, description: meta.description });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const { meta, body } = getPage(locale, 'about');
  const c = await getTranslations('common');
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <JsonLd data={personJsonLd(locale)} />
      <JsonLd data={professionalServiceJsonLd(locale)} />
      <h1 className="mb-8 text-3xl font-extrabold sm:text-4xl">{meta.title}</h1>
      <MdxRenderer source={body} />
      <div className="mt-10">
        <ButtonLink href="/contact">{c('contactMe')}</ButtonLink>
      </div>
    </Container>
  );
}
