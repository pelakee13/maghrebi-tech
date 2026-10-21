import { site } from '@/lib/site';

/** Renders only socials with a non-empty URL (no dead placeholders for visitors). */
export function SocialLinks({ className }: { className?: string }) {
  const items = site.socials.filter((s) => s.url);
  if (!items.length) return null;
  return (
    <ul className={className ?? 'flex flex-wrap gap-3'}>
      {items.map((s) => (
        <li key={s.platform}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fg-muted hover:text-accent"
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
