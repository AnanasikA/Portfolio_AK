export function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import HeaderStatic from '@/components/HeaderStatic';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Polityka plików cookies | Anastasiia Kupriianets',
  description: 'Informacje o tym, jakie pliki cookies są używane w serwisie anastasiiakupriianets.pl, do jakich celów oraz jak możesz nimi zarządzać.',
  alternates: { canonical: '/cookies' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article', url: '/cookies',
    title: 'Polityka plików cookies | Anastasiia Kupriianets',
    description: 'Poznaj zasady korzystania z plików cookies w serwisie anastasiiakupriianets.pl oraz możliwości ich wyłączenia.',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary',
    title: 'Polityka plików cookies | Anastasiia Kupriianets',
    description: 'Jakie cookies wykorzystujemy, w jakim celu oraz jak możesz nimi zarządzać.',
  },
};

export default async function CookiesPage({ params }: { params: Promise<{ locale: 'pl' | 'en' }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const updated = '13.08.2025';

  const content = isEn ? {
    title: 'Cookies Policy',
    updatedLabel: 'Last updated:',
    home: '← Home',
    privacy: 'Privacy Policy',
    intro: 'This cookies policy explains what cookies are, how they are used on anastasiiakupriianets.pl, and what rights you have regarding their use.',
    sections: [
      { title: '1. What are cookies?', body: 'Cookies are small text files stored on the user\'s device to remember information used during subsequent visits. They include, among others, the website name, storage time, and a unique identifier.' },
      { title: '2. What cookies are used?', list: ['Technical cookies – necessary for the proper functioning of the website.', 'Analytical cookies – used to collect statistical data (Google Analytics).'] },
      { title: '3. Legal basis', body: 'The legal basis for using cookies is user consent (for analytics) and the legitimate interest of the controller.' },
      { title: '4. How to manage cookies?', body: 'You can change your browser settings at any time (block/delete cookies). Disabling some cookies may affect functionality.' },
      { title: '5. Changes to the policy', body: 'This policy may be updated. Changes will be published on this page.' },
    ],
  } : {
    title: 'Polityka plików cookies',
    updatedLabel: 'Ostatnia aktualizacja:',
    home: '← Strona główna',
    privacy: 'Polityka prywatności',
    intro: 'Niniejsza polityka cookies wyjaśnia, czym są pliki cookies, w jaki sposób są wykorzystywane oraz jakie masz prawa.',
    sections: [
      { title: '1. Czym są pliki cookies?', body: 'Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika.' },
      { title: '2. Jakie cookies są używane?', list: ['Cookies techniczne – niezbędne do działania strony.', 'Cookies analityczne – Google Analytics.'] },
      { title: '3. Podstawa prawna', body: 'Podstawą jest zgoda użytkownika oraz uzasadniony interes administratora.' },
      { title: '4. Jak zarządzać cookies?', body: 'Możesz zmienić ustawienia przeglądarki (blokowanie/usuwanie cookies).' },
      { title: '5. Zmiany w polityce', body: 'Polityka może być aktualizowana.' },
    ],
  };

  return (
    <>
      <HeaderStatic locale={locale} />

      <main style={{ maxWidth: 780, margin: '0 auto', padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,48px) clamp(64px,8vw,100px)' }}>

        {/* back link */}
        <nav style={{ marginBottom: 32 }}>
          <Link href="/" locale={locale} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.85rem',
            color: 'var(--brand)', border: '1px solid var(--brand-tint-2)',
            background: 'var(--brand-tint)', borderRadius: 99,
            padding: '.45em 1em', textDecoration: 'none',
            transition: 'background .2s',
          }}>
            {content.home}
          </Link>
        </nav>

        {/* title */}
        <h1 style={{
          fontFamily: 'var(--fd)', fontWeight: 700,
          fontSize: 'clamp(1.8rem,4vw,2.8rem)',
          letterSpacing: '-.03em', lineHeight: 1.05,
          color: 'var(--ink)', marginBottom: 10,
        }}>
          {content.title}
        </h1>

        <p style={{ fontFamily: 'var(--fb)', fontSize: '.85rem', color: 'var(--muted-2)', marginBottom: 28 }}>
          {content.updatedLabel} {updated}
        </p>

        <p style={{ fontFamily: 'var(--fb)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 36 }}>
          {content.intro}
        </p>

        {/* divider */}
        <div style={{ height: 1, background: 'var(--line)', marginBottom: 36 }} />

        {/* sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {content.sections.map(section => (
            <section key={section.title}>
              <h2 style={{
                fontFamily: 'var(--fd)', fontWeight: 600,
                fontSize: 'clamp(1rem,1.8vw,1.2rem)',
                color: 'var(--ink)', marginBottom: 10,
                letterSpacing: '-.02em',
              }}>
                {section.title}
              </h2>

              {'body' in section && (
                <p style={{ fontFamily: 'var(--fb)', fontSize: '.97rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {section.body}
                </p>
              )}

              {section.list && (
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {section.list.map(item => (
                    <li key={item} style={{ fontFamily: 'var(--fb)', fontSize: '.97rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* divider */}
        <div style={{ height: 1, background: 'var(--line)', margin: '40px 0 32px' }} />

        {/* bottom CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" locale={locale} style={{
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.9rem',
            background: 'var(--brand)', color: '#fff',
            borderRadius: 99, padding: '.75em 1.6em',
            textDecoration: 'none', transition: 'opacity .2s',
          }}>
            {content.home}
          </Link>
          <Link href="/polityka-prywatnosci" locale={locale} style={{
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.9rem',
            color: 'var(--brand)', border: '1.5px solid var(--line)',
            borderRadius: 99, padding: '.75em 1.6em',
            textDecoration: 'none', transition: 'border-color .2s',
          }}>
            {content.privacy}
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}