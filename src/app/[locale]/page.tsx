import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HomeSections from '@/components/HomeSections';

const BASE_URL = 'https://anastasiiakupriianets.pl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const t = await getTranslations({ locale, namespace: 'meta' });

  const canonical = `${BASE_URL}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        pl: `${BASE_URL}/pl`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/pl`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: t('title'),
      description: t('description'),
      siteName: 'AK Web & Design',
      locale: isEn ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  // WebSite JSON-LD — generowane po stronie serwera (patrz audyt SEO, H6).
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AK Web & Design',
    url: `${BASE_URL}/${locale}`,
    inLanguage: isEn ? 'en' : 'pl',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeSections />
    </>
  );
}
