# Data Model: maghrebi.tech Portfolio

All entities are file-based content validated by zod at build time, except `ContactMessage`, which is
transient (emailed, not stored). Every localized entity exists once per locale (`fa`, `en`).

## Locale
- Values: `fa` (default), `en`. Direction: `fa` -> `rtl`, `en` -> `ltr`.

## PageContent
| Field | Type | Rules |
|-------|------|-------|
| `slug` | `home` \| `about` \| `resume` | one file per slug per locale |
| `title` | string | 1-70 chars (SEO title) |
| `description` | string | 50-160 chars |
| `body` | MDX | required |
Location: `content/<locale>/pages/<slug>.mdx`. Home also carries `hero` frontmatter: `headline`, `subheadline`, `primaryCta`, `secondaryCta`.

## Service
| Field | Type | Rules |
|-------|------|-------|
| `id` | string | shared across locales, kebab-case |
| `order` | integer | unique per locale, ascending display |
| `title` | string | 3-60 chars |
| `summary` | string | <= 160 chars (card text) |
| `icon` | enum | `system` \| `bot` \| `support` \| `training` |
| `useCases` | string[] | 2-6 items |
| `body` | MDX | detail text |
Launch set: `smart-business-systems`, `telegram-bots`, `support-maintenance`, `ai-training`.

## Project
| Field | Type | Rules |
|-------|------|-------|
| `id` | string | shared across locales |
| `title` | string | 3-60 chars |
| `type` | enum | `web-app` \| `bot` \| `mobile-app` |
| `summary` | string | <= 260 chars |
| `role` | string | Amin's role/outcome |
| `featured` | boolean | featured items appear on Home |
| `order` | integer | unique per locale |
| `image` | path? | under `public/images/projects/`, optional (placeholder when absent) |
| `gallery` | path[]? | up to 8 images under `/images/`, shown as a thumbnail strip |
| `url` | URL? | optional external link, opens in new tab with `rel="noopener noreferrer"` |
| `tags` | string[]? | <= 6 |
| `body` | MDX | detail |
Launch set: `heli-beauty-studio`, `telegram-trader-bot`, `running-app`.

## Article
| Field | Type | Rules |
|-------|------|-------|
| `slug` | string | unique per locale, kebab-case, URL-safe (ASCII) |
| `title` | string | 5-100 chars |
| `date` | ISO date | required; future dates are not published |
| `updated` | ISO date? | |
| `summary` | string | 50-200 chars |
| `cover` | path? | optional |
| `translationKey` | string? | links the fa and en versions; used by the language switcher |
| `draft` | boolean | `true` excludes from build output and sitemap |
| `body` | MDX | required |
Derived: `readingTime` (minutes, computed). Sorted by `date` descending.

## Resume
| Field | Type | Rules |
|-------|------|-------|
| `summary` | MDX in `resume.mdx` | experience, skills, education |
| `pdf` | file | `public/resume/amin-maghrebi-resume-<locale>.pdf`; download button renders only if the file exists (fa file absent in v1) |

## SocialLink (in `lib/site.ts`)
| Field | Type | Rules |
|-------|------|-------|
| `platform` | `telegram` \| `instagram` \| `github` \| `linkedin` \| `x` | |
| `url` | string | empty string = not rendered. Launch values: telegram, linkedin, github, x (see plan) |

## ContactMessage (transient)
| Field | Type | Rules |
|-------|------|-------|
| `name` | string | trimmed, 2-80 chars |
| `email` | string | valid email, <= 254 chars |
| `message` | string | trimmed, 10-2000 chars |
| `locale` | Locale | taken from route, validated |
| `website` | string | honeypot, MUST be empty |
| `startedAt` | number | timestamp from form render; submissions faster than 3 s are rejected |
| `turnstileToken` | string? | required when Turnstile keys are configured |
V1 behaviour: `sent` means "logged by LogNotifier". State: `submitted` -> (`validated` -> `sent`) | `rejected(validation | spam | rate_limited)` | `failed(delivery)`. Nothing is persisted.

## Relationships and integrity rules
- Service, Project and PageContent are paired across locales by `id`/`slug`; the build fails if a Service or Project `id` exists in only one locale.
- Articles may exist in a single locale; the switcher then falls back to that locale's blog list.
- `messages/fa.json` and `messages/en.json` MUST have identical key sets (unit test).
- Content text never lives in components; components receive typed props only.
