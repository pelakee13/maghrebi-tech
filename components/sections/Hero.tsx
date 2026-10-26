import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import type { HomePageMeta } from '@/lib/schemas';

export function Hero({ hero }: { hero: HomePageMeta['hero'] }) {
  return (
    <section className="border-b border-border">
      <Container className="py-16 sm:py-24">
        <p className="text-sm font-medium text-fg-muted">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{hero.headline}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-muted">{hero.subheadline}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact">{hero.primaryCta}</ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary">
            {hero.secondaryCta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
