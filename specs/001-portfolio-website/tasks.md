---

description: "Task list for the maghrebi.tech bilingual portfolio website"
---

# Tasks: Professional Bilingual Portfolio Website (maghrebi.tech)

**Input**: Design documents from `/specs/001-portfolio-website/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included. The constitution mandates type-check, lint, build and both-locale verification, and the plan specifies Vitest and Playwright. Write each story's tests first and confirm they fail.

**Organization**: Grouped by user story so each can be implemented and tested independently.

## Format: `- [ ] T### [P?] [US?] Description with file path`

- **[P]**: parallelizable (different files, no dependency on unfinished tasks)
- **[USn]**: user story label (story phases only)

## Owner decisions applied

- Contact form: validation and spam checks run, success is shown, only an anonymised log line is written. No real email is sent (no email provider account yet).
- Contact info: email `amin.mb21@gmail.com`, Telegram `@aminmaghrebi`. No phone. Socials: LinkedIn, GitHub, X.
- Project images: inline SVG placeholders.
- Persian resume PDF: not yet available (see the US6 export task); the fa download button stays hidden until it is supplied.

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Initialize Next.js 15.5.x + React 19 + TypeScript strict project with pnpm; set `engines` Node 22 and add .nvmrc in package.json
- [X] T002 [P] Configure strict `tsconfig.json` (strict, noUncheckedIndexedAccess) and ESLint (ban `any`, ban physical Tailwind classes `ml-/mr-/pl-/pr-/left-/right-/text-left/text-right`) in tsconfig.json and eslint.config.mjs
- [X] T003 [P] Install and configure Tailwind CSS 4 with `@tailwindcss/postcss` and `@tailwindcss/typography` in postcss.config.mjs and app/globals.css
- [X] T004 Install runtime deps `next-intl`, `next-mdx-remote`, `gray-matter`, `zod`, `vazirmatn` and dev deps `vitest`, `@playwright/test`; verify node_modules/vazirmatn/LICENSE (OFL) and record it in specs/001-portfolio-website/research.md
- [X] T005 [P] Create folder skeleton per plan (components/{ui,layout,sections,content,forms}, content/{fa,en}, messages, i18n, lib, actions, styles, tests/{unit,e2e}, public/images) in the repository root
- [X] T006 [P] Add `.env.example` (SITE_URL, optional TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY, reserved email vars) and scripts `typecheck`, `lint`, `test`, `test:e2e`, `build` in .env.example and package.json
- [X] T007 [P] Initialize git repository and add .gitignore (node_modules, .next, .env*, *.tmp.py) in .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**CRITICAL**: no user story work starts until this phase is complete.

