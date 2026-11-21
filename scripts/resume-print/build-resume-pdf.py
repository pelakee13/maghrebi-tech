#!/usr/bin/env python3
"""Build Amin Maghrebi's resume PDFs (fa + en) from the SAME source the HTML
resume uses: content/{fa,en}/pages/resume.mdx.

Single source of truth: the MDX files. This script parses them (frontmatter +
sections) and renders scripts/resume-print/resume-template.html through
WeasyPrint. No resume text is hand-copied into this script or the template --
only the contact block is read from lib/site.ts (the site-wide constants file),
and the professional headline under the name is the first experience role
from the MDX itself.

Fonts: the repo's brand font IRANSans (assets/fonts/IRANSans/*.woff2).
WOFF2 cannot be used by the print stack directly, so the script converts the
needed weights to TTF on the fly (fontTools + brotli) into a temp dir and
points @font-face at those files. If conversion fails it falls back to the
system Noto Sans Arabic / DejaVu Sans stack (declared in the template CSS).

Usage:
    python3 scripts/resume-print/build-resume-pdf.py [--locale fa|en|both]
                                                     [--out DIR]
Requires: weasyprint, fonttools, brotli  (pip install weasyprint fonttools brotli)

Outputs (defaults): ~/workspace/maghrebi-tech/resume-pdf-new/amin-maghrebi-resume-{fa,en}.pdf
The PDFs are delivered as files for Amin to upload later. This script never
writes into public/resume/ and never pushes anything.
"""

from __future__ import annotations

import argparse
import html
import re
import sys
import tempfile
from pathlib import Path
from string import Template

REPO = Path(__file__).resolve().parents[2]
DEFAULT_OUT = Path.home() / "workspace" / "maghrebi-tech" / "resume-pdf-new"

# Section headings as they appear in the MDX files, per locale.
SECTIONS = {
    "fa": {"summary": "خلاصه", "skills": "مهارت‌ها", "experience": "تجربه",
           "education": "تحصیلات", "languages": "زبان‌ها"},
    "en": {"summary": "Summary", "skills": "Skills", "experience": "Experience",
           "education": "Education", "languages": "Languages"},
}

FONT_WEIGHTS = {  # weight -> repo woff2 file
    400: "IRANSansWeb.woff2",
    500: "IRANSansWeb_Medium.woff2",
    700: "IRANSansWeb_Bold.woff2",
}


def parse_mdx(path: Path) -> dict:
    """Parse a resume MDX file into frontmatter + section bodies."""
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if not m:
        raise ValueError(f"{path}: no YAML frontmatter found")
    front, body = m.group(1), m.group(2)
    meta = {}
    for line in front.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    sections: dict[str, str] = {}
    current = None
    buf: list[str] = []
    for line in body.splitlines():
        hm = re.match(r"^##\s+(.+?)\s*$", line)
        if hm:
            if current:
                sections[current] = "\n".join(buf).strip()
            current, buf = hm.group(1), []
        elif current is not None:
            buf.append(line)
    if current:
        sections[current] = "\n".join(buf).strip()
    return {"meta": meta, "sections": sections}


def parse_skills(body: str) -> list[tuple[str, str]]:
    """'- **Label:** text' lines -> (label, text)."""
    out = []
    for line in body.splitlines():
        # MDX form is '- **Label:** text' (colon inside the bold markers);
        # also tolerate '- **Label**: text'.
        m = (re.match(r"^-\s+\*\*(.+?):\*\*\s*(.+)$", line.strip())
             or re.match(r"^-\s+\*\*(.+?)\*\*:\s*(.+)$", line.strip()))
        if m:
            out.append((m.group(1).strip(), m.group(2).strip()))
    return out


def parse_experience(body: str) -> list[dict]:
    """'**Role** — dates' + description paragraph -> job entries."""
    jobs = []
    lines = [ln for ln in body.splitlines()]
    i = 0
    while i < len(lines):
        m = re.match(r"^\*\*(.+?)\*\*\s*[—–-]\s*(.+)$", lines[i].strip())
        if m:
            desc: list[str] = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("**"):
                if lines[i].strip():
                    desc.append(lines[i].strip())
                i += 1
            jobs.append({"role": m.group(1).strip(),
                         "dates": m.group(2).strip(),
                         "desc": " ".join(desc)})
        else:
            i += 1
    return jobs


def parse_list(body: str) -> list[str]:
    return [re.sub(r"^-\s+", "", ln.strip())
            for ln in body.splitlines() if ln.strip().startswith("-")]


def read_site_constants() -> dict:
    """Contact/social constants from lib/site.ts (single source of truth)."""
    src = (REPO / "lib" / "site.ts").read_text(encoding="utf-8")
    def grab(pat: str, default: str = "") -> str:
        m = re.search(pat, src)
        return m.group(1) if m else default
    socials = re.findall(
        r"\{\s*platform:\s*'(\w+)'.*?url:\s*'([^']+)'", src, re.DOTALL)
    return {
        "name": {"fa": grab(r"name:\s*\{\s*fa:\s*'([^']+)'"),
                 "en": grab(r"en:\s*'([^']+)'")},
        "email": grab(r"email:\s*\(process\.env\.CONTACT_EMAIL \?\? '([^']+)'\)"),
        "telegram_url": grab(r"telegram:\s*\{\s*handle:\s*'[^']+',\s*url:\s*'([^']+)'"),
        "telegram_handle": grab(r"telegram:\s*\{\s*handle:\s*'([^']+)'"),
        "site_url": "https://www.maghrebi.tech",
        "socials": dict(socials),
    }


