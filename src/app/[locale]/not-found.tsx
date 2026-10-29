import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeaderStatic from '@/components/HeaderStatic';

export default function NotFound() {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <>
      <HeaderStatic locale={locale} />
      <main id="content" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '120px 20px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520 }}>
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '4rem', color: 'var(--brand)', lineHeight: 1 }}>404</p>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(1.5rem,3vw,2rem)', color: 'var(--ink)', margin: '16px 0 12px' }}>
            {isEn ? 'This page does not exist' : 'Tej strony nie ma'}
          </h1>
          <p style={{ fontFamily: 'var(--fb)', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 28 }}>
            {isEn
              ? 'The address may have changed or contains a typo. Go back to the homepage or see what we do.'
              : 'Adres mógł się zmienić albo zawiera literówkę. Wróć na stronę główną albo zobacz, czym się zajmujemy.'}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ fontFamily: 'var(--fd)', fontWeight: 600, background: 'var(--brand)', color: '#fff', borderRadius: 99, padding: '.8em 1.6em', textDecoration: 'none' }}>
              {isEn ? 'Homepage' : 'Strona główna'}
            </Link>
            <Link href="/services" style={{ fontFamily: 'var(--fd)', fontWeight: 600, color: 'var(--ink)', border: '1.5px solid var(--line)', borderRadius: 99, padding: '.8em 1.6em', textDecoration: 'none' }}>
              {isEn ? 'Services' : 'Usługi'}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
