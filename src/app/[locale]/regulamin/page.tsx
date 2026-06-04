import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import HeaderStatic from '@/components/HeaderStatic';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

type PageProps = { params: Promise<{ locale: 'pl' | 'en' }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Terms and Conditions | Anastasiia Kupriianets' : 'Regulamin | Anastasiia Kupriianets',
    description: isEn
      ? 'Terms of use for anastasiiakupriianets.pl — rules of use, copyright and information about data.'
      : 'Regulamin korzystania ze strony anastasiiakupriianets.pl — zasady użytkowania, prawa autorskie i informacje o danych.',
    alternates: { canonical: '/regulamin' },
    robots: { index: true, follow: true },
  };
}

export default async function Regulamin({ params }: PageProps) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const content = isEn ? {
    title: 'Terms and Conditions',
    intro: 'These Terms and Conditions define the rules for using the website anastasiiakupriianets.pl, operated by Anastasiia Kupriianets.',
    sections: [
      { title: '1. General information', list: ['The website is for informational and presentation purposes.', 'Using the website means accepting these Terms and Conditions and the Privacy Policy.', 'The user agrees to use the website in accordance with applicable law and principles of social conduct.'] },
      { title: '2. Copyright', body: 'All content and graphic materials on the website are protected by copyright and belong to Anastasiia Kupriianets unless stated otherwise. Copying, distributing, or using them without the author\'s consent is prohibited.' },
      { title: '3. Liability', body: 'The administrator is not responsible for possible errors or outdated information on the website, nor for damages resulting from its use.' },
      { title: '4. Personal data and cookies', body: 'Rules regarding personal data processing and the use of cookies are described in the ' },
      { title: '5. Final provisions', body: 'These Terms and Conditions apply from the moment of publication. The administrator reserves the right to introduce changes, which take effect upon publication on the website.' },
    ],
    privacy: 'Privacy Policy',
    back: '← Home',
  } : {
    title: 'Regulamin strony',
    intro: 'Niniejszy regulamin określa zasady korzystania ze strony internetowej anastasiiakupriianets.pl, prowadzonej przez Anastasiia Kupriianets.',
    sections: [
      { title: '1. Informacje ogólne', list: ['Strona ma charakter informacyjny i prezentacyjny.', 'Korzystanie z serwisu oznacza akceptację niniejszego regulaminu oraz polityki prywatności.', 'Użytkownik zobowiązuje się do korzystania ze strony zgodnie z obowiązującym prawem oraz zasadami współżycia społecznego.'] },
      { title: '2. Prawa autorskie', body: 'Wszelkie treści i materiały graficzne znajdujące się na stronie są chronione prawem autorskim i należą do Anastasiia Kupriianets, o ile nie wskazano inaczej. Zabrania się ich kopiowania, rozpowszechniania i wykorzystywania bez zgody autora.' },
      { title: '3. Odpowiedzialność', body: 'Administrator nie ponosi odpowiedzialności za ewentualne błędy lub nieaktualność informacji na stronie, ani za szkody wynikające z jej użytkowania.' },
      { title: '4. Dane osobowe i cookies', body: 'Zasady przetwarzania danych osobowych i wykorzystywania cookies określa ' },
      { title: '5. Postanowienia końcowe', body: 'Regulamin obowiązuje od momentu jego publikacji. Administrator zastrzega sobie prawo do wprowadzania zmian, które wchodzą w życie z chwilą ich opublikowania na stronie.' },
    ],
    privacy: 'Polityka prywatności',
    back: '← Strona główna',
  };

  return (
    <>
     <HeaderStatic locale={locale} />

      <main id="content" aria-labelledby="page-title"
        style={{ maxWidth: 780, margin: '0 auto', padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,48px) clamp(64px,8vw,100px)' }}>

        <nav style={{ marginBottom: 32 }}>
          <Link href="/" locale={locale} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.85rem',
            color: 'var(--brand)', border: '1px solid var(--brand-tint-2)',
            background: 'var(--brand-tint)', borderRadius: 99,
            padding: '.45em 1em', textDecoration: 'none',
          }}>
            {content.back}
          </Link>
        </nav>

        <h1 id="page-title" style={{
          fontFamily: 'var(--fd)', fontWeight: 700,
          fontSize: 'clamp(1.8rem,4vw,2.8rem)',
          letterSpacing: '-.03em', lineHeight: 1.05,
          color: 'var(--ink)', marginBottom: 28,
        }}>
          {content.title}
        </h1>

        <p style={{ fontFamily: 'var(--fb)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 36 }}>
          {content.intro}
        </p>

        <div style={{ height: 1, background: 'var(--line)', marginBottom: 36 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {content.sections.map(section => (
            <section key={section.title}>
              <h2 style={{
                fontFamily: 'var(--fd)', fontWeight: 600,
                fontSize: 'clamp(1rem,1.8vw,1.2rem)',
                color: 'var(--ink)', marginBottom: 10, letterSpacing: '-.02em',
              }}>
                {section.title}
              </h2>

              {'list' in section && section.list && (
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {section.list.map(item => (
                    <li key={item} style={{ fontFamily: 'var(--fb)', fontSize: '.97rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {'body' in section && section.body && (
                <p style={{ fontFamily: 'var(--fb)', fontSize: '.97rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {section.title.startsWith('4.') ? (
                    <>
                      {section.body}
                      <Link href="/polityka-prywatnosci" locale={locale} style={{
                        color: 'var(--brand)',
                        textDecoration: 'underline',
                        textUnderlineOffset: 3,
                      }}>
                        {content.privacy}
                      </Link>.
                    </>
                  ) : (
                    section.body
                  )}
                </p>
              )}
            </section>
          ))}
        </div>

        <div style={{ height: 1, background: 'var(--line)', margin: '40px 0 32px' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Link href="/" locale={locale} style={{
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.9rem',
            background: 'var(--brand)', color: '#fff',
            borderRadius: 99, padding: '.75em 1.6em', textDecoration: 'none',
          }}>
            {content.back}
          </Link>
          <Link href="/polityka-prywatnosci" locale={locale} style={{
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.9rem',
            color: 'var(--brand)', border: '1.5px solid var(--line)',
            borderRadius: 99, padding: '.75em 1.6em', textDecoration: 'none',
          }}>
            {content.privacy}
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}