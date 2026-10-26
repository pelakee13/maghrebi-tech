// Single source of truth for site-wide constants. No phone number is published (owner's choice).
export const site = {
  name: { fa: 'امین مغربی', en: 'Amin Maghrebi' },
  domain: 'maghrebi.tech',
  url: (process.env.SITE_URL ?? 'https://maghrebi.tech').replace(/\/$/, ''),
  email: 'hi@maghrebi.tech',
  telegram: { handle: '@aminmaghrebi', url: 'https://t.me/aminmaghrebi' },
  // An empty url means the link is not rendered. Owner must confirm these profiles before launch.
  socials: [
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/nodari-bitsadze' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/pelakee13' },
    { platform: 'x', label: 'X', url: 'https://x.com/pelakee13' },
  ],
  resume: {
    fa: '/resume/amin-maghrebi-resume-fa.pdf',
    en: '/resume/amin-maghrebi-resume-en.pdf',
  },
} as const;

export type Social = (typeof site.socials)[number];
