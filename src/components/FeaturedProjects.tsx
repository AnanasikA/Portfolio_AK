'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const textVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0,   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, y: -14, transition: { duration: 0.3,  ease: [0.55, 0, 1, 0.45] as const } },
};

export default function FeaturedProjects() {
  const t = useTranslations('featuredProjects');

  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pausedRef = useRef(false);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const imgRef    = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const rxRef     = useRef(0);
  const ryRef     = useRef(0);

  const projects = [
   {
  index: '01', cat: t('projects.marcinkowal.category'), title: t('projects.marcinkowal.title'),
  chips: ['Bold typografia', 'Animacje CSS', 'Next.js'],
  desc: t('projects.marcinkowal.description'),
  stats: [
    { num: '5',    label: t('projects.marcinkowal.stat1') ?? 'sekcji z animacjami' },
    { num: '100%', label: t('projects.marcinkowal.stat2') ?? 'responsywna' },
  ],
  image: '/projects/marcin-kowal1.webp',
  href: '/projects/marcin-kowal',
},
    {
  index: '02', cat: t('projects.studioforma.category'), title: t('projects.studioforma.title'),
  chips: ['Architektura wnętrz', 'Framer Motion', 'Next.js'],
  desc: t('projects.studioforma.description'),
  stats: [
    { num: '6',   label: t('projects.studioforma.stat1') ?? 'stron usług' },
    { num: '100%', label: t('projects.studioforma.stat2') ?? 'responsywna' },
  ],
  image: '/projects/studio-forma/hero.webp',
  href: '/projects/studio-forma',
},
    {
      index: '03',
      cat: t('projects.accounting.category'),
      title: t('projects.accounting.title'),
      chips: ['Oferta usług', 'Formularz kontaktowy', 'WordPress'],
      desc: t('projects.accounting.description'),
      stats: [
        { num: '+40%', label: t('projects.accounting.stat1') ?? 'więcej zapytań' },
        { num: '2x',   label: t('projects.accounting.stat2') ?? 'prostszy kontakt' },
      ],
      image: '/projects/accounting/hero.webp',
      href: '/projects/accounting',
    },
  ];

  const p = projects[current];

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const advanceProject = useCallback(() => {
    if (!pausedRef.current) setCurrent(c => (c + 1) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (!mounted) return;
    timerRef.current = setInterval(advanceProject, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advanceProject, mounted]);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advanceProject, 5000);
  };

  const handleImgMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    rxRef.current = -((e.clientY - r.top)  / r.height - 0.5) * 7;
    ryRef.current =  ((e.clientX - r.left) / r.width  - 0.5) * 7;
    applyTilt(false);
  };
  const handleImgLeave = () => { rxRef.current = 0; ryRef.current = 0; applyTilt(true); };
  const applyTilt = (smooth: boolean) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!imgRef.current) return;
      imgRef.current.style.transition = smooth
        ? 'transform .6s cubic-bezier(.22,1,.36,1)'
        : 'transform .08s linear';
      imgRef.current.style.transform =
        `perspective(900px) rotateX(${rxRef.current}deg) rotateY(${ryRef.current}deg) scale(1.01)`;
    });
  };

  return (
    <section
      id="projekty"
      style={{ padding: 'clamp(48px,7vw,100px) 0' }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:20, marginBottom:'clamp(32px,5vw,56px)' }}>
          <div>
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ display:'inline-flex', alignItems:'center', gap:'.6em', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--brand)', marginBottom:14 }}>
              <span style={{ width:26, height:1.5, background:'currentColor', display:'inline-block', opacity:.6 }} />
              {t('badge')}
            </motion.span>
            <motion.h2 variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ fontFamily:'var(--fd)', fontWeight:600, letterSpacing:'-.03em', lineHeight:1.04, color:'var(--ink)', fontSize:'clamp(1.7rem,3.5vw,2.8rem)', maxWidth:680 }}>
              {t('title')}
            </motion.h2>
          </div>
          <Link href="/projects" locale={undefined}
            style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.9rem', color:'var(--ink)', display:'inline-flex', alignItems:'center', gap:'.5em', textDecoration:'none', whiteSpace:'nowrap' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='var(--brand)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='var(--ink)'}>
            {t('allProjects')} →
          </Link>
        </div>

