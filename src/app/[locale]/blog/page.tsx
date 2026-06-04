import { getAllPosts } from '@/lib/blog';
import { setRequestLocale } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts(locale);

  return <BlogPageClient posts={posts} locale={locale} />;
}
