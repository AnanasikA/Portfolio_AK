'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, Mail, Menu, Phone, X } from 'lucide-react';
import { offerData as d } from '../offer.data';

function fmt(n: number) { return n.toLocaleString('pl-PL'); }

// ─── Typing effect ────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 38, startDelay = 300) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return displayed;
}

// ─── Animated number ─────────────────────────────────────────────────────────
function useAnimatedNumber(target: number) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  const raf  = useRef<number>(0);
  useEffect(() => {
    const from = prev.current;
    if (from === target) return;
    cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 500, 1);
      const e = 1 - Math.pow(1 - p, 2.5);
      setV(Math.round(from + (target - from) * e));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { prev.current = target; setV(target); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return v;
}

// ─── Blueprint Card ───────────────────────────────────────────────────────────
// Sekwencja: border → tło → dzieci
function BlueprintCard({
  children,
  style,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  className?: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const d0 = delay;
  const d1 = d0 + 0.15; // tło
  const d2 = d1 + 0.18; // dzieci

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* border top */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.35, delay: d0, ease: [.22,1,.36,1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'var(--brand)', transformOrigin: 'left', zIndex: 2 }}
      />
      {/* border bottom */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.35, delay: d0 + 0.08, ease: [.22,1,.36,1] }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--brand)', transformOrigin: 'right', zIndex: 2 }}
      />
      {/* border left */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: 0.3, delay: d0 + 0.16, ease: [.22,1,.36,1] }}
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 1, background: 'var(--brand)', transformOrigin: 'top', zIndex: 2 }}
      />
      {/* border right */}
      <motion.div
        initial={{ scaleY: 0 }} animate={{ scaleY: inView ? 1 : 0 }}
        transition={{ duration: 0.3, delay: d0 + 0.16, ease: [.22,1,.36,1] }}
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 1, background: 'var(--brand)', transformOrigin: 'bottom', zIndex: 2 }}
      />
      {/* tło */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.4, delay: d1 }}
        style={{ position: 'absolute', inset: 0, background: 'inherit', zIndex: 0 }}
      />
      {/* dzieci */}
      <motion.div
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 4 }}
        transition={{ duration: 0.35, delay: d2, ease: [.22,1,.36,1] }}
        style={{ position: 'relative', zIndex: 1, height: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
      <div style={{ width: 28, height: 2, background: 'var(--brand)', borderRadius: 99 }} />
      <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--brand)' }}>
        {children}
      </span>
    </div>
  );
}

const fade = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: .65, delay, ease: [.22, 1, .36, 1] as const },
  }),
};

const vp = { once: true, amount: 0.1 };

