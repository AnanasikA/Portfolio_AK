'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiMonitor, FiShield } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';
import { usePlaneOrbit } from '@/components/PlaneOrbit';

const fade = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .65, delay: d, ease: [.22,1,.36,1] as const } }),
};

const packages = [
  { key: 'landing',  recommended: false },
  { key: 'company',  recommended: true  },
  { key: 'premium',  recommended: false },
];

const cardIcons = {
  landing: FiZap,
  company: FiMonitor,
  premium: FiShield,
} as const;

function PriceCard({ pkg, i, t }: {
  pkg: typeof packages[0];
  i: number;
  t: ReturnType<typeof useTranslations>;
  isEn: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const isRec = pkg.recommended;
  const Icon = cardIcons[pkg.key as keyof typeof cardIcons] ?? FiZap;

  usePlaneOrbit(
    btnRef as React.RefObject<HTMLElement | null>,
    cardRef as React.RefObject<HTMLElement | null>,
    isRec ? '#a3e635' : '#7c3aed',
  );

  let features: string[] = [];
  try { features = t.raw(`packages.${pkg.key}.features`) as string[]; } catch { features = []; }

  let priceLabel = ''; try { priceLabel = t(`packages.${pkg.key}.priceLabel`); } catch { priceLabel = ''; }
  let description = ''; try { description = t(`packages.${pkg.key}.description`); } catch { description = ''; }
  let badgeLabel = '';  try { badgeLabel  = t(`packages.${pkg.key}.badge`); } catch { badgeLabel = ''; }
  let label = '';
  try { label = t(`packages.${pkg.key}.label`); } catch {
    try { label = t(`packages.${pkg.key}.title` as never) as string; } catch { label = pkg.key; }
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fade} custom={i * .07}
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'clamp(400px, 55vw, 520px)',
        borderRadius: 24,
        background: isRec ? 'linear-gradient(180deg,#1e46b8 0%,#2563eb 100%)' : '#fff',
        border: isRec ? '1px solid rgba(37,99,235,.22)' : '1px solid rgba(203,213,225,.75)',
        padding: isRec ? 'clamp(16px,2.5vw,28px)' : 'clamp(20px,3vw,32px)',
        boxShadow: isRec
          ? '0 26px 70px -30px rgba(37,99,235,.72), 0 12px 30px -22px rgba(15,23,42,.55)'
          : hovered
            ? '0 24px 60px -34px rgba(15,23,42,.24)'
            : '0 18px 46px -36px rgba(15,23,42,.18)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform .32s ease, box-shadow .32s ease, border-color .32s ease',
      }}
    >
      {isRec && badgeLabel && (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
    background: 'rgba(255,255,255,.15)', color: '#fff',
    fontFamily: 'var(--fd)', fontWeight: 800,
    fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase',
    padding: '7px 16px', borderRadius: 999, whiteSpace: 'nowrap',
    marginBottom: 16,
    border: '1px solid rgba(255,255,255,.25)',
  }}>
    ☆ {badgeLabel}
  </span>
)}

      <div style={{
        width: 'clamp(38px,5vw,48px)',
        height: 'clamp(38px,5vw,48px)',
        borderRadius: 12,
        display: 'grid', placeItems: 'center', marginBottom: 18,
        background: isRec ? 'rgba(255,255,255,.14)' : 'rgba(37,99,235,.08)',
        color: isRec ? '#fff' : 'var(--brand)',
        flexShrink: 0,
      }}>
        <Icon size={20} />
      </div>

      <h3 style={{
        fontFamily:'var(--fd)', fontWeight:700, fontSize:'clamp(1rem,1.8vw,1.18rem)', letterSpacing:'-.02em',
        color: isRec ? '#fff' : '#0f172a', marginBottom:12
      }}>
        {label}
      </h3>

      <p style={{
        fontFamily:'var(--fb)', fontSize:'clamp(.88rem,1.2vw,.95rem)', color: isRec ? 'rgba(255,255,255,.82)' : '#64748b',
        lineHeight:1.55, minHeight:72, marginBottom:20
      }}>
        {description}
      </p>

      <div style={{ display:'flex', alignItems:'baseline', gap:8, margin:'0 0 22px' }}>
        <span style={{
          fontFamily:'var(--fd)', fontWeight:800, fontSize:'clamp(1.9rem,4vw,3.15rem)',
          letterSpacing:'-.05em', color: isRec ? '#fff' : '#0f172a', lineHeight:1
        }}>
          {priceLabel}
        </span>
      </div>

      <div style={{ height:1, background: isRec ? 'rgba(255,255,255,.18)' : 'rgba(226,232,240,.95)', marginBottom:22 }} />

      <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14, marginBottom:28 }}>
        {features.map(f => (
          <li key={f} style={{
            display:'flex', alignItems:'flex-start', gap:12,
            fontFamily:'var(--fb)', fontSize:'clamp(.88rem,1.2vw,.95rem)', lineHeight:1.45,
            color: isRec ? 'rgba(255,255,255,.92)' : '#475569'
          }}>
            <FiCheck style={{ flexShrink:0, marginTop:3, color: isRec ? '#fff' : 'var(--brand)' }} />
            {f}
          </li>
        ))}
      </ul>

      <button
        ref={btnRef}
        onClick={() => window.dispatchEvent(new Event('open-brief'))}
        style={{
          width:'100%', marginTop:'auto', fontFamily:'var(--fd)', fontWeight:700,
          fontSize:'clamp(.88rem,1.2vw,.95rem)',
          borderRadius:999, padding:'1em 1.5em',
          background: '#fff',
          color: isRec ? 'var(--brand)' : '#0f172a',
          border: isRec ? '0' : '1px solid rgba(203,213,225,.85)',
          boxShadow: isRec ? 'none' : 'inset 0 0 0 1px rgba(255,255,255,.5)',
          cursor:'pointer', transition:'transform .2s ease, opacity .2s ease, border-color .2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '.92';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.borderColor = 'rgba(37,99,235,.35)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = isRec ? 'transparent' : 'rgba(203,213,225,.85)';
        }}
      >
        {t('cta_button')} <span aria-hidden style={{ marginLeft:8 }}>→</span>
      </button>
    </motion.div>
  );
}

