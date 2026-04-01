export function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Polityka plików cookies | Anastasiia Kupriianets',
  description:
    'Informacje o tym, jakie pliki cookies są używane w serwisie anastasiiakupriianets.pl, do jakich celów oraz jak możesz nimi zarządzać.',
  alternates: { canonical: '/cookies' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    url: '/cookies',
    title: 'Polityka plików cookies | Anastasiia Kupriianets',
    description:
      'Poznaj zasady korzystania z plików cookies w serwisie anastasiiakupriianets.pl oraz możliwości ich wyłączenia.',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary',
    title: 'Polityka plików cookies | Anastasiia Kupriianets',
    description:
      'Jakie cookies wykorzystujemy, w jakim celu oraz jak możesz nimi zarządzać.',
  },
};

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: 'pl' | 'en' }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const updated = '13.08.2025';

  const content = isEn
    ? {
        title: 'Cookies Policy',
        updatedLabel: 'Last updated:',
        home: '← Home',
        privacy: 'Privacy Policy',
        intro:
          'This cookies policy explains what cookies are, how they are used on anastasiiakupriianets.pl, and what rights you have regarding their use.',
        sections: [
          {
            title: '1. What are cookies?',
            body:
              'Cookies are small text files stored on the user’s device to remember information used during subsequent visits. They include, among others, the website name, storage time, and a unique identifier.'
          },
          {
            title: '2. What cookies are used?',
            list: [
              'Technical cookies – necessary for the proper functioning of the website.',
              'Analytical cookies – used to collect statistical data (Google Analytics).'
            ]
          },
          {
            title: '3. Legal basis',
            body:
              'The legal basis for using cookies is user consent (for analytics) and the legitimate interest of the controller.'
          },
          {
            title: '4. How to manage cookies?',
            body:
              'You can change your browser settings at any time (block/delete cookies). Disabling some cookies may affect functionality.'
          },
          {
            title: '5. Changes to the policy',
            body:
              'This policy may be updated. Changes will be published on this page.'
          }
        ]
      }
    : {
        title: 'Polityka plików cookies',
        updatedLabel: 'Ostatnia aktualizacja:',
        home: '← Strona główna',
        privacy: 'Polityka prywatności',
        intro:
          'Niniejsza polityka cookies wyjaśnia, czym są pliki cookies, w jaki sposób są wykorzystywane oraz jakie masz prawa.',
        sections: [
          {
            title: '1. Czym są pliki cookies?',
            body:
              'Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika.'
          },
          {
            title: '2. Jakie cookies są używane?',
            list: [
              'Cookies techniczne – niezbędne do działania strony.',
              'Cookies analityczne – Google Analytics.'
            ]
          },
          {
            title: '3. Podstawa prawna',
            body:
              'Podstawą jest zgoda użytkownika oraz uzasadniony interes administratora.'
          },
          {
            title: '4. Jak zarządzać cookies?',
            body:
              'Możesz zmienić ustawienia przeglądarki (blokowanie/usuwanie cookies).'
          },
          {
            title: '5. Zmiany w polityce',
            body:
              'Polityka może być aktualizowana.'
          }
        ]
      };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <nav className="mb-6 text-sm">
        <Link href="/" locale={locale} className="inline-block px-3 py-1 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition">
          {content.home}
        </Link>
      </nav>

      <h1 className="text-3xl font-bold">{content.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {content.updatedLabel} {updated}
      </p>

      <p className="mb-4">{content.intro}</p>

      {content.sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            {section.title}
          </h2>

          {'body' in section && <p className="mb-4">{section.body}</p>}

          {section.list && (
  <ul className="list-disc pl-6 mb-4">
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
    {content.home}
  </Link>

  <Link
    href="/polityka-prywatnosci"
    locale={locale}
    className="inline-block px-6 py-2 rounded-md border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-50 transition"
  >
    {content.privacy}
  </Link>
</div>
    </main>
  );
}