import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// `/` -> `/en`, `/about` -> `/en/about`
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and any path containing a file extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
