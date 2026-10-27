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
      <Container className="relative flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/about/amin.jpg"
            alt={t('siteName')}
            width={72}
            height={72}
            className="size-14 rounded-full object-cover sm:size-[72px]"
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
