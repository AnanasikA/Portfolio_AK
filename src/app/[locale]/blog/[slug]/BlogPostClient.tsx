'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiArrowRight, FiTag } from 'react-icons/fi';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';
import type { Post } from '@/lib/blog';

type Props = {
  post: Post;
  locale: string;
  mdxContent: React.ReactNode;
};

export default function BlogPostClient({ post, locale, mdxContent }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const isEn = locale === 'en';

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <style>{`
        .blog-article h2 {
          margin-top: 2.5rem;
          font-family: 'Libre Baskerville', serif;
          font-size: 1.5rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: #0f172a;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        .blog-article h3 {
          margin-top: 2rem;
          font-family: 'Libre Baskerville', serif;
          font-size: 1.15rem;
          line-height: 1.4;
          color: #0f172a;
        }
        .blog-article p {
          margin-top: 1.1rem;
          font-size: 1rem;
          line-height: 1.9;
          color: #334155;
        }
        .blog-article ul {
          margin-top: 1.1rem;
          padding-left: 0;
          list-style: none;
        }
        .blog-article ol {
          margin-top: 1.1rem;
          padding-left: 1.5rem;
        }
        .blog-article ul li {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          margin-bottom: 0.55rem;
          font-size: 1rem;
          line-height: 1.75;
          color: #334155;
        }
        .blog-article ul li::before {
          content: '';
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #007aff;
          flex-shrink: 0;
          margin-top: 0.55rem;
        }
        .blog-article ol li {
          margin-bottom: 0.55rem;
          font-size: 1rem;
          line-height: 1.75;
          color: #334155;
        }
        .blog-article strong { font-weight: 600; color: #0f172a; }
        .blog-article a { color: #007aff; text-decoration: underline; text-underline-offset: 2px; }
        .blog-article a:hover { color: #0062cc; }
        .blog-article blockquote {
          margin: 1.5rem 0;
          border-left: 4px solid rgba(0,122,255,0.3);
          padding: 0.75rem 1.25rem;
          background: rgba(0,122,255,0.04);
          border-radius: 0 12px 12px 0;
          color: #475569;
          font-style: italic;
        }
        .blog-article code {
          background: #f1f5f9;
          border-radius: 6px;
          padding: 0.15rem 0.4rem;
          font-family: monospace;
          font-size: 0.875rem;
          color: #1e293b;
        }
        .blog-article pre {
          margin: 1.5rem 0;
          overflow-x: auto;
          border-radius: 16px;
          background: #0f172a;
          padding: 1.25rem;
          font-size: 0.875rem;
          color: #e2e8f0;
        }
        .blog-article hr { margin: 2rem 0; border-color: #e2e8f0; }
        @media (min-width: 640px) {
          .blog-article h2 { font-size: 1.75rem; }
          .blog-article h3 { font-size: 1.3rem; }
        }
      `}</style>

      <main className="relative w-full text-[#0f172a]">

        {/* Hero */}
        <div className="relative bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_40%,#006bde_100%)] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.07),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_40%)]" />
          <div className="absolute left-[-5%] top-[20%] h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 right-[-5%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />

          <div className="relative mx-auto max-w-[1360px] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              {isEn ? 'Back to blog' : 'Wróć do bloga'}
            </Link>

            <div className="max-w-3xl">
              {post.tags.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-serif text-[1.9rem] leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.4rem] md:text-[2.9rem] lg:text-[3.2rem]">
                {post.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <FiCalendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString(
                    isEn ? 'en-GB' : 'pl-PL',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="h-4 w-4" />
                  {post.readingTime} min {isEn ? 'read' : 'czytania'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative bg-[#f4f8ff]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,122,255,0.05),transparent_40%),radial-gradient(circle_at_10%_80%,rgba(0,122,255,0.04),transparent_40%)]" />

          <div className="relative mx-auto max-w-[1360px] px-5 py-12 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
            <div className="flex gap-10 xl:gap-14">

              {/* Main content */}
              <div className="min-w-0 flex-1">
                <div className="-mt-10 rounded-[24px] border border-white/80 bg-white shadow-[0_4px_40px_rgba(0,122,255,0.08)]">
                  <article className="blog-article px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
                    {mdxContent}
                  </article>
                </div>

                {/* CTA */}
                <div className="mt-8 overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#007aff_0%,#006bde_100%)] p-8 text-center text-white shadow-lg sm:p-10">
                  <p className="font-serif text-xl leading-snug text-white sm:text-2xl">
                    {isEn ? 'Need a website for your business?' : 'Potrzebujesz strony dla swojej firmy?'}
                  </p>
                  <p className="mt-2 text-sm text-white/75 sm:text-base">
                    {isEn
                      ? 'Write to me — I will help you choose the right solution.'
                      : 'Napisz do mnie — pomogę dobrać odpowiednie rozwiązanie.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-brief'))}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#007aff] shadow-md transition hover:-translate-y-0.5"
                  >
                    {isEn ? 'Get a free quote' : 'Zapytaj o wycenę'}
                    <FiArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="hidden w-[280px] shrink-0 xl:block">
                <div className="sticky top-24 space-y-5">

                  {/* Info card */}
                  <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {isEn ? 'About the article' : 'O artykule'}
                    </h3>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="h-4 w-4 text-[#007aff]" />
                        {new Date(post.date).toLocaleDateString(
                          isEn ? 'en-GB' : 'pl-PL',
                          { day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="h-4 w-4 text-[#007aff]" />
                        {post.readingTime} min {isEn ? 'read' : 'czytania'}
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex items-start gap-2">
                          <FiTag className="mt-0.5 h-4 w-4 shrink-0 text-[#007aff]" />
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-[#007aff]/8 px-2.5 py-0.5 text-xs text-[#007aff]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA sidebar */}
                  <div className="rounded-[20px] border border-[#007aff]/15 bg-white p-6 shadow-sm">
                    <p className="font-serif text-[1.05rem] leading-snug text-slate-900">
                      {isEn ? 'Ready to start your project?' : 'Gotowy na nową stronę?'}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {isEn ? 'Get a free quote — no strings attached.' : 'Bezpłatna wycena bez zobowiązań.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-brief'))}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#007aff] px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#0062cc]"
                    >
                      {isEn ? 'Request a quote' : 'Zapytaj o wycenę'}
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Back to blog */}
                  <Link
                    href="/blog"
                    className="group flex items-center gap-2 rounded-[20px] border border-slate-100 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm transition hover:border-[#007aff]/30 hover:text-[#007aff]"
                  >
                    <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {isEn ? 'All articles' : 'Wszystkie artykuły'}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}