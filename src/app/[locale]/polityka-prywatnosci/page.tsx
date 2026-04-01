import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

type PageProps = {
  params: Promise<{ locale: 'pl' | 'en' }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'Privacy Policy | Anastasiia Kupriianets'
      : 'Polityka prywatności | Anastasiia Kupriianets',
    description: isEn
      ? 'Rules for processing personal data and using cookies on anastasiiakupriianets.pl.'
      : 'Zasady przetwarzania danych osobowych (RODO) i wykorzystywania plików cookies na stronie anastasiiakupriianets.pl.',
    alternates: { canonical: '/polityka-prywatnosci' },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: '/polityka-prywatnosci',
      title: isEn
        ? 'Privacy Policy | Anastasiia Kupriianets'
        : 'Polityka prywatności | Anastasiia Kupriianets',
      description: isEn
        ? 'Rules for processing personal data and cookies for anastasiiakupriianets.pl.'
        : 'Zasady przetwarzania danych (RODO) i cookies dla serwisu anastasiiakupriianets.pl.',
      locale: isEn ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary',
      title: isEn
        ? 'Privacy Policy | Anastasiia Kupriianets'
        : 'Polityka prywatności | Anastasiia Kupriianets',
      description: isEn
        ? 'Rules for processing personal data and cookies for anastasiiakupriianets.pl.'
        : 'Zasady przetwarzania danych (RODO) i cookies dla serwisu anastasiiakupriianets.pl.',
    },
  };
}

export default async function PolitykaPrywatnosci({ params }: PageProps) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const updated = '13.08.2025';

  const content = isEn
    ? {
        breadcrumb: '← Home',
        title: 'Privacy Policy',
        updatedLabel: 'Last updated:',
        intro:
          'This Privacy Policy sets out the rules for processing personal data and using cookies on the website anastasiiakupriianets.pl, in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR).',
        sections: [
          {
            title: '1. Data controller',
            body: (
              <>
                The controller of personal data is Anastasiia Kupriianets. Contact:{' '}
                <a
                  href="mailto:kontakt@anastasiiakupriianets.pl"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  kontakt@anastasiiakupriianets.pl
                </a>
                .
              </>
            )
          },
          {
            title: '2. Scope of collected data',
            body:
              'The website may collect the following personal data: first name, last name, email address — only if the user uses the contact form or sends an email message.'
          },
          {
            title: '3. Purpose of data processing',
            list: [
              'handling inquiries sent through the contact form,',
              'statistics and website traffic analysis (Google Analytics),',
              'maintaining website functionality (e.g. technical cookies).'
            ]
          },
          {
            title: '4. Legal basis for processing',
            body:
              'Data is processed in accordance with Article 6(1)(a) (consent) and Article 6(1)(f) (legitimate interest of the controller) of the GDPR.'
          },
          {
            title: '5. User rights',
            body:
              'The data subject has the right to access their data, rectify it, erase it, restrict processing, transfer data, object to processing, and lodge a complaint with the President of the Personal Data Protection Office.'
          },
          {
            title: '6. Cookies',
            body: (
              <>
                The website uses cookies for statistical and functional purposes. The user may change cookie settings in their browser. More information in the{' '}
                <a href="#cookies" className="underline text-blue-600 hover:text-blue-800">
                  Cookies
                </a>{' '}
                section.
              </>
            ),
            id: 'cookies'
          },
          {
            title: '7. Data recipients',
            body:
              'Data may be processed by external hosting and analytics service providers (e.g. Google Analytics) in accordance with concluded data processing agreements.'
          },
          {
            title: '8. Changes to this policy',
            body:
              'The privacy policy may be updated periodically. The new version will be published on this page and will apply from the date of publication.'
          }
        ],
        homeBtn: '← Home',
        termsBtn: 'Terms'
      }
    : {
        breadcrumb: '← Strona główna',
        title: 'Polityka prywatności',
        updatedLabel: 'Ostatnia aktualizacja:',
        intro:
          'Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies na stronie anastasiiakupriianets.pl, zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).',
        sections: [
          {
            title: '1. Administrator danych',
            body: (
              <>
                Administratorem danych osobowych jest Anastasiia Kupriianets. Kontakt:{' '}
                <a
                  href="mailto:kontakt@anastasiiakupriianets.pl"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  kontakt@anastasiiakupriianets.pl
                </a>
                .
              </>
            )
          },
          {
            title: '2. Zakres zbieranych danych',
            body:
              'Strona może zbierać następujące dane osobowe: imię, nazwisko, adres e-mail – wyłącznie, jeśli użytkownik skorzysta z formularza kontaktowego lub wyśle wiadomość e-mail.'
          },
          {
            title: '3. Cel przetwarzania danych',
            list: [
              'obsługa zapytań przesłanych przez formularz kontaktowy,',
              'statystyki i analiza ruchu na stronie (Google Analytics),',
              'utrzymanie funkcjonalności strony (np. cookies techniczne).'
            ]
          },
          {
            title: '4. Podstawa prawna przetwarzania',
            body:
              'Dane są przetwarzane zgodnie z art. 6 ust. 1 lit. a (zgoda) oraz lit. f (uzasadniony interes administratora) RODO.'
          },
          {
            title: '5. Prawa użytkownika',
            body:
              'Osoba, której dane dotyczą, ma prawo do: dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz złożenia skargi do Prezesa UODO.'
          },
          {
            title: '6. Pliki cookies',
            body: (
              <>
                Strona wykorzystuje pliki cookies do celów statystycznych i funkcjonalnych. Użytkownik może zmienić ustawienia cookies w przeglądarce. Więcej informacji w sekcji{' '}
                <a href="#cookies" className="underline text-blue-600 hover:text-blue-800">
                  Cookies
                </a>
                .
              </>
            ),
            id: 'cookies'
          },
          {
            title: '7. Odbiorcy danych',
            body:
              'Dane mogą być przetwarzane przez zewnętrznych dostawców usług hostingowych oraz analitycznych (np. Google Analytics) zgodnie z zawartymi umowami powierzenia.'
          },
          {
            title: '8. Zmiany w polityce',
            body:
              'Polityka prywatności może być okresowo aktualizowana. Nowa wersja będzie publikowana na tej stronie i obowiązywać od daty zamieszczenia.'
          }
        ],
        homeBtn: '← Strona główna',
        termsBtn: 'Regulamin'
      };

  return (
    <main id="content" className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <nav aria-label={isEn ? 'breadcrumbs' : 'okruszki'} className="mb-6 text-sm">
        <Link
          href="/"
          locale={locale}
          className="inline-block px-3 py-1 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition"
        >
          {content.breadcrumb}
        </Link>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {content.updatedLabel} {updated}
        </p>
      </header>

      <p className="mb-4">{content.intro}</p>

      {content.sections.map((section) => (
        <section key={section.title}>
          <h2 id={section.id} className="text-xl font-semibold mt-6 mb-2">
            {section.title}
          </h2>

          {'body' in section && section.body && <p className="mb-4">{section.body}</p>}

          {'list' in section && section.list && (
            <ul className="list-disc pl-6 mb-4 space-y-1">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          locale={locale}
          className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          {content.homeBtn}
        </Link>
        <Link
          href="/regulamin"
          locale={locale}
          className="inline-block px-6 py-2 rounded-md border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-50 transition"
        >
          {content.termsBtn}
        </Link>
      </div>
    </main>
  );
}