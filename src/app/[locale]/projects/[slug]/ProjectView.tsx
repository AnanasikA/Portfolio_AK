'use client';

import Script from 'next/script';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useInView, animate, motion } from 'framer-motion';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import { FiChevronLeft, FiExternalLink } from 'react-icons/fi';
import Footer from '@/components/Footer';

type Project = {
  slug: string;
  image: string;
  fullImage?: string;
  cardImage: string;
  ratio?: number;
  tech: string[];
  link?: string;
};

type Challenge = {
  problem: string;
  solution: string;
};

const SITE_URL = 'https://anastasiiakupriianets.pl';

/* ── shared inline style helpers ── */
const chip = (active = false): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '4px 12px', borderRadius: 99,
  background: active ? 'var(--brand-tint)' : 'var(--surface)',
  border: '1px solid var(--line)',
  color: active ? 'var(--brand)' : 'var(--muted)',
  fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.78rem',
  whiteSpace: 'nowrap' as const,
});

/**
 * Hook: automatycznie przewija kontener w dół, gdy wjeżdża w viewport.
 * Zatrzymuje się na hover (żeby user mógł się zatrzymać i przyjrzeć),
 * i wraca na górę, gdy element opuszcza viewport.
 */
function useAutoScrollScreenshot(
  containerRef: React.RefObject<HTMLDivElement | null>,
  imgLoaded: boolean,
) {
  const isInView = useInView(containerRef, { amount: 0.35 });
  const isPausedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !imgLoaded) return;

    let controls: ReturnType<typeof animate> | null = null;

    const start = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      // czas trwania proporcjonalny do wysokości strony — dłuższa strona = wolniejszy, spokojniejszy scroll
      const duration = Math.min(22, Math.max(6, maxScroll / 100));
      controls = animate(el.scrollTop, maxScroll, {
        duration,
        delay: 0.6,
        ease: 'linear',
        onUpdate: (v) => {
          if (!isPausedRef.current) el.scrollTop = v;
        },
      });
    };

    if (isInView) {
      start();
    } else {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => controls?.stop();
  }, [isInView, imgLoaded, containerRef]);

  return {
    onMouseEnter: () => { isPausedRef.current = true; },
    onMouseLeave: () => { isPausedRef.current = false; },
  };
}