<style>{`
  .fp-inner { display:grid; grid-template-columns:1fr; gap:40px; align-items:center; }
  @media(min-width:860px){ .fp-inner { grid-template-columns:1fr 1fr; gap:64px; } }

  .project-tabs {
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .project-tabs::-webkit-scrollbar { display: none; }

  .project-tab-btn {
    flex: 1;
    min-width: 0;
    padding: 16px 12px;
    border: none;
    cursor: pointer;
    background: transparent;
    text-align: left;
    border-bottom: 2px solid transparent;
    transition: border-color .25s ease;
  }
  .project-tab-btn--active {
    border-bottom-color: var(--brand);
  }
  .project-tab-num {
    font-family: var(--fd);
    font-weight: 600;
    font-size: .68rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
    transition: color .25s;
  }
  .project-tab-title {
    font-family: var(--fd);
    font-weight: 600;
    font-size: clamp(.78rem, 1.1vw, .95rem);
    transition: color .25s;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

    @media (max-width: 560px) {
    .project-tabs { display: none; }
  }
          @media(max-width:640px){ .project-tabs button { min-width:160px; } }
        `}</style>

        <div className="fp-inner">

          {/* IMAGE */}
          <div
            ref={imgRef}
            onMouseMove={handleImgMove}
            onMouseLeave={handleImgLeave}
            style={{
              position: 'relative',
              borderRadius: 20,
              border: '1px solid var(--line)',
              boxShadow: '0 24px 80px rgba(15,23,42,0.12)',
              overflow: 'hidden',
              willChange: 'transform',
              background: '#f8fafc',
            }}
          >
            {/* browser bar */}
            <div style={{ height:40, display:'flex', alignItems:'center', gap:6, padding:'0 14px', borderBottom:'1px solid var(--line)', background:'rgba(255,255,255,.9)', backdropFilter:'blur(12px)', flexShrink:0 }}>
              {['#ef4444','#f59e0b','#22c55e'].map(c => (
                <span key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, display:'block' }} />
              ))}
              <div style={{ marginLeft:12, height:20, flex:1, borderRadius:99, background:'#eef2f7' }} />
            </div>

            {/* image — responsywne proporcje, tylko góra */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  priority={current === 0}
                  sizes="(min-width:860px) 40vw, 90vw"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* TEXT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={textVariants}
              initial="enter" animate="center" exit="exit"
              style={{ display:'flex', flexDirection:'column', gap:18 }}
            >
              <p style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.12em', textTransform:'uppercase', color:'var(--brand)', margin:0 }}>
                {p.index} — {p.cat}
              </p>
              <h3 style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(1.6rem,3vw,2.4rem)', letterSpacing:'-.03em', color:'var(--ink)', lineHeight:1.08, margin:0 }}>
                {p.title}
              </h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {p.chips.map(c => (
                  <span key={c} style={{ fontFamily:'var(--fd)', display:'inline-flex', alignItems:'center', padding:'.3em .85em', borderRadius:99, background:'var(--surface)', border:'1px solid var(--line)', color:'var(--muted)', fontSize:'.78rem', fontWeight:600 }}>{c}</span>
                ))}
              </div>
              <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(.9rem,1.1vw,1rem)', color:'var(--muted)', lineHeight:1.65, margin:0 }}>
                {p.desc}
              </p>
              <div style={{ display:'flex', gap:32, padding:'20px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}>
                {p.stats.map(s => (
                  <div key={s.num}>
                    <span style={{ fontFamily:'var(--fd)', fontWeight:700, fontSize:'clamp(1.4rem,2.2vw,2rem)', color:'var(--ink)', letterSpacing:'-.03em', display:'block', lineHeight:1 }}>{s.num}</span>
                    <small style={{ fontFamily:'var(--fb)', fontSize:'.78rem', color:'var(--muted)', marginTop:4, display:'block' }}>{s.label}</small>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
                <Link href={p.href}
                  style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.95rem', color:'var(--brand)', display:'inline-flex', alignItems:'center', gap:6, textDecoration:'none', transition:'gap .2s', position:'relative' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap='12px'; const l = (e.currentTarget as HTMLElement).querySelector('.cta-line') as HTMLElement; if(l) l.style.transform='scaleX(1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap='6px'; const l = (e.currentTarget as HTMLElement).querySelector('.cta-line') as HTMLElement; if(l) l.style.transform='scaleX(0)'; }}>
                  <span style={{ position:'relative' }}>
                    {t('cta')}
                    <span className="cta-line" style={{ position:'absolute', bottom:-2, left:0, right:0, height:1.5, background:'var(--brand)', borderRadius:1, transform:'scaleX(0)', transformOrigin:'left center', transition:'transform .35s cubic-bezier(.22,1,.36,1)', display:'block' }} />
                  </span>
                  →
                </Link>
                <div style={{ display:'flex', gap:8 }}>
                  {projects.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={`Projekt ${i+1}`} style={{ height:6, borderRadius:3, border:'none', cursor:'pointer', padding:0, transition:'all .3s ease', width:current===i?24:6, background:current===i?'var(--brand)':'var(--line)' }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div className="project-tabs" style={{ marginTop:'clamp(24px,4vw,48px)', borderTop:'1px solid var(--line)' }}>
  {projects.map((proj, i) => (
    <button
      key={i}
      onClick={() => goTo(i)}
      aria-label={`Projekt ${i+1}`}
      className={`project-tab-btn${current === i ? ' project-tab-btn--active' : ''}`}
    >
      <span className="project-tab-num" style={{ color: current===i ? 'var(--brand)' : 'var(--muted)' }}>
        {proj.index}
      </span>
      <span className="project-tab-title" style={{ color: current===i ? 'var(--ink)' : 'var(--muted)' }}>
        {proj.title}
      </span>
    </button>
  ))}
</div>

      </div>
    </section>
  );
}