import type { ArticleMeta } from './schemas';

/** Pure helpers (no fs) so they can be unit tested. */

export function isPublished(meta: Pick<ArticleMeta, 'draft' | 'date'>, now: Date = new Date()): boolean {
  if (meta.draft) return false;
  return new Date(`${meta.date}T00:00:00Z`).getTime() <= now.getTime();
}

export function sortArticles<T extends { meta: Pick<ArticleMeta, 'date'> }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Returns a list of human-readable problems when ids differ between locales. */
export function checkIdParity(kind: string, idsByLocale: Record<string, string[]>): string[] {
  const locales = Object.keys(idsByLocale);
  const all = new Set(locales.flatMap((l) => idsByLocale[l] ?? []));
  const problems: string[] = [];
  for (const id of all) {
    const missing = locales.filter((l) => !(idsByLocale[l] ?? []).includes(id));
    if (missing.length) problems.push(`${kind} "${id}" is missing in: ${missing.join(', ')}`);
  }
  return problems;
}
