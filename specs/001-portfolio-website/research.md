# Research: maghrebi.tech Portfolio

Versions and licenses below were read from the npm registry on 2026-10-21 (`npm view <pkg> version license`).
Licenses are the registry-declared SPDX identifiers; the package repositories were not re-audited line by line.

## Decisions

### D1. Framework version
- **Decision**: `next@15.5.x` (latest 15 patch at time of research: 15.5.28), React 19.
- **Rationale**: Constitution I mandates Next.js 15. Registry `latest` is 16.4.2; staying on the 15 line is a deliberate constraint.
- **Alternatives**: Next 16 (rejected: violates the constitution; upgrade needs a MAJOR/MINOR amendment), Astro (rejected: stack fixed by constitution).
- **License**: MIT.

### D2. Internationalisation
- **Decision**: `next-intl@4.14.9`, App Router mode, `[locale]` segment, `localePrefix: 'always'`, middleware redirect.
- **Rationale**: first-class App Router, static rendering support (`setRequestLocale`), typed navigation, supports `next@15`/`16` and React 19 per peerDependencies.
- **Alternatives**: hand-rolled `[locale]` + dictionaries (rejected: re-implements routing, alternates, link helpers; more bug surface), `next-i18next` (Pages Router oriented), `react-i18next` (no routing story).
- **License**: MIT.

### D3. Styling
- **Decision**: Tailwind CSS 4.3.x with `@tailwindcss/postcss`, design tokens in `@theme`; `@tailwindcss/typography` for article prose.
- **Rationale**: constitution I; v4 CSS-first config keeps tokens in one CSS file; logical-property utilities cover RTL.
- **Alternatives**: Tailwind 3 (rejected: older config model, no benefit), CSS Modules (rejected: constitution).
- **License**: MIT (both).

### D4. Content format and loading
- **Decision**: MDX/frontmatter files per locale, read at build time with `fs` + `gray-matter`, rendered through `next-mdx-remote@6` (`/rsc`), validated by zod.
- **Rationale**: git-versioned, no CMS cost, per-language separation by directory, content change needs no component change. `next-mdx-remote` works with Server Components and react >= 16.
- **Alternatives**: `@next/mdx` (MIT; its registry version tracks Next 16.4.2, so a 15-compatible release must be matched manually, and page-level MDX does not suit data-style content such as services/projects lists), headless CMS such as Sanity/Strapi (rejected: infrastructure and cost for a 3-project site; revisit when blog volume grows), Contentlayer (unmaintained).
- **License note**: `next-mdx-remote` is **MPL-2.0** (file-level weak copyleft). Used unmodified as a dependency, which imposes no obligations on this site's source. `gray-matter` is MIT.

### D5. Validation
- **Decision**: `zod@4` for frontmatter and the contact form.
- **Rationale**: single schema shared by content loader, server action and client hints; TypeScript inference.
- **Alternatives**: Valibot (smaller but less common), hand-written checks (rejected).
- **License**: MIT.

### D6. Contact delivery and spam control
- **Update (owner decision, v1)**: no Resend account exists, so v1 does not send email. A `Notifier` interface with a `LogNotifier` (anonymised log, success response) is used; Resend/SMTP is deferred and drops in later as `EmailNotifier`. The `resend` dependency is NOT installed in v1. The text below describes the later target.
- **Decision (later target)**: Server Action + `resend@6` email; honeypot + minimum-fill-time + Cloudflare Turnstile (`@marsidev/react-turnstile@1.6`) when configured + in-memory rate limit.
- **Rationale**: no database needed (spec assumption: messages are emailed, not stored); Turnstile is free and privacy-friendlier than reCAPTCHA; layered checks avoid blocking real users.
- **Alternatives**: SMTP via nodemailer (valid fallback if Resend is unavailable in the target region), Formspree/Web3Forms (third-party form hosting, less control over localisation), Telegram bot notification (good optional addition later because Amin builds bots; out of scope for v1).
- **Licenses**: Resend SDK MIT, react-turnstile MIT.
- **Open operational note**: Resend requires a verified sending domain (`maghrebi.tech` DNS records); the app must degrade to `delivery_failed` if the key is absent.

### D7. Fonts
- **Decision**: Vazirmatn from the `vazirmatn@33.0.3` package through `next/font/local`; Inter through `next/font/google`.
- **Rationale**: Vazirmatn is not in Google Fonts under a dependable subset for Persian in `next/font/google`; the npm package ships woff2 and variable fonts, self-hosted, no render-blocking external request.
- **Alternatives**: Google-hosted CSS (rejected: external request, privacy and reliability), Estedad/Shabnam (not requested).
- **License**: Vazirmatn is SIL Open Font License (registry value `OFL`; the font repository publishes OFL-1.1, to be confirmed in the package's LICENSE file when added). Inter is SIL OFL 1.1.

### D8. Testing and quality
- **Decision**: Vitest (registry latest 5.0.5) for unit, Playwright 1.64 for e2e, Lighthouse CI for budgets, ESLint + `tsc --noEmit`.
- **Rationale**: matches constitution quality gates (type-check, lint, build, both locales, mobile+desktop viewports).
- **Licenses**: Vitest MIT, Playwright Apache-2.0. Lighthouse CI license was not queried; verify at install time.

### D9. Hosting and deployment
- **Decision**: Docker `standalone` image on the existing Linux VPS behind nginx + Let's Encrypt; GitHub Actions for CI.
- **Rationale**: Amin already runs nginx on Ubuntu; contact form needs a Node runtime; no vendor lock-in; Vercel stays a drop-in alternative.
- **Alternatives**: Vercel (simplest; kept as fallback), static export + separate form endpoint (rejected: two deploy targets).

### D10. Package manager and runtime
- **Decision**: pnpm, Node 22 LTS in Docker/CI.
- **Rationale**: reproducible installs, disk efficiency. The development machine currently has Node v26.7.0 (non-LTS); CI/Docker pin 22 to avoid divergence, and `engines` in `package.json` documents it.

## Resolved unknowns

| Unknown | Resolution |
|---------|-----------|
| Hosting | Docker standalone behind nginx (D9) |
| Content system | File-based MDX per locale (D4) |
| Contact delivery | Resend email, no DB (D6) |
| Spam protection | Honeypot + timing + Turnstile + rate limit (D6) |
| Persian font delivery | `next/font/local` from npm package (D7) |
| Locale detection | Disabled; always default to `fa` (spec edge case) |

## Owner inputs received / still open

- Received: email `amin.mb21@gmail.com`, Telegram `@aminmaghrebi`, LinkedIn/GitHub/X URLs. No phone (by choice). Please confirm the three social URLs are yours (handles `nodari-bitsadze`, `pelakee13` differ from the site name).
- Open: Persian resume PDF. The Persian PDFs found locally are an accounting-job resume with home address, phone, father's name and birth date; not copied or published. Obsidian vault could not be located on disk, so no note was exported.
- Deferred: Resend/SMTP account and domain DNS.
- Deferred: project screenshots (placeholders in v1).
