import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getServices } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { ServiceIcon } from '@/components/content/ServiceCard';
import { MdxRenderer } from '@/components/content/MdxRenderer';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildMetadata({
    locale,
    path: '/services',
    title: t('title'),
    description: t('lead') + ' ' + (locale === 'fa' ? 'ربات تلگرام، سیستم هوشمند کسب‌وکار، پشتیبانی و آموزش هوش مصنوعی.' : 'Telegram bots, smart business systems, support and AI training.'),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const c = await getTranslations('common');
  const services = getServices(locale);

  return (
    <Section title={t('title')} lead={t('lead')}>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map(({ meta, body }) => (
          <Card key={meta.id} className="flex flex-col">
            <ServiceIcon icon={meta.icon} />
            <h2 className="mt-4 text-xl font-semibold">{meta.title}</h2>
            <p className="mt-2 text-fg-muted">{meta.summary}</p>
            <MdxRenderer source={body} />
            <p className="mt-4 text-sm font-semibold">{c('useCases')}</p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-fg-muted">
              {meta.useCases.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/contact" variant="secondary">
                {c('getQuote')}
              </ButtonLink>
            </div>
          </Card>
        ))}
      </div>

      {/* TODO(owner): fill in starting prices / package ranges when ready. */}
      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">{t('pricingTitle')}</h2>
      <p className="mt-3 max-w-2xl text-fg-muted">{t('pricingLead')}</p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-semibold">{t('pricingFixed')}</dt>
          <dd className="mt-1 text-sm leading-7 text-fg-muted">[TODO: starting price]</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">{t('pricingMonthly')}</dt>
          <dd className="mt-1 text-sm leading-7 text-fg-muted">[TODO: monthly range]</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">{t('pricingWorkshop')}</dt>
          <dd className="mt-1 text-sm leading-7 text-fg-muted">[TODO: workshop pricing]</dd>
        </div>
      </dl>
    </Section>
  );
}
