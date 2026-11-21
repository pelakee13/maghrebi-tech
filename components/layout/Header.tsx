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
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/about/amin.jpg"
            alt={t('siteName')}
            width={72}
            height={72}
            className="size-14 shrink-0 rounded-full object-cover sm:size-[72px]"
          />
          <Image
            src="/images/logo-mark.svg"
            alt=""
            aria-hidden="true"
            width={44}
            height={45}
            className="h-11 w-auto shrink-0 sm:h-12"
          />
          {/* Visually hidden below sm (sr-only keeps it in innerText and for
              screen readers): at 360px the brand + switcher + menu button only
              fit without the name — photo + logo mark carry the brand there. */}
          <span className="text-base font-semibold text-fg max-sm:sr-only">{t('siteName')}</span>
        </Link>
        <Nav className="hidden shrink-0 xl:block" />
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher counterparts={counterparts} />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
