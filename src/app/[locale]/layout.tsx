import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import CookieConsent from '@/components/CookieConsent';
import MobileCtaBar from '@/components/MobileCtaBar';
import '../globals.css';

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('title'), template: `%s | AK Web & Design` },
    description: t('description'),
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
<Script src="https://www.googletagmanager.com/gtag/js?id=G-CLP2ME6EWT" strategy="afterInteractive" />
<Script id="google-analytics" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

   var consentState = 'denied';
  try {
    if (localStorage.getItem('cookie-consent') === '1') consentState = 'granted';
  } catch (e) {}

  gtag('consent', 'default', {
    'ad_storage': consentState,
    'ad_user_data': consentState,
    'ad_personalization': consentState,
    'analytics_storage': consentState
  });

  gtag('js', new Date());
  gtag('config', 'G-CLP2ME6EWT');
`}</Script>

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
        <MobileCtaBar />
        <CookieConsent />
      </NextIntlClientProvider>
    </>
  );
}