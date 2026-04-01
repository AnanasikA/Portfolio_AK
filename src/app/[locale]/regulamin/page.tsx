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
      ? 'Terms and Conditions | Anastasiia Kupriianets'
      : 'Regulamin | Anastasiia Kupriianets',
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

  const content = isEn
    ? {
        title: 'Terms and Conditions',
        intro:
          'These Terms and Conditions define the rules for using the website anastasiiakupriianets.pl, operated by Anastasiia Kupriianets.',
        sections: [
          {
            title: '1. General information',
            list: [
              'The website is for informational and presentation purposes.',
              'Using the website means accepting these Terms and Conditions and the Privacy Policy.',
              'The user agrees to use the website in accordance with applicable law and principles of social conduct.'
            ]
          },
          {
            title: '2. Copyright',
            body:
              'All content and graphic materials on the website are protected by copyright and belong to Anastasiia Kupriianets unless stated otherwise. Copying, distributing, or using them without the author’s consent is prohibited.'
          },
          {
            title: '3. Liability',
            body:
              'The administrator is not responsible for possible errors or outdated information on the website, nor for damages resulting from its use.'
          },
          {
            title: '4. Personal data and cookies',
            body: 'Rules regarding personal data processing and the use of cookies are described in the Privacy Policy.'
          },
          {
            title: '5. Final provisions',
            body:
              'These Terms and Conditions apply from the moment of publication. The administrator reserves the right to introduce changes, which take effect upon publication on the website.'
          }
        ],
        privacy: 'Privacy Policy',
        back: '← Back'
      }
    : {
        title: 'Regulamin strony',
        intro:
          'Niniejszy regulamin określa zasady korzystania ze strony internetowej anastasiiakupriianets.pl, prowadzonej przez Anastasiia Kupriianets.',
        sections: [
          {
            title: '1. Informacje ogólne',
            list: [
              'Strona ma charakter informacyjny i prezentacyjny.',
              'Korzystanie z serwisu oznacza akceptację niniejszego regulaminu oraz polityki prywatności.',
              'Użytkownik zobowiązuje się do korzystania ze strony zgodnie z obowiązującym prawem oraz zasadami współżycia społecznego.'
            ]
          },
          {
            title: '2. Prawa autorskie',
            body:
              'Wszelkie treści i materiały graficzne znajdujące się na stronie są chronione prawem autorskim i należą do Anastasiia Kupriianets, o ile nie wskazano inaczej. Zabrania się ich kopiowania, rozpowszechniania i wykorzystywania bez zgody autora.'
          },
          {
            title: '3. Odpowiedzialność',
            body:
              'Administrator nie ponosi odpowiedzialności za ewentualne błędy lub nieaktualność informacji na stronie, ani za szkody wynikające z jej użytkowania.'
          },
          {
            title: '4. Dane osobowe i cookies',
            body:
              'Zasady przetwarzania danych osobowych i wykorzystywania cookies określa Polityka Prywatności.'
          },
          {
            title: '5. Postanowienia końcowe',
            body:
              'Regulamin obowiązuje od momentu jego publikacji. Administrator zastrzega sobie prawo do wprowadzania zmian, które wchodzą w życie z chwilą ich opublikowania na stronie.'
          }
        ],
        privacy: 'Polityka prywatności',
        back: '← Powrót'
      };

  return (
    <main
      id="content"
      className="max-w-4xl mx-auto px-4 py-12 text-gray-800"
      aria-labelledby="page-title"
    >
      <h1 id="page-title" className="text-3xl font-bold mb-6">
        {content.title}
      </h1>

      <p className="mb-4">{content.intro}</p>

      {content.sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold mt-6 mb-2">{section.title}</h2>

          {'list' in section && section.list && (
            <ul className="list-disc pl-6 mb-4 space-y-1">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {'body' in section && section.body && (
            <p className="mb-4">
              {section.title.startsWith('4.') ? (
                <>
                  {section.body}{' '}
                  <Link
                    href="/polityka-prywatnosci"
                    locale={locale}
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    {content.privacy}
                  </Link>
                  .
                </>
              ) : (
                section.body
              )}
            </p>
          )}
        </section>
      ))}

      <div className="mt-8">
        <Link
          href="/" 
          locale={locale}
          className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          {content.back}
        </Link>
      </div>
    </main>
  );
}