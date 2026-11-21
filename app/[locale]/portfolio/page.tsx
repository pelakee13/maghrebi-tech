import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getProjects } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Badge, Card } from '@/components/ui/Card';
import { ButtonLink, ExternalButtonLink } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { MdxRenderer } from '@/components/content/MdxRenderer';
import Image from 'next/image';
import { ProjectGallery } from '@/components/content/ProjectGallery';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  return buildMetadata({
    locale,
    path: '/portfolio',
    title: t('title'),
    description: t('lead') + ' ' + (locale === 'fa' ? 'وب‌سایت نمونه‌کار دوزبانه‌ی خودم، سیستم مدیریت سالن زیبایی، کنداکتور فوتبال، ربات تلگرام و اپلیکیشن دویدن.' : 'My bilingual portfolio website, a salon management system, a football schedule tool, a Telegram bot and a running app.'),
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('portfolio');
  const c = await getTranslations('common');
  const pt = await getTranslations('projectType');
  const projects = getProjects(locale);

  return (
    <Section title={t('title')} lead={t('lead')} headingLevel={1}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ meta, body }) => (
          <Card key={meta.id} id={meta.id} className="flex flex-col gap-4">
            {meta.image && (
              <Image src={meta.image} alt={meta.imageAlt ?? ''} width={640} height={360} className="aspect-[16/9] w-full rounded-xl object-cover" />
            )}
            {meta.gallery && <ProjectGallery images={meta.gallery} title={meta.title} />}
            <Badge className="self-start">{pt(meta.type)}</Badge>
            <h2 className="text-xl font-semibold">{meta.title}</h2>
            <p className="text-sm leading-7 text-fg-muted">{meta.summary}</p>
            {meta.result && (
              <p className="text-sm leading-6 text-fg">
                <span className="font-medium">↳ </span>
                {meta.result}
              </p>
            )}
            <MdxRenderer source={body} />
            <p className="text-sm">
              <span className="font-semibold">{c('role')}: </span>
              <span className="text-fg-muted">{meta.role}</span>
            </p>
            {meta.url && <ExternalButtonLink href={meta.url}>{c('visit')}</ExternalButtonLink>}
            {/* Buyer's journey: the personal-website entry leads straight to a
                website-design inquiry, with the topic preselected. */}
            {meta.id === 'maghrebi-tech' && (
              <div>
                <ButtonLink href="/contact?service=website-design">
                  {locale === 'fa' ? 'دربارهٔ طراحی سایتم صحبت کنیم' : 'Discuss my website'}
                </ButtonLink>
              </div>
            )}
            {(meta.caseStudySlug || meta.githubUrl) && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                {meta.caseStudySlug && (
                  <Link href={`/blog/${meta.caseStudySlug}`} className="text-accent hover:underline">
                    {c('readMore')}
                  </Link>
                )}
                {meta.githubUrl && (
                  <a href={meta.githubUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {/* No messages key exists for this; locale-conditional literal. */}
                    {locale === 'fa' ? 'مشاهدهٔ کد' : 'View source'}
                  </a>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