def contact_html(site: dict) -> str:
    """Contact line: website · email · Telegram · LinkedIn · GitHub · X."""
    items = [
        ("maghrebi.tech", site["site_url"]),
        (site["email"], f"mailto:{site['email']}"),
        (f"Telegram {site['telegram_handle']}", site["telegram_url"]),
        ("LinkedIn", site["socials"].get("linkedin", "")),
        ("GitHub", site["socials"].get("github", "")),
        ("X", site["socials"].get("x", "")),
    ]
    parts = []
    for label, href in items:
        if not href:
            continue
        parts.append(
            f'<span class="ltr"><a href="{html.escape(href)}">'
            f"{html.escape(label)}</a></span>")
    return '<span class="sep">·</span>'.join(parts)


def convert_fonts(tmp: Path) -> str:
    """Convert repo IRANSans woff2 -> TTF; return @font-face CSS (or '')."""
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        print("WARN: fontTools missing, using system fonts", file=sys.stderr)
        return ""
    css = []
    src_dir = REPO / "assets" / "fonts" / "IRANSans"
    for weight, fname in FONT_WEIGHTS.items():
        src = src_dir / fname
        if not src.exists():
            print(f"WARN: missing font {src}", file=sys.stderr)
            continue
        dst = tmp / f"IRANSans-{weight}.ttf"
        TTFont(str(src)).save(str(dst))
        css.append(
            "@font-face {\n"
            '  font-family: "IRANSans";\n'
            f"  font-style: normal;\n  font-weight: {weight};\n"
            f"  src: url('file://{dst}');\n}}")
    if not css:
        return ""
    print(f"fonts: converted {len(css)} IRANSans weights (woff2 -> TTF)")
    return "\n".join(css)


def render_html(locale: str, font_css: str, site: dict) -> str:
    mdx = parse_mdx(REPO / "content" / locale / "pages" / "resume.mdx")
    heads = SECTIONS[locale]
    sec = mdx["sections"]
    for key in ("summary", "skills", "experience", "education", "languages"):
        if heads[key] not in sec:
            raise ValueError(f"{locale} resume.mdx: missing section '{heads[key]}'")

    skills = parse_skills(sec[heads["skills"]])
    jobs = parse_experience(sec[heads["experience"]])
    education = parse_list(sec[heads["education"]])
    if not skills or not jobs or not education:
        raise ValueError(f"{locale} resume.mdx: empty skills/experience/education")

    skills_html = "\n".join(
        f'<p class="skill"><span class="label">{html.escape(l)}:</span> '
        f"{html.escape(t)}</p>" for l, t in skills)
    exp_html = "\n".join(
        '<div class="job">\n'
        f'  <p class="job-head"><span class="job-role">{html.escape(j["role"])}</span>'
        f' — <span class="job-dates">{html.escape(j["dates"])}</span></p>\n'
        f'  <p>{html.escape(j["desc"])}</p>\n</div>'
        for j in jobs)
    edu_html = "<ul>\n" + "\n".join(
        f"  <li>{html.escape(e)}</li>" for e in education) + "\n</ul>"

    template = (REPO / "scripts" / "resume-print" / "resume-template.html"
                ).read_text(encoding="utf-8")
    return Template(template).substitute(
        LANG=locale,
        DIR="rtl" if locale == "fa" else "ltr",
        FONT_FACE_CSS=font_css,
        NAME=site["name"][locale] or ("امین مغربی" if locale == "fa"
                                      else "Amin Maghrebi"),
        DOC_TITLE=mdx["meta"].get("title", "Resume"),
        SUBTITLE=jobs[0]["role"],  # first experience role = headline
        CONTACT_HTML=contact_html(site),
        H_SUMMARY=heads["summary"],
        SUMMARY=html.escape(sec[heads["summary"]].replace("\n", " ")),
        H_SKILLS=heads["skills"],
        SKILLS_HTML=skills_html,
        H_EXPERIENCE=heads["experience"],
        EXPERIENCE_HTML=exp_html,
        H_EDUCATION=heads["education"],
        EDUCATION_HTML=edu_html,
        H_LANGUAGES=heads["languages"],
        LANGUAGES=html.escape(sec[heads["languages"]].replace("\n", " ")),
    )


def build(locale: str, out_dir: Path, site: dict) -> Path:
    from weasyprint import HTML
    with tempfile.TemporaryDirectory(prefix="resume-print-") as td:
        font_css = convert_fonts(Path(td))
        doc = render_html(locale, font_css, site)
        html_path = Path(td) / f"resume-{locale}.html"
        html_path.write_text(doc, encoding="utf-8")
        out = out_dir / f"amin-maghrebi-resume-{locale}.pdf"
        out_dir.mkdir(parents=True, exist_ok=True)
        HTML(filename=str(html_path)).write_pdf(str(out))
    print(f"{locale}: {out} ({out.stat().st_size:,} bytes)")
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--locale", choices=["fa", "en", "both"], default="both")
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = ap.parse_args()
    site = read_site_constants()
    locales = ["fa", "en"] if args.locale == "both" else [args.locale]
    for loc in locales:
        build(loc, args.out, site)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