export default function PricingSection() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <section id="pricing" style={{ position:'relative', overflow:'hidden', background:'#fff', color:'#0f172a', padding:'clamp(20px,5vw,20px) 0' }}>

      <div style={{ position:'relative', maxWidth:1240, margin:'0 auto', padding:'0 clamp(20px,5vw,72px)' }}>
        <div style={{ textAlign:'left', marginBottom:'clamp(28px,4vw,64px)' }}>
          <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once:true }}
            style={{ display:'inline-flex', alignItems:'center', gap:10, fontFamily:'var(--fd)', fontWeight:800, fontSize:'.72rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--brand)', marginBottom:18 }}>
            <span style={{ width:28, height:2, background:'currentColor', display:'inline-block', opacity:.8 }} />
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={{ once:true }}
  style={{ fontFamily:'var(--fd)', fontWeight:800, letterSpacing:'-.055em', lineHeight:.98, fontSize:'clamp(1.8rem,4vw,3.2rem)', maxWidth:760, margin:'0 0 18px', color:'#0f172a' }}>
  {t('title')}
</motion.h2>
          <motion.p variants={fade} custom={.12} initial="hidden" whileInView="visible" viewport={{ once:true }}
            style={{ fontFamily:'var(--fb)', fontSize:'clamp(.95rem,1.55vw,1.35rem)', color:'#64748b', lineHeight:1.55, maxWidth:'56ch', margin:0 }}>
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="price-grid-3" style={{ display:'grid', gap:'clamp(16px,2vw,24px)', alignItems:'stretch' }}>
          <style>{`
            .price-grid-3{grid-template-columns:1fr}
            @media(min-width:768px){.price-grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
          `}</style>
          {packages.map((pkg, i) => (
            <PriceCard key={pkg.key} pkg={pkg} i={i} t={t} isEn={isEn} />
          ))}
        </div>

        <motion.div variants={fade} custom={.22} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{
            display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'18px clamp(24px,4vw,44px)',
            borderTop:'1px solid rgba(226,232,240,.95)', marginTop:32, paddingTop:22,
            fontFamily:'var(--fb)', fontSize:'clamp(.82rem,1.1vw,.92rem)', color:'#475569'
          }}>
          <span>✓ Stała wycena — bez ukrytych kosztów</span>
          <span>□ Bezpłatna konsultacja</span>
          <span>◷ Płatność w etapach</span>
          <span>✓ Wszystko należy do Ciebie</span>
        </motion.div>

        <motion.p variants={fade} custom={.24} initial="hidden" whileInView="visible" viewport={{ once:true }}
          style={{ textAlign:'center', marginTop:18, fontFamily:'var(--fb)', fontSize:'.88rem', color:'#94a3b8' }}>
          {t('cta_subtext')}
        </motion.p>
      </div>
    </section>
  );
}