- [X] T008 Define design tokens (navy `#0A192F`, surface `#0F2342`, surface-2 `#16305A`, border `#1F3A66`, fg `#E6F1FF`, fg-muted `#9DB2CE`, accent cyan `#22D3EE`, accent-strong `#06B6D4`, on-accent `#041421`, danger `#F87171`, success `#34D399`) with `@theme` and `color-scheme: dark` in styles/tokens.css
- [X] T009 Create i18n routing (`locales ['fa','en']`, `defaultLocale 'fa'`, `localePrefix 'always'`, `localeDetection false`) in i18n/routing.ts
- [X] T010 Create request config loading messages per locale in i18n/request.ts and typed navigation helpers in i18n/navigation.ts
- [X] T011 Create middleware redirecting `/` to `/fa` and unprefixed paths to `/fa/...`, matcher excluding `_next`, `api` and files, in middleware.ts
- [X] T012 Create root layout passthrough in app/layout.tsx and locale layout setting `<html lang dir>` (fa=rtl, en=ltr) with `hasLocale` validation, `setRequestLocale` and NextIntlClientProvider in app/[locale]/layout.tsx
- [X] T013 Configure fonts: Vazirmatn via `next/font/local` (woff2 from the vazirmatn package) and Inter via `next/font/google`, `display: swap`, per-locale CSS variables, in app/[locale]/layout.tsx and styles/tokens.css
- [X] T014 [P] Create site constants (name, SITE_URL, email `amin.mb21@gmail.com`, Telegram `@aminmaghrebi`, socials LinkedIn/GitHub/X, no phone) in lib/site.ts
- [X] T015 Create zod frontmatter schemas for PageContent, Service, Project, Article quoting data-model constraints (title 3-60, summary <=160 services / <=200 projects, enums, unique `order`, article slug ASCII kebab-case) in lib/schemas.ts
- [X] T016 Implement server-only content loaders (fs + gray-matter + zod; drafts and future-dated articles excluded; build fails if a Service or Project `id` exists in only one locale) in lib/content.ts
- [X] T017 [P] Implement SEO helper `buildMetadata` (title, description, canonical, hreflang fa/en/x-default, Open Graph) and JSON-LD helpers in lib/seo.ts
- [X] T018 [P] Build UI primitives Container, Section, Button, Card, Badge, Prose in components/ui/
- [X] T019 [P] Build MdxRenderer with whitelisted components, bidi-safe Latin term wrapping and `rel="noopener noreferrer"` external links in components/content/MdxRenderer.tsx
- [X] T020 Build Header, Nav, MobileMenu (client), LanguageSwitcher (keeps path; article without counterpart links to blog list), Footer and SocialLinks (renders only non-empty URLs) in components/layout/
- [X] T021 [P] Create localized not-found pages with links to Home and Contact in app/[locale]/not-found.tsx and app/not-found.tsx
- [X] T022 [P] Create sitemap (both locales, articles, alternates) and robots in app/sitemap.ts and app/robots.ts
- [X] T023 Create UI message files with identical keys (nav, home, form labels and errors, footer, seo, errors) in messages/fa.json and messages/en.json
- [X] T024 [P] Write unit test for key parity between messages/fa.json and messages/en.json in tests/unit/messages-parity.test.ts
- [X] T025 [P] Write unit tests for frontmatter schemas and locale id-parity loader in tests/unit/content.test.ts

**Checkpoint**: Foundation ready; user stories can proceed.

---

## Phase 3: User Story 1 - Understand who Amin is and what he offers (Priority: P1) MVP

**Goal**: Home page with hero, four services and featured projects, and a CTA to Contact.

**Independent Test**: Open `/`, land on `/fa`, see hero, services and projects; the CTA reaches Contact.

- [X] T026 [P] [US1] Write Playwright test: `/` redirects to `/fa`, hero + 4 services + featured projects visible, CTA reaches `/fa/contact`, English-language browser still lands on `/fa` in tests/e2e/home.spec.ts
- [X] T027 [P] [US1] Write Persian and English home copy (hero headline, subheadline, CTAs; professional, concise, no invented stats or clients) in content/fa/pages/home.mdx and content/en/pages/home.mdx
- [X] T028 [P] [US1] Write four service files per locale (`smart-business-systems`, `telegram-bots`, `support-maintenance`, `ai-training`; icons system/bot/support/training) in content/fa/services/ and content/en/services/
- [X] T029 [P] [US1] Write three project files per locale (`heli-beauty-studio` web-app, `telegram-trader-bot` bot, `running-app` mobile-app; all featured) in content/fa/projects/ and content/en/projects/
- [X] T030 [P] [US1] Create inline SVG placeholder for project images in components/content/ProjectImagePlaceholder.tsx
- [X] T031 [P] [US1] Build Hero, ServicesHighlight, ProjectsHighlight and CtaBanner sections in components/sections/
- [X] T032 [P] [US1] Build ServiceCard and ProjectCard in components/content/ServiceCard.tsx and components/content/ProjectCard.tsx
- [X] T033 [US1] Compose the Home page with `generateStaticParams`, `generateMetadata` and Person JSON-LD in app/[locale]/page.tsx

---

## Phase 4: User Story 2 - Contact Amin as a prospective client (Priority: P1)

