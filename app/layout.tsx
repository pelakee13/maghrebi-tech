import type { ReactNode } from 'react';

// Minimal root: <html> and <body> are rendered by app/[locale]/layout.tsx so lang/dir can be set per locale.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
