# Contract: Content Files

Content is edited as files; a build fails on schema violations or missing counterpart locales.

## Directory convention
```text
content/<locale>/pages/{home,about,resume}.mdx
content/<locale>/services/<id>.mdx
content/<locale>/projects/<id>.mdx
content/<locale>/blog/<slug>.mdx
```
`<locale>` is `fa` or `en`. File names are ASCII kebab-case in both locales (Persian titles go in frontmatter, not file names).

## Frontmatter examples (shape only)

Service:
```yaml
id: telegram-bots
order: 2
title: ...
summary: ...
icon: bot            # system | bot | support | training
useCases: [ ..., ... ]
```

Project:
```yaml
id: heli-beauty-studio
title: ...
type: web-app        # web-app | bot | mobile-app
summary: ...
role: ...
featured: true
order: 1
image: /images/projects/heli.webp   # optional
url: https://...                     # optional
tags: [ ..., ... ]
```

Article:
```yaml
slug: telegram-bot-for-sales         # must match file name
title: ...
date: 2026-10-21
summary: ...
translationKey: telegram-bot-for-sales   # optional pairing key
draft: false
```

## Rules
1. `id` of services and projects MUST exist in both locales (parity check).
2. Dates are ISO `YYYY-MM-DD`; articles dated in the future or `draft: true` are not built.
3. Allowed MDX components are whitelisted in `MdxRenderer` (headings, links, images, code, callout, list); no arbitrary imports inside MDX.
4. Links to external sites get `rel="noopener noreferrer"` automatically.
5. UI strings (buttons, labels, form errors) are NOT content files; they live in `messages/<locale>.json` with identical keys in both.
6. Persian content uses Persian digits and punctuation conventions; English product names stay in Latin script and are wrapped by the renderer for correct bidi isolation.
