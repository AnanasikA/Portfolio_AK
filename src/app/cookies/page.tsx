import Link from 'next/link';

export default function CookiesPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Polityka plików cookies</h1>

      <p className="mb-4">
        Niniejsza polityka cookies wyjaśnia, czym są pliki cookies, w jaki sposób są wykorzystywane
        na stronie <strong>anastasiiakupriianets.pl</strong> oraz jakie masz prawa w związku z ich
        używaniem.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Czym są pliki cookies?</h2>
      <p className="mb-4">
        Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika w celu zapamiętywania
        informacji, które mogą być odczytane przy kolejnych odwiedzinach strony. Zawierają zazwyczaj
        nazwę strony, czas przechowywania oraz unikalny identyfikator.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Jakie cookies są używane?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Cookies techniczne:</strong> niezbędne do prawidłowego działania strony.</li>
        <li><strong>Cookies analityczne:</strong> używane do zbierania danych statystycznych za pomocą Google Analytics.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Podstawa prawna</h2>
      <p className="mb-4">
        Podstawą prawną stosowania plików cookies jest zgoda użytkownika oraz uzasadniony interes
        administratora w zakresie zapewnienia funkcjonalności i bezpieczeństwa strony.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Jak zarządzać cookies?</h2>
      <p className="mb-4">
        Użytkownik może samodzielnie zmienić ustawienia dotyczące cookies w swojej przeglądarce,
        w tym je całkowicie zablokować. Wyłączenie cookies może jednak wpłynąć na funkcjonalność strony.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Zmiany w polityce</h2>
      <p className="mb-8">
        Administrator zastrzega sobie prawo do aktualizacji niniejszej polityki cookies. Zmiany będą
        publikowane na tej stronie.
      </p>

      {/* 🔙 Przycisk powrotu */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          ← Powrót
        </Link>
      </div>
    </section>
  );
}
