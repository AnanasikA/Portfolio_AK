import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HomeSections from '@/components/HomeSections';
import { SITE_URL, alternates } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const t = await getTranslations({ locale, namespace: 'meta' });

  const alt = alternates(locale);
  const canonical = alt.canonical;

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: alt,
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AK Web & Design',
    url: `${SITE_URL}/${locale}`,
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
