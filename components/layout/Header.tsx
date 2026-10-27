import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher, type ArticleCounterparts } from './LanguageSwitcher';
import { MobileMenu, Nav } from './Nav';

export function Header({ counterparts }: { counterparts: ArticleCounterparts }) {
  const t = useTranslations('meta');
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/about/amin.jpg"
            alt={t('siteName')}
            width={52}
            height={52}
            className="size-[52px] rounded-full object-cover"
          />
          <span className="text-base font-semibold text-fg">{t('siteName')}</span>
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
