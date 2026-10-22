/** Inline SVG flags: emoji flags render as "GB"/"IR" letters on Windows, so SVG is used instead. */
export function Flag({ country, className = 'h-4 w-6' }: { country: 'ir' | 'gb'; className?: string }) {
  const common = { className: `${className} rounded-[3px] ring-1 ring-border`, 'aria-hidden': true as const, focusable: false as const };
  if (country === 'ir') {
    return (
      <svg viewBox="0 0 30 20" {...common}>
        <rect width="30" height="20" fill="#fff" />
        <rect width="30" height="6.67" fill="#239f40" />
        <rect y="13.33" width="30" height="6.67" fill="#da0000" />
        <circle cx="15" cy="10" r="2.4" fill="none" stroke="#da0000" strokeWidth="0.9" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 40" {...common}>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#c8102e" strokeWidth="3" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="8" />
    </svg>
  );
}
