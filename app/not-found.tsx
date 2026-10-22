import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

// Fallback for unsupported locales (e.g. /de/about): English 404 (default locale), since there is no locale layout here.
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <NotFoundContent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
