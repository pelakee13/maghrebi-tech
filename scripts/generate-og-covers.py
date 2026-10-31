#!/usr/bin/env python3
"""Generate 1200x630 OG cover images from each published session's first slide.

Re-run any time slide-01 changes: python scripts/generate-og-covers.py
Output: public/courses/<slug>/og/<fa|en>.jpg (<= 150 KB, neutral navy padding, no overlays).
Only published sessions in lib/course-data.ts are processed.
"""
import os
import re
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
NAVY = (10, 25, 47)  # --color-bg
OG_W, OG_H = 1200, 630
MAX_BYTES = 150 * 1024

# Published sessions only (mirrors lib/course-data.ts status: "published").
PUBLISHED = ['ai-session-1', 'ai-session-2']


def cover_og(src: str, dst: str) -> None:
    im = Image.open(src).convert('RGB')
    scale = min(OG_W / im.width, OG_H / im.height)
    resized = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    canvas = Image.new('RGB', (OG_W, OG_H), NAVY)
    canvas.paste(resized, ((OG_W - resized.width) // 2, (OG_H - resized.height) // 2))
    quality = 85
    while quality >= 55:
        canvas.save(dst, 'JPEG', quality=quality, optimize=True)
        if os.path.getsize(dst) <= MAX_BYTES:
            return
        quality -= 5
    raise SystemExit(f'{dst} still exceeds {MAX_BYTES} bytes')


def main() -> None:
    for slug in PUBLISHED:
        for locale in ('fa', 'en'):
            src = os.path.join(ROOT, 'public', 'courses', slug, 'slides', locale, 'slide-01.webp')
            if not os.path.exists(src):
                print(f'skip {slug}/{locale}: no slide-01')
                continue
            out_dir = os.path.join(ROOT, 'public', 'courses', slug, 'og')
            os.makedirs(out_dir, exist_ok=True)
            dst = os.path.join(out_dir, f'{locale}.jpg')
            cover_og(src, dst)
            print(f'{slug}/{locale}: {os.path.getsize(dst) // 1024} KB')


if __name__ == '__main__':
    main()
