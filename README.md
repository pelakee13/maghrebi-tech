# maghrebi.tech — personal portfolio website

Bilingual (English default, Persian with full RTL) portfolio for Amin Maghrebi. Next.js 15 (App Router) +
TypeScript + Tailwind CSS 4, navy/cyan dark theme, Vazirmatn + Inter. Live at https://maghrebi.tech
(deployed by Vercel from `github.com/pelakee13/maghrebi-tech`, branch `main`).

## Where things live

- Project path: `D:\Brian\projects\maghrebi-tech` (moved here from the Desktop on 2026-10-22; Desktop copies deleted).
- Original project screenshots: `source-images/` (git-ignored; optimized copies are in `public/images/projects/`).
- Spec-kit artifacts: `.specify/` (constitution v1.0.0) and `specs/001-portfolio-website/`
  (spec, plan, research, data-model, contracts, quickstart, tasks).

## Status

- [x] Constitution, spec, plan, tasks (63 tasks; 58 done)
- [x] All 7 pages in fa + en, contact form (log only, no real email), resume PDFs (fa + en)
- [x] English default, flags next to language switch, 4 portfolio projects, starter article rewritten
- [x] Live on Vercel (last verified push: `9dd6e3b`)
- [ ] Push commit `af96162` (rewritten Telegram bot article) — needs the owner to `git push origin main` (GitHub login prompt)
- [ ] Screenshots for "Telegram trader bot" and "Running app" (owner will supply)
- [ ] Untracked `public/courses/ai-session-1-fa.pdf.pdf` (not mine; double `.pdf` extension) — owner to decide
- [ ] Real email delivery for the contact form (needs Resend/SMTP account)
- [ ] Open tasks.md items T054, T057–T059, T061 (Docker/nginx/CI not needed while hosting on Vercel)

## Commands

```sh
pnpm install --frozen-lockfile
pnpm dev                 # http://localhost:3000
pnpm typecheck && pnpm lint && pnpm test && pnpm build
pnpm test:e2e            # needs Chrome installed; 68 tests
```

## Rules for this project

- Everything lives inside the Obsidian vault `D:\Brian` (projects in `D:\Brian\projects`), never on the Desktop.
- Do not publish the owner's phone, home address, father's name or birth date (resume, site, logs).
- Owner pushes to GitHub himself (the credential prompt cannot be approved by the agent).
- Persian text: use the owner's exact wording when he supplies it.
