/**
 * Curated GitHub section config: pinned repo names instead of "latest activity",
 * so hackathon/testnet repos don't show up next to the business positioning.
 *
 * TODO(owner): confirm which repos to pin. Currently only maghrebi.tech itself is
 * clearly on-position (business automation); add the Telegram-bot / automation repos
 * here once they exist publicly. A repo without a `desc` falls back to its GitHub description.
 */
export type PinnedRepo = {
  name: string;
  desc?: { fa: string; en: string };
};

export const pinnedRepos: PinnedRepo[] = [
  {
    name: 'maghrebi-tech',
    desc: {
      fa: 'همین وب‌سایت: پنل و سایت دوزبانه با Next.js و TypeScript.',
      en: 'This very website: a bilingual Next.js + TypeScript site.',
    },
  },
];
