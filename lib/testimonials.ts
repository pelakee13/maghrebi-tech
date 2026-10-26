/**
 * Client testimonials. PLACEHOLDER STRUCTURE — replace `quote` values with the
 * exact words the client approved (never paraphrase a testimonial without approval).
 * Remove an entry instead of keeping unapproved text on the live site.
 */
export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  project?: string;
};

export const testimonials: Record<'en' | 'fa', Testimonial[]> = {
  en: [
    {
      name: '[Client name — Heli Beauty Studio]',
      role: 'Salon owner',
      quote: '[PLACEHOLDER — paste the exact approved quote about the management panel here, e.g. what changed in the daily routine.]',
      project: 'Heli Beauty Studio',
    },
    {
      name: '[Client name — Telegram bot]',
      role: 'Trader',
      quote: '[PLACEHOLDER — paste the exact approved quote about the alert bot here.]',
      project: 'Telegram trader bot',
    },
  ],
  fa: [
    {
      name: '[نام مشتری — سالن Heli]',
      role: 'مدیر سالن',
      quote: '[جای‌نگهدار — نقل‌قول دقیق تأییدشده‌ی مشتری درباره‌ی پنل مدیریت را اینجا بگذارید.]',
      project: 'سیستم مدیریت سالن Heli',
    },
    {
      name: '[نام مشتری — ربات تلگرام]',
      role: 'معامله‌گر',
      quote: '[جای‌نگهدار — نقل‌قول دقیق تأییدشده‌ی مشتری درباره‌ی ربات هشدار را اینجا بگذارید.]',
      project: 'ربات تریدر تلگرام',
    },
  ],
};
