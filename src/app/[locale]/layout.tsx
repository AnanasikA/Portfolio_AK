import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import CookieConsent from '@/components/CookieConsent';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-libre',
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  const isEn = locale === 'en';
  const canonical = isEn ? '/en' : '/';

  return {
    title: {
      default: t('title'),
      template: `%s | Anastasiia – Front-End Developer`
    },
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        pl: '/',
        en: '/en',
        'x-default': '/'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as 'pl' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div className={`${inter.variable} ${libre.variable} scroll-smooth`}>
    <Script
    src="https://www.googletagmanager.com/gtag/js?id=G-CLP2ME6EWT"
    strategy="afterInteractive"
  />

  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CLP2ME6EWT');
    `}
  </Script>

      <Analytics />

      <NextIntlClientProvider locale={locale} messages={messages}>
        <a href="#content" className="skip-link">
          {locale === 'pl' ? 'Pomiń do treści' : 'Skip to content'}
        </a>

        <div
          className="fixed inset-0 -z-10 bg-gradient-to-b from-[#007aff] to-[#339cff] opacity-40"
          aria-hidden
        />

        <div className={`${inter.className} antialiased text-black bg-white`}>
          {children}
          <CookieConsent />
        </div>
      </NextIntlClientProvider>
    </div>
  );
}