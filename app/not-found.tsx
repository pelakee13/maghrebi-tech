import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import faMessages from '@/messages/fa.json';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

// Fallback for unsupported locales (e.g. /de/about): Persian 404, since there is no locale layout here.
export default function GlobalNotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <NextIntlClientProvider locale="fa" messages={faMessages}>
          <NotFoundContent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
