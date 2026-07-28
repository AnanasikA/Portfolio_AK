'use client';

import Image from 'next/image';
import { useMemo, useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import type { ProjectItem } from '@/data/projects';
import { trackEvent } from '@/lib/gtag';


function CountUp({ to, suffix = '', delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    obs.observe(el);

    // fallback dla mobile/Safari
    const fallback = setTimeout(() => setStarted(true), 600);

    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const delayMs = delay * 1000;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime - delayMs;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setVal(Math.round(eased * to));

      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, delay]);

  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {val}{suffix}
    </span>
  );
}

const PER_PAGE = 6;

const categoryMap: Record<string, string[]> = {
  business:   ['biuro-ksiegowe', 'lion-force-weld', 'marecki-24-7', 'goports', 'booknest'],
  realestate: ['crescent-development', 'realestate'],
  tourism:    ['luisowka'],
  wellness:   ['spiro-pilates-mobility', 'zdrowie-plus'],
  personal:   ['photographer', 'luxenails', 'quest-for-paws', 'studybuddy', 'marcin-kowal', 'studio-forma'],
};

export default function Projects({ currentPage = 1 }: { currentPage?: number }) {
  const tPage     = useTranslations('projectsPage');
  const tProjects = useTranslations('projects');
  const locale    = useLocale();
  const isEn      = locale === 'en';
  const gridRef   = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = isEn ? [
    { key: 'all',        label: 'All projects' },
    { key: 'business',   label: 'Business' },
    { key: 'realestate', label: 'Real estate' },
    { key: 'tourism',    label: 'Tourism & stays' },
    { key: 'wellness',   label: 'Health & wellness' },
    { key: 'personal',   label: 'Personal brands' },
  ] : [
    { key: 'all',        label: 'Wszystkie projekty' },
    { key: 'business',   label: 'Strony firmowe' },
    { key: 'realestate', label: 'Nieruchomości' },
    { key: 'tourism',    label: 'Turystyka i noclegi' },
    { key: 'wellness',   label: 'Zdrowie i wellness' },
    { key: 'personal',   label: 'Marki osobiste' },
  ];

  const totalPages = Math.ceil(projects.length / PER_PAGE);
  const safePage   = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (safePage - 1) * PER_PAGE;

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    const slugs = categoryMap[activeFilter] ?? [];
    return projects.filter(p => slugs.includes(p.slug));
  }, [activeFilter]);

  const visible = activeFilter === 'all'
    ? filteredProjects.slice(startIndex, startIndex + PER_PAGE)
    : filteredProjects;

  const getPageHref = (p: number) => p <= 1 ? '/projects' : `/projects?page=${p}`;

  const schema = useMemo(() => ({
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: isEn ? 'Selected web design projects' : 'Wybrane realizacje stron internetowych',
    numberOfItems: visible.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: visible.map((p, i) => ({
      '@type': 'ListItem', position: startIndex + i + 1,
      url: `/projects/${p.slug}`, name: tProjects(`${p.slug}.title`),
    })),
  }), [visible, startIndex, isEn, tProjects]);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.proj-card');
    if (!cards) return;
    cards.forEach(c => c.classList.remove('proj-card--visible'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const d = parseInt(el.dataset.delay ?? '0');
          setTimeout(() => el.classList.add('proj-card--visible'), d);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.08 });
    setTimeout(() => cards.forEach(c => obs.observe(c)), 50);
    return () => obs.disconnect();
  }, [visible, activeFilter]);


