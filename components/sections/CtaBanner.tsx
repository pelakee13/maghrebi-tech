import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function CtaBanner({ title, text, cta }: { title: string; text: string; cta: string }) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="rounded-card border border-border bg-surface p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-fg-muted">{text}</p>
          <div className="mt-8">
            <ButtonLink href="/contact">{cta}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
