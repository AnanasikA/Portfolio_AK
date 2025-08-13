// app/regulamin/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Regulamin | Anastasiia Kupriianets',
  description:
    'Regulamin korzystania ze strony anastasiiakupriianets.pl — zasady użytkowania, prawa autorskie i informacje o danych.',
  alternates: { canonical: '/regulamin' },
  robots: { index: true, follow: true },
};

export default function Regulamin() {
  return (
    <main
      id="content"
      className="max-w-4xl mx-auto px-4 py-12 text-gray-800"
      aria-labelledby="page-title"
    >
      <h1 id="page-title" className="text-3xl font-bold mb-6">
        Regulamin strony
      </h1>

      <p className="mb-4">
        Niniejszy regulamin określa zasady korzystania ze strony internetowej{' '}
        <strong>anastasiiakupriianets.pl</strong>, prowadzonej przez Anastasiia Kupriianets.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Informacje ogólne</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Strona ma charakter informacyjny i prezentacyjny.</li>
        <li>
          Korzystanie z serwisu oznacza akceptację niniejszego regulaminu oraz polityki prywatności.
        </li>
        <li>
          Użytkownik zobowiązuje się do korzystania ze strony zgodnie z obowiązującym prawem oraz
          zasadami współżycia społecznego.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Prawa autorskie</h2>
      <p className="mb-4">
        Wszelkie treści i materiały graficzne znajdujące się na stronie są chronione prawem
        autorskim i należą do Anastasiia Kupriianets, o ile nie wskazano inaczej. Zabrania się ich
        kopiowania, rozpowszechniania i wykorzystywania bez zgody autora.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Odpowiedzialność</h2>
      <p className="mb-4">
        Administrator nie ponosi odpowiedzialności za ewentualne błędy lub nieaktualność
        informacji na stronie, ani za szkody wynikające z jej użytkowania.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Dane osobowe i cookies</h2>
      <p className="mb-4">
        Zasady przetwarzania danych osobowych i wykorzystywania cookies określa Polityka Prywatności
        dostępna pod adresem{' '}
        <Link href="/polityka-prywatnosci" className="underline text-blue-600 hover:text-blue-800">
          /polityka-prywatnosci
        </Link>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Postanowienia końcowe</h2>
      <p className="mb-8">
        Regulamin obowiązuje od momentu jego publikacji. Administrator zastrzega sobie prawo do
        wprowadzania zmian, które wchodzą w życie z chwilą ich opublikowania na stronie.
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
    </main>
  );
}
