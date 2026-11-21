import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export function Section({
  title,
  lead,
  children,
  className,
  id,
  headingLevel = 2,
}: {
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  /** Heading level for the section title. Index pages pass 1 so the page has an h1;
      section titles inside the home page stay at the default h2. */
  headingLevel?: 1 | 2;
}) {
  const TitleTag = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <section id={id} className={cn('py-14 sm:py-20', className)}>
      <Container>
        {(title || lead) && (
          <header className="mb-10 max-w-2xl">
            {title && <TitleTag className="text-2xl font-bold sm:text-3xl">{title}</TitleTag>}
            {lead && <p className="mt-3 text-fg-muted">{lead}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
