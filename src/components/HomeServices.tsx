'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Item = { title: string; text: string; href: string };

const icons = [

  <svg key="web" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8M12 18v3" />
  </svg>,

  <svg key="shop" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 7h12l-1 12H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" />
  </svg>,

  <svg key="care" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" />
  </svg>,

  <svg key="fix" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z" />
  </svg>,
];

export default function HomeServices() {
  const t = useTranslations('homeServices');
  const items = t.raw('items') as Item[];

  return (
    <section id="uslugi" style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,96px) 0 clamp(24px,4vw,48px)' }}>
      <style>{`
        .hs-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 640px)  { .hs-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }
        @media (min-width: 1100px) { .hs-grid { grid-template-columns: repeat(4, 1fr); } }
        .hs-card {
          display: flex; flex-direction: column; gap: 12px;
          padding: clamp(20px,2.4vw,28px);
          border-radius: var(--r-l); border: 1px solid var(--line);
          background: var(--surface); text-decoration: none; color: inherit;
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .hs-card:hover, .hs-card:focus-visible { border-color: var(--brand); box-shadow: var(--sh-s); transform: translateY(-2px); }
        .hs-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: grid; place-items: center;
          background: var(--brand-tint); color: var(--brand);
        }
        .hs-more { margin-top: auto; padding-top: 6px; font-family: var(--fd); font-weight: 600; font-size: .88rem; color: var(--brand); }
        @media (prefers-reduced-motion: reduce) { .hs-card { transition: none; } .hs-card:hover { transform: none; } }
      `}</style>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>
        <div style={{ marginBottom: 'clamp(24px,4vw,40px)', maxWidth: 720 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
            <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: .6 }} />
            {t('badge')}
          </span>
          <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.06, color: 'var(--ink)', fontSize: 'clamp(1.6rem,3.2vw,2.5rem)', marginBottom: 12 }}>
            {t('title')}
          </h2>
          <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.92rem,1.2vw,1.05rem)', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '58ch' }}>
            {t('description')}
          </p>
        </div>

        <div className="hs-grid">
          {items.map((item, i) => (
            <Link key={item.href} href={item.href} className="hs-card">
              <span className="hs-icon">{icons[i]}</span>
              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '1.12rem', letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.2 }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: 'var(--fb)', fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                {item.text}
              </p>
              <span className="hs-more">{t('more')} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
