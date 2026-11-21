"use client";

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useLocale } from 'next-intl';

/**
 * Keyboard-navigable slide carousel. All slides except the first are lazy-loaded.
 * Left/Right arrows (and PageUp/PageDown) move between slides; works with RTL direction.
 */
export function SlideViewer({
  slides,
  label,
  prevLabel,
  nextLabel,
}: {
  slides: string[];
  label: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  // In RTL the "previous" direction points right and "next" points left.
  const isRtl = useLocale() === 'fa';
  const prevArrow = isRtl ? '→' : '←';
  const nextArrow = isRtl ? '←' : '→';
  const go = useCallback(
    (delta: number) => setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + delta))),
    [slides.length],
  );

  return (
    <figure
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        // Arrow keys follow the reading direction: in RTL, "next" points left,
        // so ArrowLeft advances and ArrowRight goes back (mirrors the buttons).
        if (e.key === 'ArrowRight' || e.key === 'PageDown') go(isRtl ? -1 : 1);
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(isRtl ? 1 : -1);
        if (e.key === 'Home') setIndex(0);
        if (e.key === 'End') setIndex(slides.length - 1);
      }}
      className="rounded-card border border-border bg-surface p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {slides[index] && (
      <Image
        src={slides[index]}
        alt={`${label} — ${index + 1}/${slides.length}`}
        width={1280}
        height={720}
        priority={index === 0}
        loading={index === 0 ? undefined : 'lazy'}
        className="w-full rounded-lg"
      />
      )}
      <figcaption className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label={prevLabel ?? label}
          className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
        >
          {prevArrow}
        </button>
        <span className="text-sm text-fg-muted" aria-live="polite">
          {index + 1} / {slides.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === slides.length - 1}
          aria-label={nextLabel ?? label}
          className="rounded-lg border border-border px-4 py-2 text-sm disabled:opacity-40"
        >
          {nextArrow}
        </button>
      </figcaption>
    </figure>
  );
}
