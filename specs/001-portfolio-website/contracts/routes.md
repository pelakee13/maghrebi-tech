# Contract: Public Routes and SEO Outputs

Base URL: `https://maghrebi.tech`. Locales: `fa` (default), `en`.

| Path | Result |
|------|--------|
| `/` | redirect to `/fa` (permanent in production) |
| `/<unprefixed path>` e.g. `/about` | redirect to `/fa/about` |
| `/{locale}` | Home |
| `/{locale}/about` | About |
| `/{locale}/services` | Services |
| `/{locale}/portfolio` | Portfolio |
| `/{locale}/blog` | Article list (empty-state message when none) |
| `/{locale}/blog/{slug}` | Article; 404 if the slug does not exist in that locale |
| `/{locale}/contact` | Contact form |
| `/{locale}/resume` | Resume summary + PDF download |
| `/resume/amin-maghrebi-resume-{locale}.pdf` | static PDF download |
| `/sitemap.xml`, `/robots.txt` | generated |
| any other path / unsupported locale (e.g. `/de/...`) | localized 404 page (fa fallback) with links to Home and Contact |

## Document-level guarantees
- `<html lang="fa" dir="rtl">` for `/fa/*`; `<html lang="en" dir="ltr">` for `/en/*`.
- Each page emits: unique `<title>`, meta description, canonical (self, absolute), `link rel="alternate" hreflang="fa|en"` and `x-default` -> `/fa/...`, Open Graph and Twitter tags.
- Language switcher target = same path in the other locale, except an article without a counterpart, which targets `/{other}/blog`.

## sitemap.xml
- Contains every static route in both locales and every non-draft article, each with `alternates.languages` where a counterpart exists.

## Security headers (all responses)
`Content-Security-Policy` (self + Turnstile origin), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (minimal).
