// Mapowanie slugów artykułów blogowych PL <-> EN.
//
// Artykuły PL i EN nie mają wspólnego identyfikatora w treści MDX (frontmatter
// zawiera tylko title/description/date/tags), a same daty publikacji się
// powtarzają w obrębie jednego języka, więc nie można ich użyć do
// automatycznego dopasowania. Ta tabela została zweryfikowana ręcznie na
// podstawie treści artykułów i służy do budowy poprawnego hreflang
// (alternates.languages) między wersjami językowymi tego samego artykułu.
//
// Uwaga dla przyszłych artykułów: każdy nowy wpis PL i jego odpowiednik EN
// (lub sam PL, jeśli tłumaczenie jeszcze nie istnieje) trzeba dopisać tutaj.

export const BLOG_SLUG_PAIRS: Array<{ pl: string; en: string }> = [
  { pl: 'co-powinna-zawierac-strona-dla-firmy-uslugowej', en: 'what-should-a-service-website-include' },
  { pl: 'czy-twoja-strona-internetowa-potrzebuje-bloga',   en: 'does-every-business-need-a-blog' },
  { pl: 'czy-twoja-strona-jest-gotowa-na-klientow',        en: 'is-your-website-ready-for-clients' },
  { pl: 'dlaczego-strona-internetowa-nie-pozyskuje-klientow', en: 'why-your-website-is-not-generating-leads' },
  { pl: 'dlaczego-szybkosc-strony-ma-znaczenie',           en: 'why-website-speed-matters' },
  { pl: 'ile-kosztuje-sklep-internetowy-2026',             en: 'how-much-does-an-online-store-cost-2026' },
  { pl: 'ile-kosztuje-strona-internetowa',                 en: 'how-much-does-a-website-cost' },
  { pl: 'ile-kosztuje-utrzymanie-strony-internetowej',     en: 'how-much-does-it-cost-to-maintain-a-website' },
  { pl: 'ile-trwa-stworzenie-strony-internetowej',         en: 'how-long-does-it-take-to-build-a-website' },
  { pl: 'jak-przygotowac-sie-do-rozmowy-z-webdeveloperem', en: 'how-to-prepare-for-working-with-a-web-developer' },
  { pl: 'jak-wybrac-wykonawce-strony-internetowej',        en: 'how-to-choose-a-web-designer' },
  { pl: 'jak-wyglada-wspolpraca-przy-tworzeniu-strony',    en: 'what-does-website-collaboration-look-like' },
  { pl: 'landing-page-czy-strona-internetowa',             en: 'landing-page-vs-website' },
  { pl: 'strona-internetowa-czy-facebook',                 en: 'website-vs-facebook-for-business' },
  { pl: 'wordpress-vs-nextjs-co-wybrac',                   en: 'wordpress-vs-nextjs-which-to-choose' },
];

/**
 * Zwraca slug tego samego artykułu w docelowym języku.
 * Jeśli nie znaleziono pary (np. artykuł nie ma jeszcze tłumaczenia),
 * zwraca `null` — wywołujący nie powinien wtedy dodawać wpisu hreflang
 * dla tego języka.
 */
export function getTranslatedBlogSlug(
  currentLocale: string,
  targetLocale: string,
  currentSlug: string
): string | null {
  const pair = BLOG_SLUG_PAIRS.find(p =>
    currentLocale === 'en' ? p.en === currentSlug : p.pl === currentSlug
  );
  if (!pair) return null;
  return targetLocale === 'en' ? pair.en : pair.pl;
}
