/** Shared (server + client) navigation definition. Keep free of "use client". */
export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/blog', key: 'blog' },
  { href: '/resume', key: 'resume' },
  { href: '/contact', key: 'contact' },
] as const;
