import fs from 'node:fs';
import path from 'node:path';

const PUBLIC = path.join(process.cwd(), 'public');

/** Thumbnail path for a session's cover slide, derived from slug + locale. Null when missing. */
export function slideThumb(slug: string, locale: 'fa' | 'en'): string | null {
  const url = `/courses/${slug}/slides/${locale}/slide-01-thumb.webp`;
  return fs.existsSync(path.join(PUBLIC, url.slice(1))) ? url : null;
}

/** Real size and page count of a PDF under /public. Null when the file is missing. */
export function pdfInfo(url: string): { sizeLabel: string; pages: number | null } | null {
  const full = path.join(PUBLIC, url.replace(/^\//, ''));
  if (!fs.existsSync(full)) return null;
  const buf = fs.readFileSync(full);
  const sizeLabel =
    buf.length >= 1024 * 1024
      ? `${(buf.length / 1024 / 1024).toFixed(1)} MB`
      : `${Math.max(1, Math.round(buf.length / 1024))} KB`;
  // Page count from the PDF page tree (/Count) with a Type//Page fallback.
  const counts = [...buf.toString('latin1').matchAll(/\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
  const pages = counts.length ? Math.max(...counts) : (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? null);
  return { sizeLabel, pages };
}