**Goal**: Validated contact form with success confirmation (log only) and direct contact details.

**Independent Test**: Submit valid and invalid data; check messages and the anonymised server log.

- [X] T034 [P] [US2] Write Playwright test: valid submit shows localized success; invalid email or short message shows field errors with input preserved; filled honeypot gives a generic error in tests/e2e/contact.spec.ts
- [X] T035 [P] [US2] Write unit tests for the contact schema (name 2-80 trimmed, email valid <=254, message 10-2000 trimmed, locale fa|en, honeypot empty, startedAt elapsed >=3 s) in tests/unit/contact-schema.test.ts
- [X] T036 [P] [US2] Add contact zod schema in lib/schemas.ts and a `Notifier` interface with `LogNotifier` (logs timestamp, locale, outcome, message length only; never name, email or body) in lib/notify.ts
- [X] T037 [US2] Implement `submitContact` Server Action (validation, honeypot, min-time, in-memory rate limit 5/hour/IP, optional Turnstile, notifier call, localized error codes, values preserved) per contracts/contact-action.md in actions/contact.ts
- [X] T038 [P] [US2] Build ContactForm client component with `useActionState`, field errors and success state, plus optional Turnstile wrapper, in components/forms/ContactForm.tsx and components/forms/Turnstile.tsx
- [X] T039 [US2] Create the Contact page with the form and direct contact details (email, Telegram, no phone) in app/[locale]/contact/page.tsx
- [X] T040 [US2] Add contact labels, errors, confirmation and direct-contact text to messages/fa.json and messages/en.json

---

## Phase 5: User Story 3 - Switch between Persian and English (Priority: P1)

**Goal**: Correct RTL/LTR, fonts, switcher and SEO alternates on every page.

**Independent Test**: Switch language on each page; direction, font and equivalent page are correct.

- [X] T041 [P] [US3] Write Playwright test: fa pages are `dir=rtl` with Vazirmatn; switching on `/fa/services` opens `/en/services` with `dir=ltr` and Inter and back; `/de/about` and `/fa/nope` show localized 404 in tests/e2e/i18n.spec.ts
- [X] T042 [P] [US3] Write Playwright check of canonical, hreflang fa/en and x-default -> `/fa` on every page in tests/e2e/seo.spec.ts
- [X] T043 [US3] Audit components for physical-direction classes and directional icons (`rtl:-scale-x-100`) and fix findings in components/ and app/

---

## Phase 6: User Story 4 - Explore services and portfolio (Priority: P2)

**Goal**: Full Services and Portfolio pages.

**Independent Test**: Services lists 4 items, Portfolio lists 3 projects, each with a path to contact.

- [X] T044 [P] [US4] Write Playwright test: Services shows 4 services with CTA; Portfolio shows 3 projects with name, type, summary and role in both locales in tests/e2e/services-portfolio.spec.ts
- [X] T045 [P] [US4] Build the Services page with details, use cases and contact CTA in app/[locale]/services/page.tsx
- [X] T046 [P] [US4] Build the Portfolio page with ProjectCard grid and optional external link in a new tab in app/[locale]/portfolio/page.tsx

---

## Phase 7: User Story 5 - Read articles and tutorials (Priority: P2)

**Goal**: Blog list and article pages with empty state.

**Independent Test**: List order, article rendering and empty state work in both locales.

- [X] T047 [P] [US5] Write Playwright test: blog list newest first, article shows title/date/body, empty state when no articles in tests/e2e/blog.spec.ts
- [X] T048 [P] [US5] Write one starter article per locale (`draft: false`, ASCII slug, `translationKey`) in content/fa/blog/ and content/en/blog/
- [X] T049 [P] [US5] Build ArticleCard and the Blog list page with empty state in components/content/ArticleCard.tsx and app/[locale]/blog/page.tsx
- [X] T050 [US5] Build the Article page with `generateStaticParams` per locale, BlogPosting JSON-LD and reading time in app/[locale]/blog/[slug]/page.tsx

