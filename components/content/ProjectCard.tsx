import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge, Card } from '@/components/ui/Card';
import type { ProjectMeta } from '@/lib/schemas';
import { ProjectImagePlaceholder } from './ProjectImagePlaceholder';

/** Animated or high-res preview (gif/mp4/webm) shown in place of the static screenshot. */
function MediaPreview({ src, alt }: { src: string; alt: string }) {
  if (/\.(mp4|webm)$/i.test(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className="aspect-[16/9] w-full rounded-xl border border-border object-cover"
      />
    );
  }
  return (
    <Image src={src} alt={alt} width={640} height={360} className="aspect-[16/9] w-full rounded-xl object-cover" />
  );
}

export function ProjectCard({ meta, typeLabel }: { meta: ProjectMeta; typeLabel: string }) {
  const t = useTranslations('projectCard');
  return (
    <Card className="flex h-full flex-col gap-4">
      {meta.mediaPreview ? (
        <MediaPreview src={meta.mediaPreview} alt={meta.imageAlt ?? ''} />
      ) : meta.image ? (
        <Image src={meta.image} alt={meta.imageAlt ?? ''} width={640} height={360} className="aspect-[16/9] w-full rounded-xl object-cover" />
      ) : (
        <ProjectImagePlaceholder type={meta.type} />
      )}
      <Badge className="self-start">{typeLabel}</Badge>
      <h3 className="text-lg font-semibold">{meta.title}</h3>
      <p className="text-sm leading-7 text-fg-muted">{meta.summary}</p>
      {meta.problem && (
        <p className="text-sm leading-6 text-fg-muted">
          <span className="font-medium text-fg">{t('problem')}: </span>
          {meta.problem}
        </p>
      )}
      {meta.solution && (
        <p className="text-sm leading-6 text-fg-muted">
          <span className="font-medium text-fg">{t('built')}: </span>
          {meta.solution}
        </p>
      )}
      {(meta.impact || meta.result) && (
        <p className="mt-auto border-t border-border pt-3 text-sm leading-6 text-fg">
          {meta.impact && (
            <span className="me-2 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
              {meta.impact}
            </span>
          )}
          {meta.result}
        </p>
      )}
      {meta.techStack && meta.techStack.length > 0 && (
        <ul aria-label={t('tech')} className="flex flex-wrap gap-1.5">
          {meta.techStack.map((tech) => (
            <li key={tech} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-fg-muted">
              {tech}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
