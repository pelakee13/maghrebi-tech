import { Container } from '@/components/ui/Container';

/** Plain three-step collaboration flow: words only, no icons or numbers theatre. */
export function ProcessSteps({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <section className="border-t border-border py-14 sm:py-20">
      <Container>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title}>
              <p className="text-sm text-fg-muted">{i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-fg-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
