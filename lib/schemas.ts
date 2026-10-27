import { z } from 'zod';

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const serviceSchema = z.object({
  id: z.string().regex(kebab),
  order: z.number().int().positive(),
  title: z.string().min(3).max(60),
  summary: z.string().min(10).max(160),
  icon: z.enum(['system', 'bot', 'support', 'training']),
  useCases: z.array(z.string().min(2)).min(2).max(6),
});

export const projectSchema = z.object({
  id: z.string().regex(kebab),
  order: z.number().int().positive(),
  title: z.string().min(3).max(60),
  type: z.enum(['web-app', 'bot', 'mobile-app']),
  summary: z.string().min(10).max(260),
  role: z.string().min(3),
  result: z.string().min(10).max(200).optional(),
  // Case-study fields: the business problem, what was built, and the outcome.
  problem: z.string().min(10).max(200).optional(),
  solution: z.string().min(10).max(200).optional(),
  impact: z.string().min(3).max(60).optional(),
  techStack: z.array(z.string().min(2).max(30)).max(10).optional(),
  // Optional animated/high-res preview (gif, mp4, webm or image) rendered on the card.
  mediaPreview: z.string().startsWith('/').optional(),
  // Short descriptive alt text for `image` (describes the screenshot, not the title).
  imageAlt: z.string().min(5).max(150).optional(),
  // Consumer/hobby projects are shown on /portfolio only, not on the homepage.
  consumer: z.boolean().default(false),
  featured: z.boolean().default(false),
  image: z.string().startsWith('/images/').optional(),
  gallery: z.array(z.string().startsWith('/images/')).max(8).optional(),
  url: z.url().optional(),
  tags: z.array(z.string()).max(6).optional(),
});

export const articleSchema = z.object({
  slug: z.string().regex(kebab),
  title: z.string().min(5).max(100),
  date: z.string().regex(isoDate),
  updated: z.string().regex(isoDate).optional(),
  summary: z.string().min(50).max(200),
  cover: z.string().startsWith('/images/').optional(),
  translationKey: z.string().regex(kebab).optional(),
  draft: z.boolean().default(false),
});

export const courseSchema = z.object({
  slug: z.string().regex(kebab),
  title: z.string().min(5).max(120),
  summary: z.string().min(20).max(260),
  date: z.string().regex(isoDate),
  duration: z.string().min(2).max(40), // approximate, human-readable (e.g. "60 minutes")
  order: z.number().int().positive(),
  translationKey: z.string().regex(kebab),
  draft: z.boolean().default(false),
  // Downloadable files; each url MUST point to an existing file under /public.
  files: z
    .array(
      z.object({
        label: z.string().min(2).max(60),
        url: z.string().startsWith('/courses/').regex(/\.(pdf|pptx?|zip)$/i),
        format: z.enum(['pdf', 'ppt', 'pptx', 'zip']),
      }),
    )
    .max(6)
    .default([]),
});

export const pageSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(50).max(160),
});

export const homePageSchema = pageSchema.extend({
  hero: z.object({
    eyebrow: z.string().min(2),
    headline: z.string().min(5),
    subheadline: z.string().min(10),
    primaryCta: z.string().min(2),
    secondaryCta: z.string().min(2),
  }),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name_short').max(80, 'name_long'),
  email: z.string().trim().max(254, 'email_invalid').pipe(z.email('email_invalid')),
  message: z.string().trim().min(10, 'message_short').max(2000, 'message_long'),
  locale: z.enum(['fa', 'en']),
  website: z.string().max(0).optional().default(''),
  startedAt: z.coerce.number().int().optional(),
});

export type ServiceMeta = z.infer<typeof serviceSchema>;
export type ProjectMeta = z.infer<typeof projectSchema>;
export type ArticleMeta = z.infer<typeof articleSchema>;
export type CourseMeta = z.infer<typeof courseSchema>;
export type PageMeta = z.infer<typeof pageSchema>;
export type HomePageMeta = z.infer<typeof homePageSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
