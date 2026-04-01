import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Dopasowuje wszystkie ścieżki poza: api, _next, pliki statyczne
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};