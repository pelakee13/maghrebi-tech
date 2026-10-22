import { describe, expect, it } from 'vitest';
import { articleSchema, projectSchema, serviceSchema } from '../../lib/schemas';
import { checkIdParity, isPublished, readingMinutes, sortArticles } from '../../lib/content-utils';

describe('frontmatter schemas', () => {
  it('accepts a valid service and rejects a bad icon', () => {
    const ok = { id: 'telegram-bots', order: 1, title: 'Telegram bots', summary: 'Automatic replies and orders', icon: 'bot', useCases: ['a1', 'b2'] };
    expect(serviceSchema.safeParse(ok).success).toBe(true);
    expect(serviceSchema.safeParse({ ...ok, icon: 'x' }).success).toBe(false);
    expect(serviceSchema.safeParse({ ...ok, title: 'ab' }).success).toBe(false);
  });

  it('enforces project constraints', () => {
    const ok = { id: 'running-app', order: 3, title: 'Running app', type: 'mobile-app', summary: 'A running companion app', role: 'Design and build' };
    expect(projectSchema.safeParse(ok).success).toBe(true);
    expect(projectSchema.safeParse({ ...ok, type: 'desktop' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...ok, summary: 'x'.repeat(261) }).success).toBe(false);
    expect(projectSchema.safeParse({ ...ok, tags: ['1', '2', '3', '4', '5', '6', '7'] }).success).toBe(false);
  });

  it('requires ASCII kebab-case article slugs and ISO dates', () => {
    const ok = { slug: 'my-first-post', title: 'My first post', date: '2026-01-02', summary: 'x'.repeat(60) };
    expect(articleSchema.safeParse(ok).success).toBe(true);
    expect(articleSchema.safeParse({ ...ok, slug: 'پست' }).success).toBe(false);
    expect(articleSchema.safeParse({ ...ok, date: '02/01/2026' }).success).toBe(false);
  });
});

describe('content utils', () => {
  it('hides drafts and future-dated articles', () => {
    const now = new Date('2026-06-01T00:00:00Z');
    expect(isPublished({ draft: false, date: '2026-05-31' }, now)).toBe(true);
    expect(isPublished({ draft: true, date: '2026-05-31' }, now)).toBe(false);
    expect(isPublished({ draft: false, date: '2026-07-01' }, now)).toBe(false);
  });

  it('sorts newest first', () => {
    const sorted = sortArticles([{ meta: { date: '2026-01-01' } }, { meta: { date: '2026-03-01' } }]);
    expect(sorted.map((s) => s.meta.date)).toEqual(['2026-03-01', '2026-01-01']);
  });

  it('computes at least 1 reading minute', () => {
    expect(readingMinutes('short')).toBe(1);
    expect(readingMinutes('word '.repeat(600))).toBe(3);
  });

  it('reports ids missing from a locale', () => {
    expect(checkIdParity('services', { fa: ['a', 'b'], en: ['a'] })).toEqual(['services "b" is missing in: en']);
    expect(checkIdParity('services', { fa: ['a'], en: ['a'] })).toEqual([]);
  });
});
