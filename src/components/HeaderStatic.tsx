import { Link } from '@/i18n/navigation';

export default function HeaderSimple({ locale }: { locale: string }) {
  return (
    <header role="banner" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--line)',
      height: 68,
      display: 'flex', alignItems: 'center',
      padding: '0 clamp(20px,5vw,72px)',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" locale={locale} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{
            width: 34, height: 34, borderRadius: 9, background: 'var(--brand)',
            display: 'grid', placeItems: 'center',
            color: '#fff', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.82rem',
          }}>AK</span>
          <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', letterSpacing: '-.02em', color: 'var(--ink)' }}>
            AK Web & Design
          </span>
        </Link>

        <Link href="/" locale={locale} style={{
          fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem',
          color: 'var(--brand)', background: 'var(--brand-tint)',
          border: '1px solid var(--brand-tint-2)',
          borderRadius: 99, padding: '.45em 1.1em',
          textDecoration: 'none',
        }}>
          ← {locale === 'en' ? 'Home' : 'Strona główna'}
        </Link>
      </div>
    </header>
  );
}