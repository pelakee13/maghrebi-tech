import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getHomePage, getProjects, getServices } from '@/lib/content';
import { buildMetadata, personJsonLd } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { ServicesHighlight } from '@/components/sections/ServicesHighlight';
import { ProjectsHighlight } from '@/components/sections/ProjectsHighlight';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/ui/JsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { meta } = getHomePage(locale);
  return buildMetadata({ locale, path: '', title: meta.title, description: meta.description });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const c = await getTranslations('common');
  const pt = await getTranslations('projectType');
  const { meta } = getHomePage(locale);
  const services = getServices(locale).map((s) => s.meta);
  const projects = getProjects(locale).filter((p) => p.meta.featured).map((p) => p.meta);
  const typeLabels = { 'web-app': pt('web-app'), bot: pt('bot'), 'mobile-app': pt('mobile-app') };

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <Hero hero={meta.hero} />
      <ServicesHighlight title={t('servicesTitle')} lead={t('servicesLead')} items={services} viewAll={c('viewAll')} />
      <ProjectsHighlight title={t('projectsTitle')} lead={t('projectsLead')} items={projects} typeLabels={typeLabels} viewAll={c('viewAll')} />
      <CtaBanner title={t('ctaTitle')} text={t('ctaText')} cta={c('contactMe')} />
    </>
  );
}