---

## Phase 8: User Story 6 - Learn about Amin and download his resume (Priority: P2)

**Goal**: About and Resume pages with PDF download.

**Independent Test**: About renders; the English PDF downloads; the fa button is hidden while no PDF exists.

- [X] T051 [P] [US6] Write Playwright test: About renders; `/en/resume` download delivers the PDF; `/fa/resume` hides the button when the PDF is absent in tests/e2e/resume.spec.ts
- [X] T052 [P] [US6] Write About copy in both locales (background, expertise areas, working approach) in content/fa/pages/about.mdx and content/en/pages/about.mdx
- [X] T053 [P] [US6] Write resume summary copy in both locales from the owner's English resume, excluding home address, phone, father's name and birth date, in content/fa/pages/resume.mdx and content/en/pages/resume.mdx
- [ ] T054 [US6] Export Downloads/Amin_Maghrebi_Resume_EN.docx to public/resume/amin-maghrebi-resume-en.pdf after checking it contains no private details; the Persian PDF (public/resume/amin-maghrebi-resume-fa.pdf) is pending from the owner because the local Persian PDFs are an accounting-job resume with private data
- [X] T055 [US6] Build the About and Resume pages; the download button renders only if the locale PDF exists at build time, in app/[locale]/about/page.tsx and app/[locale]/resume/page.tsx

---

## Final Phase: Polish & Cross-Cutting Concerns

- [X] T056 [P] Add security headers (CSP incl. Turnstile origin, HSTS, nosniff, Referrer-Policy, Permissions-Policy), `output: 'standalone'` and the next-intl plugin in next.config.ts
- [ ] T057 [P] Create a multi-stage non-root Dockerfile (Node 22) and docker-compose.yml bound to 127.0.0.1:3000 in Dockerfile and docker-compose.yml
- [ ] T058 [P] Create nginx config for maghrebi.tech with TLS proxy and long cache for `/_next/static` in deploy/nginx.maghrebi.tech.conf
- [ ] T059 [P] Create CI workflow: typecheck, lint, unit, build, Playwright (fa+en, mobile+desktop), Lighthouse CI >= 90 in .github/workflows/ci.yml
- [X] T060 [P] Add favicon, web manifest and per-locale Open Graph images in public/ and app/
- [ ] T061 Accessibility pass (keyboard navigation, focus states, AA contrast, alt text) across components/ and app/
- [X] T062 Run Lighthouse and fix regressions to reach >= 90 in all four categories on home, services and an article in both locales in specs/001-portfolio-website/quickstart.md
- [X] T063 Run all quickstart.md scenarios and record the results in specs/001-portfolio-website/quickstart.md

---

## Dependencies & Execution Order

- Setup (Phase 1) -> Foundational (Phase 2) -> user stories -> Polish.
- US1, US2, US3 (P1) can run in parallel after Phase 2; the US3 audit task runs after the US1 and US2 components exist.
- US4 reuses ServiceCard and ProjectCard from US1. US5 and US6 are independent of US2-US4.
- Within a story: tests first (must fail), then content, components, pages.

## Parallel Examples

```text
US1: service, project and home copy + placeholder image + sections + cards in parallel, then compose app/[locale]/page.tsx
US2: schema/notifier and ContactForm in parallel, then actions/contact.ts and the page
```

## Implementation Strategy

1. Setup + Foundational.
2. MVP = US1 (home); validate with its Playwright test.
3. Add US2 (contact) and US3 (language/RTL), then US4-US6.
4. Polish: security headers, Docker/nginx, CI, Lighthouse, quickstart run.

## Deferred (outside this task list)

- Real email delivery: add an `EmailNotifier` (Resend or SMTP) behind lib/notify.ts once an account and sending domain exist.
- Persian resume PDF and project screenshots when supplied.
- Owner to confirm the LinkedIn/GitHub/X URLs are his.
