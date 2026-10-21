import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/content/ServiceCard';
import type { ServiceMeta } from '@/lib/schemas';

export function ServicesHighlight({
  title,
  lead,
  items,
  viewAll,
}: {
  title: string;
  lead: string;
  items: ServiceMeta[];
  viewAll: string;
}) {
  return (
    <Section title={title} lead={lead}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <ServiceCard key={s.id} meta={s} />
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/services" variant="ghost">
          {viewAll}
        </ButtonLink>
      </div>
    </Section>
  );
}
