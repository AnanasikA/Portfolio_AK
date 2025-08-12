import './globals.css';
import { Inter } from 'next/font/google';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // jeśli używasz w Tailwindzie
});

export const metadata = {
  title: 'Anastasiia | Portfolio',
  description: 'Portfolio Front-End Developerki uczącej się UX/UI i 3D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
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
      </head>

      {/* Użyj Inter poprawnie; usuń font-sans żeby nie nadpisywać */}
      <body className={`${inter.className} ${inter.variable} antialiased text-black`}>
        <Analytics />

        {/* TŁO: gradient zamiast pliku, brak 404 i ciężkiego blur */}
        <div
          className="fixed inset-0 -z-10 bg-gradient-to-b from-[#007aff] to-[#339cff] opacity-40"
          aria-hidden
        />

        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
