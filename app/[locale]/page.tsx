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
import { ProjectsHighlight } from '@/components/sections/ProjectsHighlight';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Bio } from '@/components/sections/Bio';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/ui/JsonLd';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import Image from 'next/image';

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
  const typeLabels = { 'web-app': pt('web-app'), bot: pt('bot'), 'mobile-app': pt('mobile-app'), website: pt('website') };
  const heli = projects.find((p) => p.id === 'heli-beauty-studio');

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <JsonLd data={professionalServiceJsonLd(locale)} />
      <Hero hero={meta.hero} />
      {/* Heli feature: outcome + case-study link first in DOM order on mobile
          (order classes put the image after the action on small screens). */}
      {heli && (
        <Section title={heli.title} lead={heli.summary}>
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="order-1 md:order-2 md:flex-1">
              {heli.result && <p className="text-lg leading-8 text-fg">{heli.result}</p>}
              {heli.caseStudySlug && (
                <div className="mt-6">
                  <ButtonLink href={`/blog/${heli.caseStudySlug}`} variant="secondary">
                    {c('readMore')}
                  </ButtonLink>
                </div>
              )}
            </div>
            {heli.image && (
              <div className="order-2 md:order-1 md:flex-1">
                <Image
                  src={heli.image}
                  alt={heli.imageAlt ?? ''}
                  width={640}
                  height={360}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[16/9] w-full rounded-xl object-cover"
                />
              </div>
            )}
          </div>
        </Section>
      )}
      <ServicesHighlight title={t('servicesTitle')} items={services} viewAll={c('viewAll')} />
      <TechStackBanner title={t('techTitle')} lead={t('techLead')} />
      <ProjectsHighlight title={t('projectsTitle')} lead={t('projectsLead')} items={projects} typeLabels={typeLabels} viewAll={c('viewAll')} />
      <ProcessSteps
        title={t('processTitle')}
        steps={[1, 2, 3].map((n) => ({ title: t(`step${n}Title` as never), text: t(`step${n}Text` as never) }))}
      />
      <Bio title={t('bioTitle')} text={t('bioText')} />
      {/* Short-form heading/text are locale-conditional literals here (no
          messages keys): the banner welcomes website buyers as well as
          automation clients, matching the form's own wording below. */}
      <CtaBanner
        title={locale === 'fa' ? 'دربارهٔ پروژه‌تان بگویید' : 'Tell me about your project'}
        text={
          locale === 'fa'
            ? 'چه سایتی نیاز دارید یا کدام کار تکراری تیم‌تان را می‌خواهید ساده‌تر کنید؟ مشاوره‌ی اول رایگان است و نظر صادقانه‌ام را می‌شنوید.'
            : 'What kind of website do you need, or which repetitive task would you like to simplify? The first consultation is free, and you will get my honest opinion.'
        }
      />
    </>
  );
}
