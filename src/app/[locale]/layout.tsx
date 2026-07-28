import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import CookieConsent from '@/components/CookieConsent';
import '../globals.css';

const BASE_URL = 'https://anastasiiakupriianets.pl';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const isEn = locale === 'en';
  return {
    title: { default: t('title'), template: `%s | AK Web & Design` },
    description: t('description'),
    alternates: {
      canonical: isEn ? `${BASE_URL}/en` : BASE_URL,
      languages: { pl: BASE_URL, en: `${BASE_URL}/en`, 'x-default': BASE_URL },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'pl' | 'en')) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      {/* ===== GOOGLE ANALYTICS 4 + CONSENT MODE V2 ===== */}
<Script src="https://www.googletagmanager.com/gtag/js?id=G-CLP2ME6EWT" strategy="afterInteractive" />
<Script id="google-analytics" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
  });

  gtag('js', new Date());
  gtag('config', 'G-CLP2ME6EWT');
`}</Script>

      {/* ===== MICROSOFT CLARITY ===== */}
      <Script id="microsoft-clarity" strategy="afterInteractive">{`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "x5qkxg8pg6");
      `}</Script>

      <Analytics />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <a href="#content" className="skip-link">
          {locale === 'pl' ? 'Pomiń do treści' : 'Skip to content'}
        </a>
        {children}
        <CookieConsent />
      </NextIntlClientProvider>
    </>
  );
}