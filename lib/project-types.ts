/**
 * Project-type values for the contact form. Mirrors `contactSchema.projectType`
 * in lib/schemas.ts — the schema is the source of truth; keep the two in sync.
 * Lives here (not in the schema file) so the contact page and the client-side
 * form can share the list without importing a server-action module.
 */
export const PROJECT_TYPES = [
  'website-design',
  'automation',
  'telegram-bot',
  'support',
  'training',
  'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export function isProjectType(v: unknown): v is ProjectType {
  return typeof v === 'string' && (PROJECT_TYPES as readonly string[]).includes(v);
}

/**
 * Maps a service id (content/{locale}/services/*.mdx) to the project-type value
 * the contact form understands. Service ids and project-type values differ
 * (e.g. `telegram-bots` -> `telegram-bot`), so the mapping is explicit.
 * Unknown ids map to nothing: the visitor simply gets no preselected topic.
 */
export const SERVICE_TO_PROJECT_TYPE: Record<string, ProjectType> = {
  'website-design': 'website-design',
  'smart-business-systems': 'automation',
  'telegram-bots': 'telegram-bot',
  'support-maintenance': 'support',
  'ai-training': 'training',
};

export function projectTypeFromService(service: unknown): ProjectType | undefined {
  if (typeof service !== 'string') return undefined;
  return SERVICE_TO_PROJECT_TYPE[service];
}
