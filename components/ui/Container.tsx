import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

export function Container({ className, children, as: Tag = 'div' }: { className?: string; children: ReactNode; as?: ElementType }) {
  return <Tag className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</Tag>;
}
