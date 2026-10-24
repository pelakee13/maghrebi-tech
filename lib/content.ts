import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import type { ZodType } from 'zod';
import {
  articleSchema,
  courseSchema,
  homePageSchema,
  pageSchema,
  projectSchema,
  serviceSchema,
  type ArticleMeta,
  type CourseMeta,
  type HomePageMeta,
  type PageMeta,
  type ProjectMeta,
  type ServiceMeta,
} from './schemas';
import { checkIdParity, isPublished, readingMinutes, sortArticles } from './content-utils';

const ROOT = path.join(process.cwd(), 'content');
const LOCALES = ['fa', 'en'] as const;

export type Entry<T> = { meta: T; body: string };

function normalizeDates(data: Record<string, unknown>): Record<string, unknown> {
  // YAML parses `2026-10-01` as a Date; the schema (and data-model) use ISO date strings.
  const out: Record<string, unknown> = { ...data };
  for (const key of ['date', 'updated']) {
    const v = out[key];
    if (v instanceof Date) out[key] = v.toISOString().slice(0, 10);
  }
  return out;
}

function parseFile<T>(file: string, schema: ZodType<T>): Entry<T> {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const parsed = schema.safeParse(normalizeDates(data));
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${path.relative(process.cwd(), file)}: ${parsed.error.message}`);
  }
  return { meta: parsed.data, body: content };
}

function listDir(locale: string, dir: string): string[] {
  const full = path.join(ROOT, locale, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => path.join(full, f));
}

export const getPage = cache((locale: string, slug: 'about' | 'resume'): Entry<PageMeta> =>
  parseFile(path.join(ROOT, locale, 'pages', `${slug}.mdx`), pageSchema),
);

export const getHomePage = cache((locale: string): Entry<HomePageMeta> =>
  parseFile(path.join(ROOT, locale, 'pages', 'home.mdx'), homePageSchema),
);

export const getServices = cache((locale: string): Entry<ServiceMeta>[] =>
  listDir(locale, 'services')
    .map((f) => parseFile(f, serviceSchema))
    .sort((a, b) => a.meta.order - b.meta.order),
);

export const getProjects = cache((locale: string): Entry<ProjectMeta>[] =>
  listDir(locale, 'projects')
    .map((f) => parseFile(f, projectSchema))
    .sort((a, b) => a.meta.order - b.meta.order),
);

export const getArticles = cache((locale: string): Entry<ArticleMeta>[] => {
  const all = listDir(locale, 'blog').map((f) => parseFile(f, articleSchema));
  return sortArticles(all.filter((a) => isPublished(a.meta)));
});

export function getArticle(locale: string, slug: string): (Entry<ArticleMeta> & { minutes: number }) | undefined {
  const found = getArticles(locale).find((a) => a.meta.slug === slug);
  return found ? { ...found, minutes: readingMinutes(found.body) } : undefined;
}

export const getCourses = cache((locale: string): Entry<CourseMeta>[] => {
  const all = listDir(locale, 'courses').map((f) => parseFile(f, courseSchema));
  return all.filter((c) => !c.meta.draft).sort((a, b) => a.meta.order - b.meta.order);
});

export function getCourse(locale: string, slug: string): Entry<CourseMeta> | undefined {
  return getCourses(locale).find((c) => c.meta.slug === slug);
}

/** Counterpart course slug in another locale (by translationKey), if any. */
export function getCourseCounterpartSlug(fromLocale: string, slug: string, toLocale: string): string | undefined {
  const from = getCourse(fromLocale, slug);
  if (!from) return undefined;
  return getCourses(toLocale).find((c) => c.meta.translationKey === from.meta.translationKey)?.meta.slug;
}

/** Counterpart article slug in another locale (by translationKey), if any. */
export function getCounterpartSlug(fromLocale: string, slug: string, toLocale: string): string | undefined {
  const from = getArticles(fromLocale).find((a) => a.meta.slug === slug);
  if (!from?.meta.translationKey) return undefined;
  return getArticles(toLocale).find((a) => a.meta.translationKey === from.meta.translationKey)?.meta.slug;
}

/** Build-time guard: services and projects must exist in every locale. */
export function assertLocaleParity(): void {
  const problems = [
    ...checkIdParity('services', Object.fromEntries(LOCALES.map((l) => [l, getServices(l).map((s) => s.meta.id)]))),
    ...checkIdParity('courses', Object.fromEntries(LOCALES.map((l) => [l, getCourses(l).map((c) => c.meta.translationKey)]))),
    ...checkIdParity('projects', Object.fromEntries(LOCALES.map((l) => [l, getProjects(l).map((p) => p.meta.id)]))),
  ];
  for (const l of LOCALES) {
    for (const c of getCourses(l)) {
      for (const f of c.meta.files) {
        if (!fs.existsSync(path.join(process.cwd(), 'public', f.url))) problems.push(`course "${c.meta.slug}" (${l}): missing file ${f.url}`);
      }
    }
  }
  if (problems.length) throw new Error(`Content parity errors:\n${problems.join('\n')}`);
}
