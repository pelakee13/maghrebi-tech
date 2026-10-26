import type { ProjectMeta } from '@/lib/schemas';

const ICONS: Record<ProjectMeta['type'], string> = {
  'web-app': 'M3 5h18v12H3zM8 21h8M12 17v4',
  bot: 'M12 3v3M7 8h10a3 3 0 013 3v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5a3 3 0 013-3zM9 13h.01M15 13h.01',
  'mobile-app': 'M8 2h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V3a1 1 0 011-1zM11 18h2',
};

/** Neutral inline-SVG placeholder used until real screenshots exist. */
export function ProjectImagePlaceholder({ type }: { type: ProjectMeta['type'] }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-surface-2"
    >
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={ICONS[type]} />
      </svg>
    </div>
  );
}