export default function ProjectView({ project: p }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const locale  = useLocale();
  const t       = useTranslations('projects');
  const tPage   = useTranslations('projectsPage');
  const tDetail = useTranslations('projectDetail');

  const screenshotRef = useRef<HTMLDivElement>(null);
  const scrollHandlers = useAutoScrollScreenshot(screenshotRef, imgLoaded);

  const title       = t(`${p.slug}.title`);
  const description = t(`${p.slug}.description`);
  const overview    = t.has(`${p.slug}.overview`)    ? t(`${p.slug}.overview`)                         : '';
  const timeframe   = t.has(`${p.slug}.timeframe`)   ? t(`${p.slug}.timeframe`)                        : '';
  const work        = t.has(`${p.slug}.work`)        ? (t.raw(`${p.slug}.work`)        as string[])    : [];
  const highlights  = t.has(`${p.slug}.highlights`)  ? (t.raw(`${p.slug}.highlights`)  as string[])    : [];
  const challenges  = t.has(`${p.slug}.challenges`)  ? (t.raw(`${p.slug}.challenges`)  as Challenge[]) : [];
  const decisions   = t.has(`${p.slug}.decisions`)   ? (t.raw(`${p.slug}.decisions`)   as string[])    : [];
  const integrations= t.has(`${p.slug}.integrations`)? (t.raw(`${p.slug}.integrations`)as string[])    : [];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const absoluteProjectUrl = `${SITE_URL}/projects/${p.slug}`;
  const absoluteImageUrl   = `${SITE_URL}${p.cardImage ?? p.image}`;

  const structuredData = useMemo(() => ([
    {
      '@context': 'https://schema.org', '@type': 'CreativeWork',
      name: title, description, url: absoluteProjectUrl, image: absoluteImageUrl,
      author: { '@type': 'Person', name: 'Anastasiia Kupriianets', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'AK Web & Design', url: SITE_URL },
      inLanguage: locale === 'en' ? 'en' : 'pl', keywords: p.tech.join(', '),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'en' ? 'Home' : 'Strona główna', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'Projects' : 'Projekty', item: `${SITE_URL}/projects` },
        { '@type': 'ListItem', position: 3, name: title, item: absoluteProjectUrl },
      ],
    },
  ]), [absoluteImageUrl, absoluteProjectUrl, description, locale, p.tech, title]);

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(1.3rem,2vw,1.6rem)', letterSpacing: '-.02em', color: 'var(--ink)', marginBottom: 20, lineHeight: 1.2 }}>
      {children}
    </h2>
  );

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      <Script id={`project-schema-${p.slug}`} type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Header isOpen={isOpen} toggleMenu={() => setIsOpen(p => !p)} />
      <DropdownMenu isOpen={isOpen} toggleMenu={() => setIsOpen(p => !p)} />

      <main style={{ paddingTop: 'clamp(100px,14vh,140px)', paddingBottom: 'clamp(64px,10vw,120px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

          {/* Breadcrumb */}
          <nav style={{ marginBottom: 32 }}>
            <Link href="/projects" locale={locale}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.85rem', color: 'var(--muted)', textDecoration: 'none', padding: '6px 14px 6px 10px', borderRadius: 99, border: '1px solid var(--line)', transition: 'color .2s, border-color .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--brand)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; }}>
              <FiChevronLeft size={14} />
              {tPage('backToProjects')}
            </Link>
          </nav>

          {/* Hero header */}
          <header style={{ marginBottom: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 320px' }}>
              <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(2rem,5vw,3.6rem)', letterSpacing: '-.035em', lineHeight: .97, color: 'var(--ink)', marginBottom: 16 }}>
                {title}
              </h1>
              <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(1rem,1.4vw,1.18rem)', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '64ch', marginBottom: 20 }}>
                {description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tech.map(tech => (
                  <span key={tech} style={chip(true)}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Ikonka "scroll mouse" — zachęta do przewijania w dół */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flexShrink: 0, paddingBottom: 4 }}
            >
              <div
                style={{
                  width: 26,
                  height: 42,
                  borderRadius: 13,
                  border: '2px solid var(--line)',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: 6,
                }}
              >
                <motion.span
                  animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 4, height: 8, borderRadius: 2, background: 'var(--brand)', display: 'block' }}
                />
              </div>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.68rem', letterSpacing: '.06em', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                {tDetail.has('scrollHint') ? tDetail('scrollHint') : (locale === 'en' ? 'Scroll' : 'Przewiń')}
              </span>
            </motion.div>
          </header>

          {/* Screenshot browser frame */}
          <div style={{ borderRadius: 'var(--r-l)', overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 'clamp(40px,6vw,72px)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            {/* browser bar */}
            <div style={{ height: 44, background: 'var(--surface)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />
                ))}
              </div>
              <div style={{ flex: 1, height: 26, background: 'var(--bg)', borderRadius: 6, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                <span style={{ fontFamily: 'var(--fb)', fontSize: 12, color: 'var(--muted)' }}>
                  {p.link ?? `anastasiiakuprianets.pl/projects/${p.slug}`}
                </span>
              </div>
            </div>
            {/* screenshot — auto-scroll gdy sekcja wjeżdża w viewport, pauza na hover */}
            <div
              ref={screenshotRef}
              onMouseEnter={scrollHandlers.onMouseEnter}
              onMouseLeave={scrollHandlers.onMouseLeave}
              style={{ maxHeight: '72svh', overflowY: 'auto', background: 'var(--surface)', scrollbarWidth: 'thin' }}
            >
              <Image
                src={p.fullImage ?? p.image} alt={tDetail('imageAlt', { title })}
                priority draggable={false}
                onLoad={() => setImgLoaded(true)}
                sizes="(min-width:1024px) 75vw, 95vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                width={2000} height={1000}
              />
            </div>
          </div>

          {/* Content grid */}
          <style>{`
            .pv-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
            @media (min-width: 768px) { .pv-grid { grid-template-columns: 1fr 320px; gap: 64px; align-items: start; } }
          `}</style>

          <div className="pv-grid">

            {/* Main content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

              {overview && (
                <section>
                  <SectionTitle>{tDetail('overviewTitle')}</SectionTitle>
                  <p style={{ fontFamily: 'var(--fb)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7 }}>{overview}</p>
                </section>
              )}

              {timeframe && (
                <div>
                  <span style={chip()}>⏱ {tDetail('timeframeLabel')}: <strong style={{ color: 'var(--ink)' }}>{timeframe}</strong></span>
                </div>
              )}

              {work.length > 0 && (
                <section>
                  <SectionTitle>{tDetail('workTitle')}</SectionTitle>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12, listStyle: 'none' }}>
                    {work.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)' }}>
                        <span style={{ color: 'var(--brand)', marginTop: 2, flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: 'var(--fb)', fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {highlights.length > 0 && (
                <section>
                  <SectionTitle>{tDetail('resultsTitle')}</SectionTitle>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none' }}>
                    {highlights.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)', borderLeft: '3px solid var(--brand)' }}>
                        <span style={{ color: 'var(--brand)', fontWeight: 700, flexShrink: 0 }}>↗</span>
                        <span style={{ fontFamily: 'var(--fb)', fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {challenges.length > 0 && (
                <section>
                  <SectionTitle>{tDetail('challengesTitle')}</SectionTitle>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {challenges.map((c, i) => (
                      <div key={i} style={{ borderRadius: 'var(--r-l)', border: '1px solid var(--line)', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                          <div style={{ padding: '16px 20px', borderRight: '1px solid var(--line)' }}>
                            <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>{tDetail('challengeLabel')}</p>
                            <p style={{ fontFamily: 'var(--fb)', fontSize: '.9rem', color: 'var(--ink)', lineHeight: 1.55 }}>{c.problem}</p>
                          </div>
                          <div style={{ padding: '16px 20px', background: 'var(--surface)' }}>
                            <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 8 }}>{tDetail('solutionLabel')}</p>
                            <p style={{ fontFamily: 'var(--fb)', fontSize: '.9rem', color: 'var(--ink)', lineHeight: 1.55 }}>{c.solution}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {decisions.length > 0 && (
                <section>
                  <SectionTitle>{tDetail('decisionsTitle')}</SectionTitle>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12, listStyle: 'none' }}>
                    {decisions.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r)' }}>
                        <span style={{ color: 'var(--brand)', marginTop: 2, flexShrink: 0 }}>→</span>
                        <span style={{ fontFamily: 'var(--fb)', fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {integrations.length > 0 && (
                <section>
                  <SectionTitle>{tDetail('integrationsTitle')}</SectionTitle>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {integrations.map(name => (
                      <span key={name} style={chip()}>{name}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-l)', padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontFamily: 'var(--fb)', fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {tDetail('sidebarText')}
                </p>

                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.92rem', background: 'var(--brand)', color: '#fff', borderRadius: 99, padding: '.75em 1.5em', textDecoration: 'none', transition: 'opacity .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '.85'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                    <FiExternalLink size={14} />
                    {tDetail('viewOnline')}
                  </a>
                )}

                <Link href="/#contact" locale={locale}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.92rem', color: 'var(--ink)', borderRadius: 99, padding: '.75em 1.5em', border: '1.5px solid var(--line)', textDecoration: 'none', transition: 'border-color .2s, color .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}>
                  {tDetail('contact')}
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}