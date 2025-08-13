// app/cookies/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

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

export default function CookiesPage() {
  const updated = '13.08.2025'; // uaktualnij przy zmianach

  return (
    <main id="content" className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <nav aria-label="okruszki" className="mb-6 text-sm">
        <Link
          href="/"
          className="inline-block px-3 py-1 rounded-full border border-blue-200 text-blue-700 hover:bg-blue-50 transition"
        >
          ← Strona główna
        </Link>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold">Polityka plików cookies</h1>
        <p className="mt-2 text-sm text-gray-600">Ostatnia aktualizacja: {updated}</p>
      </header>

      <p className="mb-4">
        Niniejsza polityka cookies wyjaśnia, czym są pliki cookies, w jaki sposób są wykorzystywane
        na stronie <strong>anastasiiakupriianets.pl</strong> oraz jakie masz prawa w związku z ich
        używaniem.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Czym są pliki cookies?</h2>
      <p className="mb-4">
        Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika w celu
        zapamiętywania informacji wykorzystywanych przy kolejnych odwiedzinach strony. Zawierają
        m.in. nazwę strony, czas przechowywania oraz unikalny identyfikator.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Jakie cookies są używane?</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>
          <strong>Cookies techniczne</strong> – niezbędne do prawidłowego działania strony (np.
          zapamiętanie ustawień zgody na cookies).
        </li>
        <li>
          <strong>Cookies analityczne</strong> – wykorzystywane do zbierania danych statystycznych
          (Google Analytics) w celu ulepszania serwisu.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Podstawa prawna</h2>
      <p className="mb-4">
        Podstawą prawną stosowania plików cookies jest zgoda użytkownika (w zakresie analityki) oraz
        uzasadniony interes administratora (zapewnienie funkcjonalności i bezpieczeństwa strony).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Jak zarządzać cookies?</h2>
      <p className="mb-4">
        Użytkownik może w dowolnym momencie zmienić ustawienia dotyczące cookies w swojej
        przeglądarce (blokowanie, usuwanie). Wyłączenie niektórych cookies może wpłynąć na
        funkcjonalność strony.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Zmiany w polityce</h2>
      <p className="mb-8">
        Administrator zastrzega sobie prawo do aktualizacji niniejszej polityki cookies. Zmiany będą
        publikowane na tej stronie i obowiązują od momentu zamieszczenia.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          ← Strona główna
        </Link>
        <Link
          href="/polityka-prywatnosci"
          className="inline-block px-6 py-2 rounded-md border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-50 transition"
        >
          Polityka prywatności
        </Link>
      </div>
    </main>
  );
}
