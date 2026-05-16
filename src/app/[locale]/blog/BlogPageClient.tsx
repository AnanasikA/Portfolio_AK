'use client';

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import { FiArrowRight, FiClock, FiCalendar, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';
import type { Post } from '@/lib/blog';

type Props = {
  posts: Post[];
  locale: string;
};

const POSTS_PER_PAGE = 6;

export default function BlogPageClient({ posts, locale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const isEn = locale === 'en';

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [posts]);

  // Filter by tag
  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags.includes(activeTag));
  }, [posts, activeTag]);

  // Paginate
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  };

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <main className="relative min-h-screen w-full overflow-hidden bg-[#f4f8ff] text-[#0f172a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,122,255,0.08),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(0,122,255,0.06),transparent_30%)]" />

        <div className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-8 sm:py-28 md:px-10 lg:px-12 xl:px-16 2xl:px-20">

          {/* Back to home */}
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-[#007aff]"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {isEn ? 'Back to home' : 'Wróć na stronę główną'}
          </Link>

          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-[#007aff]/15 bg-white/75 px-4 py-2 text-xs text-[#007aff] backdrop-blur-md sm:text-sm">
              Blog
            </span>
            <h1 className="font-serif text-[2.2rem] leading-[1.04] tracking-[-0.04em] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]">
              {isEn ? 'Articles & tips' : 'Artykuły i porady'}
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
              {isEn
                ? 'Practical knowledge about websites, WordPress, Next.js and online presence for businesses.'
                : 'Praktyczna wiedza o stronach internetowych, WordPress, Next.js i obecności firm w sieci.'}
            </p>
          </div>

          {/* Tag filters */}
          {allTags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => { setActiveTag(null); setPage(1); }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                  activeTag === null
                    ? 'bg-[#007aff] text-white shadow-md'
                    : 'border border-slate-200 bg-white/80 text-slate-600 hover:border-[#007aff]/40 hover:text-[#007aff]'
                }`}
              >
                {isEn ? 'All' : 'Wszystkie'}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                    activeTag === tag
                      ? 'bg-[#007aff] text-white shadow-md'
                      : 'border border-slate-200 bg-white/80 text-slate-600 hover:border-[#007aff]/40 hover:text-[#007aff]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Results count */}
          <p className="mb-6 text-sm text-slate-400">
            {isEn
              ? `${filtered.length} article${filtered.length !== 1 ? 's' : ''}${activeTag ? ` in "${activeTag}"` : ''}`
              : `${filtered.length} artykuł${filtered.length === 1 ? '' : filtered.length < 5 ? 'y' : 'ów'}${activeTag ? ` w kategorii "${activeTag}"` : ''}`}
          </p>

          {/* Posts grid */}
          {paginated.length === 0 ? (
            <div className="rounded-[24px] border border-slate-200 bg-white/70 px-8 py-16 text-center">
              <p className="text-slate-500">
                {isEn ? 'No articles found.' : 'Brak artykułów.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-[22px] border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,122,255,0.10)] sm:p-7"
                >
                  {post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full px-3 py-1 text-[11px] font-medium transition ${
                            activeTag === tag
                              ? 'bg-[#007aff] text-white'
                              : 'bg-[#007aff]/8 text-[#007aff]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="flex-1 font-serif text-[1.15rem] leading-snug tracking-[-0.02em] text-slate-900 sm:text-[1.25rem]">
                    {post.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                    {post.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString(
                          isEn ? 'en-GB' : 'pl-PL',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock className="h-3.5 w-3.5" />
                        {post.readingTime} min
                      </span>
                    </div>
                    <FiArrowRight className="h-4 w-4 text-[#007aff] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#007aff]/40 hover:text-[#007aff] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={isEn ? 'Previous page' : 'Poprzednia strona'}
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                    p === page
                      ? 'bg-[#007aff] text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-[#007aff]/40 hover:text-[#007aff]'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#007aff]/40 hover:text-[#007aff] disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={isEn ? 'Next page' : 'Następna strona'}
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Page info */}
          {totalPages > 1 && (
            <p className="mt-4 text-center text-xs text-slate-400">
              {isEn ? `Page ${page} of ${totalPages}` : `Strona ${page} z ${totalPages}`}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}