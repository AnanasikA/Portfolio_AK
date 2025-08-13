// app/polityka-prywatnosci/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityka prywatności | Anastasiia Kupriianets',
  description:
    'Zasady przetwarzania danych osobowych (RODO) i wykorzystywania plików cookies na stronie anastasiiakupriianets.pl.',
  alternates: { canonical: '/polityka-prywatnosci' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    url: '/polityka-prywatnosci',
    title: 'Polityka prywatności | Anastasiia Kupriianets',
    description:
      'Zasady przetwarzania danych (RODO) i cookies dla serwisu anastasiiakupriianets.pl.',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary',
    title: 'Polityka prywatności | Anastasiia Kupriianets',
    description:
      'Zasady przetwarzania danych (RODO) i cookies dla serwisu anastasiiakupriianets.pl.',
  },
};

export default function PolitykaPrywatnosci() {
  const updated = '13.08.2025'; // możesz zmienić przy kolejnej aktualizacji

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
        <h1 className="text-3xl font-bold">Polityka prywatności</h1>
        <p className="mt-2 text-sm text-gray-600">Ostatnia aktualizacja: {updated}</p>
      </header>

      <p className="mb-4">
        Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych oraz
        wykorzystywania plików cookies na stronie{' '}
        <strong>anastasiiakupriianets.pl</strong>, zgodnie z Rozporządzeniem Parlamentu
        Europejskiego i Rady (UE) 2016/679 (RODO).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Administrator danych</h2>
      <p className="mb-4">
        Administratorem danych osobowych jest Anastasiia Kupriianets. Kontakt:{" "}
        <a
          href="mailto:kontakt@anastasiiakupriianets.pl"
          className="underline text-blue-600 hover:text-blue-800"
        >
          kontakt@anastasiiakupriianets.pl
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Zakres zbieranych danych</h2>
      <p className="mb-4">
        Strona może zbierać następujące dane osobowe: imię, nazwisko, adres e-mail – wyłącznie, jeśli
        użytkownik skorzysta z formularza kontaktowego lub wyśle wiadomość e-mail.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cel przetwarzania danych</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>obsługa zapytań przesłanych przez formularz kontaktowy,</li>
        <li>statystyki i analiza ruchu na stronie (Google Analytics),</li>
        <li>utrzymanie funkcjonalności strony (np. cookies techniczne).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Podstawa prawna przetwarzania</h2>
      <p className="mb-4">
        Dane są przetwarzane zgodnie z art. 6 ust. 1 lit. a (zgoda) oraz lit. f (uzasadniony interes
        administratora) RODO.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Prawa użytkownika</h2>
      <p className="mb-4">
        Osoba, której dane dotyczą, ma prawo do: dostępu do danych, ich sprostowania, usunięcia,
        ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz złożenia skargi do
        Prezesa UODO.
      </p>

      <h2 id="cookies" className="text-xl font-semibold mt-6 mb-2">6. Pliki cookies</h2>
      <p className="mb-4">
        Strona wykorzystuje pliki cookies do celów statystycznych i funkcjonalnych. Użytkownik może
        zmienić ustawienia cookies w przeglądarce. Więcej informacji w sekcji{' '}
        <a href="#cookies" className="underline text-blue-600 hover:text-blue-800">
          Cookies
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Odbiorcy danych</h2>
      <p className="mb-4">
        Dane mogą być przetwarzane przez zewnętrznych dostawców usług hostingowych oraz
        analitycznych (np. Google Analytics) zgodnie z zawartymi umowami powierzenia.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Zmiany w polityce</h2>
      <p className="mb-8">
        Polityka prywatności może być okresowo aktualizowana. Nowa wersja będzie publikowana na tej
        stronie i obowiązywać od daty zamieszczenia.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          ← Strona główna
        </Link>
        <Link
          href="/regulamin"
          className="inline-block px-6 py-2 rounded-md border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-50 transition"
        >
          Regulamin
        </Link>
      </div>
    </main>
  );
}
