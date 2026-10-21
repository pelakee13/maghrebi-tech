import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-card border border-border bg-surface p-6 transition-colors hover:bg-surface-2', className)}>
      {children}
    </div>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-accent', className)}>
      {children}
    </span>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'prose prose-invert max-w-none',
        'prose-headings:text-fg prose-p:text-fg-muted prose-li:text-fg-muted prose-strong:text-fg',
        'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
        className,
      )}
    >
      {children}
    </div>
  );
}
