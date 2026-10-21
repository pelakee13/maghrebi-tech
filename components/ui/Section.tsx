import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export function Section({
  title,
  lead,
  children,
  className,
  id,
}: {
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-14 sm:py-20', className)}>
      <Container>
        {(title || lead) && (
          <header className="mb-10 max-w-2xl">
            {title && <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>}
            {lead && <p className="mt-3 text-fg-muted">{lead}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
