import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { testimonials, type Testimonial } from '@/lib/testimonials';

export function Testimonials({ locale, title, lead, projectLabel }: {
  locale: 'en' | 'fa';
  title: string;
  lead: string;
  projectLabel: string;
}) {
  const items: Testimonial[] = testimonials[locale];
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <header className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-3 text-fg-muted">{lead}</p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.name} className="flex h-full flex-col gap-3">
              <blockquote className="text-fg leading-7">“{item.quote}”</blockquote>
              <p className="mt-auto text-sm">
                <span className="font-semibold">{item.name}</span>
                <span className="text-fg-muted"> — {item.role}</span>
              </p>
              {item.project && (
                <p className="text-xs text-fg-muted">
                  {projectLabel}: {item.project}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
