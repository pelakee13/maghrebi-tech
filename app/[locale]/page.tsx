import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getHomePage, getProjects, getServices } from '@/lib/content';
import { buildMetadata, personJsonLd, professionalServiceJsonLd } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { ServicesHighlight } from '@/components/sections/ServicesHighlight';
import { TechStackBanner } from '@/components/sections/TechStackBanner';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { ProjectsHighlight } from '@/components/sections/ProjectsHighlight';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Bio } from '@/components/sections/Bio';
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
  // Homepage stays business-focused: consumer/hobby projects live on /portfolio only.
  const projects = getProjects(locale)
    .filter((p) => p.meta.featured && !p.meta.consumer)
    .map((p) => p.meta);
  const typeLabels = { 'web-app': pt('web-app'), bot: pt('bot'), 'mobile-app': pt('mobile-app') };

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <JsonLd data={professionalServiceJsonLd(locale)} />
      <Hero hero={meta.hero} />
      <ServicesHighlight title={t('servicesTitle')} lead={t('servicesLead')} items={services} viewAll={c('viewAll')} />
      <TechStackBanner title={t('techTitle')} lead={t('techLead')} />
      <ProjectsHighlight title={t('projectsTitle')} lead={t('projectsLead')} items={projects} typeLabels={typeLabels} viewAll={c('viewAll')} />
      <GitHubActivity title={t('githubTitle')} lead={t('githubLead')} />
      <ProcessSteps
        title={t('processTitle')}
        steps={[1, 2, 3].map((n) => ({ title: t(`step${n}Title` as never), text: t(`step${n}Text` as never) }))}
      />
      <Bio title={t('bioTitle')} text={t('bioText')} />
      <CtaBanner title={t('ctaTitle')} text={t('ctaText')} />
    </>
  );
}
