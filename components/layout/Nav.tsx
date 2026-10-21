'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { NAV_ITEMS } from '@/lib/nav-items';

function useActive() {
  const pathname = usePathname();
  return (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
}

export function Nav({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const isActive = useActive();
  return (
    <nav aria-label="Main" className={className}>
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm transition-colors hover:text-accent',
                isActive(item.href) ? 'text-accent' : 'text-fg-muted',
              )}
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileMenu() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const isActive = useActive();
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-border px-3 py-1.5 text-sm text-fg"
      >
        {open ? t('close') : t('menu')}
      </button>
      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 space-y-1 border-b border-border bg-surface p-4"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'block rounded-lg px-3 py-2 text-base',
                  isActive(item.href) ? 'bg-surface-2 text-accent' : 'text-fg-muted',
                )}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