const stats = isEn ? [
  { to: 40, suffix: '+', label: 'Projects delivered',  sub: 'Live across Europe' },
  { to: 6,  suffix: '',  label: 'Industries served',   sub: 'Stays, property, wellness & more' },
  { to: 5,  suffix: '',  label: 'Site types',          sub: 'Business, landing, WP, redesign' },
] : [
  { to: 40, suffix: '+', label: 'Zrealizowanych projektów', sub: 'Wdrożone i działające w całej Europie' },
  { to: 6,  suffix: '',  label: 'Obsłużonych branż',         sub: 'Noclegi, nieruchomości, wellness i więcej' },
  { to: 5,  suffix: '',  label: 'Typów stron',               sub: 'Firmowe, landing, WordPress, redesign i opieka' },
];



  return (
    <>
      <style>{`
        .proj-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .5s ease, transform .5s ease;
          display: flex;
          flex-direction: column;
        }
        .proj-card--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .proj-img-wrap {
          position: relative;
          overflow: hidden;
          background: var(--surface);
          flex-shrink: 0;
        }
        .proj-card:hover .proj-overlay { opacity: 1; }
        .proj-overlay {
          position: absolute; inset: 0;
          background: rgba(10,15,26,.42);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity .3s ease;
        }
        .proj-overlay-label {
          background: #fff; color: var(--ink);
          font-family: var(--fd); font-weight: 600; font-size: .8rem;
          padding: 8px 18px; border-radius: 99px;
        }
        .filter-btn {
          font-family: var(--fd); font-weight: 600; font-size: .8rem;
          padding: 7px 15px; border-radius: 99px;
          border: 1.5px solid var(--line);
          background: transparent; color: var(--muted);
          cursor: pointer; transition: all .2s ease; white-space: nowrap;
        }
        .filter-btn:hover { border-color: var(--ink); color: var(--ink); }
        .filter-btn--active { background: var(--ink); border-color: var(--ink); color: #fff; }

        /* Grid — row z wyrównaną wysokością */
        .proj-row {
          display: grid;
          gap: clamp(14px,2vw,20px);
          align-items: stretch;
        }
        .proj-row-2-1 { grid-template-columns: 3fr 2fr; }
        .proj-row-1-2 { grid-template-columns: 2fr 3fr; }
        .proj-row-eq  { grid-template-columns: 1fr 1fr; }
        .proj-row-3   { grid-template-columns: 1fr 1fr 1fr; }

        @media (max-width: 860px) {
          .proj-row-2-1,
          .proj-row-1-2,
          .proj-row-eq,
          .proj-row-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .proj-row-2-1,
          .proj-row-1-2,
          .proj-row-eq,
          .proj-row-3 { grid-template-columns: 1fr; }
        }

        .proj-body {
          padding: 16px 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'var(--bg)',
        paddingTop: 'clamp(100px,14vh,140px)',
        paddingBottom: 'clamp(48px,7vw,80px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 2, background: 'currentColor', display: 'inline-block' }} />
            {isEn ? 'Selected projects · 2023–2026' : 'Wybrane realizacje · 2023–2026'}
          </p>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,4.2rem)', letterSpacing: '-.04em', color: 'var(--ink)', lineHeight: .97, marginBottom: 'clamp(40px,6vw,64px)', maxWidth: '16ch' }}>
            {isEn
              ? 'Sites we designed and built to grow real businesses.'
              : 'Strony, które zaprojektowaliśmy i zbudowaliśmy, by rozwijać prawdziwe firmy.'}
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(24px,4vw,48px)', paddingTop: 'clamp(32px,4vw,48px)', borderTop: '1px solid var(--line)' }}>
        {stats.map((s, i) => (
  <div key={s.label}>
    <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: 'var(--brand)', letterSpacing: '-.04em', display: 'block', lineHeight: 1, marginBottom: 8 }}>
      <CountUp to={s.to} suffix={s.suffix} delay={i * 0.2} />
    </span>
    <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.82rem,1.1vw,.95rem)', color: 'var(--ink)', marginBottom: 4 }}>{s.label}</p>
    <p style={{ fontFamily: 'var(--fb)', fontSize: '.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{s.sub}</p>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ── GRID SECTION ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,80px) 0 clamp(64px,10vw,120px)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

          {/* Filters */}
          <div style={{ marginBottom: 'clamp(28px,4vw,40px)' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', letterSpacing: '-.035em', color: 'var(--ink)', marginBottom: 18 }}>
              {isEn ? 'Browse projects by industry.' : 'Przeglądaj projekty według branży.'}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {filters.map(f => (
                <button
                  key={f.key}
                  className={`filter-btn${activeFilter === f.key ? ' filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid z wyrównaną wysokością wierszy */}
          <div ref={gridRef} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2vw,20px)' }}>
            {activeFilter === 'all' ? (
              <>
                {/* Wiersz 1 — 3fr 2fr */}
                {visible.length >= 1 && (
                  <div className="proj-row proj-row-2-1">
                    {visible.slice(0, 2).map((project, i) => (
                      <ProjectCard key={project.slug} project={project} index={i} tProjects={tProjects} tPage={tPage} locale={locale} />
                    ))}
                  </div>
                )}
                {/* Wiersz 2 — 2fr 3fr */}
                {visible.length >= 3 && (
                  <div className="proj-row proj-row-1-2">
                    {visible.slice(2, 4).map((project, i) => (
                      <ProjectCard key={project.slug} project={project} index={i + 2} tProjects={tProjects} tPage={tPage} locale={locale} />
                    ))}
                  </div>
                )}
                {/* Wiersz 3 — równe */}
                {visible.length >= 5 && (
                  <div className="proj-row proj-row-eq">
                    {visible.slice(4, 6).map((project, i) => (
                      <ProjectCard key={project.slug} project={project} index={i + 4} tProjects={tProjects} tPage={tPage} locale={locale} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="proj-row proj-row-3">
                {visible.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} tProjects={tProjects} tPage={tPage} locale={locale} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {activeFilter === 'all' && totalPages > 1 && (
            <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              {safePage > 1 && (
                <Link href={getPageHref(safePage - 1)} locale={locale}
                  style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '.85rem', color: 'var(--muted)', textDecoration: 'none', padding: '.5em 1em', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--ink)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}>
                  ← {isEn ? 'Prev' : 'Poprzednia'}
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Link key={p} href={getPageHref(p)} locale={locale}
                  style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, fontFamily: 'var(--fd)', fontWeight: p === safePage ? 700 : 500, fontSize: '.85rem', color: p === safePage ? 'var(--ink)' : 'var(--muted)', textDecoration: 'none', borderBottom: `2px solid ${p === safePage ? 'var(--ink)' : 'transparent'}`, transition: 'all .2s' }}>
                  {p}
                </Link>
              ))}
              {safePage < totalPages && (
                <Link href={getPageHref(safePage + 1)} locale={locale}
                  style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '.85rem', color: 'var(--muted)', textDecoration: 'none', padding: '.5em 1em', transition: 'color .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--ink)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}>
                  {isEn ? 'Next' : 'Następna'} →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: 'var(--brand)', padding: 'clamp(56px,8vw,96px) clamp(20px,5vw,72px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 20 }}>
            {isEn ? 'Your project could be next' : 'Twój projekt może być następny'}
          </p>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.8rem,4.5vw,3.2rem)', letterSpacing: '-.04em', color: '#fff', lineHeight: 1.02, marginBottom: 24 }}>
            {isEn ? "Let's make your business the next success story." : 'Sprawmy, by Twoja firma była kolejną historią sukcesu.'}
          </h2>
          <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.9rem,1.3vw,1.05rem)', color: 'rgba(255,255,255,.75)', lineHeight: 1.65, maxWidth: '48ch', margin: '0 auto 32px' }}>
            {isEn
              ? 'Write briefly about your business. You\'ll get a reply with direction and a quote — usually within 1–2 business days.'
              : 'Napisz krótko o swojej firmie. Otrzymasz odpowiedź z kierunkiem i wyceną — zwykle w 1–2 dni robocze.'}
          </p>
          <button
            onClick={() => {
              trackEvent('generate_lead', { source: 'projects_page_cta' });
              window.dispatchEvent(new Event('open-brief'));
            }}
            style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', background: '#fff', color: 'var(--brand)', borderRadius: 99, padding: '.9em 2.2em', border: 'none', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s', marginBottom: 28 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,.2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
            {isEn ? 'Start a project →' : 'Rozpocznij projekt →'}
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 32px' }}>
            {(isEn
              ? ['Reply within 1–2 business days', 'Free, no-obligation quote', 'In Polish and English']
              : ['Odpowiedź w 1–2 dni robocze', 'Bezpłatna, niezobowiązująca wycena', 'Po polsku i angielsku']
            ).map(txt => (
              <span key={txt} style={{ fontFamily: 'var(--fb)', fontSize: '.82rem', color: 'rgba(255,255,255,.65)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,.4)', display: 'inline-block' }} />
                {txt}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, index, tProjects, tPage, locale }: {
  project: ProjectItem;
  index: number;
  tProjects: ReturnType<typeof useTranslations>;
  tPage: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const title       = tProjects(`${project.slug}.title`);
  const description = tProjects(`${project.slug}.description`);
  const cardImg     = project.cardImage || project.image;
  const href        = `/projects/${project.slug}`;

const categoryLabels: Record<string, { pl: string; en: string }> = {
  'studio-forma':           { pl: 'Architektura wnętrz',     en: 'Interior design' },
  'marcin-kowal':           { pl: 'Marka osobista',          en: 'Personal brand' },
  'biuro-ksiegowe':         { pl: 'Strona firmowa',         en: 'Business website' },
  'crescent-development':   { pl: 'Deweloper nieruchomości', en: 'Real estate' },
  'luisowka':               { pl: 'Turystyka i noclegi',     en: 'Tourism & stays' },
  'lion-force-weld':        { pl: 'Strona firmowa',         en: 'Business website' },
  'spiro-pilates-mobility': { pl: 'Zdrowie i wellness',      en: 'Health & wellness' },
  'zdrowie-plus':           { pl: 'Zdrowie i wellness',      en: 'Health & wellness' },
  'marecki-24-7':           { pl: 'Strona firmowa',         en: 'Business website' },
  'goports':                { pl: 'Strona firmowa',         en: 'Business website' },
  'realestate':             { pl: 'Nieruchomości',           en: 'Real estate' },
  'quest-for-paws':         { pl: 'Marka osobista',          en: 'Personal brand' },
  'studybuddy':             { pl: 'Edukacja',               en: 'Education' },
  'photographer':           { pl: 'Marka osobista',          en: 'Personal brand' },
  'luxenails':              { pl: 'Uroda i styl',            en: 'Beauty & style' },
  'booknest':               { pl: 'Sklep internetowy',       en: 'Online store' },
};
  const cat = categoryLabels[project.slug];
  const catLabel = cat ? (locale === 'en' ? cat.en : cat.pl) : '';

  return (
    <Link
      href={href}
      locale={locale}
      className="proj-card"
      data-delay={String(index * 80)}
      style={{ textDecoration: 'none', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--bg)' }}
    >
      {/* Image — stała wysokość żeby wiersz był wyrównany */}
      <div className="proj-img-wrap" style={{ height: 260 }}>
        <Image
          src={cardImg}
          alt={title}
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="(min-width:860px) 50vw, 100vw"
          loading={index < 2 ? 'eager' : 'lazy'}
          priority={index === 0}
        />
        <div className="proj-overlay">
          <span className="proj-overlay-label">{tPage('projectButton')} →</span>
        </div>
      </div>

      {/* Body */}
      <div className="proj-body">
        {catLabel && (
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 8 }}>
            {catLabel}
          </p>
        )}
        <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.9rem,1.3vw,1.05rem)', letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.2, marginBottom: 8 }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--fb)', fontSize: '.83rem', color: 'var(--muted)', lineHeight: 1.6,
          marginBottom: 14, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        } as React.CSSProperties}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 12, borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
          <span style={{ fontFamily: 'var(--fd)', fontSize: '.72rem', color: 'var(--muted-2)', fontWeight: 500 }}>
            {project.tech[0]}
          </span>
          {project.tech[1] && <>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ fontFamily: 'var(--fd)', fontSize: '.72rem', color: 'var(--muted-2)', fontWeight: 500 }}>
              {project.tech[1]}
            </span>
          </>}
        </div>
      </div>
    </Link>
  );
}