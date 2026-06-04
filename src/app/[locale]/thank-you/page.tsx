'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiHome } from 'react-icons/fi';

export default function ThankYouPage() {
  const t = useTranslations('thankYou');

  return (
    <main style={{
      position: 'relative', minHeight: '100svh',
      overflow: 'hidden', background: 'var(--surface)',
      padding: 'clamp(48px,8vw,96px) clamp(20px,5vw,48px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* bg blobs */}
      <div aria-hidden style={{ position:'absolute', inset:0, zIndex:0, background:'radial-gradient(circle at 60% 10%, var(--brand-tint-2), transparent 40%)' }} />
      <div aria-hidden style={{ position:'absolute', top:60, left:-80, width:340, height:340, borderRadius:'50%', background:'var(--brand-tint)', filter:'blur(80px)', opacity:.7, zIndex:0 }} />
      <div aria-hidden style={{ position:'absolute', bottom:40, right:-80, width:380, height:380, borderRadius:'50%', background:'var(--brand-tint-2)', filter:'blur(90px)', opacity:.6, zIndex:0 }} />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 720,
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 'var(--r-xl)',
          border: '1px solid rgba(255,255,255,.75)',
          boxShadow: 'var(--sh-l)',
          padding: 'clamp(32px,6vw,64px) clamp(24px,5vw,56px)',
          overflow: 'hidden',
        }}
      >
        {/* top shimmer line */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: `linear-gradient(90deg, transparent, rgba(29,78,216,.35), transparent)`,
        }} />

        {/* badge top-right */}
        <div style={{
          position: 'absolute', top: 24, right: 24,
          display: 'inline-flex', alignItems: 'center',
          fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.72rem',
          letterSpacing: '.14em', textTransform: 'uppercase',
          color: 'var(--brand)', background: 'var(--brand-tint)',
          border: '1px solid var(--brand-tint-2)',
          borderRadius: 99, padding: '.4em 1em',
        }}>
          {t('label')}
        </div>

        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>

          {/* check icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'var(--brand)',
              boxShadow: '0 18px 40px rgba(29,78,216,.32)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <FiCheck size={36} color="#fff" />
          </motion.div>

          {/* eyebrow badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.72rem',
            letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--brand)', background: 'var(--brand-tint)',
            border: '1px solid var(--brand-tint-2)',
            borderRadius: 99, padding: '.4em 1.1em', marginBottom: 20,
          }}>
            {t('badge')}
          </span>

          {/* title */}
          <h1 style={{
            fontFamily: 'var(--fd)', fontWeight: 700,
            fontSize: 'clamp(2rem,5vw,3.4rem)',
            letterSpacing: '-.04em', lineHeight: 1.02,
            color: 'var(--ink)', marginBottom: 20,
          }}>
            {t('title')}
          </h1>

          {/* desc */}
          <p style={{
            fontFamily: 'var(--fb)', fontSize: 'clamp(.95rem,1.4vw,1.1rem)',
            color: 'var(--muted)', lineHeight: 1.65,
            maxWidth: '48ch', margin: '0 auto 32px',
          }}>
            {t('desc')}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 36 }}>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem',
              background: 'var(--brand)', color: '#fff',
              borderRadius: 99, padding: '.9em 1.8em',
              textDecoration: 'none', transition: 'transform .25s, box-shadow .25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 30px rgba(29,78,216,.38)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >
              <FiHome size={16} /> {t('home')}
            </Link>

            <Link href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem',
              color: 'var(--ink)', background: 'rgba(255,255,255,.7)',
              border: '1.5px solid var(--line)',
              borderRadius: 99, padding: '.9em 1.8em',
              textDecoration: 'none', transition: 'border-color .2s, transform .25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLElement).style.transform = ''; }}
            >
              {t('projects')} <FiArrowRight size={15} />
            </Link>
          </div>

          {/* steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}>
            {(['step1', 'step2', 'step3'] as const).map((key, i) => (
              <div key={key} style={{
                background: 'rgba(255,255,255,.6)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r)',
                padding: '16px 14px',
                textAlign: 'left',
              }}>
                <p style={{
                  fontFamily: 'var(--fd)', fontWeight: 700,
                  fontSize: '.75rem', color: 'var(--brand)', marginBottom: 6,
                }}>
                  0{i + 1}
                </p>
                <p style={{
                  fontFamily: 'var(--fb)', fontSize: '.82rem',
                  color: 'var(--muted)', lineHeight: 1.55, margin: 0,
                }}>
                  {t(key)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </main>
  );
}