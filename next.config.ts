import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Nagłówki bezpieczeństwa dla wszystkich stron.
// Celowo bez Content-Security-Policy: strona ładuje GA4, Clarity i skrypty
// inline, więc CSP wymaga osobnego wdrożenia i testów.
const securityHeaders = [
  // Strony nie da się osadzić w ramce na cudzej domenie (ochrona przed clickjackingiem).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Przeglądarka nie zgaduje typu pliku.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Do innych serwisów wysyłamy tylko domenę, bez pełnego adresu strony.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Strona nie używa kamery, mikrofonu ani lokalizacji.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Zawsze HTTPS.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
