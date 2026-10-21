import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  secondary: 'border border-border bg-surface text-fg hover:bg-surface-2',
  ghost: 'text-accent hover:bg-surface',
} as const;

type Variant = keyof typeof variants;

export function Button({ variant = 'primary', className, ...props }: ComponentProps<'button'> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

export function ExternalButtonLink({
  variant = 'secondary',
  className,
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} target="_blank" rel="noopener noreferrer" {...props} />;
}
