import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/content/ProjectCard';
import type { ProjectMeta } from '@/lib/schemas';

export function ProjectsHighlight({
  title,
  lead,
  items,
  typeLabels,
  viewAll,
}: {
  title: string;
  lead: string;
  items: ProjectMeta[];
  typeLabels: Record<string, string>;
  viewAll: string;
}) {
  return (
    <Section title={title} lead={lead}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProjectCard key={p.id} meta={p} typeLabel={typeLabels[p.type] ?? p.type} />
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/portfolio" variant="ghost">
          {viewAll}
        </ButtonLink>
      </div>
    </Section>
  );
}
