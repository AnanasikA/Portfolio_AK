import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Dopasowuje wszystkie ścieżki poza: api, r (linki partnerskie),
  // auth (callback logowania), _next, pliki statyczne.
  // "admin" NIE jest tu wykluczony — panel admina jest teraz wewnątrz
  // [locale] (/pl/admin/partners), więc ma dostać normalny routing locale.
  // Uwaga: "r/", "auth/" (ze slashem) — żeby nie złapać przypadkiem
  // np. /regulamin, które też zaczyna się na "r".
  matcher: ['/((?!api/|r/|auth/|_next|_vercel|.*\\..*).*)'],
};