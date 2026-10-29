import type { Metadata } from 'next';
import { SITE_URL, alternates } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import { setRequestLocale } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: { absolute: isEn ? 'Blog: practical tips about websites | AK Web & Design' : 'Blog: praktycznie o stronach internetowych | AK Web & Design' },
    description: isEn
      ? 'How much a website costs, how long it takes, WordPress or Next.js. Straightforward articles for business owners.'
      : 'Ile kosztuje strona, ile trwa jej zrobienie, WordPress czy Next.js. Konkretne artykuły dla właścicieli firm.',
    alternates: alternates(locale, '/blog'),
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
      { '@type': 'ListItem', position: 1, name: 'AK Web & Design', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/${locale}/blog` },
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
