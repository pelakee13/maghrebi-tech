# Resume print — single-source PDF builder

The downloadable resume PDFs are generated from the **same MDX files the
HTML resume page renders** (`content/{fa,en}/pages/resume.mdx`). Edit the
MDX; re-run the script; the PDFs follow. Nothing is hand-copied into a
second source.

## Files

- `resume-template.html` — print layout (A4, navy/cyan brand, page footer
  with page numbers). Placeholders (`$NAME`, `$SKILLS_HTML`, …) are filled
  by the script; do not paste resume text here.
- `build-resume-pdf.py` — parses the MDX frontmatter/sections, reads the
  contact block from `lib/site.ts`, converts the repo's IRANSans WOFF2
  fonts to TTF on the fly (WeasyPrint needs TTF), and writes the PDFs.

## Usage

```sh
python3 -m venv /tmp/venv-print
/tmp/venv-print/bin/pip install weasyprint fonttools brotli
/tmp/venv-print/bin/python scripts/resume-print/build-resume-pdf.py
# --locale fa|en|both   (default both)
# --out DIR             (default ~/workspace/maghrebi-tech/resume-pdf-new)
```

## Delivery

Outputs go to `~/workspace/maghrebi-tech/resume-pdf-new/` as
`amin-maghrebi-resume-{fa,en}.pdf` — the same filenames the site already
serves from `public/resume/`. Amin uploads them when he approves; the
download button in `app/[locale]/resume/page.tsx` renders only when the
file exists, so the link keeps working. **Never write into
`public/resume/` from this script and never push.**
