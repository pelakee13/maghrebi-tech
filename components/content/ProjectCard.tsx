import Image from 'next/image';
import { Badge, Card } from '@/components/ui/Card';
import type { ProjectMeta } from '@/lib/schemas';
import { ProjectImagePlaceholder } from './ProjectImagePlaceholder';

export function ProjectCard({ meta, typeLabel }: { meta: ProjectMeta; typeLabel: string }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      {meta.image ? (
        <Image src={meta.image} alt={meta.title} width={640} height={360} className="aspect-[16/9] w-full rounded-xl object-cover" />
      ) : (
        <ProjectImagePlaceholder type={meta.type} />
      )}
      <Badge className="self-start">{typeLabel}</Badge>
      <h3 className="text-lg font-semibold">{meta.title}</h3>
      <p className="text-sm leading-7 text-fg-muted">{meta.summary}</p>
      {meta.result && (
        <p className="mt-auto border-t border-border pt-3 text-sm leading-6 text-fg">
          <span className="font-medium">↳ </span>
          {meta.result}
        </p>
      )}
    </Card>
  );
}
