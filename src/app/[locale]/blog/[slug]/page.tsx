import { getPost, getAllPosts } from '@/lib/blog';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  const locales = ['pl', 'en'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 font-serif text-[1.5rem] leading-snug tracking-[-0.03em] text-slate-900 sm:text-[1.75rem]" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 font-serif text-[1.2rem] leading-snug tracking-[-0.02em] text-slate-900 sm:text-[1.35rem]" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-5 text-[15px] leading-8 text-slate-700 sm:text-base" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-5 space-y-2 pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-[15px] leading-7 text-slate-700 marker:text-[#007aff] sm:text-base" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-slate-900" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#007aff] underline underline-offset-2 transition hover:text-[#0062cc]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-[#007aff]/30 pl-5 text-slate-600 italic" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="my-6 overflow-x-auto rounded-2xl bg-slate-900 p-5 text-sm text-slate-100" {...props} />
  ),
  hr: () => <hr className="my-8 border-slate-200" />,
};
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPost(slug, locale);

  if (!post) notFound();

  const mdxContent = <MDXRemote source={post.content} components={mdxComponents} />;

  return <BlogPostClient post={post} locale={locale} mdxContent={mdxContent} />;
}
