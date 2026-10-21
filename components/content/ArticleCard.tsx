import { Link } from '@/i18n/navigation';
import { Card } from '@/components/ui/Card';
import type { ArticleMeta } from '@/lib/schemas';

export function ArticleCard({
  meta,
  dateLabel,
  minutesLabel,
}: {
  meta: ArticleMeta;
  dateLabel: string;
  minutesLabel: string;
}) {
  return (
    <Card>
      <p className="text-xs text-fg-muted">
        <time dateTime={meta.date}>{dateLabel}</time> · {minutesLabel}
      </p>
      <h3 className="mt-2 text-xl font-semibold">
        <Link href={`/blog/${meta.slug}`} className="hover:text-accent">
          {meta.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-7 text-fg-muted">{meta.summary}</p>
    </Card>
  );
}
