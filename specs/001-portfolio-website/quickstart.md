# Quickstart and Validation Guide

Run/validate guide for the finished feature. Implementation details belong to `tasks.md`.

## Prerequisites
- Node.js 22 LTS (the dev machine has v26.7.0; use `nvm`/`fnm` to switch), pnpm 9+
- Optional: Cloudflare Turnstile keys. No email provider is needed in v1.
- Docker (only for the deployment check)

## Setup
```bash
pnpm install
cp .env.example .env.local     # fill values; leave empty to test the failure path
pnpm dev                       # http://localhost:3000
```

## Quality gates (match the constitution)
```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
pnpm test:e2e                  # Playwright, fa + en, mobile + desktop viewports
pnpm lhci                      # Lighthouse CI budget >= 90
```

## Validation scenarios

| # | Story | Steps | Expected |
|---|-------|-------|----------|
| 1 | US1 | Open `/` | Redirects to `/fa`; hero, 4 services, featured projects visible; CTA goes to `/fa/contact` |
| 2 | US3 | On `/fa/services` click language switch | Opens `/en/services`, `dir=ltr`, English copy and Inter font; switch back restores RTL and Vazirmatn |
| 3 | US3 | Browser set to English, open `/` | Still `/fa` (detection off) |
| 4 | US2 | Submit valid contact form | Localized success message; server log shows one anonymised line (no name/email/body); no email is sent in v1 |
| 5 | US2 | Submit with bad email/short message | Field-level localized errors; input preserved |
| 6 | US2 | Fill honeypot via devtools, submit | Generic error, no email sent |
| 7 | US4 | Open `/en/services`, `/en/portfolio` | 4 services and 3 projects with titles, summaries, CTA |
| 8 | US5 | Open `/fa/blog`, open an article | Newest-first list; article has title, date, RTL body; switcher goes to counterpart or blog list |
| 9 | US6 | Open `/en/resume`, click Download | `amin-maghrebi-resume-en.pdf` downloads (needs the English PDF exported from the docx). On `/fa/resume` the button is hidden until a Persian PDF is added |
| 10 | Edge | Open `/de/about`, `/fa/nope` | Localized 404 with Home/Contact links |
| 11 | SEO | View source of any page | unique title/description, canonical, hreflang fa/en/x-default; `/sitemap.xml` lists both locales |
| 12 | Parity | Delete one key from `messages/en.json` | Unit test fails |
| 13 | Content | Add a project file to `fa` only | Build fails on missing counterpart |

## Deployment check
```bash
docker build -t maghrebi-tech .
docker run --rm -p 3000:3000 --env-file .env.production maghrebi-tech
curl -I http://localhost:3000/        # expect 30x -> /fa
```
Production: nginx proxies `maghrebi.tech` to `127.0.0.1:3000`; confirm TLS, HSTS, and long cache on `/_next/static`.

## References
- Entities and validation: [data-model.md](./data-model.md)
- Routes/SEO: [contracts/routes.md](./contracts/routes.md)
- Content files: [contracts/content-schema.md](./contracts/content-schema.md)
- Contact action: [contracts/contact-action.md](./contracts/contact-action.md)

## Validation results (2026-10-21, local Windows machine)

Executed: `pnpm typecheck`, `pnpm lint`, `pnpm test` (16 unit tests), `pnpm build` (23 static pages), `pnpm test:e2e`
(62 tests, desktop + mobile, passed twice in a row), Lighthouse on 4 pages, and a manual browser check of the contact form.

| # | Scenario | Result |
|---|----------|--------|
| 1 | `/` redirects to `/fa`; hero, 4 services, 3 projects, CTA to contact | Pass (e2e) |
| 2 | Language switch flips path, `dir` and font both ways | Pass (e2e + browser) |
| 3 | English browser still lands on `/fa` | Pass (e2e + curl). Redirect is 307, not yet 308 |
| 4 | Valid contact submit | Pass: success message; one anonymised log line, no email sent (by design) |
| 5 | Invalid contact input | Pass: localized field errors, input preserved |
| 6 | Honeypot filled | Pass: generic error |
| 7 | Services (4) and Portfolio (3) in both locales | Pass (e2e) |
| 8 | Blog list, article, switcher to counterpart | Pass (e2e) |
| 9 | Resume PDF | English downloads (Pass). Persian PDF does not exist yet, so the fa button is hidden (Pass for that rule) |
| 10 | `/de/about`, `/fa/nope` | Pass: localized 404. Note `/de/about` first redirects to `/fa/de/about`, then 404 |
| 11 | SEO tags and sitemap | Pass (e2e on 14 pages) |
| 12 | Remove a key from one messages file | Covered by unit test, not manually broken |
| 13 | Add a project to `fa` only | Pass: removed `en/projects/running-app.mdx` and the build failed with `projects "running-app" is missing in: en`; file restored |

Lighthouse (desktop preset, one run each): performance 99, accessibility 100, best-practices 96, SEO 91 on
`/fa`, `/en`, `/fa/services`, `/en/blog/telegram-bot-for-sales`. Mobile preset was not measured.

Not executed: Docker image build (Docker is not installed on this machine), nginx config on a real server,
the GitHub Actions workflow, and a manual keyboard/screen-reader accessibility pass.
