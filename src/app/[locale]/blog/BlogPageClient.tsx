'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { FiClock, FiArrowLeft } from 'react-icons/fi';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';
import type { Post } from '@/lib/blog';

type Props = { posts: Post[]; locale: string; };
const POSTS_PER_PAGE = 6;

export default function BlogPageClient({ posts, locale }: Props) {
  const [isOpen, setIsOpen]     = useState(false);
  const toggleMenu              = () => setIsOpen(p => !p);
  const isEn                    = locale === 'en';
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage]         = useState(1);
  const gridRef                 = useRef<HTMLDivElement>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [posts]);

  const filtered = useMemo(() =>
    activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts,
  [posts, activeTag]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // animacja kart
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.blog-card');
    if (!cards) return;
    cards.forEach(c => c.classList.remove('blog-card--visible'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const d  = parseInt(el.dataset.delay ?? '0');
          setTimeout(() => el.classList.add('blog-card--visible'), d);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.08 });
    setTimeout(() => cards.forEach(c => obs.observe(c)), 50);
    return () => obs.disconnect();
  }, [paginated, activeTag]);

  return (
    <>
      <style>{`
        .blog-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: var(--bg);
          overflow: hidden;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity .5s ease, transform .5s ease, border-color .2s ease;
        }
        .blog-card--visible { opacity: 1; transform: translateY(0); }
        .blog-card:hover { border-color: var(--ink); }
        .blog-card:hover .blog-arrow { transform: translateX(4px); opacity: 1; }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px,2vw,20px);
        }
        @media (max-width: 860px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .blog-grid { grid-template-columns: 1fr; } }

        .tag-btn {
          font-family: var(--fd);
          font-weight: 600;
          font-size: .78rem;
          border-radius: 99px;
          padding: 6px 14px;
          border: 1.5px solid var(--line);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all .2s;
          white-space: nowrap;
        }
        .tag-btn:hover { border-color: var(--ink); color: var(--ink); }
        .tag-btn--active { background: var(--ink); border-color: var(--ink); color: #fff; }

        .blog-arrow {
          opacity: 0;
          transition: transform .25s ease, opacity .25s ease;
          flex-shrink: 0;
        }
      `}</style>

      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <section style={{
          paddingTop: 'clamp(100px,14vh,140px)',
          paddingBottom: 'clamp(40px,6vw,64px)',
          borderBottom: '1px solid var(--line)',
        }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>
            <Link href="/" locale={locale}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--fd)', fontSize: '.82rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: 28, transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--brand)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}>
              <FiArrowLeft size={13} /> {isEn ? 'Back to home' : 'Wróć na stronę główną'}
            </Link>

            <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 2, background: 'currentColor', display: 'inline-block' }} />
              Blog
            </p>
            <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,4.2rem)', letterSpacing: '-.04em', color: 'var(--ink)', lineHeight: .97, marginBottom: 16, maxWidth: '16ch' }}>
              {isEn ? 'Articles & tips for your business.' : 'Artykuły i porady dla Twojego biznesu.'}
            </h1>
            <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.9rem,1.3vw,1rem)', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '52ch' }}>
              {isEn
                ? 'Practical knowledge about websites, WordPress, Next.js and online presence for businesses.'
                : 'Praktyczna wiedza o stronach internetowych, WordPress, Next.js i obecności firm w sieci.'}
            </p>
          </div>
        </section>

        {/* ── GRID SECTION ── */}
        <section style={{ padding: 'clamp(40px,6vw,64px) 0 clamp(64px,10vw,120px)' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

            {/* Filters */}
            {allTags.length > 0 && (
              <div style={{ marginBottom: 'clamp(24px,4vw,36px)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  <button
                    className={`tag-btn${activeTag === null ? ' tag-btn--active' : ''}`}
                    onClick={() => { setActiveTag(null); setPage(1); }}>
                    {isEn ? 'All' : 'Wszystkie'}
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      className={`tag-btn${activeTag === tag ? ' tag-btn--active' : ''}`}
                      onClick={() => { setActiveTag(p => p === tag ? null : tag); setPage(1); }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p style={{ fontFamily: 'var(--fd)', fontSize: '.75rem', fontWeight: 500, color: 'var(--muted-2)', marginBottom: 24, letterSpacing: '.04em' }}>
              {isEn
                ? `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`
                : `${filtered.length} artykuł${filtered.length === 1 ? '' : filtered.length < 5 ? 'y' : 'ów'}`}
              {activeTag && <span style={{ color: 'var(--brand)' }}> — {activeTag}</span>}
            </p>

            {/* Grid */}
            {paginated.length === 0 ? (
              <div style={{ border: '1px solid var(--line)', padding: '48px 32px', textAlign: 'center', borderRadius: 10 }}>
                <p style={{ fontFamily: 'var(--fb)', color: 'var(--muted)' }}>{isEn ? 'No articles found.' : 'Brak artykułów.'}</p>
              </div>
            ) : (
              <div ref={gridRef} className="blog-grid">
                {paginated.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="blog-card"
                    data-delay={String(index * 60)}
                  >
                    {/* Body */}
                    <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.62rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--brand)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.95rem,1.5vw,1.1rem)', letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.3, flex: 1, marginBottom: 10 }}>
                        {post.title}
                      </h2>

                      <p style={{ fontFamily: 'var(--fb)', fontSize: '.83rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 18, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ fontFamily: 'var(--fd)', fontSize: '.72rem', color: 'var(--muted-2)', fontWeight: 500 }}>
                            {new Date(post.date).toLocaleDateString(isEn ? 'en-GB' : 'pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--fd)', fontSize: '.72rem', color: 'var(--muted-2)', fontWeight: 500 }}>
                            <FiClock size={11} /> {post.readingTime} min
                          </span>
                        </div>
                        <svg className="blog-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 7h10M8 3l4 4-4 4"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '.85rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '.5em 1em', opacity: page === 1 ? .4 : 1, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--ink)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}>
                  ← {isEn ? 'Prev' : 'Poprzednia'}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, fontFamily: 'var(--fd)', fontWeight: p === page ? 700 : 500, fontSize: '.85rem', color: p === page ? 'var(--ink)' : 'var(--muted)', background: 'none', border: 'none', borderBottom: `2px solid ${p === page ? 'var(--ink)' : 'transparent'}`, cursor: 'pointer', transition: 'all .2s' }}>
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '.85rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '.5em 1em', opacity: page === totalPages ? .4 : 1, transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--ink)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}>
                  {isEn ? 'Next' : 'Następna'} →
                </button>
              </nav>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}