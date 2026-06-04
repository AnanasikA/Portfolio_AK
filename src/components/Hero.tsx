'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeroVideo from '@/components/HeroVideo';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'), { ssr: false });

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section id="top" style={{
      position: 'relative', overflow: 'hidden', background: 'var(--bg)',
      paddingTop: 'clamp(90px,13vh,140px)', paddingBottom: 'clamp(48px,8vw,100px)',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(var(--line-soft) 1px,transparent 1px),linear-gradient(90deg,var(--line-soft) 1px,transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 60% 30%,black,transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 60% 30%,black,transparent)',
      }} />
      <div aria-hidden style={{ position: 'absolute', top: -200, right: -120, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle,var(--brand-tint-2),transparent 68%)', zIndex: 0 }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -140, left: -100, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,#eaf0ff,transparent 70%)', opacity: .7, zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>
        <style>{`
          .hero-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 36px;
            align-items: center;
          }
          @media (min-width: 600px) and (max-width: 859px) {
            .hero-inner { gap: 32px; }
            .hero-video-col { max-width: 520px; margin: 0 auto; width: 100%; }
          }
          @media (min-width: 860px) {
            .hero-inner { grid-template-columns: 1fr 1fr; gap: 56px; }
            .hero-video-col { max-width: none; margin: 0; }
          }
          @keyframes heroFloat {
            0%,100% { transform: translateY(0px); }
            50%      { transform: translateY(-12px); }
          }
          .video-float { animation: heroFloat 6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .video-float { animation: none; } }
        `}</style>

        <div className="hero-inner">

          {/* Copy */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            <div className="fade-up" style={{ marginBottom: 22, animationDelay: '0ms' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 14px 7px 10px', borderRadius: 99,
                background: 'var(--surface)', border: '1px solid var(--line)',
                fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.82rem', color: 'var(--ink-soft)',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,.2)', flexShrink: 0 }} />
                {t('badge')}
              </span>
            </div>

            <h1
              className="fade-up"
              style={{
                fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.035em',
                lineHeight: .97, color: 'var(--ink)',
                fontSize: 'clamp(1.9rem,3.8vw,3.2rem)',
                marginBottom: '1rem',
                animationDelay: '80ms',
              }}>
              {t('title')}
            </h1>

            <p
              className="fade-up"
              style={{
                fontFamily: 'var(--fb)', fontSize: 'clamp(.92rem,1.3vw,1.1rem)',
                color: 'var(--muted)', lineHeight: 1.6,
                maxWidth: '52ch', marginBottom: '1.6rem',
                animationDelay: '160ms',
              }}>
              {t('description')}
            </p>

            <div
              className="fade-up"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '1.6rem', animationDelay: '240ms' }}>
              <button
                onClick={() => setQuoteOpen(true)}
                style={{
                  fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem',
                  background: 'var(--brand)', color: '#fff',
                  borderRadius: 99, padding: '.85em 1.8em',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'transform .3s, box-shadow .3s',
                  border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 36px rgba(29,78,216,.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
                {t('primary_cta')} <span>→</span>
              </button>

              <Link
                href="/projects"
                locale={locale}
                style={{
                  fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem',
                  color: 'var(--ink)', borderRadius: 99, padding: '.85em 1.8em',
                  border: '1.5px solid var(--line)',
                  display: 'inline-flex', alignItems: 'center',
                  transition: 'border-color .2s, color .2s', textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand)'; }}
onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}>
                {t('secondary_cta')}
              </Link>
            </div>

            <div
              className="fade-up"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 22px', animationDelay: '320ms' }}>
              {[
                { num: '7–14', label: t('meta_days')   ?? 'dni do startu' },
                { num: '100%', label: t('meta_custom') ?? 'indywidualny design' },
                { num: '5★',   label: t('meta_rating') ?? 'ocena klientów' },
              ].map(({ num, label }) => (
                <span key={num} style={{ fontFamily: 'var(--fb)', fontSize: '.85rem', color: 'var(--muted)' }}>
                  <strong style={{ fontFamily: 'var(--fd)', fontWeight: 700, color: 'var(--ink)' }}>{num}</strong> {label}
                </span>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="fade-up video-float hero-video-col" style={{ animationDelay: '100ms' }}>
            <HeroVideo />
          </div>

        </div>
      </div>

      {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />}
    </section>
  );
}