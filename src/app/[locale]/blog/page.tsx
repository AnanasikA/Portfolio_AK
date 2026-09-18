import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { setRequestLocale } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';

const BASE_URL = 'https://anastasiiakupriianets.pl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const canonical = `${BASE_URL}/${locale}/blog`;

  const title = isEn
    ? 'Blog — Web Development & Design Tips | AK Web & Design'
    : 'Blog — porady o tworzeniu stron internetowych | AK Web & Design';
  const description = isEn
    ? 'Practical articles about building, pricing and maintaining business websites — from choosing a web designer to comparing WordPress and Next.js.'
    : 'Praktyczne artykuły o tworzeniu, wycenie i utrzymaniu stron internetowych dla firm — od wyboru wykonawcy po porównanie WordPressa i Next.js.';

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        pl: `${BASE_URL}/pl/blog`,
        en: `${BASE_URL}/en/blog`,
        'x-default': `${BASE_URL}/pl/blog`,
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts(locale);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AK Web & Design', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/${locale}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPageClient posts={posts} locale={locale} />
    </>
  );
}
