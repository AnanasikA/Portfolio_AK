import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectsPageClient from './page.client';

const BASE_URL = 'https://anastasiiakupriianets.pl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const canonical = `${BASE_URL}/${locale}/projects`;

  const title = isEn
    ? 'Projects — Website Design Portfolio | AK Web & Design'
    : 'Realizacje — portfolio stron internetowych | AK Web & Design';
  const description = isEn
    ? 'A selection of websites we’ve designed and built for local businesses, service providers and personal brands.'
    : 'Wybór stron internetowych, które zaprojektowaliśmy i wykonaliśmy dla lokalnych firm, usługodawców i marek osobistych.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        pl: `${BASE_URL}/pl/projects`,
        en: `${BASE_URL}/en/projects`,
        'x-default': `${BASE_URL}/pl/projects`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      siteName: 'AK Web & Design',
      locale: isEn ? 'en_US' : 'pl_PL',
    },
  };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const currentPage = parseInt(sp?.page ?? '1', 10);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AK Web & Design', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'Projects' : 'Projekty', item: `${BASE_URL}/${locale}/projects` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense>
        <ProjectsPageClient currentPage={currentPage} />
      </Suspense>
    </>
  );
}
