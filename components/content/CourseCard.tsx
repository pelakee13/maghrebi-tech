import { Link } from '@/i18n/navigation';
import { Badge, Card } from '@/components/ui/Card';
import type { CourseMeta } from '@/lib/schemas';

export function CourseCard({
  meta,
  dateLabel,
  labels,
}: {
  meta: CourseMeta;
  dateLabel: string;
  labels: { duration: string; open: string; formats: string[] };
}) {
  return (
    <Card className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
        <time dateTime={meta.date}>{dateLabel}</time>
        <span aria-hidden="true">·</span>
        <span>
          {labels.duration}: {meta.duration}
        </span>
      </div>
      <h2 className="text-xl font-semibold leading-snug">
        <Link href={`/courses/${meta.slug}`} className="hover:text-accent">
          {meta.title}
        </Link>
      </h2>
      <p className="text-sm leading-7 text-fg-muted">{meta.summary}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex gap-2">
          {labels.formats.map((f) => (
            <Badge key={f}>{f}</Badge>
          ))}
        </div>
        <Link href={`/courses/${meta.slug}`} className="text-sm font-semibold text-accent hover:underline">
          {labels.open}
        </Link>
      </div>
    </Card>
  );
}
