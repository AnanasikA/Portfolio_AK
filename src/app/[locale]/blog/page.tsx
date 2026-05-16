import { getAllPosts } from '@/lib/blog';
import { getLocale } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = getAllPosts(locale);

  return <BlogPageClient posts={posts} locale={locale} />;
}
