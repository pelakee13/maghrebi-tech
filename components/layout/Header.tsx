import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher, type ArticleCounterparts } from './LanguageSwitcher';
import { MobileMenu, Nav } from './Nav';

export function Header({ counterparts }: { counterparts: ArticleCounterparts }) {
  const t = useTranslations('meta');
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-fg">
          {t('siteName')}
        </Link>
        <Nav className="hidden md:block" />
        <div className="flex items-center gap-2">
          <LanguageSwitcher counterparts={counterparts} />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
