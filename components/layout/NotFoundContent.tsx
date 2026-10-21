import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export function NotFoundContent() {
  const t = useTranslations('notFound');
  const n = useTranslations('nav');
  return (
    <Container className="py-24 text-center">
      <p className="text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-fg-muted">{t('text')}</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">{t('home')}</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          {n('contact')}
        </ButtonLink>
      </div>
    </Container>
  );
}