const line  = 'var(--line-soft)';
const brand = 'var(--brand)';
const ink   = 'var(--ink)';
const muted = 'var(--muted)';
const W = { maxWidth: 1240, margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' };

export default function OfferPage() {
  const c = d.contact;
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const [pages,        setPages]        = useState(d.includedPages);
  const [extras,       setExtras]       = useState<Set<string>>(new Set());

  // typing effect dla nazwy klienta w hero
  const typedName = useTypewriter(d.clientName + '.', 55, 400);

  // auto-rotate screenshotów co 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen(i => (i + 1) % d.screens.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function toggleExtra(id: string) {
    setExtras(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const extraPages  = Math.max(0, pages - d.includedPages);
  const baseTotal   = d.basePrice + extraPages * d.pricePerPage;
  const extrasTotal = d.extras.filter(e => extras.has(e.id) && !e.monthly).reduce((s, e) => s + e.price, 0);
  const careTotal   = d.extras.filter(e => extras.has(e.id) && !!e.monthly).reduce((s, e) => s + e.price, 0);
  const total       = baseTotal + extrasTotal;

  // animowana liczba w kalkulatorze
  const animTotal = useAnimatedNumber(total);

  const NAV = [['Realizacje','#realizacje'],['Zakres','#zakres'],['Wycena','#wycena'],['Kontakt','#kontakt']];

  return (
    <>
      <style>{`
        .offer-nav-link { position: relative; transition: color .2s; text-decoration: none; }
        @keyframes offerBlink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .offer-nav-link::after { content:''; position:absolute; left:0; right:100%; bottom:-4px; height:1px; background:var(--brand); transition: right .25s cubic-bezier(.22,1,.36,1); }
        .offer-nav-link:hover::after { right: 0; }

        .offer-check { transition: border-color .18s, background .18s, transform .2s; }
        .offer-check:hover { border-color: var(--brand) !important; transform: translateY(-2px); }

        .screen-img { transition: transform .7s cubic-bezier(.22,1,.36,1); }
        .screen-wrap:hover .screen-img { transform: scale(1.025); }

        .offer-calc-print { display: none; }

        @media (max-width: 760px) {
          .desktop-nav { display: none !important; }
          .mobile-trigger { display: flex !important; }
          .pdf-label { display: none; }
          .extras-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 761px) {
          .mobile-trigger, .mobile-menu { display: none !important; }
        }

        @page { size: A4; margin: 13mm; }
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { background: #fff !important; font-size: 10pt !important; }
          /* ukryj globalny header strony i offer header */
          body > header,
          .site-header,
          .offer-header,
          .no-print { display: none !important; }
          .offer-calc-interactive { display: none !important; }
          .offer-calc-print { display: block !important; }
          main { padding-top: 0 !important; }
          section, footer { break-inside: avoid; }
          h1, h2, h3 { break-after: avoid; }
          a { color: inherit !important; text-decoration: none !important; }
          button { display: none !important; }
          /* hero i footer pełna szerokość też w druku */
          .offer-hero-full, .offer-footer-full { margin-left: 0 !important; margin-right: 0 !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>

      {/* ── OFFER HEADER (oddzielny od globalnego) ─────────────────────── */}
      <header className="offer-header no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'color-mix(in srgb, var(--bg) 92%, transparent)', borderBottom: `1px solid ${line}`, backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', minHeight: 68, padding: '0 clamp(1.5rem,5vw,4rem)', display: 'flex', alignItems: 'center', gap: 24 }}>

          <a href="#offer-top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: ink, marginRight: 'auto' }}>
            <span style={{ width: 34, height: 34, borderRadius: 9, background: brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.78rem', flexShrink: 0 }}>AK</span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.05rem', color: ink }}>
              Oferta dla <strong style={{ color: brand }}>{d.clientName}</strong>
            </span>
          </a>

          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} className="offer-nav-link" style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.92rem', color: muted }}>{label}</a>
            ))}
          </nav>

          <a href="/oferta-neurogarden.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '.6rem 1rem', borderRadius: 99, border: 'none', background: brand, color: '#fff', cursor: 'pointer', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.76rem', textDecoration: 'none', transition: 'opacity .2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            <Download size={14} />
            <span className="pdf-label">Pobierz PDF</span>
          </a>

          <button type="button" className="mobile-trigger" onClick={() => setMenuOpen(v => !v)} style={{ display: 'none', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 9, border: `1px solid ${line}`, background: 'var(--surface)', color: ink, cursor: 'pointer' }}>
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-menu" style={{ padding: '0 clamp(1.25rem,5vw,3rem) 1rem', background: 'var(--bg)', borderTop: `1px solid ${line}` }}>
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '.8rem 0', borderBottom: `1px solid ${line}`, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', color: ink, textDecoration: 'none' }}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      {/* ── MAIN ───────────────────────────────────────────────────────────── */}
      <main id="offer-top" style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── HERO — pełna szerokość ─────────────────────────────────────── */}
        <section className="offer-hero-full" style={{ background: 'var(--surface)', borderBottom: `1px solid ${line}` }}>
          <div style={{ ...W, padding: 'clamp(2.5rem,6vw,5rem) clamp(1.5rem,5vw,4rem)' }}>
            <div style={{ display: 'flex', gap: 'clamp(2rem,5vw,4rem)', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>

              <div style={{ flex: '1 1 280px' }}>
                <motion.div variants={fade} initial="hidden" animate="visible">
                  <Label>Oferta współpracy</Label>
                </motion.div>
                <motion.h1 variants={fade} custom={.06} initial="hidden" animate="visible"
                  style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,3.6rem)', letterSpacing: '-.04em', lineHeight: 1.06, color: ink, marginBottom: '.6rem' }}>
                  {typedName}
                  <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: 'var(--brand)', marginLeft: 4, verticalAlign: 'middle', animation: 'offerBlink 1s step-end infinite' }} />
                </motion.h1>
                <motion.p variants={fade} custom={.12} initial="hidden" animate="visible"
                  style={{ fontFamily: 'var(--fb)', fontSize: '.95rem', color: muted, marginBottom: '1rem' }}>
                  {d.projectTitle}
                </motion.p>
                <motion.p variants={fade} custom={.16} initial="hidden" animate="visible"
                  style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.9rem,1.3vw,1rem)', color: 'var(--ink-soft)', lineHeight: 1.75, maxWidth: '52ch', marginBottom: '1.75rem' }}>
                  {d.description}
                </motion.p>
                <motion.div variants={fade} custom={.18} initial="hidden" animate="visible"
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: brand, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.72rem', flexShrink: 0 }}>AK</div>
                  <div>
                    <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', color: ink, lineHeight: 1.2 }}>{c.company}</p>
                    <p style={{ fontFamily: 'var(--fb)', fontSize: '.76rem', color: 'var(--muted-2)' }}>{c.name}</p>
                  </div>
                </motion.div>
              </div>

              {/* Meta karta — statyczna */}
              <div style={{ flex: '0 1 320px', background: '#fff', border: `1px solid ${line}`, borderRadius: 'var(--r-l)', padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {([['Data', d.date],['Czas realizacji', d.deliveryTime],['Wycena od', d.priceFrom],['Ważna do', d.validUntil]] as const).map(([label, value]) => (
                  <div key={label}>
                    <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 4 }}>{label}</p>
                    <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: label === 'Wycena od' ? '1.1rem' : '1rem', color: label === 'Wycena od' ? brand : ink }}>{value}</p>
                    {label === 'Wycena od' && (
                      <p style={{ fontFamily: 'var(--fb)', fontSize: '.72rem', color: 'var(--muted-2)', lineHeight: 1.5, marginTop: 4 }}>{d.priceNote}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div style={W}>

          {/* REALIZACJE */}
          <section id="realizacje" style={{ padding: 'clamp(2rem,4vw,3rem) 0', borderBottom: `1px solid ${line}` }}>
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={vp}>
              <Label>Realizacje</Label>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', letterSpacing: '-.03em', color: ink, marginBottom: '1.5rem' }}>Jak wygląda moja praca</h2>
            </motion.div>

            <motion.div variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={vp}
              style={{ border: `1px solid ${line}`, borderRadius: 'var(--r-l)', overflow: 'hidden', boxShadow: 'var(--sh-s)', marginBottom: '1rem' }}>
              {/* Browser bar */}
              <div style={{ height: 34, background: 'var(--surface)', borderBottom: `1px solid ${line}`, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px' }}>
                {['#ef4444','#f59e0b','#22c55e'].map(col => <span key={col} style={{ width: 9, height: 9, borderRadius: '50%', background: col, display: 'block' }} />)}
                <div style={{ marginLeft: 10, flex: 1, height: 18, background: line, borderRadius: 99 }} />
              </div>

              {/* Image z AnimatePresence */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--surface)' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeScreen}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.55, ease: [.22,1,.36,1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <Image
                      src={d.screens[activeScreen].src}
                      alt={d.screens[activeScreen].alt}
                      fill style={{ objectFit: 'cover', objectPosition: 'top' }}
                      sizes="(max-width:900px) 100vw, 900px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Opis i przycisk pod obrazkiem */}
              <AnimatePresence mode="wait">
                <motion.div key={`desc-${activeScreen}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [.22,1,.36,1] }}
                  style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderTop: `1px solid ${line}`, background: 'var(--bg)' }}
                >
                  <div>
                    <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.9rem', color: ink, marginBottom: 3 }}>{d.screens[activeScreen].title}</p>
                    <p style={{ fontFamily: 'var(--fb)', fontSize: '.82rem', color: muted, lineHeight: 1.55 }}>{d.screens[activeScreen].desc}</p>
                  </div>
                  <a href={d.screens[activeScreen].url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '.6rem 1rem', borderRadius: 99, background: brand, color: '#fff', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.78rem', textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    Zobacz stronę <ExternalLink size={13} />
                  </a>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Kontrolki — prev/next + dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setActiveScreen(i => (i - 1 + d.screens.length) % d.screens.length)}
                style={{ width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${line}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ink, flexShrink: 0, transition: 'border-color .18s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = brand)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = line)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                {d.screens.map((s, i) => (
                  <button key={i} onClick={() => setActiveScreen(i)} style={{
                    flex: 1, height: 3, borderRadius: 99, border: 'none', cursor: 'pointer',
                    background: i === activeScreen ? brand : line,
                    transition: 'background .3s',
                    padding: 0,
                  }} aria-label={s.title} />
                ))}
              </div>

              <button onClick={() => setActiveScreen(i => (i + 1) % d.screens.length)}
                style={{ width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${line}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ink, flexShrink: 0, transition: 'border-color .18s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = brand)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = line)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {/* Tytuły jako zakładki */}
              <div style={{ display: 'flex', gap: 6, marginLeft: 4, flexWrap: 'wrap' }}>
                {d.screens.map((s, i) => (
                  <button key={i} onClick={() => setActiveScreen(i)} style={{
                    fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.75rem',
                    padding: '.35em .85em', borderRadius: 99,
                    border: `1.5px solid ${i === activeScreen ? brand : line}`,
                    background: i === activeScreen ? 'var(--brand-tint)' : 'transparent',
                    color: i === activeScreen ? brand : muted,
                    cursor: 'pointer', transition: 'all .18s',
                  }}>{s.title}</button>
                ))}
              </div>
            </div>
          </section>

          {/* ZAKRES */}
          <section id="zakres" style={{ padding: 'clamp(2rem,4vw,3rem) 0', borderBottom: `1px solid ${line}` }}>
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={vp}>
              <Label>Zakres prac</Label>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', letterSpacing: '-.03em', color: ink, marginBottom: '1.25rem' }}>Co wchodzi w standardzie</h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '.6rem' }}>
              {d.scope.map((item, i) => (
                <BlueprintCard key={item} delay={i * 0.05}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '.7rem .9rem', background: 'var(--surface)', borderRadius: 'var(--r-s)' }}>
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M1.5 5.5L5 9L12.5 1.5" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: 'var(--fb)', fontSize: '.86rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{item}</span>
                </BlueprintCard>
              ))}
            </div>
          </section>

          {/* KALKULATOR */}
          <section id="wycena" className="offer-calc-interactive" style={{ padding: 'clamp(2rem,4vw,3rem) 0', borderBottom: `1px solid ${line}` }}>
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={vp}>
              <Label>Wycena</Label>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', letterSpacing: '-.03em', color: ink, marginBottom: '1.5rem' }}>Skonfiguruj projekt</h2>
            </motion.div>

            <div style={{ display: 'flex', gap: 'clamp(1.5rem,4vw,3rem)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div>
                  <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: '.75rem' }}>Liczba podstron</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => setPages(p => Math.max(1, p - 1))} style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${line}`, background: 'transparent', cursor: 'pointer', fontFamily: 'var(--fd)', fontSize: '1.1rem', color: ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2rem', letterSpacing: '-.04em', color: ink, minWidth: 36, textAlign: 'center' }}>{pages}</span>
                    <button onClick={() => setPages(p => Math.min(30, p + 1))} style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${line}`, background: 'transparent', cursor: 'pointer', fontFamily: 'var(--fd)', fontSize: '1.1rem', color: ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    <span style={{ fontFamily: 'var(--fb)', fontSize: '.8rem', color: muted }}>
                      {extraPages > 0 ? `+${fmt(extraPages * d.pricePerPage)} zł za ${extraPages} dodatkowe` : `${d.includedPages} w cenie`}
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: '.75rem' }}>Dodatki</p>
                  <div className="extras-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                    {d.extras.map((ex, i) => {
                      const on = extras.has(ex.id);
                      return (
                        <BlueprintCard key={ex.id} delay={i * 0.04}
                          className="offer-check"
                          style={{ textAlign: 'left', padding: '.7rem .9rem', background: on ? 'var(--brand-tint)' : 'var(--bg)', borderRadius: 'var(--r-s)', cursor: 'pointer' }}
                         
                        >
                          <button onClick={() => toggleExtra(ex.id)} style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer' }}>
                            <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.84rem', color: ink, marginBottom: 2 }}>{ex.label}</p>
                            <p style={{ fontFamily: 'var(--fd)', fontSize: '.72rem', color: on ? brand : 'var(--muted-2)', fontWeight: 600 }}>+{fmt(ex.price)} zł{ex.monthly ? ' /mies.' : ''}</p>
                          </button>
                        </BlueprintCard>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dark sidebar */}
              <div style={{ flex: '0 1 240px', background: '#0f1117', borderRadius: 'var(--r-l)', padding: '1.5rem 1.6rem', color: '#fff' }}>
                <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', marginBottom: '1rem' }}>Twoja wycena</p>
                <p style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(1.8rem,3vw,2.4rem)', letterSpacing: '-.05em', lineHeight: 1, color: '#fff', marginBottom: '.25rem' }}>{fmt(animTotal)} zł</p>
                <p style={{ fontFamily: 'var(--fb)', fontSize: '.74rem', color: 'rgba(255,255,255,.35)', marginBottom: '1.25rem' }}>szacunkowo · netto</p>

                <div style={{ marginBottom: '1.25rem' }}>
                  {[
                    { label: 'Strona bazowa', price: d.basePrice },
                    ...(extraPages > 0 ? [{ label: `+${extraPages} podstron`, price: extraPages * d.pricePerPage }] : []),
                    ...d.extras.filter(e => extras.has(e.id) && !e.monthly).map(e => ({ label: e.label, price: e.price })),
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                      <span style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', color: 'rgba(255,255,255,.5)' }}>{r.label}</span>
                      <span style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', color: '#fff', fontWeight: 600 }}>{fmt(r.price)} zł</span>
                    </div>
                  ))}
                  {careTotal > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                      <span style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', color: 'rgba(255,255,255,.5)' }}>Opieka</span>
                      <span style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', color: '#fff', fontWeight: 600 }}>+{fmt(careTotal)} zł/mies.</span>
                    </div>
                  )}
                </div>

                <a href={`mailto:${c.email}`} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.86rem', padding: '.78em 1.2em', borderRadius: 99, background: brand, color: '#fff', textDecoration: 'none' }}>
                  Wyślij zapytanie →
                </a>
              </div>
            </div>
          </section>

          {/* WYCENA PRINT */}
          <section className="offer-calc-print" style={{ padding: 'clamp(2rem,4vw,3rem) 0', borderBottom: `1px solid ${line}` }}>
            <Label>Wycena</Label>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.6rem', letterSpacing: '-.03em', color: ink, marginBottom: '1rem' }}>Orientacyjna wycena</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {[
                { name: 'Start',    price: `od ${fmt(d.basePrice)} zł`,        desc: 'Prosta strona / landing page'           },
                { name: 'Standard', price: `od ${fmt(d.basePrice + 1500)} zł`, desc: 'Strona do 7 podstron + rezerwacje'      },
                { name: 'Premium',  price: `od ${fmt(d.basePrice + 4000)} zł`, desc: 'Rozbudowana strona + blog + integracje'  },
              ].map((p, i) => (
                <BlueprintCard key={p.name} delay={i * 0.1} style={{ borderRadius: 'var(--r)', padding: '1rem', background: 'var(--bg)' }}>
                  <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: brand, marginBottom: '.4rem' }}>{p.name}</p>
                  <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.3rem', letterSpacing: '-.03em', color: ink, marginBottom: '.4rem' }}>{p.price}</p>
                  <p style={{ fontFamily: 'var(--fb)', fontSize: '.8rem', color: muted, lineHeight: 1.5 }}>{p.desc}</p>
                </BlueprintCard>
              ))}
            </div>
          </section>

          {/* KONTAKT */}
          <section id="kontakt" style={{ padding: 'clamp(2rem,4vw,3rem) 0' }}>
            <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={vp}
              style={{ display: 'flex', gap: 'clamp(1.5rem,4vw,3rem)', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: `1px solid ${line}`, borderRadius: 'var(--r-l)', padding: 'clamp(1.25rem,3vw,2rem)' }}>
              <div>
                <Label>Kontakt</Label>
                <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.2rem,2vw,1.6rem)', letterSpacing: '-.03em', color: ink, marginBottom: '.5rem' }}>Porozmawiajmy o projekcie</h2>
                <p style={{ fontFamily: 'var(--fb)', fontSize: '.88rem', color: muted, lineHeight: 1.6 }}>Odpiszę w ciągu 24 godzin i ustalimy szczegóły.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <a href={`mailto:${c.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', color: brand, textDecoration: 'none' }}><Mail size={14} />{c.email}</a>
                <a href={`tel:${c.phone.replace(/\s/g,'')}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', color: brand, textDecoration: 'none' }}><Phone size={14} />{c.phone}</a>
                <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', color: brand, textDecoration: 'none' }}><ExternalLink size={14} />{c.website.replace('https://','')}</a>
              </div>
            </motion.div>
          </section>

        </div>{/* END W */}

        {/* ── FOOTER — pełna szerokość ───────────────────────────────────── */}
        <footer className="offer-footer-full" style={{ background: 'var(--surface)', borderTop: `1px solid ${line}`, marginTop: 'clamp(1rem,3vw,2rem)' }}>
          <div style={{ ...W, padding: 'clamp(1.5rem,3vw,2.5rem) clamp(1.25rem,5vw,3rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: brand, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.7rem' }}>AK</div>
              <div>
                <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.88rem', color: ink, lineHeight: 1.2 }}>{c.company}</p>
                <p style={{ fontFamily: 'var(--fb)', fontSize: '.75rem', color: 'var(--muted-2)' }}>{c.name}</p>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--fb)', fontSize: '.72rem', color: 'var(--muted-2)', textAlign: 'right' }}>
              © {new Date().getFullYear()} {c.company} · Oferta dla {d.clientName} · ważna do {d.validUntil}
            </span>
          </div>
        </footer>

      </main>
    </>
  );
}