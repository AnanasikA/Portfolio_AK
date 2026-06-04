'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiCalendar, FiArrowRight, FiTag } from 'react-icons/fi';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';
import type { Post } from '@/lib/blog';

type Props = { post: Post; locale: string; mdxContent: React.ReactNode };

export default function BlogPostClient({ post, locale, mdxContent }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const isEn = locale === 'en';

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={() => setIsOpen(p => !p)} />
      <DropdownMenu isOpen={isOpen} toggleMenu={() => setIsOpen(p => !p)} />

      <style>{`
        .blog-article h2 {
          margin-top: 2.5rem;
          font-family: var(--fd);
          font-size: clamp(1.3rem, 2.2vw, 1.7rem);
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -.025em;
          color: var(--ink);
          padding-bottom: .5rem;
          border-bottom: 1.5px solid var(--line);
        }
        .blog-article h3 {
          margin-top: 1.8rem;
          font-family: var(--fd);
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          font-weight: 600;
          line-height: 1.35;
          color: var(--ink);
        }
        .blog-article p {
          margin-top: 1.1rem;
          font-family: var(--fb);
          font-size: 1rem;
          line-height: 1.85;
          color: var(--muted);
        }
        .blog-article ul { margin-top: 1.1rem; padding-left: 0; list-style: none; }
        .blog-article ol { margin-top: 1.1rem; padding-left: 1.5rem; }
        .blog-article ul li {
          display: flex; align-items: flex-start; gap: .7rem;
          margin-bottom: .55rem; font-family: var(--fb);
          font-size: 1rem; line-height: 1.75; color: var(--muted);
        }
        .blog-article ul li::before {
          content: ''; display: block; width: 7px; height: 7px;
          border-radius: 50%; background: var(--brand);
          flex-shrink: 0; margin-top: .55rem;
        }
        .blog-article ol li {
          margin-bottom: .55rem; font-family: var(--fb);
          font-size: 1rem; line-height: 1.75; color: var(--muted);
        }
        .blog-article strong { font-weight: 600; color: var(--ink); }
        .blog-article a { color: var(--brand); text-decoration: underline; text-underline-offset: 2px; }
        .blog-article a:hover { opacity: .75; }
        .blog-article blockquote {
          margin: 1.5rem 0;
          border-left: 3px solid var(--brand);
          padding: .75rem 1.25rem;
          background: var(--brand-tint);
          border-radius: 0 12px 12px 0;
          color: var(--muted); font-style: italic;
        }
        .blog-article code {
          background: var(--surface); border-radius: 6px;
          padding: .15rem .4rem; font-family: monospace;
          font-size: .875rem; color: var(--ink);
        }
        .blog-article pre {
          margin: 1.5rem 0; overflow-x: auto;
          border-radius: 14px; background: var(--ink);
          padding: 1.25rem; font-size: .875rem; color: var(--bg);
        }
        .blog-article hr { margin: 2rem 0; border-color: var(--line); }
      `}</style>

      <main style={{ background: 'var(--bg)', color: 'var(--ink)' }}>

        {/* ── Hero ── */}
        <div style={{
          background: 'var(--bg)',
          paddingTop: 'clamp(100px,14vh,140px)',
          paddingBottom: 'clamp(32px,5vw,56px)',
          borderBottom: '1px solid var(--line)',
        }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

            {/* back link */}
            <Link href="/blog"
              style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:'var(--fd)', fontWeight:600, fontSize:'.85rem', color:'var(--muted)', textDecoration:'none', marginBottom:28, transition:'color .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='var(--brand)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='var(--muted)'}>
              <FiArrowLeft size={14} />
              {isEn ? 'Back to blog' : 'Wróć do bloga'}
            </Link>

            {/* tags */}
            {post.tags.length > 0 && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 12px', borderRadius:99, background:'var(--brand-tint)', border:'1px solid var(--line)', color:'var(--brand)', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.75rem' }}>
                    <FiTag size={11} />{tag}
                  </span>
                ))}
              </div>
            )}

            {/* title */}
            <h1 style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(2rem,5vw,3.6rem)', letterSpacing:'-.035em', lineHeight:.97, color:'var(--ink)', marginBottom:16, maxWidth:'18ch' }}>
              {post.title}
            </h1>

            <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(1rem,1.4vw,1.18rem)', color:'var(--muted)', lineHeight:1.6, maxWidth:'60ch', marginBottom:20 }}>
              {post.description}
            </p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:20 }}>
              {[
                { icon: <FiCalendar size={14}/>, label: new Date(post.date).toLocaleDateString(isEn ? 'en-GB' : 'pl-PL', { day:'numeric', month:'long', year:'numeric' }) },
                { icon: <FiClock size={14}/>,    label: `${post.readingTime} min ${isEn ? 'read' : 'czytania'}` },
              ].map(({ icon, label }) => (
                <span key={label} style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:'var(--fb)', fontSize:'.85rem', color:'var(--muted)' }}>
                  {icon}{label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ background: 'var(--surface)', paddingTop: 'clamp(32px,5vw,56px)', paddingBottom: 'clamp(64px,10vw,120px)', overflowX: 'clip' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

            <style>{`
              .blog-layout { display: grid; grid-template-columns: 1fr; gap: 40px; }
              @media (min-width: 1100px) { .blog-layout { grid-template-columns: 1fr 300px; gap: 56px; } }
              .blog-sidebar { align-self: start; }
              .blog-sidebar-inner { position: -webkit-sticky; position: sticky; top: 108px; display: flex; flex-direction: column; gap: 16px; }
            `}</style>

            <div className="blog-layout">

              {/* Article */}
              <div>
                <div style={{ background:'var(--bg)', borderRadius:'var(--r-l)', border:'1px solid var(--line)', boxShadow:'0 4px 24px rgba(0,0,0,0.05)', overflow:'hidden' }}>
                  <article className="blog-article" style={{ padding:'clamp(28px,5vw,56px)' }}>
                    {mdxContent}
                  </article>
                </div>

                {/* CTA banner */}
                <div style={{
                  marginTop: 24,
                  background: 'linear-gradient(135deg,var(--brand) 0%,var(--brand-deep,#1e40af) 100%)',
                  borderRadius: 'var(--r-l)', padding: 'clamp(28px,4vw,40px)',
                  textAlign: 'center', color: '#fff',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div aria-hidden style={{ position:'absolute', top:-60, right:-60, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.06)', pointerEvents:'none' }} />
                  <p style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(1.1rem,2vw,1.5rem)', marginBottom:8 }}>
                    {isEn ? 'Need a website for your business?' : 'Potrzebujesz strony dla swojej firmy?'}
                  </p>
                  <p style={{ fontFamily:'var(--fb)', fontSize:'.95rem', color:'rgba(255,255,255,.8)', marginBottom:24 }}>
                    {isEn ? 'Write to me — I will help you choose the right solution.' : 'Napisz do mnie — pomogę dobrać odpowiednie rozwiązanie.'}
                  </p>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-brief'))}
                    style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--fd)', fontWeight:600, fontSize:'.95rem', background:'#fff', color:'var(--brand)', borderRadius:99, padding:'.8em 1.8em', border:'none', cursor:'pointer', transition:'transform .25s, box-shadow .25s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(0,0,0,.2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
                    {isEn ? 'Get a free quote' : 'Zapytaj o wycenę'} <FiArrowRight size={14}/>
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="sticky blog-sidebar">
                <div className="blog-sidebar-inner">

                  {/* Info */}
                  <div style={{ background:'var(--bg)', borderRadius:'var(--r-l)', border:'1px solid var(--line)', padding:'clamp(18px,2.5vw,24px)' }}>
                    <p style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.7rem', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:16 }}>
                      {isEn ? 'About the article' : 'O artykule'}
                    </p>
                    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                      {[
                        { icon: <FiCalendar size={14}/>, label: new Date(post.date).toLocaleDateString(isEn ? 'en-GB' : 'pl-PL', { day:'numeric', month:'long', year:'numeric' }) },
                        { icon: <FiClock size={14}/>,    label: `${post.readingTime} min ${isEn ? 'read' : 'czytania'}` },
                      ].map(({ icon, label }) => (
                        <div key={label} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--fb)', fontSize:'.85rem', color:'var(--muted)' }}>
                          <span style={{ color:'var(--brand)' }}>{icon}</span>{label}
                        </div>
                      ))}
                      {post.tags.length > 0 && (
                        <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                          <span style={{ color:'var(--brand)', marginTop:1, flexShrink:0 }}><FiTag size={14}/></span>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                            {post.tags.map(tag => (
                              <span key={tag} style={{ padding:'2px 10px', borderRadius:99, background:'var(--brand-tint)', color:'var(--brand)', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.72rem' }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA sidebar */}
                  <div style={{ background:'var(--bg)', borderRadius:'var(--r-l)', border:'1px solid var(--line)', padding:'clamp(18px,2.5vw,24px)' }}>
                    <p style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'1rem', color:'var(--ink)', marginBottom:8, lineHeight:1.3 }}>
                      {isEn ? 'Ready to start your project?' : 'Gotowy na nową stronę?'}
                    </p>
                    <p style={{ fontFamily:'var(--fb)', fontSize:'.85rem', color:'var(--muted)', lineHeight:1.6, marginBottom:16 }}>
                      {isEn ? 'Get a free quote — no strings attached.' : 'Bezpłatna wycena bez zobowiązań.'}
                    </p>
                    <button
                      onClick={() => window.dispatchEvent(new CustomEvent('open-brief'))}
                      style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'var(--fd)', fontWeight:600, fontSize:'.9rem', background:'var(--brand)', color:'#fff', borderRadius:99, padding:'.75em 1.5em', border:'none', cursor:'pointer', transition:'opacity .2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity='.85'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity='1'}>
                      {isEn ? 'Request a quote' : 'Zapytaj o wycenę'} <FiArrowRight size={13}/>
                    </button>
                  </div>

                  {/* Back */}
                  <Link href="/blog"
                    style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'var(--fd)', fontWeight:600, fontSize:'.85rem', color:'var(--muted)', textDecoration:'none', background:'var(--bg)', borderRadius:'var(--r-l)', border:'1px solid var(--line)', padding:'14px 18px', transition:'color .2s, border-color .2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--brand)'; (e.currentTarget as HTMLElement).style.borderColor='var(--brand)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor='var(--line)'; }}>
                    <FiArrowLeft size={14}/>
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