import type {
  ServiceData,
  ServiceProcess,
  ServicePlan,
  ServiceFAQ,
} from './types';


const PROCESS_DEFAULT: ServiceProcess[] = [
  { step: '01', title: 'Brief',     desc: 'Poznaję Twój biznes, cele i grupę docelową. Ustalamy zakres, terminy i budżet.' },
  { step: '02', title: 'Projekt',   desc: 'Tworzę projekt graficzny w Figma. Dostajesz podgląd i możliwość korekty.' },
  { step: '03', title: 'Kodowanie', desc: 'Buduję stronę zgodnie z projektem — czysty kod, optymalizacja i responsywność.' },
  { step: '04', title: 'Poprawki',  desc: '2 rundy poprawek w cenie. Dostosowuję każdy detal do Twoich oczekiwań.' },
  { step: '05', title: 'Wdrożenie', desc: 'Uruchamiam stronę na docelowym hostingu, konfiguruję domenę i SSL.' },
  { step: '06', title: 'Wsparcie',  desc: '30 dni wsparcia technicznego w cenie. Jestem dostępna po każdym pytaniu.' },
];

const webDevelopment: ServiceData = {
  slug: 'tworzenie-stron-internetowych',
  title: 'Tworzenie stron internetowych',
  subtitle:
    'Projektuję strony internetowe od podstaw — bez gotowych szablonów. Każda powstaje z myślą o Twojej firmie, szybkości działania i łatwym kontakcie z klientami.',
  description:
    'Tworzę strony internetowe dla firm i freelancerów. Każdy projekt przygotowuję indywidualnie, dbając o szybkość działania, SEO oraz wygodę korzystania na telefonach i komputerach.',
  keywords: [
    'tworzenie stron internetowych',
    'strona internetowa dla firmy',
    'wykonanie strony internetowej',
    'projekt strony internetowej',
    'webdesign Wrocław',
    'programowanie stron',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Web Development',
  heroStats: [
    { value: '14+', label: 'zrealizowanych projektów' },
    { value: '100%', label: 'custom kod' },
    { value: '30 dni', label: 'wsparcia w cenie' },
  ],
  whyTitle: 'Dlaczego warto zlecić mi stworzenie strony?',
  why: [
    {
      icon: 'star',
      title: 'Indywidualny projekt',
      desc: 'Każda strona jest projektowana od podstaw pod Twoją ofertę i sposób działania firmy — bez gotowych szablonów.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie ładowanie',
      desc: 'Dbam o szybkie ładowanie strony, dzięki czemu użytkownicy nie czekają, a Google lepiej ocenia jej wydajność.',
    },
    {
      icon: 'mobile',
      title: 'Responsywność',
      desc: 'Strona dobrze wygląda i wygodnie działa na telefonie, tablecie i komputerze.',
    },
    {
      icon: 'search',
      title: 'Przygotowana pod SEO',
      desc: 'Dbam o semantyczny HTML, meta tagi, sitemap i robots.txt, żeby strona miała dobrą podstawę pod pozycjonowanie.',
    },
    {
      icon: 'shield',
      title: 'Bezpieczeństwo',
      desc: 'Wdrażam SSL, bezpieczne nagłówki HTTP i podstawowe zabezpieczenia strony.',
    },
    {
      icon: 'chat',
      title: 'Dopracowany UX/UI',
      desc: 'Projektuję układ strony tak, aby użytkownik łatwo znalazł ofertę, kontakt i mógł szybko wysłać zapytanie.',
    },
  ],
  whatTitle: 'Co otrzymujesz w standardzie?',
  what: [
    'Indywidualny projekt graficzny w Figma',
    'Responsywna strona internetowa',
    'Podstawowa optymalizacja SEO: meta tagi, OG, sitemap, robots.txt',
    'Google Analytics / Tag Manager',
    'Formularz kontaktowy z powiadomieniami e-mail',
    'Certyfikat SSL',
    'Konfiguracja hostingu i domeny',
    'Optymalizacja prędkości: WebP, lazy loading',
    '2 rundy poprawek w cenie',
    '30 dni wsparcia technicznego',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 1500,
      features: [
        'Landing page — 1 strona',
        'Projekt graficzny',
        'Formularz kontaktowy',
        'Podstawowe przygotowanie pod SEO',
        'SSL + hosting',
      ],
    },
    {
      name: 'Business',
      from: 2800,
      features: [
        'Do 7 podstron',
        'Indywidualny design',
        'Blog / aktualności',
        'Rozbudowane przygotowanie pod SEO',
        'Google Analytics',
        'Cookies + polityki',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 5500,
      features: [
        'Nieograniczone podstrony',
        'Animacje Framer Motion',
        'Panel CMS',
        'Wielojęzyczność',
        'Rezerwacje / płatności',
        'Rozszerzone wsparcie po wdrożeniu',
      ],
    },
  ],
  faq: [
    {
      q: 'Ile kosztuje stworzenie strony internetowej?',
      a: 'Koszt zależy od zakresu projektu. Landing page zaczyna się od 1 500 zł, a prosta strona firmowa od ok. 2 800 zł netto. Szczegółową wycenę przygotowuję po krótkiej konsultacji.',
    },
    {
      q: 'Jak długo trwa realizacja strony?',
      a: 'Landing page mogę przygotować nawet w 5–7 dni roboczych. Strona firmowa standardowo zajmuje 2–4 tygodnie. Termin zależy od zakresu projektu i dostępności materiałów.',
    },
    {
      q: 'Czy strona będzie responsywna na telefonach?',
      a: 'Tak. Każda strona jest tworzona mobile-first i testowana na telefonach, tabletach oraz różnych rozdzielczościach ekranu.',
    },
    {
      q: 'Jakich technologii używasz?',
      a: 'Najczęściej pracuję w Next.js, React i Tailwind CSS. Tworzę też strony na WordPressie z autorskim motywem. Technologię dobieram do potrzeb projektu.',
    },
    {
      q: 'Czy mogę samodzielnie edytować stronę po wdrożeniu?',
      a: 'Tak. Przy WordPressie otrzymujesz dostęp do panelu admina. Przy stronach w Next.js możemy dodać prosty panel CMS albo ustalić późniejsze godziny serwisowe.',
    },
    {
      q: 'Co z hostingiem i domeną?',
      a: 'Pomagam dobrać i skonfigurować hosting oraz domenę. Strony Next.js najczęściej wdrażam na Vercel, a WordPress na Cyberfolks lub hostingu klienta.',
    },
    {
      q: 'Czy zajmujesz się SEO?',
      a: 'Każda strona ma podstawowe SEO techniczne: meta tagi, OG, sitemap, robots.txt i semantyczny HTML. Nie prowadzę stałych kampanii pozycjonowania.',
    },
    {
      q: 'Co jeśli nie spodoba mi się projekt?',
      a: 'W cenie są 2 rundy poprawek. Projekt przygotowuję w Figma, więc widzisz wygląd strony przed kodowaniem i możesz zgłosić zmiany.',
    },
  ],
  schema: {
    name: 'Tworzenie stron internetowych',
    description:
      'Tworzenie stron internetowych dla firm i freelancerów. Indywidualne projekty, szybkie strony internetowe oraz wdrożenia w Next.js i WordPress.',
    serviceType: 'WebDesign',
  },
};

const webDesign: ServiceData = {
  slug: 'projektowanie-stron',
  title: 'Projektowanie stron internetowych',
  subtitle:
    'Projektuję strony internetowe w Figma — estetyczne, przejrzyste i dopasowane do Twojej marki oraz potrzeb użytkowników.',
  description:
    'Projektuję strony internetowe w Figma dla firm i freelancerów. Każdy projekt tworzę indywidualnie, dbając o czytelny układ, wygodę użytkownika i spójność z identyfikacją wizualną.',
  keywords: [
    'projektowanie stron internetowych',
    'projekt strony internetowej',
    'UI UX design',
    'Figma projekt strony',
    'webdesign',
  ],
  heroVideo: '/videos/services/web-design.mp4',
  heroPoster: '/videos/services/web-design-poster.webp',
  heroLabel: 'UI / UX Design',
  heroStats: [
    { value: 'Figma', label: 'narzędzie projektowe' },
    { value: '100%', label: 'indywidualny projekt' },
    { value: '2 rundy', label: 'poprawek w cenie' },
  ],
  whyTitle: 'Dlaczego warto zacząć od projektu?',
  why: [
    {
      icon: 'star',
      title: 'Projekt dopasowany do marki',
      desc: 'Tworzę projekt zgodny z identyfikacją wizualną Twojej firmy — kolorystyką, typografią i charakterem marki.',
    },
    {
      icon: 'search',
      title: 'Projektowanie z myślą o użytkowniku',
      desc: 'Układ strony planuję tak, aby użytkownik szybko znalazł najważniejsze informacje i łatwo nawiązał kontakt.',
    },
    {
      icon: 'code',
      title: 'Interaktywny prototyp',
      desc: 'Przed rozpoczęciem kodowania możesz sprawdzić, jak będzie działała strona i zgłosić ewentualne zmiany.',
    },
    {
      icon: 'mobile',
      title: 'Projekt responsywny',
      desc: 'Projekt przygotowuję z myślą o telefonach, tabletach i komputerach, aby dobrze wyglądał na każdym urządzeniu.',
    },
    {
      icon: 'target',
      title: 'Nastawienie na kontakt',
      desc: 'Przyciski, formularze i układ treści projektuję tak, aby ułatwić użytkownikowi wykonanie kolejnego kroku.',
    },
    {
      icon: 'refresh',
      title: 'Współpraca na każdym etapie',
      desc: 'Regularnie pokazuję postępy prac i uwzględniam Twoje uwagi przed zakończeniem projektu.',
    },
  ],
  whatTitle: 'Co otrzymujesz w ramach projektu graficznego?',
  what: [
    'Indywidualny projekt strony w Figma',
    'Widok desktop i mobile',
    'Interaktywny prototyp',
    'Kolorystykę i typografię projektu',
    'Projekt najważniejszych komponentów (przyciski, formularze, karty)',
    'Przygotowanie plików dla developera',
    'Eksport ikon i grafik',
    '2 rundy poprawek w cenie',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 800,
      features: [
        'Landing page',
        'Projekt desktop i mobile',
        'Interaktywny prototyp',
        '1 runda poprawek',
      ],
    },
    {
      name: 'Business',
      from: 1800,
      features: [
        'Do 7 podstron',
        'Spójny system komponentów',
        'Interaktywny prototyp',
        '2 rundy poprawek',
        'Przygotowanie dla developera',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 3500,
      features: [
        'Nieograniczona liczba podstron',
        'Rozbudowany system komponentów',
        'Projekt animacji',
        'Warianty kluczowych widoków',
        'Priorytetowa realizacja',
      ],
    },
  ],
  faq: [
    {
      q: 'Czy projektujesz również logo i identyfikację wizualną?',
      a: 'Nie tworzę identyfikacji wizualnej od podstaw. Projekt strony przygotowuję na podstawie materiałów i stylu Twojej marki.',
    },
    {
      q: 'W jakim programie projektujesz?',
      a: 'Pracuję w Figma. Możesz na bieżąco przeglądać projekt, dodawać komentarze i po zakończeniu otrzymujesz dostęp do pliku.',
    },
    {
      q: 'Jak wygląda proces projektowania?',
      a: 'Zaczynam od poznania Twojej firmy i potrzeb. Następnie przygotowuję układ strony, projekt graficzny oraz interaktywny prototyp. Na każdym etapie możesz zgłaszać uwagi.',
    },
    {
      q: 'Ile trwa przygotowanie projektu?',
      a: 'Landing page zwykle przygotowuję w 3–5 dni roboczych, a projekt strony firmowej w około 1–2 tygodnie. Termin zależy od zakresu projektu i tempa akceptacji.',
    },
    {
      q: 'Czy otrzymam plik do edycji?',
      a: 'Tak. Po zakończeniu projektu i rozliczeniu otrzymujesz pełny dostęp do pliku Figma.',
    },
    {
      q: 'Czy projektujesz materiały do druku?',
      a: 'Nie. Skupiam się na projektowaniu stron internetowych i interfejsów aplikacji webowych.',
    },
    {
      q: 'Czy mogę zamówić sam projekt bez wdrożenia?',
      a: 'Tak. Możesz zamówić wyłącznie projekt graficzny i przekazać go własnemu programiście lub zespołowi.',
    },
    {
      q: 'Czy projekt będzie gotowy do wdrożenia?',
      a: 'Tak. Projekt przygotowuję w sposób ułatwiający jego późniejsze zakodowanie, dzięki czemu wdrożenie przebiega sprawniej.',
    },
  ],
  schema: {
    name: 'Projektowanie stron internetowych',
    description:
      'Projektowanie stron internetowych w Figma dla firm i freelancerów. Indywidualne projekty, interaktywne prototypy i przygotowanie do wdrożenia.',
    serviceType: 'GraphicDesign',
  },
};
const businessWebsites: ServiceData = {
  slug: 'strony-dla-firm',
  title: 'Strony internetowe dla firm',
  subtitle:
    'Projektuję strony internetowe dla firm, które pomagają budować wiarygodność, ułatwiają kontakt z klientami i wspierają rozwój biznesu.',
  description:
    'Tworzę strony internetowe dla firm z indywidualnym projektem, technicznym SEO i pełną responsywnością. Realizuję projekty dla klientów z Wrocławia i całej Polski.',
  keywords: [
    'strony internetowe dla firm',
    'strona firmowa',
    'strona www dla firmy',
    'tworzenie stron dla firm',
    'webdesign dla biznesu',
  ],
   heroVideo: '/videos/services/business-websites.mp4',
   heroPoster: '/videos/services/business-websites.webp',
  heroLabel: 'Strony firmowe',
  heroStats: [
    { value: '14+', label: 'zrealizowanych projektów' },
    { value: '2–4', label: 'tygodnie realizacji' },
    { value: 'SEO', label: 'techniczne w standardzie' },
  ],
  whyTitle: 'Dlaczego warto zainwestować w stronę firmową?',
  why: [
    {
      icon: 'shield',
      title: 'Budowanie zaufania',
      desc: 'Profesjonalna strona internetowa pomaga budować wiarygodność firmy i ułatwia klientom podjęcie decyzji o kontakcie.',
    },
    {
      icon: 'search',
      title: 'Przygotowana pod SEO',
      desc: 'Dbam o semantyczny kod, meta tagi, sitemap i pozostałe elementy technicznego SEO już na etapie tworzenia strony.',
    },
    {
      icon: 'mobile',
      title: 'Responsywność',
      desc: 'Strona działa poprawnie i wygląda estetycznie na telefonach, tabletach oraz komputerach.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Optymalizuję stronę, aby ładowała się sprawnie i zapewniała wygodne korzystanie użytkownikom.',
    },
    {
      icon: 'target',
      title: 'Łatwy kontakt',
      desc: 'Przemyślany układ strony, formularze i przyciski CTA ułatwiają klientom wysłanie zapytania.',
    },
    {
      icon: 'lock',
      title: 'Bezpieczeństwo',
      desc: 'Wdrażam certyfikat SSL oraz podstawowe zabezpieczenia zwiększające bezpieczeństwo strony.',
    },
  ],
  whatTitle: 'Co otrzymujesz w standardzie?',
  what: [
    'Strona główna i do 7 podstron',
    'Sekcja „O firmie”',
    'Podstrona usług lub oferty',
    'Galeria realizacji',
    'Formularz kontaktowy',
    'Dane kontaktowe z mapą Google',
    'Blog lub aktualności (opcjonalnie)',
    'Podstawowe SEO techniczne',
    'Google Analytics',
    'Cookies i niezbędne polityki',
    'Certyfikat SSL',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 2800,
      features: [
        'Do 5 podstron',
        'Indywidualny projekt',
        'Formularz kontaktowy',
        'Podstawowe przygotowanie pod SEO',
        'SSL + konfiguracja hostingu',
      ],
    },
    {
      name: 'Business',
      from: 4200,
      features: [
        'Do 10 podstron',
        'Blog',
        'Google Analytics',
        'Cookies i polityki',
        'Mapa Google',
        '2 rundy poprawek',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 7000,
      features: [
        'Nieograniczona liczba podstron',
        'Wielojęzyczność',
        'Panel CMS',
        'Animacje',
        'Rozszerzone wsparcie po wdrożeniu',
      ],
    },
  ],
  faq: [
    {
      q: 'Ile kosztuje strona internetowa dla firmy?',
      a: 'Cena strony firmowej zaczyna się od około 2 800 zł netto. Ostateczny koszt zależy od liczby podstron, funkcjonalności oraz zakresu projektu.',
    },
    {
      q: 'Czy strona będzie przygotowana pod Google Ads?',
      a: 'Tak. Mogę przygotować stronę z myślą o kampaniach Google Ads, dbając o szybkie działanie, czytelny układ i możliwość mierzenia konwersji.',
    },
    {
      q: 'Jak długo trwa realizacja?',
      a: 'Większość stron firmowych realizuję w ciągu 2–4 tygodni. Termin zależy od zakresu projektu oraz czasu przekazywania materiałów i akceptacji.',
    },
    {
      q: 'Czy strona będzie widoczna w Google?',
      a: 'Każda strona otrzymuje podstawowe SEO techniczne, które stanowi dobrą bazę do późniejszego pozycjonowania. Nie gwarantuję konkretnych pozycji w wynikach wyszukiwania.',
    },
    {
      q: 'Czy mogę zlecić przebudowę istniejącej strony?',
      a: 'Tak. Mogę odświeżyć wygląd strony, poprawić jej wydajność i dostosować ją do aktualnych standardów.',
    },
    {
      q: 'Czy przygotowujesz treści na stronę?',
      a: 'Treści dostarcza klient. Chętnie pomogę w zaplanowaniu struktury strony i podpowiem, jakie informacje warto umieścić.',
    },
    {
      q: 'Czy stronę można później rozbudować?',
      a: 'Tak. Projektuję strony w sposób umożliwiający ich dalszą rozbudowę o kolejne podstrony lub funkcjonalności.',
    },
    {
      q: 'Czy oferujesz wsparcie po wdrożeniu?',
      a: 'Tak. W cenie otrzymujesz 30 dni wsparcia technicznego po uruchomieniu strony.',
    },
  ],
  schema: {
    name: 'Strony internetowe dla firm',
    description:
      'Projektowanie i tworzenie stron internetowych dla firm. Indywidualne projekty, techniczne SEO i responsywne strony dopasowane do potrzeb biznesu.',
    serviceType: 'WebDesign',
  },
};
const wordpressWebsites: ServiceData = {
  slug: 'wordpress',
  title: 'Strony WordPress',
  subtitle:
    'Tworzę strony WordPress z autorskim motywem — bez gotowych szablonów i ciężkich builderów. Szybkie, bezpieczne i wygodne w późniejszej edycji.',
  description:
    'Projektuję i tworzę strony WordPress dla firm z autorskim motywem, intuicyjnym panelem administracyjnym oraz indywidualnym projektem graficznym.',
  keywords: [
    'strony wordpress',
    'wordpress dla firmy',
    'strona wordpress',
    'autorski motyw wordpress',
    'wordpress wrocław',
  ],
  heroVideo: '/videos/services/web-development.mp4',
   heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'WordPress',
  heroStats: [
    { value: '5+', label: 'zrealizowanych stron WordPress' },
    { value: 'ACF', label: 'łatwa edycja treści' },
    { value: '100%', label: 'autorski motyw' },
  ],
  whyTitle: 'Dlaczego warto wybrać WordPress?',
  why: [
    {
      icon: 'check',
      title: 'Prosta edycja treści',
      desc: 'Po wdrożeniu możesz samodzielnie zmieniać teksty i zdjęcia bez znajomości programowania.',
    },
    {
      icon: 'shield',
      title: 'Bezpieczeństwo',
      desc: 'Dbam o odpowiednią konfigurację WordPressa oraz podstawowe zabezpieczenia zwiększające bezpieczeństwo strony.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Tworzę lekkie motywy bez zbędnych dodatków, dzięki czemu strona działa sprawnie.',
    },
    {
      icon: 'code',
      title: 'Autorski motyw',
      desc: 'Każda strona powstaje od podstaw i jest dopasowana do potrzeb Twojej firmy, bez gotowych szablonów.',
    },
    {
      icon: 'globe',
      title: 'Możliwość rozbudowy',
      desc: 'W razie potrzeby stronę można rozbudować o kolejne języki, blog, sklep lub nowe funkcjonalności.',
    },
    {
      icon: 'chart',
      title: 'Przygotowana pod SEO',
      desc: 'Integruję stronę z narzędziami analitycznymi i dbam o techniczne SEO już na etapie wdrożenia.',
    },
  ],
  whatTitle: 'Co otrzymujesz w ramach strony WordPress?',
  what: [
    'Autorski motyw WordPress',
    'Responsywną stronę internetową',
    'Intuicyjny panel administracyjny',
    'Konfigurację ACF do wygodnej edycji treści',
    'Integrację z Yoast SEO',
    'Google Analytics i Tag Manager',
    'Konfigurację domeny, hostingu i certyfikatu SSL',
    'Szkolenie z obsługi panelu (około 30 minut)',
    '30 dni wsparcia technicznego',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 2400,
      features: [
        'Do 5 podstron',
        'Autorski motyw',
        'Panel Gutenberg',
        'Podstawowe przygotowanie pod SEO',
        'SSL + konfiguracja hostingu',
      ],
    },
    {
      name: 'Business',
      from: 3800,
      features: [
        'Do 10 podstron',
        'ACF',
        'Blog',
        'Wielojęzyczność',
        'Google Analytics',
        '2 rundy poprawek',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 6000,
      features: [
        'Nieograniczona liczba podstron',
        'WooCommerce',
        'System rezerwacji',
        'Dodatkowe zabezpieczenia',
        'Rozszerzone wsparcie po wdrożeniu',
      ],
    },
  ],
  faq: [
    {
      q: 'Czym Twoja strona WordPress różni się od gotowych szablonów?',
      a: 'Tworzę autorski motyw dopasowany do projektu zamiast korzystać z gotowych szablonów. Dzięki temu strona jest lżejsza, szybsza i łatwiejsza do rozbudowy.',
    },
    {
      q: 'Czy po wdrożeniu mogę samodzielnie edytować stronę?',
      a: 'Tak. Konfiguruję panel administracyjny tak, aby edycja treści była prosta. Dodatkowo pokazuję, jak z niego korzystać.',
    },
    {
      q: 'Czy korzystasz z Elementora lub innych builderów?',
      a: 'Nie. Tworzę autorskie motywy oparte na natywnym edytorze WordPress, dzięki czemu strona pozostaje lekka i szybka.',
    },
    {
      q: 'Czy WordPress jest bezpieczny?',
      a: 'Tak, jeśli jest odpowiednio skonfigurowany i regularnie aktualizowany. Dbam o podstawowe zabezpieczenia już podczas wdrożenia.',
    },
    {
      q: 'Czy możesz przenieść moją obecną stronę WordPress?',
      a: 'Tak. Mogę przenieść treści oraz przygotować nową wersję strony z zachowaniem najważniejszych danych.',
    },
    {
      q: 'Czy mogę później dodać sklep internetowy?',
      a: 'Tak. W przyszłości stronę można rozbudować o WooCommerce lub inne funkcjonalności.',
    },
    {
      q: 'Czy pomagasz z hostingiem?',
      a: 'Tak. Pomagam dobrać hosting i konfiguruję domenę oraz certyfikat SSL.',
    },
    {
      q: 'Czy oferujesz wsparcie po wdrożeniu?',
      a: 'Tak. W cenie otrzymujesz 30 dni wsparcia technicznego. Możliwa jest również stała opieka nad stroną.',
    },
  ],
  schema: {
    name: 'Strony WordPress',
    description:
      'Projektowanie i tworzenie stron WordPress z autorskim motywem. Indywidualne projekty, łatwa edycja treści oraz techniczne SEO.',
    serviceType: 'WebDesign',
  },
};
const landingPage: ServiceData = {
  slug: 'landing-page',
  title: 'Landing page',
  subtitle:
    'Projektuję landing page z jednym, jasno określonym celem — aby ułatwić użytkownikowi kontakt, zapis lub zakup.',
  description:
    'Tworzę landing page dla firm i kampanii reklamowych. Indywidualny projekt, szybkie działanie, techniczne SEO oraz konfiguracja analityki.',
  keywords: [
    'landing page',
    'strona sprzedażowa',
    'landing page google ads',
    'strona docelowa',
    'landing page dla firmy',
  ],
  heroVideo: '/videos/services/web-design.mp4',
  heroPoster: '/videos/services/web-design-poster.webp',
  heroLabel: 'Landing Page',
  heroStats: [
    { value: '5–7', label: 'dni roboczych' },
    { value: '90+', label: 'wydajność PageSpeed' },
    { value: 'GA4', label: 'konfiguracja analityki' },
  ],
  whyTitle: 'Dlaczego warto wybrać landing page?',
  why: [
    {
      icon: 'target',
      title: 'Jeden cel',
      desc: 'Landing page skupia uwagę użytkownika na jednej konkretnej akcji, bez zbędnych elementów odciągających uwagę.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Optymalizuję stronę, aby ładowała się sprawnie zarówno na telefonach, jak i komputerach.',
    },
    {
      icon: 'chart',
      title: 'Pomiar efektów',
      desc: 'Konfiguruję narzędzia analityczne, dzięki którym możesz sprawdzić skuteczność kampanii i liczbę konwersji.',
    },
    {
      icon: 'mobile',
      title: 'Responsywność',
      desc: 'Landing page działa poprawnie i wygląda dobrze na każdym urządzeniu.',
    },
    {
      icon: 'search',
      title: 'Przygotowany pod SEO lub reklamy',
      desc: 'Projekt dopasowuję do celu — może wspierać pozycjonowanie lub kampanie Google Ads i Meta Ads.',
    },
    {
      icon: 'speed',
      title: 'Krótki czas realizacji',
      desc: 'Większość landing page realizuję w ciągu 5–7 dni roboczych.',
    },
  ],
  whatTitle: 'Co otrzymujesz w ramach landing page?',
  what: [
    'Indywidualny projekt graficzny',
    'Widok desktop i mobile',
    'Sekcję główną z wyraźnym wezwaniem do działania',
    'Sekcję oferty lub korzyści',
    'Opinie klientów lub elementy budujące zaufanie',
    'Formularz kontaktowy z powiadomieniami e-mail',
    'Certyfikat SSL',
    'Google Analytics 4 i konfigurację śledzenia konwersji',
    'Optymalizację szybkości działania',
    'Meta tagi oraz Open Graph',
    '30 dni wsparcia technicznego',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 1500,
      features: [
        'Landing page',
        'Indywidualny projekt',
        'Formularz kontaktowy',
        'SSL + Google Analytics',
      ],
    },
    {
      name: 'Business',
      from: 2200,
      features: [
        'Landing page + strona podziękowania',
        'Przygotowanie do testów A/B',
        'Google Tag Manager',
        'Meta Pixel',
        'Śledzenie konwersji',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 3500,
      features: [
        'Landing page + 2 warianty',
        'Animacje',
        'Integracja z CRM',
        'Przygotowanie pod kampanie reklamowe',
        'Priorytetowa realizacja',
      ],
    },
  ],
  faq: [
    {
      q: 'Czym landing page różni się od strony firmowej?',
      a: 'Landing page skupia się na jednym celu, np. wysłaniu formularza lub zakupie. Strona firmowa prezentuje całą ofertę i zawiera więcej informacji o firmie.',
    },
    {
      q: 'Czy landing page sprawdzi się do Google Ads?',
      a: 'Tak. Projektuję landing page z myślą o kampaniach reklamowych, dbając o szybkie działanie, czytelny układ i możliwość mierzenia konwersji.',
    },
    {
      q: 'Jak długo trwa realizacja?',
      a: 'Najczęściej od 5 do 7 dni roboczych. Termin zależy od zakresu projektu oraz dostępności materiałów.',
    },
    {
      q: 'Czy konfigurujesz analitykę?',
      a: 'Tak. Mogę skonfigurować Google Analytics 4, Google Tag Manager oraz śledzenie konwersji. W razie potrzeby dodaję również Meta Pixel.',
    },
    {
      q: 'Czy landing page będzie działał na telefonach?',
      a: 'Tak. Każdy projekt jest responsywny i testowany na różnych urządzeniach.',
    },
    {
      q: 'Czy mogę zamówić kilka wersji landing page?',
      a: 'Tak. W wyższych pakietach mogę przygotować kilka wariantów strony do późniejszych testów.',
    },
    {
      q: 'Czy pomagasz z hostingiem i domeną?',
      a: 'Tak. Pomagam wybrać hosting, skonfigurować domenę oraz certyfikat SSL.',
    },
    {
      q: 'Czy możesz przebudować istniejący landing page?',
      a: 'Tak. Mogę odświeżyć wygląd, poprawić wydajność oraz dostosować stronę do nowych kampanii reklamowych.',
    },
  ],
  schema: {
    name: 'Landing page',
    description:
      'Projektowanie i tworzenie landing page dla kampanii Google Ads, Meta Ads oraz działań marketingowych. Indywidualne projekty, szybkie działanie i konfiguracja analityki.',
    serviceType: 'WebDesign',
  },
};
const ecommerceWebsites: ServiceData = {
  slug: 'sklepy-internetowe',
  title: 'Sklepy internetowe',
  subtitle:
    'Tworzę sklepy internetowe na WooCommerce i Next.js, które umożliwiają wygodne zarządzanie produktami, zamówieniami i płatnościami.',
  description:
    'Projektuję i tworzę sklepy internetowe dla firm. Integruję płatności online, konfiguruję panel administracyjny oraz przygotowuję sklep pod techniczne SEO.',
  keywords: [
    'sklep internetowy',
    'sklep e-commerce',
    'woocommerce',
    'next.js ecommerce',
    'tworzenie sklepów internetowych',
  ],
  heroVideo: '/videos/services/business-websites.mp4',
  heroPoster: '/videos/services/business-websites-poster.webp',
  heroLabel: 'E-commerce',
  heroStats: [
    { value: 'Stripe', label: 'integracja płatności' },
    { value: 'P24', label: 'Przelewy24 / PayU' },
    { value: '90+', label: 'wydajność PageSpeed' },
  ],
  whyTitle: 'Dlaczego warto zainwestować w sklep internetowy?',
  why: [
    {
      icon: 'cart',
      title: 'Łatwe zarządzanie sklepem',
      desc: 'Możesz samodzielnie dodawać produkty, zmieniać ceny oraz obsługiwać zamówienia z poziomu panelu administracyjnego.',
    },
    {
      icon: 'shield',
      title: 'Bezpieczne płatności',
      desc: 'Integruję popularne systemy płatności online, aby klienci mogli wygodnie finalizować zakupy.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Dbam o wydajność sklepu, aby zakupy były wygodne zarówno na komputerach, jak i telefonach.',
    },
    {
      icon: 'save',
      title: 'Pełna kontrola nad produktami',
      desc: 'Łatwo zarządzasz produktami, zdjęciami, wariantami oraz stanami magazynowymi.',
    },
    {
      icon: 'chart',
      title: 'Analiza sprzedaży',
      desc: 'Konfiguruję narzędzia analityczne, dzięki którym możesz śledzić sprzedaż i zachowania użytkowników.',
    },
    {
      icon: 'search',
      title: 'Przygotowany pod SEO',
      desc: 'Dbam o techniczne SEO sklepu, aby ułatwić jego późniejsze pozycjonowanie.',
    },
  ],
  whatTitle: 'Co otrzymujesz w ramach sklepu internetowego?',
  what: [
    'Stronę główną i katalog produktów',
    'Karty produktów z wariantami',
    'Koszyk i proces składania zamówienia',
    'Integrację płatności online',
    'Panel do zarządzania produktami i zamówieniami',
    'Powiadomienia e-mail dla klienta i administratora',
    'Podstawowe SEO techniczne sklepu',
    'Google Analytics 4',
    'Certyfikat SSL',
    'Szkolenie z obsługi panelu',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 4500,
      features: [
        'Do 50 produktów',
        'WooCommerce',
        'Stripe',
        'Podstawowe przygotowanie pod SEO',
        'Panel administracyjny',
      ],
    },
    {
      name: 'Business',
      from: 7500,
      features: [
        'Nieograniczona liczba produktów',
        'Przelewy24 / PayU',
        'Warianty produktów',
        'Google Analytics e-commerce',
        'Integracja e-mail',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 12000,
      features: [
        'Next.js + architektura headless',
        'Panel CMS',
        'Filtrowanie produktów',
        'Konto klienta',
        'Rozszerzone wsparcie po wdrożeniu',
      ],
    },
  ],
  faq: [
    {
      q: 'Jaką platformę sklepową wybrać?',
      a: 'Dobór technologii zależy od potrzeb sklepu. WooCommerce sprawdza się w większości małych i średnich sklepów, natomiast Next.js jest dobrym wyborem przy bardziej rozbudowanych projektach.',
    },
    {
      q: 'Czy sklep może obsługiwać polskie płatności?',
      a: 'Tak. Integruję między innymi Przelewy24, PayU, Paynow oraz Stripe.',
    },
    {
      q: 'Ile kosztuje sklep internetowy?',
      a: 'Prosty sklep WooCommerce zaczyna się od około 4 500 zł netto. Bardziej rozbudowane projekty wyceniam indywidualnie po poznaniu zakresu prac.',
    },
    {
      q: 'Czy otrzymam panel administracyjny?',
      a: 'Tak. Możesz samodzielnie zarządzać produktami, zamówieniami oraz treściami na stronie.',
    },
    {
      q: 'Jak długo trwa realizacja sklepu?',
      a: 'Najczęściej od 3 do 6 tygodni dla WooCommerce i od 6 do 10 tygodni dla bardziej rozbudowanych sklepów opartych na Next.js.',
    },
    {
      q: 'Czy mogę samodzielnie dodawać produkty?',
      a: 'Tak. Pokazuję, jak obsługiwać panel administracyjny i przekazuję podstawowe wskazówki dotyczące jego użytkowania.',
    },
    {
      q: 'Czy sklep będzie działał na telefonach?',
      a: 'Tak. Każdy sklep jest responsywny i dostosowany do urządzeń mobilnych.',
    },
    {
      q: 'Czy sklep będzie przygotowany pod SEO?',
      a: 'Tak. Wdrażam podstawowe elementy technicznego SEO, które stanowią dobrą bazę do dalszego pozycjonowania.',
    },
  ],
  schema: {
    name: 'Sklepy internetowe',
    description:
      'Projektowanie i tworzenie sklepów internetowych na WooCommerce oraz Next.js. Integracja płatności online, panel administracyjny i techniczne SEO.',
    serviceType: 'WebDesign',
  },
};
const procesAdministracja: ServiceProcess[] = [
  {
    step: '01',
    title: 'Audyt',
    desc: 'Sprawdzam stan strony, wersje oprogramowania, aktualne problemy i miejsca, które wymagają poprawy.',
  },
  {
    step: '02',
    title: 'Zakres opieki',
    desc: 'Ustalamy, co ma obejmować miesięczna administracja strony i jak często mają być wykonywane prace.',
  },
  {
    step: '03',
    title: 'Konfiguracja',
    desc: 'Konfiguruję potrzebne dostępy, kopie zapasowe i podstawowe narzędzia do kontroli działania strony.',
  },
  {
    step: '04',
    title: 'Stała opieka',
    desc: 'Co miesiąc wykonuję ustalone prace, aktualizacje i drobne zmiany na stronie.',
  },
  {
    step: '05',
    title: 'Raport',
    desc: 'Wysyłam krótkie podsumowanie wykonanych prac, aktualizacji i ewentualnych problemów.',
  },
  {
    step: '06',
    title: 'Usprawnienia',
    desc: 'W razie potrzeby proponuję poprawki związane z szybkością działania, bezpieczeństwem lub wygodą obsługi strony.',
  },
];

const planyAdministracja: ServicePlan[] = [
  {
    name: 'Basic',
    from: 120,
    features: [
      'Do 1h zmian miesięcznie',
      'Aktualizacje WordPress',
      'Backup miesięczny',
      'Raport e-mail',
    ],
  },
  {
    name: 'Standard',
    from: 220,
    features: [
      'Do 2h zmian miesięcznie',
      'Backup tygodniowy',
      'Monitoring dostępności',
      'Szybsza obsługa zgłoszeń',
    ],
    highlight: true,
  },
  {
    name: 'Pro',
    from: 400,
    features: [
      'Do 4h zmian miesięcznie',
      'Backup dzienny',
      'Optymalizacja wydajności',
      'Dodatkowe zabezpieczenia',
      'Kontakt telefoniczny',
    ],
  },
];

const faqAdministracja: ServiceFAQ[] = [
  {
    q: 'Jakimi stronami się opiekujesz?',
    a: 'Najczęściej opiekuję się stronami WordPress i Next.js. Mogę też pomóc przy prostych stronach HTML/CSS.',
  },
  {
    q: 'Czy strona musi być wykonana przez Ciebie?',
    a: 'Nie. Mogę objąć opieką także stronę wykonaną przez inną osobę. W takim przypadku zaczynam od krótkiego audytu technicznego.',
  },
  {
    q: 'Jak szybko reagujesz na zgłoszenia?',
    a: 'Na zgłoszenia odpowiadam w godzinach roboczych. Czas reakcji zależy od wybranego pakietu i rodzaju problemu.',
  },
  {
    q: 'Co jeśli potrzebuję więcej zmian niż obejmuje pakiet?',
    a: 'Dodatkowe prace mogę rozliczyć godzinowo po wcześniejszym ustaleniu zakresu.',
  },
  {
    q: 'Czy otrzymam raport z wykonanych prac?',
    a: 'Tak. Co miesiąc wysyłam krótkie podsumowanie wykonanych aktualizacji, zmian i ewentualnych problemów.',
  },
  {
    q: 'Czy aktualizacje mogą zepsuć stronę?',
    a: 'Przed ważniejszymi aktualizacjami wykonuję kopię zapasową. Jeśli pojawi się problem, można przywrócić wcześniejszą wersję strony.',
  },
  {
    q: 'Czy mogę zrezygnować z opieki?',
    a: 'Tak. Opieka jest rozliczana miesięcznie, więc możesz z niej zrezygnować bez długiej umowy.',
  },
  {
    q: 'Czy możesz opiekować się sklepem WooCommerce?',
    a: 'Tak. Mogę pomagać przy aktualizacjach WooCommerce, drobnych zmianach w sklepie i podstawowej administracji produktami.',
  },
];
const websiteMaintenance: ServiceData = {
  slug: 'administracja-stron',
  title: 'Administracja stron internetowych',
  subtitle:
    'Dbam o aktualizacje, bezpieczeństwo i bieżące zmiany na stronie, dzięki czemu możesz skupić się na prowadzeniu swojej firmy.',
  description:
    'Oferuję administrację stron internetowych WordPress i Next.js. Zajmuję się aktualizacjami, kopiami zapasowymi, drobnymi zmianami oraz bieżącą opieką techniczną.',
  keywords: [
    'administracja strony internetowej',
    'opieka nad stroną internetową',
    'zarządzanie stroną',
    'aktualizacje wordpress',
    'serwis strony',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Administracja',
  heroStats: [
    { value: '24h', label: 'maks. czas reakcji*' },
    { value: 'Co miesiąc', label: 'raport z wykonanych prac' },
    { value: 'od 120 zł', label: 'pakiety miesięczne' },
  ],
  whyTitle: 'Dlaczego warto zlecić administrację strony?',
  why: [
    {
      icon: 'refresh',
      title: 'Regularne aktualizacje',
      desc: 'Aktualizuję WordPress, motywy i wtyczki, dbając o poprawne działanie strony.',
    },
    {
      icon: 'save',
      title: 'Kopie zapasowe',
      desc: 'Regularnie tworzę kopie zapasowe, dzięki którym w razie problemów można szybko przywrócić stronę.',
    },
    {
      icon: 'bug',
      title: 'Szybka pomoc',
      desc: 'Jeśli pojawi się problem lub awaria, zajmuję się jego diagnozą i usunięciem.',
    },
    {
      icon: 'check',
      title: 'Bieżące zmiany',
      desc: 'Dodaję nowe treści, zdjęcia i wprowadzam drobne zmiany bez konieczności angażowania programisty.',
    },
    {
      icon: 'chart',
      title: 'Kontrola działania',
      desc: 'Regularnie sprawdzam dostępność strony oraz jej podstawową wydajność.',
    },
    {
      icon: 'shield',
      title: 'Bezpieczeństwo',
      desc: 'Dbam o podstawowe zabezpieczenia oraz aktualność oprogramowania.',
    },
  ],
  whatTitle: 'Co obejmuje administracja strony?',
  what: [
    'Aktualizacje WordPress, motywów i wtyczek',
    'Regularne kopie zapasowe',
    'Monitoring dostępności strony',
    'Drobne zmiany treści zgodnie z pakietem',
    'Podstawowa optymalizacja bazy danych',
    'Kontrola błędów technicznych',
    'Miesięczny raport z wykonanych prac',
    'Wsparcie e-mail',
  ],
  process: procesAdministracja,
  plans: planyAdministracja,
  faq: faqAdministracja,
  schema: {
    name: 'Administracja stron internetowych',
    description:
      'Administracja i opieka nad stronami internetowymi WordPress oraz Next.js. Aktualizacje, kopie zapasowe i bieżące wsparcie techniczne.',
    serviceType: 'WebSiteMaintenance',
  },
};
const websiteSupport: ServiceData = {
  slug: 'opieka-nad-stronami',
  title: 'Opieka nad stronami internetowymi',
  subtitle:
    'Miesięczna opieka techniczna nad stroną — aktualizacje, kopie zapasowe, drobne zmiany i wsparcie, gdy coś przestaje działać.',
  description:
    'Oferuję miesięczną opiekę nad stronami internetowymi WordPress i Next.js. Zajmuję się aktualizacjami, backupami, drobnymi zmianami i wsparciem technicznym.',
  keywords: [
    'opieka nad stroną internetową',
    'serwis strony www',
    'wsparcie techniczne strony',
    'utrzymanie strony internetowej',
    'administracja strony internetowej',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Opieka techniczna',
  heroStats: [
    { value: 'Co miesiąc', label: 'stała opieka' },
    { value: 'Raport', label: 'podsumowanie prac' },
    { value: 'od 120 zł', label: 'pakiety miesięczne' },
  ],
  whyTitle: 'Dlaczego warto mieć opiekę nad stroną?',
  why: [
    {
      icon: 'shield',
      title: 'Bezpieczeństwo',
      desc: 'Dbam o aktualizacje, kopie zapasowe i podstawowe zabezpieczenia strony.',
    },
    {
      icon: 'save',
      title: 'Kopie zapasowe',
      desc: 'Regularne backupy pomagają szybko przywrócić stronę w razie problemów.',
    },
    {
      icon: 'bolt',
      title: 'Sprawne działanie',
      desc: 'Kontroluję podstawową wydajność strony i w razie potrzeby proponuję usprawnienia.',
    },
    {
      icon: 'chat',
      title: 'Bezpośredni kontakt',
      desc: 'Piszesz bezpośrednio do mnie, bez przechodzenia przez help desk lub anonimowy support.',
    },
    {
      icon: 'chart',
      title: 'Kontrola dostępności',
      desc: 'Sprawdzam, czy strona działa poprawnie i reaguję na zgłoszone problemy.',
    },
    {
      icon: 'check',
      title: 'Drobne zmiany',
      desc: 'W ramach pakietu mogę zmienić tekst, zdjęcie, godzinę otwarcia, cenę lub inną prostą treść.',
    },
  ],
  whatTitle: 'Co obejmuje miesięczna opieka?',
  what: [
    'Kontrola dostępności strony',
    'Regularne kopie zapasowe zgodnie z pakietem',
    'Aktualizacje WordPress, motywów i wtyczek',
    'Podstawowa kontrola bezpieczeństwa',
    'Podstawowa optymalizacja bazy danych',
    'Drobne poprawki treści zgodnie z pakietem',
    'Wsparcie e-mail',
    'Miesięczne podsumowanie wykonanych prac',
  ],
  process: procesAdministracja,
  plans: planyAdministracja,
  faq: faqAdministracja,
  schema: {
    name: 'Opieka nad stronami internetowymi',
    description:
      'Miesięczna opieka techniczna nad stronami internetowymi. Aktualizacje, kopie zapasowe, drobne zmiany i wsparcie techniczne.',
    serviceType: 'WebSiteMaintenance',
  },
};

const websiteRedesign: ServiceData = {
  slug: 'modernizacja-stron',
  title: 'Modernizacja stron internetowych',
  subtitle:
    'Odświeżam strony internetowe, poprawiając ich wygląd, wydajność i wygodę korzystania, bez konieczności tworzenia wszystkiego od nowa.',
  description:
    'Modernizuję strony internetowe dla firm. Przygotowuję nowy projekt, poprawiam wydajność, przenoszę treści i dostosowuję stronę do aktualnych standardów.',
  keywords: [
    'modernizacja strony internetowej',
    'redesign strony',
    'przebudowa strony www',
    'odświeżenie strony',
    'modernizacja strony firmowej',
  ],
  heroVideo: '/videos/services/web-design.mp4',
  heroPoster: '/videos/services/web-design-poster.webp',
  heroLabel: 'Modernizacja',
  heroStats: [
    { value: 'Nowy wygląd', label: 'indywidualny projekt' },
    { value: 'Migracja', label: 'przeniesienie treści' },
    { value: 'SEO', label: 'techniczne w standardzie' },
  ],
  whyTitle: 'Kiedy warto zmodernizować stronę?',
  why: [
    {
      icon: 'clock',
      title: 'Strona działa zbyt wolno',
      desc: 'Poprawiam wydajność strony, aby korzystanie z niej było wygodniejsze dla użytkowników.',
    },
    {
      icon: 'mobile',
      title: 'Problemy na telefonach',
      desc: 'Dostosowuję stronę do urządzeń mobilnych i aktualnych standardów responsywności.',
    },
    {
      icon: 'star',
      title: 'Przestarzały wygląd',
      desc: 'Odświeżam projekt graficzny, zachowując charakter Twojej marki.',
    },
    {
      icon: 'lock',
      title: 'Nieaktualne oprogramowanie',
      desc: 'Pomagam zaktualizować stronę i poprawić jej bezpieczeństwo.',
    },
    {
      icon: 'chart',
      title: 'Problemy z widocznością',
      desc: 'Usuwam techniczne błędy, które mogą utrudniać pozycjonowanie strony.',
    },
    {
      icon: 'check',
      title: 'Trudna edycja',
      desc: 'Jeśli obecna strona jest niewygodna w obsłudze, mogę wdrożyć prostszy system zarządzania treścią.',
    },
  ],
  whatTitle: 'Co obejmuje modernizacja strony?',
  what: [
    'Audyt techniczny i wizualny',
    'Nowy projekt graficzny',
    'Przeniesienie istniejących treści',
    'Optymalizacja szybkości działania',
    'Responsywna wersja strony',
    'Poprawa technicznego SEO',
    'Zachowanie lub uporządkowanie struktury adresów URL',
    'Konfiguracja Google Analytics',
    'Aktualizacja niezbędnych informacji prawnych',
    'Szkolenie z obsługi strony',
  ],
  process: [
    {
      step: '01',
      title: 'Audyt',
      desc: 'Sprawdzam obecną stronę, jej wygląd, wydajność oraz najważniejsze problemy techniczne.',
    },
    {
      step: '02',
      title: 'Plan zmian',
      desc: 'Ustalamy, które elementy pozostają, a które wymagają przebudowy.',
    },
    {
      step: '03',
      title: 'Projekt',
      desc: 'Przygotowuję nowy wygląd strony dopasowany do Twojej firmy.',
    },
    {
      step: '04',
      title: 'Realizacja',
      desc: 'Tworzę nową wersję strony i przenoszę potrzebne treści.',
    },
    {
      step: '05',
      title: 'Testy',
      desc: 'Sprawdzam poprawność działania strony przed publikacją.',
    },
    {
      step: '06',
      title: 'Wsparcie',
      desc: 'Po uruchomieniu strony zapewniam 30 dni wsparcia technicznego.',
    },
  ],
  plans: [
    {
      name: 'Starter',
      from: 2000,
      features: [
        'Modernizacja do 5 podstron',
        'Nowy projekt',
        'Migracja treści',
        'Optymalizacja wydajności',
      ],
    },
    {
      name: 'Business',
      from: 3800,
      features: [
        'Modernizacja do 10 podstron',
        'Audyt technicznego SEO',
        'Nowy CMS',
        'Google Analytics',
        'Zachowanie adresów URL',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 7000,
      features: [
        'Kompleksowa przebudowa',
        'Zmiana technologii',
        'Wielojęzyczność',
        'Rozbudowa o sklep internetowy',
        'Rozszerzone wsparcie po wdrożeniu',
      ],
    },
  ],
  faq: [
    {
      q: 'Czy modernizacja może wpłynąć na SEO?',
      a: 'Odpowiednio przeprowadzona modernizacja pozwala zachować najważniejsze elementy technicznego SEO. W razie potrzeby przygotowuję przekierowania i dbam o zachowanie istotnych adresów URL.',
    },
    {
      q: 'Czy treści zostaną przeniesione?',
      a: 'Tak. Przenoszę teksty, zdjęcia i pozostałe materiały, które mają znaleźć się na nowej stronie.',
    },
    {
      q: 'Czy obecna strona będzie działała podczas prac?',
      a: 'Tak. Nową wersję przygotowuję na środowisku testowym, a publikacja następuje dopiero po zakończeniu prac.',
    },
    {
      q: 'Ile kosztuje modernizacja strony?',
      a: 'Cena zaczyna się od około 2 000 zł netto. Ostateczny koszt zależy od zakresu zmian i liczby podstron.',
    },
    {
      q: 'Czy można zmienić technologię strony?',
      a: 'Tak. W razie potrzeby mogę przenieść stronę na WordPress lub Next.js, jeśli będzie to korzystniejsze dla projektu.',
    },
    {
      q: 'Jak długo trwa modernizacja?',
      a: 'Najczęściej od 1 do 6 tygodni, w zależności od wielkości strony i zakresu prac.',
    },
    {
      q: 'Czy możesz poprawić tylko szybkość strony?',
      a: 'Tak. Mogę wykonać samą optymalizację wydajności bez pełnej przebudowy strony.',
    },
    {
      q: 'Czy mogę pozostać przy obecnym hostingu?',
      a: 'Tak. Jeśli hosting spełnia wymagania projektu, nie ma potrzeby jego zmiany.',
    },
  ],
  schema: {
    name: 'Modernizacja stron internetowych',
    description:
      'Modernizacja i przebudowa stron internetowych. Nowy projekt, poprawa wydajności, migracja treści oraz techniczne SEO.',
    serviceType: 'WebDesign',
  },
};

export const SERVICES_PL: ServiceData[] = [
  webDevelopment,
  webDesign,
  businessWebsites,
  wordpressWebsites,
  landingPage,
  ecommerceWebsites,
  websiteMaintenance,
  websiteSupport,
  websiteRedesign,
];