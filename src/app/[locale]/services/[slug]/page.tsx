// src/app/[locale]/services/[slug]/page.tsx
// Wzorzec podstrony usługowej — Next.js 15, App Router, Server Component

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getService, getServices } from '@/data/services';
import ServicePageClient from './ServicePageClient';

const BASE_URL = 'https://anastasiiakupriianets.pl';

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  const locales = ['pl', 'en'] as const;

  return locales.flatMap(locale =>
    getServices(locale).map(service => ({
      locale,
      slug: service.slug,
    }))
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const isEn = locale === 'en';

  const service = getService(locale, slug);
  if (!service) return {};

  const canonical = `${BASE_URL}${isEn ? '/en' : ''}/services/${slug}`;

  return {
    title: `${service.title} | AK Web & Design`,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical,
    },
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const service = getService(locale, slug);

  if (!service) notFound();

  const canonical = `${BASE_URL}${isEn ? '/en' : ''}/services/${slug}`;

  const servicesUrl = `${BASE_URL}${isEn ? '/en' : ''}/services`;

  // ── JSON-LD schemas ──────────────────────────────────────────────────────
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.schema.name,
    description: service.schema.description,
    serviceType: service.schema.serviceType,
    provider: {
      '@type': 'LocalBusiness',
      name: 'AK Web & Design',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wrocław',
        addressCountry: 'PL',
      },
    },
    areaServed: isEn ? ['PL', 'Europe', 'Worldwide'] : 'PL',
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
        item: BASE_URL,
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