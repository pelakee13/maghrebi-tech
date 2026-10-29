// Single source of truth for site-wide constants. No phone number is published (owner's choice).
export const site = {
  name: { fa: 'امین مغربی', en: 'Amin Maghrebi' },
  domain: 'maghrebi.tech',
  // Canonical host is www (the apex 308-redirects here on Vercel).
  url: (process.env.SITE_URL ?? 'https://www.maghrebi.tech').replace(/\/$/, ''),
  email: (process.env.CONTACT_EMAIL ?? 'amin.mb21@gmail.com'),
  telegram: { handle: '@aminmaghrebi', url: 'https://t.me/aminmaghrebi' },
  // An empty url means the link is not rendered. Owner must confirm these profiles before launch.
  socials: [
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/amin-maghrebi' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/pelakee13' },
    { platform: 'x', label: 'X', url: 'https://x.com/pelakee13' },
  ],
  resume: {
    fa: '/resume/amin-maghrebi-resume-fa.pdf',
    en: '/resume/amin-maghrebi-resume-en.pdf',
  },
} as const;

export type Social = (typeof site.socials)[number];
