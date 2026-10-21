# Implementation Plan: Professional Bilingual Portfolio Website (maghrebi.tech)

**Branch**: `001-portfolio-website` (no git repository initialised yet; this is the spec folder name only) | **Date**: 2026-10-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-portfolio-website/spec.md`

## Summary

A statically generated, bilingual (fa default / en) portfolio site built with Next.js 15 App Router,
TypeScript (strict) and Tailwind CSS. Locale-prefixed routes (`/fa`, `/en`) are handled by
`next-intl` with `/` redirecting to `/fa`. UI strings live in per-locale message files; long-form
content (services, projects, articles, page copy) lives in per-locale MDX/frontmatter files under
`content/<locale>/`. The only dynamic piece is the contact form (Server Action + validation + spam
protection; v1 logs only, no real email). Delivery target: a Node `standalone` Docker image behind nginx (also
Vercel-compatible). No code is written in this phase.

## Technical Context

**Language/Version**: TypeScript 5.x (`strict`), Node.js 22 LTS (runtime and CI), React 19

**Primary Dependencies**: `next@15.5.x` (pinned to the 15 line, per constitution), `react@19`, `tailwindcss@4` + `@tailwindcss/postcss` + `@tailwindcss/typography`, `next-intl@4`, `next-mdx-remote@6` (RSC), `gray-matter`, `zod`, `vazirmatn` (font files), `next/font/google` for Inter

**Storage**: Files only. Content in `content/`, resume PDFs in `public/resume/`. Contact messages are not persisted or emailed in v1; only an anonymised log line is written.

**Testing**: Vitest (unit: schemas, content loaders, i18n key parity), Playwright (e2e: locale redirect, RTL/LTR, language switch, contact form, PDF download), Lighthouse CI (budget gate)

**Target Platform**: Linux server (Docker, nginx reverse proxy with TLS) at `maghrebi.tech`; modern evergreen browsers, mobile-first

**Project Type**: Web application (single Next.js app, no separate backend)

**Performance Goals**: Lighthouse >= 90 in all four categories; LCP < 2.5 s on mobile 4G; static HTML for all pages except the contact submission

**Constraints**: Server Components by default; client JS only for theme-free interactions (mobile menu, form state); no CSS-in-JS; no hard-coded colours or strings in components; WCAG AA contrast

**Scale/Scope**: 7 page types x 2 locales (~16-20 static routes at launch), 4 services, 3 projects, 1+ starter article per locale

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Plan compliance | Status |
|---|-----------|-----------------|--------|
| I | Next.js 15 App Router + TS + Tailwind | `next@15.5.x`, `app/` only, `strict`, `noUncheckedIndexedAccess`, ESLint bans `any` | Pass |
| II | Fully bilingual, RTL | `[locale]` segment, `dir`/`lang` set on `<html>` per locale, logical Tailwind utilities, lint rule against `left/right/ml/mr/pl/pr/text-left/text-right` | Pass |
| III | Persian default | Middleware redirect `/` -> `/fa`, `localePrefix: "always"`, switcher keeps path, `hreflang` + `x-default` -> `/fa` | Pass |
| IV | Dark, Navy + Cyan tokens | Tokens in `@theme` (Tailwind v4) in `styles/tokens.css`; dark is the only theme at launch | Pass |
| V | Vazirmatn / Inter via next/font | Vazirmatn via `next/font/local` (woff2 from the `vazirmatn` package), Inter via `next/font/google`; per-locale CSS variable | Pass |
| VI | Reusable components, clean structure | `components/{ui,layout,sections,content}`; locale/direction agnostic | Pass |
| VII | Performance and SEO | SSG with `generateStaticParams`, `generateMetadata`, sitemap/robots, `next/image` | Pass |
| Std | Content separated per language | `messages/<locale>.json` + `content/<locale>/**`; parity checked by a test | Pass |
| Std | Quality gates (type-check, lint, build, both locales) | CI pipeline in Phase "Delivery" below | Pass |

**Post-design re-check (after Phase 1)**: all rows still pass. No violations, so Complexity
Tracking is empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-website/
├── plan.md              # This file
├── research.md          # Phase 0 decisions, licenses, alternatives
├── data-model.md        # Content and form entities, validation rules
├── quickstart.md        # Setup + end-to-end validation scenarios
├── contracts/
│   ├── routes.md        # Public URL contract, redirects, SEO outputs
│   ├── content-schema.md# Content file formats and per-locale rules
│   └── contact-action.md# Contact form submit contract
└── tasks.md             # Created later by /speckit-tasks
```

### Source Code (repository root)

```text
maghrebi-tech/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx            # <html lang dir>, fonts, header/footer, NextIntlClientProvider
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── blog/page.tsx         # list
│   │   ├── blog/[slug]/page.tsx  # article
│   │   ├── contact/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── not-found.tsx         # localized 404
│   │   └── loading.tsx / error.tsx
│   ├── layout.tsx                # minimal root (passthrough)
│   ├── not-found.tsx             # fallback for unknown locale -> fa 404
│   ├── sitemap.ts                # both locales + alternates
│   ├── robots.ts
│   └── globals.css               # imports tailwind + styles/tokens.css
├── components/
│   ├── ui/                       # Button, Card, Badge, Container, Section, Input, Textarea, Prose
│   ├── layout/                   # Header, Nav, MobileMenu, LanguageSwitcher, Footer, SocialLinks
│   ├── sections/                 # Hero, ServicesHighlight, ProjectsHighlight, CtaBanner, ResumeSummary
│   ├── content/                  # ServiceCard, ProjectCard, ArticleCard, MdxRenderer
│   └── forms/                    # ContactForm (client), Turnstile wrapper
├── content/
│   ├── fa/
│   │   ├── pages/{home,about,resume}.mdx
│   │   ├── services/*.mdx
│   │   ├── projects/*.mdx
│   │   └── blog/*.mdx
│   └── en/                       # identical tree
├── messages/
│   ├── fa.json                   # UI strings: nav, buttons, form labels/errors, footer, metadata defaults
│   └── en.json
├── i18n/
│   ├── routing.ts                # locales ['fa','en'], defaultLocale 'fa', localePrefix 'always'
│   ├── request.ts                # getRequestConfig: loads messages
│   └── navigation.ts             # typed Link, redirect, usePathname
├── lib/
│   ├── content.ts                # server-only loaders (fs + gray-matter), cache(), parity helpers
│   ├── schemas.ts                # zod: frontmatter + contact form
│   ├── seo.ts                    # buildMetadata(locale, path, ...), JSON-LD helpers
│   ├── site.ts                   # site constants (name, URL, email, Telegram, socials; no phone)
│   └── notify.ts                 # Notifier interface; v1 LogNotifier, later EmailNotifier
├── actions/
│   └── contact.ts                # "use server" submit action
├── styles/
│   └── tokens.css                # @theme: navy/cyan palette, radii, spacing
├── public/
│   ├── resume/amin-maghrebi-resume-fa.pdf
│   ├── resume/amin-maghrebi-resume-en.pdf
│   ├── images/                   # projects/, og/, avatar
│   └── favicon + manifest
├── middleware.ts                 # next-intl middleware; matcher excludes api, _next, files
├── tests/
│   ├── unit/                     # schemas, content loaders, message-key parity
│   └── e2e/                      # Playwright specs per user story
├── Dockerfile                    # multi-stage, output: standalone, non-root
├── docker-compose.yml            # app only; nginx is on host
├── deploy/nginx.maghrebi.tech.conf
├── next.config.ts                # output: 'standalone', security headers, image config, next-intl plugin
├── eslint.config.mjs, tsconfig.json, postcss.config.mjs
├── .env.example                  # SITE_URL, TURNSTILE_* (optional); email vars reserved for later
└── .github/workflows/ci.yml      # type-check, lint, unit, build, e2e, lighthouse
```

**Structure Decision**: a single Next.js app (no separate backend) because the only server logic is
one form submission, handled by a Server Action. Content is file-based and git-versioned, giving
per-language separation with zero infrastructure.

## Design Decisions

### 1. i18n and routing
- `next-intl` with `defineRouting({ locales: ['fa','en'], defaultLocale: 'fa', localePrefix: 'always', localeDetection: false })`. Detection is **off** so the Accept-Language header never overrides the Persian default (spec edge case).
- `middleware.ts` redirects `/` -> `/fa` (307 by default; configured as 308 in production) and handles locale-less paths such as `/about` -> `/fa/about`.
- `app/[locale]/layout.tsx` validates the locale (`hasLocale`, else `notFound()`), calls `setRequestLocale` for static rendering, and renders `<html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>`.
- `generateStaticParams` returns both locales for every page; blog slugs are generated per locale.
- Language switcher uses the typed `Link` from `i18n/navigation.ts` with `locale` override, preserving pathname and blog slug when an equivalent exists; if an article exists only in one language, the switcher links to that language's blog list (avoids dead ends, FR-002 / SC-006).
- `hreflang` alternates (`fa`, `en`, `x-default` = `/fa`) emitted from `buildMetadata`.

### 2. Content management per language
- **UI strings**: `messages/<locale>.json` (namespaced: `nav`, `home`, `form`, `footer`, `seo`, `errors`). A unit test fails the build if the two files have different key sets.
- **Rich content**: MDX with typed frontmatter under `content/<locale>/...`, loaded by server-only `lib/content.ts` using `fs` + `gray-matter`, validated by zod at build time (invalid content fails the build). Rendered with `next-mdx-remote/rsc`.
- Cross-language pairing uses a shared `id` frontmatter field (projects/services) and optional `translationKey` (articles).
- Adding a project/article = adding one MDX file per language; no component edits (spec FR-004, Entities).
- Details in [contracts/content-schema.md](./contracts/content-schema.md).

### 3. Components
- Layering: `ui` (primitives, no domain knowledge) -> `content` (cards for domain entities) -> `sections` (page blocks) -> pages. Props are plain, typed; no component reads `locale` directly except `LanguageSwitcher`.
- Server Components by default. Client components limited to `MobileMenu`, `ContactForm`, `Turnstile` wrapper.
- Direction-agnostic: logical utilities only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`); directional icons use `rtl:-scale-x-100`.

### 4. Colour system (Navy + Cyan, dark default)
Defined once in `styles/tokens.css` via Tailwind v4 `@theme`; components use semantic names only.

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#0A192F` | page background (navy) |
| `--color-surface` | `#0F2342` | cards, header |
| `--color-surface-2` | `#16305A` | hover, inputs |
| `--color-border` | `#1F3A66` | dividers |
| `--color-fg` | `#E6F1FF` | primary text (contrast on bg ~15:1) |
| `--color-fg-muted` | `#9DB2CE` | secondary text (~7.5:1) |
| `--color-accent` | `#22D3EE` | cyan accent, links, CTAs (~11:1 on bg) |
| `--color-accent-strong` | `#06B6D4` | hover/pressed |
| `--color-on-accent` | `#041421` | text on cyan buttons (~10:1) |
| `--color-danger` / `--color-success` | `#F87171` / `#34D399` | form states |

`color-scheme: dark` is set on `html`. A light theme is explicitly out of scope; tokens make adding
one later a non-breaking change (constitution IV).

### 5. Typography
- Persian: Vazirmatn (variable woff2 from the `vazirmatn` npm package, SIL OFL) loaded with `next/font/local`, `display: 'swap'`, preload only for `fa` routes.
- English: Inter via `next/font/google` (self-hosted by Next at build), `display: 'swap'`, `latin` subset.
- Both expose CSS variables (`--font-vazir`, `--font-inter`); `html[lang="fa"]` maps `font-sans` to Vazirmatn with Inter as latin fallback for embedded English words, `html[lang="en"]` the reverse. Persian digits are used in fa copy by writing content with Persian numerals; no runtime conversion.

### 6. Contact form
- Server Action `actions/contact.ts`; progressive enhancement via `useActionState`.
- Validation: zod schema shared between client hints and server truth; localized error codes mapped to `messages`.
- Spam: hidden honeypot field + minimum-time check + Cloudflare Turnstile (optional, only when keys are present) + simple per-IP rate limit (in-memory LRU, 5/hour; acceptable for a single-instance deploy).
- Delivery (v1 decision, no email account yet): the action calls a `Notifier` interface (`lib/notify.ts`); v1 uses `LogNotifier`, which writes an anonymised line (timestamp, locale, outcome, message length; never name/email/body) and returns success. A later `EmailNotifier` (Resend or SMTP) swaps in without touching the form. The page shows direct contact: `amin.mb21@gmail.com` and Telegram `@aminmaghrebi`. Contract in [contracts/contact-action.md](./contracts/contact-action.md).

### 7. SEO and performance
- `generateMetadata` per page from `buildMetadata()`: localized title/description, canonical, `alternates.languages`, Open Graph/Twitter, per-locale OG image.
- JSON-LD: `Person` (home/about), `BlogPosting` (articles), `WebSite`.
- `sitemap.ts` lists every route in both locales with alternates; `robots.ts` references it.
- `next/image` with explicit sizes; project images in AVIF/WebP; placeholders are inline SVG.
- Fully static output (SSG); blog and content are build-time. Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) in `next.config.ts`.
- Lighthouse CI asserts >= 0.9 on home, services, blog article in both locales.

### 8. Resume
- `/[locale]/resume` renders `content/<locale>/pages/resume.mdx` summary and links to `/resume/amin-maghrebi-resume-<locale>.pdf` (static file, `Content-Disposition` via `download` attribute). The button renders only if the PDF exists at build time (spec edge case). The Persian PDF is not available yet (see spec Assumptions), so the fa download button stays hidden until a vetted file is added.

### 9. Placeholders
- Contact facts (owner-supplied): email `amin.mb21@gmail.com`, Telegram `@aminmaghrebi`; **no phone number** is published. Social URLs must be confirmed by the owner before launch (LinkedIn/GitHub/X handles differ from his name). Project images use inline SVG placeholders until screenshots exist.
- `lib/site.ts` holds `socials: telegram 'https://t.me/aminmaghrebi', linkedin 'https://www.linkedin.com/in/nodari-bitsadze', github 'https://github.com/pelakee13', x 'https://x.com/pelakee13'` and contact fields. `SocialLinks` renders only entries with a non-empty URL; the footer renders a neutral "coming soon" slot only in development.

### 10. Delivery
- `output: 'standalone'`; multi-stage Dockerfile (deps -> build -> runner, non-root, `node server.js`), `docker-compose.yml` exposing `127.0.0.1:3000`; nginx terminates TLS (Let's Encrypt) and proxies to it with long-cache headers for `/_next/static`.
- CI (`.github/workflows/ci.yml`): `pnpm install --frozen-lockfile` -> `tsc --noEmit` -> `eslint` -> `vitest` -> `next build` -> Playwright (fa + en) -> Lighthouse CI.
- Package manager: pnpm (lockfile committed).
- Vercel remains a drop-in alternative (no Vercel-specific APIs used).

## Complexity Tracking

No constitution violations; table intentionally empty.
