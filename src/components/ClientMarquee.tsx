'use client';

import { useLocale } from 'next-intl';

const clients = [
  'Spiro Pilates & Mobility',
  'Crescent Development',
  'Luisówka',
  'FoxiTour',
  'RealEstate',
  'Lion Force Weld',
  'Zdrowie+',
  'Quest for Paws',
  'Marecki 24/7',
  'Goports',
  'StudyBuddy',
  'LUXENAILS',
];

const items = [...clients, ...clients];

// 4-pointed sparkle star SVG
const Sparkle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
    style={{ flexShrink: 0, color: 'var(--brand)', opacity: .7 }}>
    <path d="M12 2C12 2 12.8 7.2 15.5 9.5C17.8 11.5 23 12 23 12C23 12 17.8 12.5 15.5 14.5C12.8 16.8 12 22 12 22C12 22 11.2 16.8 8.5 14.5C6.2 12.5 1 12 1 12C1 12 6.2 11.5 8.5 9.5C11.2 7.2 12 2 12 2Z" />
  </svg>
);

export default function ClientMarquee() {
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '28px 0 18px', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex; align-items: center;
          animation: marqueeScroll 34s linear infinite;
          will-change: transform;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      {/* Fade edges */}
      <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, var(--surface), transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, var(--surface), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <div aria-hidden className="marquee-track">
        {items.map((name, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--fd)',
              fontWeight: 600,
              fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
              letterSpacing: '-.01em',
              color: 'var(--muted)',
              padding: '0 clamp(24px, 3.5vw, 48px)',
              whiteSpace: 'nowrap',
            }}>
              {name}
            </span>
            <Sparkle />
          </span>
        ))}
      </div>

      {/* Label */}
      <p style={{
        textAlign: 'center', marginTop: 14,
        fontFamily: 'var(--fd)', fontWeight: 600,
        fontSize: '.65rem', letterSpacing: '.2em',
        textTransform: 'uppercase', color: 'var(--muted-2)',
      }}>
        {isEn
          ? 'Trusted by businesses in accommodation, real estate, wellness & tourism'
          : 'Zaufały nam firmy z branży noclegowej, nieruchomości, wellness i turystyki'}
      </p>
    </div>
  );
}
