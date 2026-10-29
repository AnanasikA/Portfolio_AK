'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function PricingBanner() {
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#fff' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
          style={{
            background: 'linear-gradient(135deg, #1d4ed8 0%, #16308f 100%)',
            borderRadius: 24,
            padding: 'clamp(32px,5vw,56px) clamp(24px,5vw,64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', marginBottom: '.6rem' }}>
              {isEn ? 'Pricing' : 'Cennik'}
            </p>
            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-.04em', color: '#fff', lineHeight: 1.1, marginBottom: '.75rem', maxWidth: '18ch' }}>
              {isEn
                ? 'Curious how much your site will cost?'
                : 'Ile może kosztować Twoja strona?'}
            </h2>
            <p style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(.88rem,1.3vw,1rem)', color: 'rgba(255,255,255,.65)', lineHeight: 1.6, maxWidth: '44ch' }}>
              {isEn
                ? 'Use our calculator. Pick what you need and see an estimate straight away.'
                : 'Skorzystaj z kalkulatora. Wybierz, czego potrzebujesz, a zobaczysz orientacyjną cenę od razu.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
            {[
              isEn ? 'Websites from 1,500 PLN' : 'Strony od 1 500 zł',
              isEn ? 'Stores from 2,800 PLN' : 'Sklepy od 2 800 zł',
              isEn ? 'Fixed price before we start' : 'Stała cena przed startem',

            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="rgba(255,255,255,.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontSize: '.85rem', color: 'rgba(255,255,255,.7)' }}>{item}</span>
              </div>
            ))}

            <Link
              href="/wycena"
              locale={locale}
              style={{
                marginTop: 8,
                fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.92rem',
                background: '#fff', color: 'var(--brand)',
                borderRadius: 99, padding: '.8em 1.75em',
                textDecoration: 'none', whiteSpace: 'nowrap',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                transition: 'opacity .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {isEn ? 'Calculate your price' : 'Oblicz wycenę'} →
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}