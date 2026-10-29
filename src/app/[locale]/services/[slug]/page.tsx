import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getService, getServices, getTranslatedServiceSlug } from '@/data/services';
import { SITE_URL, url } from '@/lib/site';
import { GOOGLE_PROFILE_URL } from '@/lib/business';
import ServicePageClient from './ServicePageClient';

function serviceAlternates(locale: string, slug: string) {
  const plSlug = locale === 'pl' ? slug : getTranslatedServiceSlug(locale, 'pl', slug);
  const enSlug = locale === 'en' ? slug : getTranslatedServiceSlug(locale, 'en', slug);
  const plUrl = url('pl', `/services/${plSlug}`);
  const enUrl = url('en', `/services/${enSlug}`);
  return {
    canonical: locale === 'en' ? enUrl : plUrl,
    languages: { pl: plUrl, en: enUrl, 'x-default': plUrl },
  };
}

export function generateStaticParams() {
  const locales = ['pl', 'en'] as const;

  return locales.flatMap(locale =>
    getServices(locale).map(service => ({
      locale,
      slug: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isEn = locale === 'en';

  const service = getService(locale, slug);
  if (!service) return {};

  const alt = serviceAlternates(locale, slug);
  const canonical = alt.canonical;

  return {
    title: { absolute: `${service.title} | AK Web & Design` },
    description: service.description,
    keywords: service.keywords,
    alternates: alt,
    openGraph: {
      title: `${service.title} | AK Web & Design`,
      description: service.description,
      url: canonical,
      siteName: 'AK Web & Design',
      locale: isEn ? 'en_US' : 'pl_PL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | AK Web & Design`,
      description: service.description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const service = getService(locale, slug);

  if (!service) {

    const otherLocale = isEn ? 'pl' : 'en';
    if (getService(otherLocale, slug)) {
      const translated = getTranslatedServiceSlug(otherLocale, locale, slug);
      permanentRedirect(`/${locale}/services/${translated}`);
    }
    notFound();
  }

  const canonical = serviceAlternates(locale, slug).canonical;
  const servicesUrl = url(locale, '/services');

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.schema.name,
    description: service.schema.description,
    serviceType: service.schema.serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: 'AK Web & Design',
      url: SITE_URL,
      email: 'kontakt@anastasiiakupriianets.pl',
      telephone: '+48576564682',
      sameAs: [GOOGLE_PROFILE_URL],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wrocław',
        addressCountry: 'PL',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Kąty Wrocławskie' },
      { '@type': 'City', name: 'Wrocław' },
      { '@type': 'Country', name: 'Polska' },
    ],
    url: canonical,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'AK Web & Design',
        item: url(locale),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEn ? 'Services' : 'Usługi',
        item: servicesUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: canonical,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ServicePageClient service={service} locale={locale} />
    </>
  );
}