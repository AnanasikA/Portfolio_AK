// Możesz wyciągnąć ten typ do osobnego pliku, ale nie musisz.
export type ProjectItem = {
  title: string;
  slug: string;
  description: string;
  image: string;         // długi zrzut/cover do widoku szczegółu (scrollowalny)
  cardImage: string;     // miniatura do listy projektów (kafelek)
  ratio?: number;        // opcjonalne
  tech: string[];
  link?: string;

  work?: string[];
  results?: {
    highlights?: string[];
    metrics?: Record<string, string>;
    timeframe?: string;
  };

  challenges?: { problem: string; solution: string }[];
  decisions?: string[];
  integrations?: string[];
  handoff?: Record<string, string>;
};

export const projects: ProjectItem[] = [
  {
    title: 'Luisówka — domek w górach',
    slug: 'luisowka',
    description:
      'W pełni funkcjonalna platforma rezerwacyjna dla domku w Nowej Morawie. Zaprojektowałam cały przepływ rezerwacji, panel właściciela i weryfikację kolizji dat. Serwis jest szybki, responsywny i przygotowany pod SEO oraz prywatność.',
    image: '/projects/Luisowka.webp',
    cardImage: '/projects/Luisowka1.webp',

    tech: ['Next.js', 'Tailwind CSS', 'Firebase', 'Firestore', 'React Calendar', 'Vercel', 'FormSubmit'],
    link: 'https://luisowka.com',

    work: [
      'Projekt UX/UI i design system',
      'Implementacja Next.js + Tailwind CSS',
      'Kalendarz dostępności i logika rezerwacji',
      'Panel administracyjny (CRUD rezerwacji, kolizje dat)',
      'Formularz zapytań + podstawowe SEO + polityka prywatności',
    ],

    results: {
      timeframe: '4 tygodnie',
    },

    challenges: [
      {
        problem: 'Zapobieganie rezerwacjom pokrywającym się w tych samych datach.',
        solution: 'Walidacja zakresów w Firestore i blokada dni w kalendarzu w czasie rzeczywistym.',
      },
      {
        problem: 'Edycja rezerwacji bez panelu typu WordPress.',
        solution: 'Własny prosty panel CRUD w Next.js z regułami bezpieczeństwa Firestore.',
      },
      {
        problem: 'Czytelna prezentacja zasad i danych RODO.',
        solution: 'Wyraźne sekcje informacyjne + polityka prywatności i formularze zgodne z RODO.',
      },
    ],

    decisions: [
      'Next.js + ISR dla szybkiego TTFB i prostego hostingu na Vercel',
      'React Calendar zamiast ciężkich widgetów – pełna kontrola UX',
      'Design tokens w Tailwindzie dla spójnej kolorystyki i typografii',
    ],

    integrations: ['Firebase/Firestore', 'React Calendar', 'FormSubmit', 'Vercel'],
  },

  {
    title: 'Zdrowie+',
    slug: 'zdrowie-plus',
    description:
      'Strona dla marki wellness zaprojektowana pod lekkość i przejrzystość. Modularne sekcje ofertowe i blogowe prowadzą do kontaktu i zapisu — idealna baza do rozwoju treści.',
    image: '/projects/Zdrowie+1.webp',
    cardImage: '/projects/Zdrowie+.webp', // podmień na osobną miniaturę, gdy będziesz mieć
    ratio: 1.6,
    tech: ['React', 'Tailwind CSS', 'Figma', 'Framer Motion', 'Google Fonts', 'EmailJS'],
    link: 'https://ananasika.github.io/Bella-Italia/',
    work: [
      'Makiety low/high-fi i stylistyka UI',
      'Sekcje: oferta, blog, referencje, CTA',
      'Animacje mikro-interakcji (Framer Motion)',
      'Semantyka + podstawowe SEO',
    ],
    results: {
      timeframe: '3 tygodnie',
      highlights: ['Czytelny layout i klarowne CTA', 'Struktura gotowa pod publikacje blogowe'],
    },
    challenges: [
      { problem: 'Zachowanie lekkości wizualnej przy wielu sekcjach.', solution: 'Modułowy grid, ograniczona paleta, konsekwentne odstępy i typografia.' },
      { problem: 'Subtelne ożywienie bez spadków wydajności.', solution: 'Mikro-animacje na wejściach sekcji i hoverach zamiast ciężkich efektów.' },
    ],
    decisions: [
      'Framer Motion tylko dla krytycznych elementów (oszczędnie)',
      'Prosty system kart do ponownego użycia',
      'Treści semantyczne i komponenty SEO',
    ],
    integrations: ['EmailJS (formularz)', 'Google Fonts'],
  },

  {
    title: 'Quest for Paws',
    slug: 'quest-for-paws',
    description:
      'Empatyczna strona fundacji pomagającej zwierzętom. Nacisk na dostępność i prostą nawigację, by łatwo dotrzeć do adopcji oraz wsparcia.',
    image: '/projects/Paws1.webp',
    cardImage: '/projects/Paws.webp',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Google Fonts', 'EmailJS', 'Figma'],
    link: 'https://ananasika.github.io/konferencja/',
    work: [
      'Audyt dostępności (kontrast, focus, aria)',
      'Architektura informacji i ścieżki akcji',
      'Formularze adopcji/wsparcia i kontaktu',
    ],
    results: { highlights: ['Wyższa czytelność formularzy', 'Krótka ścieżka do adopcji i darowizn'] },
    challenges: [
      { problem: 'Dużo emocjonalnych treści i obrazów przy jednoczesnej czytelności UI.', solution: 'Stonowana typografia, stałe przerwy, dobre proporcje zdjęć i nagłówków.' },
      { problem: 'Ułatwienie dostępu dla osób z czytnikami ekranu.', solution: 'Role ARIA, porządek nagłówków, widoczne focus rings i tekst alternatywny.' },
    ],
    decisions: [
      'Kontrast minimalny WCAG AA',
      'Przyciski akcji w stałych miejscach na każdej podstronie',
    ],
    integrations: ['EmailJS', 'Google Fonts'],
  },

  {
    title: 'RealEstate',
    slug: 'realestate',
    description:
      'Minimalistyczny landing dla agencji nieruchomości nastawiony na pozyskanie kontaktu. Wyraźna hierarchia treści, karty ofert i szybkie CTA.',
    image: '/projects/RealEstate1.webp',
    cardImage: '/projects/RealEstate.webp',
    tech: ['React', 'Tailwind CSS', 'Figma', 'Framer Motion', 'Google Fonts', 'EmailJS'],
    link: 'https://ananasika.github.io/drone-product-page/',
    work: [
      'Makieta sekcji (USP, referencje, CTA)',
      'Karty ofert + filtrowalna lista (wersja lekka)',
      'Formularz leadowy z walidacją',
    ],
    results: { highlights: ['Czytelne USP i sekcje dowodów społecznych', 'Gotowe do rozbudowy o CMS'] },
    challenges: [
      { problem: 'Wiele typów informacji (lokalizacja, cena, metraż) na małej przestrzeni.', solution: 'Powtarzalne karty z hierarchią: zdjęcie → tytuł → parametry → CTA.' },
    ],
    decisions: ['Minimalne animacje, nacisk na wydajność', 'Elastyczny grid pod przyszłe filtry'],
    integrations: ['EmailJS', 'Google Fonts'],
  },

  {
    title: 'Marecki 24/7',
    slug: 'marecki-24-7',
    description:
      'Strona warsztatu i pomocy drogowej skoncentrowana na szybkim kontakcie. Na start telefonu, sekcje usług, dojazdu i elementy zaufania.',
    image: '/projects/Warsztat1.webp',
    cardImage: '/projects/Warsztat.webp',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Google Fonts', 'EmailJS', 'Figma'],
    link: 'https://auto-pomoc.vercel.app/',
    work: [
      'UI mobile-first z dużymi CTA',
      'Sekcje usług, dojazdu i godzin',
      'Integracja połączeń tel. i map',
    ],
    results: { highlights: ['Błyskawiczny dostęp do telefonu', 'Czytelność na małych ekranach'] },
    challenges: [
      { problem: 'Użytkownicy często w sytuacji stresowej (awaria).', solution: 'Duże przyciski, skrócone treści, kontrastowe nagłówki i stałe CTA.' },
    ],
    decisions: ['Next.js dla szybkości i łatwego hostingu', 'Mapa i telefon jako główne akcje'],
    integrations: ['EmailJS', 'Google Fonts', 'Mapy (link)'],
  },

  {
    title: 'Goports',
    slug: 'goports',
    description:
      'Autorski motyw WordPress z czystym kodem (bez builderów). Czytelne kategorie, filtrowanie wydarzeń i wygodny panel redakcyjny.',
    image: '/projects/goports21.webp',
    cardImage: '/projects/goports2.webp',
    tech: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    link: 'https://goports.ct.ws',
    work: [
      'Motyw WP od podstaw + panele edycji',
      'Struktura kategorii i filtrowanie wydarzeń',
      'Optymalizacja wydajności i SEO',
    ],
    results: { highlights: ['Łatwiejsza praca redakcji', 'Szybsze listy wydarzeń'] },
    challenges: [
      { problem: 'Zachowanie lekkości frontu przy WordPressie.', solution: 'Własny motyw + minimum pluginów, cache i lazy-loading.' },
    ],
    decisions: ['Własne CPT i pola, bez page builderów', 'Lekki CSS i sprite’y ikon'],
    integrations: ['WordPress (CPT/ACF)', 'Mapa wydarzeń (embed/link)'],
  },

  {
    title: 'StudyBuddy',
    slug: 'studybuddy',
    description:
      'Lekka platforma do wyszukiwania korepetytora. Przejrzyste karty, prowadzące CTA i subtelne animacje 3D tworzą nowoczesny, przyjazny interfejs.',
    image: '/projects/studybuddy1.webp',
    cardImage: '/projects/studybuddy.webp',
    tech: ['Next.js', 'Tailwind CSS', 'Spline', 'Blender', 'Framer Motion', 'Figma'],
    link: 'https://studybuddy-b7nk.vercel.app/',
    work: [
      'Projekt nawigacji i karty korepetytora',
      'Animacje sekcji i CTA',
      'Optymalizacja elementów 3D',
    ],
    results: { highlights: ['Płynne UI mimo 3D', 'Prosty przepływ: wybór → kontakt'] },
    challenges: [
      { problem: 'Animacje 3D a wydajność na słabszych urządzeniach.', solution: 'Kompresja modeli, lazy-mount i ograniczony zakres animacji.' },
    ],
    decisions: ['3D tylko w hero i akcentach', 'SSR/ISR w Next.js dla szybkości'],
    integrations: ['Spline (3D)', 'Framer Motion'],
  },

  {
    title: 'Photographer Portfolio',
    slug: 'photographer',
    description:
      'Portfolio z naciskiem na storytelling obrazu — UI jest lekki i nie odciąga uwagi. Siatka galerii, lazy-loading i płynne przejścia.',
    image: '/projects/photographer-site1.webp',
    cardImage: '/projects/photographer-site.webp',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Google Fonts', 'Responsive Design', 'Figma'],
    link: 'https://ananasika.github.io/portfolio-photographer/',
    work: [
      'Projekt siatki galerii i nawigacji',
      'Lazy-loading i prefetch obrazów',
      'Subtelne animacje przejść',
    ],
    results: { highlights: ['Skupienie na zdjęciach', 'Wygodne przeglądanie na mobile'] },
    challenges: [
      { problem: 'Duże obrazy a czas ładowania.', solution: 'Dopasowane rozdzielczości, kompresja i next/image z placeholderami.' },
    ],
    decisions: ['Minimalny UI, nacisk na treść', 'Kolorystyka wspierająca fotografie'],
    integrations: ['Google Fonts'],
  },

  {
    title: 'LUXENAILS',
    slug: 'luxenails',
    description:
      'Kobiecy, kolorowy serwis salonu stylizacji paznokci. Klarowna oferta, cennik i opinie, do tego szybki kontakt i social proof.',
    image: '/projects/startup-site1.webp',
    cardImage: '/projects/startup-site.webp',
    tech: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'Google Fonts', 'Figma'],
    link: 'https://ananasika.github.io/Strona_startup/',
    work: [
      'UI zgodny z identyfikacją marki',
      'Sekcje ofert, cennika i opinii',
      'Formularz i szybkie CTA',
    ],
    results: { highlights: ['Przyjazny onboarding nowych klientek', 'Spójny branding i lekka strona'] },
    challenges: [
      { problem: 'Połączenie żywej kolorystyki z czytelnością.', solution: 'Kontrastowe nagłówki, wyważone nasycenie i jednolita siatka.' },
    ],
    decisions: ['Wyraźne CTA i sekcja FAQ', 'Karty usług do łatwej rozbudowy'],
    integrations: ['Google Fonts', 'Formularz e-mail (lekki)'],
  },
];
