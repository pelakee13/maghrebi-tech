import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import type { HomePageMeta } from '@/lib/schemas';

export function Hero({ hero }: { hero: HomePageMeta['hero'] }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 end-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <Container className="relative py-20 sm:py-28">
        <p className="text-sm font-medium text-accent">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{hero.headline}</h1>
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
