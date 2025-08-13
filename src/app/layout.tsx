import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const libre = Libre_Baskerville({ subsets: ['latin'], weight: ['400','700'], display: 'swap', variable: '--font-libre' });

export const metadata: Metadata = {
  metadataBase: new URL('https://anastasiiakupriianets.pl'),
  applicationName: 'Anastasiia Portfolio',
  title: { default: 'Anastasiia | Portfolio', template: '%s | Anastasiia – Front-End Developer' },
  description: 'Portfolio Front-End Developerki (Next.js, Tailwind). UX/UI, wydajność i dostępność.',
  alternates: {
    canonical: '/',
    languages: { 'pl': '/', 'pl-PL': '/', 'x-default': '/' },
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Anastasiia | Portfolio',
    description: 'Nowoczesne strony w Next.js i Tailwind — szybko, lekko i estetycznie.',
    siteName: 'Anastasiia Portfolio',
    locale: 'pl_PL',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Portfolio Anastasiia Kupriianets' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anastasiia | Portfolio',
    description: 'Nowoczesne strony w Next.js i Tailwind — szybko, lekko i estetycznie.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png', // <-- odkomentuj tylko jeśli plik faktycznie istnieje w /public
  },
  // 🔴 NIE dodajemy tu themeColor – jest niżej w viewport
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#007aff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = 'https://anastasiiakupriianets.pl';

  return (
    <html lang="pl" className={`${inter.variable} ${libre.variable} scroll-smooth`}>
      <head>
        {/* Google Analytics */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-CLP2ME6EWT" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CLP2ME6EWT');
            `,
          }}
        />
        {/* Structured Data */}
        <Script
          id="ld-person" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org', '@type': 'Person',
              name: 'Anastasiia Kupriianets', url: siteUrl,
              email: 'mailto:kontakt@anastasiiakupriianets.pl', jobTitle: 'Front-End Developer',
            }),
          }}
        />
        <Script
          id="ld-website" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org', '@type': 'WebSite',
              name: 'Anastasiia Portfolio', url: siteUrl,
              potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
            }),
          }}
        />
      </head>

      <body className={`${inter.className} antialiased text-black bg-white`}>
        {/* Skip link (działa z #content na stronach) */}
        <a href="#content" className="skip-link">Pomiń do treści</a>

        {/* Tło: lekki gradient, zero 404 */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#007aff] to-[#339cff] opacity-40" aria-hidden />

        <Analytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
