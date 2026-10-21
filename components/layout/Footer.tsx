import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/site';
import { SocialLinks } from './SocialLinks';
import { NAV_ITEMS } from '@/lib/nav-items';

export function Footer() {
  const t = useTranslations('footer');
  const n = useTranslations('nav');
  const m = useTranslations('meta');
  const c = useTranslations('contact');
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container className="grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{m('siteName')}</p>
          <p className="mt-2 text-sm text-fg-muted">{m('tagline')}</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t('pages')}</p>
          <ul className="space-y-2 text-sm">
            {NAV_ITEMS.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-fg-muted hover:text-accent">
                  {n(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{t('contact')}</p>
          <ul className="space-y-2 text-sm text-fg-muted">
            <li>
              {c('email')}:{' '}
              <a href={`mailto:${site.email}`} dir="ltr" className="text-accent hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              {c('telegram')}:{' '}
              <a href={site.telegram.url} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-accent hover:underline">
                {site.telegram.handle}
              </a>
            </li>
          </ul>
          <p className="mb-2 mt-5 text-sm font-semibold">{t('follow')}</p>
          <SocialLinks />
        </div>
      </Container>
      <div className="border-t border-border py-4 text-center text-xs text-fg-muted">
        © {new Date().getFullYear()} {site.domain} — {t('rights')}
      </div>
    </footer>
  );
}
