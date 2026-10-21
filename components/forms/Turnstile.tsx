"use client";

import { useEffect, useRef } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: { sitekey: string }) => void };
  }
}

/** Renders the Cloudflare Turnstile widget only when a site key is configured. */
export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    const el = ref.current;
    const render = () => window.turnstile?.render(el, { sitekey: SITE_KEY });
    if (window.turnstile) return render();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, []);
  if (!SITE_KEY) return null;
  return <div ref={ref} />;
}
