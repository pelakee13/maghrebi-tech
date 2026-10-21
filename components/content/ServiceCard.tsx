import { Card } from '@/components/ui/Card';
import type { ServiceMeta } from '@/lib/schemas';

const ICONS: Record<ServiceMeta['icon'], string> = {
  system: 'M3 5h18v12H3zM8 21h8M12 17v4',
  bot: 'M12 3v3M7 8h10a3 3 0 013 3v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5a3 3 0 013-3zM9 13h.01M15 13h.01',
  support: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4l3 2',
  training: 'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5',
};

export function ServiceIcon({ icon }: { icon: ServiceMeta['icon'] }) {
  return (
    <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[icon]} />
    </svg>
  );
}

export function ServiceCard({ meta }: { meta: ServiceMeta }) {
  return (
    <Card className="h-full">
      <ServiceIcon icon={meta.icon} />
      <h3 className="mt-4 text-lg font-semibold">{meta.title}</h3>
      <p className="mt-2 text-sm leading-7 text-fg-muted">{meta.summary}</p>
    </Card>
  );
}
