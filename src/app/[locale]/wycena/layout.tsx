import type { Metadata } from 'next';

const BASE_URL = 'https://anastasiiakupriianets.pl';

// page.tsx kalkulatora jest komponentem klienckim, więc nie może mieć
// generateMetadata. Bez tego layoutu strona dziedziczyła canonical strony
// głównej (z [locale]/layout.tsx) i Google traktował ją jak jej kopię.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const canonical = `${BASE_URL}/${locale}/wycena`;
  const title = isEn ? 'Website Quote Calculator' : 'Kalkulator wyceny strony internetowej';
  const description = isEn
    ? 'Estimate the cost of your website in a few steps — choose the site type, pages and extras to get an instant price range.'
    : 'Oszacuj koszt swojej strony internetowej w kilku krokach — wybierz typ strony, liczbę podstron i dodatkowe funkcje, aby zobaczyć orientacyjną wycenę.';

  return {
    title, // „| AK Web & Design” dopisuje szablon z [locale]/layout.tsx
    description,
    alternates: {
      canonical,
      languages: {
        pl: `${BASE_URL}/pl/wycena`,
        en: `${BASE_URL}/en/wycena`,
        'x-default': `${BASE_URL}/pl/wycena`,
      },
    },
    openGraph: {
      title: `${title} | AK Web & Design`,
      description,
      url: canonical,
      siteName: 'AK Web & Design',
      locale: isEn ? 'en_US' : 'pl_PL',
      type: 'website',
    },
  };
}

export default function WycenaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
