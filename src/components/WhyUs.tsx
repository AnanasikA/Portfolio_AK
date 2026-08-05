'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useRef, useEffect, useState } from 'react';

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .6, delay: d, ease: [.22,1,.36,1] as const } }),
};

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconBolt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

function useInViewNative(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: '0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });
  return inView;
}

function CountUp({ to, suffix = '', delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInViewNative(ref as React.RefObject<Element | null>);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const delayMs  = delay * 1000;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime - delayMs;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, delay]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const cardsData = {
  pl: [
    { icon: <IconShield />, title: 'Tworzone pod konwersję',   text: 'Każdy układ projektujemy wokół celów Twojego biznesu — nie tylko estetyka, ale realne wyniki.' },
    { icon: <IconBolt />,   title: 'Szybkie i niezawodne',     text: 'Strony ładujące się poniżej sekundy i stabilne na każdym urządzeniu i w każdej przeglądarce.' },
    { icon: <IconClock />,  title: 'Na czas, bez chaosu',      text: 'Spokojny, uporządkowany proces z jasnymi etapami — zawsze wiesz, na czym stoisz.' },
    { icon: <IconChat />,   title: 'Bezpośrednio i osobiście', text: 'Rozmawiasz z projektantem, nie z pośrednikiem. Szczere doradztwo i dbałość o detale.' },
    { icon: <IconGlobe />,  title: 'Dwujęzycznie i zdalnie',   text: 'Pracujemy po polsku i angielsku, w pełni zdalnie — gdziekolwiek działa Twoja firma, współpraca jest prosta.' },
  ],
  en: [
    { icon: <IconShield />, title: 'Built for conversion',  text: 'Every layout is designed around your business goals — not just aesthetics, but real results.' },
    { icon: <IconBolt />,   title: 'Fast and reliable',     text: 'Sites that load in under a second and work flawlessly on every device and browser.' },
    { icon: <IconClock />,  title: 'On time, no chaos',     text: 'A calm, structured process with clear milestones — you always know where things stand.' },
    { icon: <IconChat />,   title: 'Direct and personal',   text: 'You talk to the designer, not a middleman. Honest advice and attention to every detail.' },
    { icon: <IconGlobe />,  title: 'Bilingual and remote',  text: 'We work in Polish and English, fully remote — wherever your business operates, collaboration is simple.' },
  ],
};

const statsData = {
  pl: [
    { num: 40,  suffix: '+', label: 'wdrożonych projektów' },
    { num: 5,   suffix: '★', label: 'średnia ocena' },
    { num: 100, suffix: '%', label: 'tworzone na miarę' },
  ],
  en: [
    { num: 40,  suffix: '+', label: 'projects delivered' },
    { num: 5,   suffix: '★', label: 'average rating' },
    { num: 100, suffix: '%', label: 'custom built' },
  ],
};

export default function WhyUs() {
  const locale = useLocale();
  const isEn   = locale === 'en';
  const cards  = isEn ? cardsData.en : cardsData.pl;
  const stats  = isEn ? statsData.en : statsData.pl;

  return (
    <section id="why-us" style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

        <style>{`
          .why-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            align-items: start;
          }
          @media (min-width: 860px) {
            .why-inner { grid-template-columns: 5fr 7fr; gap: 72px; }
          }
          .why-cards {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }
          @media (min-width: 480px) {
            .why-cards { grid-template-columns: 1fr 1fr; }
          }
          .why-card-last { grid-column: 1; }
          @media (min-width: 480px) {
            .why-card-last { grid-column: 1 / -1; }
          }
          .why-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 20px 36px;
          }
          @media (max-width: 479px) {
            .why-stats { gap: 16px 28px; }
          }
        `}</style>

        <div className="why-inner">

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ display:'inline-flex', alignItems:'center', gap:'.6em', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--brand)', marginBottom:14 }}>
                <span style={{ width:26, height:1.5, background:'currentColor', display:'inline-block', opacity:.6 }} />
                {isEn ? 'Why AK Web & Design' : 'Dlaczego AK Web & Design'}
              </motion.span>

              <motion.h2 variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ fontFamily:'var(--fd)', fontWeight:600, letterSpacing:'-.035em', lineHeight:.97, color:'var(--ink)', fontSize:'clamp(1.7rem,3.5vw,2.8rem)', marginBottom:18 }}>
                {isEn
                  ? 'A studio that treats your website like its own.'
                  : 'Studio, które traktuje Twoją stronę jak własną.'}
              </motion.h2>

              <motion.p variants={fade} custom={.12} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ fontFamily:'var(--fb)', fontSize:'clamp(.95rem,1.3vw,1.1rem)', color:'var(--muted)', lineHeight:1.65 }}>
                {isEn
                  ? 'No corporate overhead or passing work to interns. You work directly with the people who design and build your site.'
                  : 'Bez korporacyjnego narzutu i przekazywania pracy stażystom. Współpracujesz bezpośrednio z osobami, które projektują i budują Twoją stronę.'}
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              variants={fade} custom={.18} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="why-stats"
              style={{ paddingTop: 22, borderTop: '1px solid var(--line)' }}
            >
              {stats.map((s, i) => (
                <div key={s.label}>
                  <span style={{
                    fontFamily: 'var(--fd)', fontWeight: 700,
                    fontSize: 'clamp(1.7rem,3vw,2.6rem)',
                    color: 'var(--brand)', letterSpacing: '-.03em',
                    display: 'block', lineHeight: 1,
                  }}>
                    <CountUp to={s.num} suffix={s.suffix} delay={i * 0.15} />
                  </span>
                  <small style={{ fontFamily:'var(--fb)', fontSize:'.82rem', color:'var(--muted)', marginTop:4, display:'block' }}>
                    {s.label}
                  </small>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — cards */}
          <div className="why-cards">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={fade} custom={i * .07}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }}
                className={i === cards.length - 1 ? 'why-card-last' : ''}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-l)',
                  padding: 'clamp(16px,2vw,24px)',
                  display: 'flex',
                  flexDirection: i === cards.length - 1 ? 'row' : 'column',
                  alignItems: i === cards.length - 1 ? 'flex-start' : undefined,
                  gap: i === cards.length - 1 ? 18 : 14,
                  transition: 'box-shadow .25s, transform .25s',
                }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.07)' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 11,
                  background: 'var(--brand-tint)',
                  color: 'var(--brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(.95rem,1.2vw,1.05rem)', color:'var(--ink)', marginBottom:6, lineHeight:1.2 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(.82rem,1vw,.88rem)', color:'var(--muted)', lineHeight:1.65, margin:0 }}>
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}