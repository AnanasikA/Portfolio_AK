import Link from 'next/link';

export default function PolitykaPrywatnosci() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Polityka prywatności</h1>

      <p className="mb-4">
        Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych oraz
        wykorzystywania plików cookies na stronie internetowej{' '}
        <strong>anastasiiakupriianets.pl</strong>, zgodnie z Rozporządzeniem Parlamentu Europejskiego i
        Rady (UE) 2016/679 (RODO).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Administrator danych</h2>
      <p className="mb-4">
        Administratorem danych osobowych jest Anastasiia Kupriianets. Kontakt możliwy jest pod adresem
        e-mail podanym w zakładce „Kontakt”.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Zakres zbieranych danych</h2>
      <p className="mb-4">
        Strona może zbierać następujące dane osobowe: imię, nazwisko, adres e-mail – wyłącznie jeśli
        użytkownik skorzysta z formularza kontaktowego.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cel przetwarzania danych</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>obsługa zapytań przesłanych przez formularz kontaktowy,</li>
        <li>statystyki i analiza ruchu na stronie (Google Analytics),</li>
        <li>utrzymanie funkcjonalności strony (np. cookies).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Podstawa prawna przetwarzania</h2>
      <p className="mb-4">
        Dane są przetwarzane zgodnie z art. 6 ust. 1 lit. a (zgoda) i lit. f (uzasadniony interes
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
        wyłączyć cookies w ustawieniach przeglądarki.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Odbiorcy danych</h2>
      <p className="mb-4">
        Dane mogą być przetwarzane przez zewnętrznych dostawców usług hostingowych, analitycznych
        (Google Analytics) oraz narzędzi statystycznych zgodnie z zawartymi umowami powierzenia.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Zmiany w polityce</h2>
      <p className="mb-8">
        Polityka prywatności może być okresowo aktualizowana. Nowa wersja będzie publikowana na tej
        stronie.
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
