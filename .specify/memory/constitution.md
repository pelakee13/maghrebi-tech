<!--
Sync Impact Report
- Version change: scaffold (unratified) -> 1.0.0 (initial ratification)
- Modified principles: none (all principles newly defined)
- Added sections: Core Principles I-VII, Technology & Design Standards,
  Development Workflow & Quality Gates, Governance
- Removed sections: none
- Follow-up TODOs: none
-->

# maghrebi.tech Constitution

## Core Principles

### I. Next.js 15 App Router + TypeScript + Tailwind CSS
The site MUST be built with Next.js 15 using the App Router, TypeScript in strict mode, and
Tailwind CSS for styling. Pages and layouts MUST live under `app/`. Use of `any`, the Pages
Router, or a competing styling system (CSS-in-JS, other UI frameworks) is prohibited unless
a documented exception is approved. Rationale: one consistent, type-safe, well-supported stack
keeps the project maintainable and fast.

### II. Fully Bilingual with Full RTL Support
Every page MUST be available in Persian under `/fa` and in English under `/en`. Persian pages
MUST render with `dir="rtl"` and `lang="fa"`; English pages with `dir="ltr"` and `lang="en"`.
Layouts MUST use logical CSS properties (e.g. `ms-*`, `pe-*`, `text-start`) instead of
left/right so that both directions work without duplicated styles. No feature is complete until
it is verified in both languages and both directions.

### III. Persian Is the Default Language
Persian (`fa`) MUST be the default locale. Requests to `/` MUST redirect to `/fa` (or to the
locale chosen by an explicit user preference). A visible language switcher MUST be present on
every page and MUST preserve the current page when switching languages. Each page MUST declare
`hreflang` alternates for `fa` and `en`.

### IV. Dark Mode with Navy/Dark Blue Background and Cyan Accent
The visual identity is a dark theme: a Navy/Dark Blue background with Cyan as the accent colour.
Colours MUST be defined once as design tokens (Tailwind theme / CSS variables) and MUST NOT be
hard-coded in components. Text/background contrast MUST meet WCAG AA. Any added light theme MUST
be optional and MUST NOT change the dark theme as the default.

### V. Typography: IRANSans for Persian, Inter for English
Persian text MUST use IRANSans and English text MUST use Inter. Fonts MUST be self-hosted or
loaded through `next/font` with `display: swap` and only the required subsets and weights, so
that no layout shift or render-blocking font request occurs. The font family MUST switch
automatically according to the active locale.

### VI. Reusable Components and Clean Structure
UI MUST be composed of small, single-purpose, reusable components with typed props. Code MUST be
organised by clear boundaries (e.g. `app/[locale]/`, `components/`, `lib/`, `content/`,
`messages/`). Components MUST be locale-agnostic and direction-agnostic; they MUST receive text
and data through props or the i18n layer. Duplicated markup MUST be extracted into a shared
component once it appears a third time. Rationale: easy maintenance and extension of the portfolio.

### VII. Performance and SEO First
The site MUST be statically generated (SSG/ISR) wherever possible and ship minimal client-side
JavaScript (Server Components by default; `"use client"` only when interaction requires it).
Images MUST use `next/image` with explicit dimensions. Every page MUST define localized
`title`, `description`, canonical URL, Open Graph metadata, plus `sitemap.xml` and `robots.txt`
covering both locales. Production builds MUST target Lighthouse scores of at least 90 for
Performance, Accessibility, Best Practices, and SEO.

## Technology & Design Standards

- **Content separation**: Content MUST be managed separately for each language (e.g.
  `content/fa/*` and `content/en/*`, or per-locale message files). Content MUST NOT be
  hard-coded in components. Adding a content item MUST NOT require editing component code.
- **Routing**: Locale-prefixed routes (`/fa/...`, `/en/...`) are the only public routes for pages.
  Unsupported locales MUST return 404.
- **Dependencies**: New dependencies MUST be justified by need and bundle-size impact; prefer
  platform and Next.js built-ins.
- **Accessibility**: Semantic HTML, keyboard navigation, visible focus states, and meaningful
  `alt` text in the active language are REQUIRED.
- **Domain**: The production site is served at `maghrebi.tech`.

## Development Workflow & Quality Gates

- Every change MUST pass TypeScript type-checking, linting, and a successful `next build` before
  merge.
- UI changes MUST be checked in both `/fa` (RTL) and `/en` (LTR) and at mobile and desktop widths.
- Pull requests MUST state which principles are affected and confirm compliance.
- Content changes MUST update both languages in the same change, or explicitly track the missing
  translation as an open task.
- Commits SHOULD be small and focused, using Conventional Commit messages.

## Governance

This constitution supersedes other practices and conventions for the project. Amendments MUST be
made in writing through a change to this file that includes rationale and, where existing code is
affected, a migration plan. Versioning follows semantic versioning: MAJOR for backward-incompatible
removal or redefinition of principles, MINOR for added principles or materially expanded guidance,
PATCH for clarifications and wording fixes. All specs, plans, tasks, and reviews MUST verify
compliance with these principles, and any deviation MUST be documented and justified in the plan's
complexity/exception notes. Compliance is reviewed at the start of every feature plan and before
each release.

**Version**: 1.0.0 | **Ratified**: 2026-10-21 | **Last Amended**: 2026-10-21
