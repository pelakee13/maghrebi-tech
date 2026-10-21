import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/forms/ContactForm';
import { SocialLinks } from '@/components/layout/SocialLinks';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({
    locale,
    path: '/contact',
    title: t('title'),
    description: t('lead') + ' ' + (locale === 'fa' ? 'ایمیل، تلگرام و فرم تماس.' : 'Email, Telegram and a contact form.'),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const f = await getTranslations('footer');

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-2xl text-fg-muted">{t('lead')}</p>
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        <Card className="h-fit">
          <h2 className="text-lg font-semibold">{t('direct')}</h2>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            <li>
              {t('email')}:{' '}
              <a href={`mailto:${site.email}`} dir="ltr" className="text-accent hover:underline">{site.email}</a>
            </li>
            <li>
              {t('telegram')}:{' '}
              <a href={site.telegram.url} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-accent hover:underline">
                {site.telegram.handle}
              </a>
            </li>
          </ul>
          <p className="mb-2 mt-6 text-sm font-semibold">{f('follow')}</p>
          <SocialLinks />
        </Card>
      </div>
    </Container>
  );
}
