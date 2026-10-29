import type {
  ServiceData,
  ServiceProcess,
  ServicePlan,
  ServiceFAQ,
} from './types';

const PROCESS_DEFAULT: ServiceProcess[] = [
  { step: '01', title: 'Brief',     desc: 'Poznajemy Twój biznes, cele i grupę docelową. Ustalamy zakres, terminy i budżet.' },
  { step: '02', title: 'Projekt',   desc: 'Tworzymy projekt graficzny w Figma. Dostajesz podgląd i możliwość korekty.' },
  { step: '03', title: 'Kodowanie', desc: 'Budujemy stronę zgodnie z projektem: czysty kod, optymalizacja i responsywność.' },
  { step: '04', title: 'Poprawki',  desc: '2 rundy poprawek w cenie. Dostosowujemy każdy detal do Twoich oczekiwań.' },
  { step: '05', title: 'Wdrożenie', desc: 'Uruchamiamy stronę na docelowym hostingu, konfigurujemy domenę i SSL.' },
  { step: '06', title: 'Wsparcie',  desc: '30 dni wsparcia technicznego w cenie. Odpowiadamy na pytania także po starcie strony.' },
];

const webDevelopment: ServiceData = {
  slug: 'tworzenie-stron-internetowych',
  title: 'Tworzenie stron internetowych',
  subtitle:
    'Projektujemy i tworzymy strony internetowe od podstaw, bez gotowych szablonów. Pracujemy z firmami z Kątów Wrocławskich, Wrocławia i całej Polski.',
  description:
    'Tworzenie stron internetowych w Kątach Wrocławskich, Wrocławiu i całej Polsce. Indywidualny projekt, WordPress lub Next.js, szybkie działanie i przygotowanie pod SEO. Strony od 1 500 zł.',
  keywords: [
    'tworzenie stron internetowych',
    'strona internetowa dla firmy',
    'wykonanie strony internetowej',
    'projekt strony internetowej',
    'strony internetowe Kąty Wrocławskie',
    'tworzenie stron internetowych Kąty Wrocławskie',
    'strony internetowe Wrocław',
    'webdesign Wrocław',
    'programowanie stron',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Web Development',
  heroStats: [
    { value: 'od 1 500 zł', label: 'prosta strona' },
    { value: '7–14 dni', label: 'czas realizacji prostej strony' },
    { value: '30 dni', label: 'wsparcia w cenie' },
  ],
  whyTitle: 'Dlaczego warto zlecić nam stworzenie strony?',
  why: [
    {
      icon: 'star',
      title: 'Indywidualny projekt',
      desc: 'Każda strona jest projektowana od podstaw pod Twoją ofertę i sposób działania firmy, bez gotowych szablonów.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie ładowanie',
      desc: 'Dbamy o szybkie ładowanie strony, dzięki czemu użytkownicy nie czekają, a Google lepiej ocenia jej wydajność.',
    },
    {
      icon: 'mobile',
      title: 'Responsywność',
      desc: 'Strona dobrze wygląda i wygodnie działa na telefonie, tablecie i komputerze.',
    },
    {
      icon: 'search',
      title: 'Przygotowana pod SEO',
      desc: 'Dbamy o semantyczny HTML, meta tagi, sitemap i robots.txt, żeby strona miała dobrą podstawę pod pozycjonowanie.',
    },
    {
      icon: 'shield',
      title: 'Bezpieczeństwo',
      desc: 'Wdrażamy SSL, bezpieczne nagłówki HTTP i podstawowe zabezpieczenia strony.',
    },
    {
      icon: 'chat',
      title: 'Dopracowany UX/UI',
      desc: 'Projektujemy układ strony tak, aby użytkownik łatwo znalazł ofertę, kontakt i mógł szybko wysłać zapytanie.',
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
        'Landing page (1 strona)',
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
      a: 'Koszt zależy od zakresu projektu. Landing page zaczyna się od 1 500 zł, a prosta strona firmowa od ok. 3 000 zł netto. Szczegółową wycenę przygotowujemy po krótkiej konsultacji.',
    },
    {
      q: 'Jak długo trwa realizacja strony?',
      a: 'Proste strony i landing page realizujemy w 7–14 dni roboczych, a bardziej rozbudowane strony firmowe w 4–6 tygodni. Termin zależy od zakresu projektu i dostępności materiałów.',
    },
    {
      q: 'Czy strona będzie responsywna na telefonach?',
      a: 'Tak. Każda strona jest tworzona mobile-first i testowana na telefonach, tabletach oraz różnych rozdzielczościach ekranu.',
    },
    {
      q: 'Czy można się spotkać osobiście?',
      a: 'Tak. Z klientami z Kątów Wrocławskich, Wrocławia i okolic chętnie spotykamy się na rozmowę, np. w kawiarni. Z osobami z innych miast pracujemy zdalnie, przez telefon, maila i wideorozmowy.',
    },
    {
      q: 'Jakich technologii używacie?',
      a: 'Najczęściej pracujemy w Next.js, React i Tailwind CSS. Tworzymy też strony na WordPressie z autorskim motywem. Technologię dobieramy do potrzeb projektu.',
    },
    {
      q: 'Czy mogę samodzielnie edytować stronę po wdrożeniu?',
      a: 'Tak. Przy WordPressie otrzymujesz dostęp do panelu admina. Przy stronach w Next.js możemy dodać prosty panel CMS albo ustalić późniejsze godziny serwisowe.',
    },
    {
      q: 'Co z hostingiem i domeną?',
      a: 'Pomagamy dobrać i skonfigurować hosting oraz domenę. Strony Next.js najczęściej wdrażamy na Vercel, a WordPress na Cyberfolks lub hostingu klienta.',
    },
    {
      q: 'Czy zajmujecie się SEO?',
      a: 'Każda strona ma podstawowe SEO techniczne: meta tagi, OG, sitemap, robots.txt i semantyczny HTML. Nie prowadzimy stałych kampanii pozycjonowania.',
    },
    {
      q: 'Co jeśli nie spodoba mi się projekt?',
      a: 'W cenie są 2 rundy poprawek. Projekt przygotowujemy w Figma, więc widzisz wygląd strony przed kodowaniem i możesz zgłosić zmiany.',
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
    'Projektujemy strony internetowe w Figmie. Estetyczne, przejrzyste i dopasowane do Twojej marki oraz potrzeb użytkowników.',
  description:
    'Projektujemy strony internetowe w Figma dla firm i freelancerów. Każdy projekt tworzymy indywidualnie, dbając o czytelny układ, wygodę użytkownika i spójność z identyfikacją wizualną.',
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
      desc: 'Tworzymy projekt zgodny z identyfikacją wizualną Twojej firmy: kolorystyką, typografią i charakterem marki.',
    },
    {
      icon: 'search',
      title: 'Projektowanie z myślą o użytkowniku',
      desc: 'Układ strony planujemy tak, aby użytkownik szybko znalazł najważniejsze informacje i łatwo nawiązał kontakt.',
    },
    {
      icon: 'code',
      title: 'Interaktywny prototyp',
      desc: 'Przed rozpoczęciem kodowania możesz sprawdzić, jak będzie działała strona i zgłosić ewentualne zmiany.',
    },
    {
      icon: 'mobile',
      title: 'Projekt responsywny',
      desc: 'Projekt przygotowujemy z myślą o telefonach, tabletach i komputerach, aby dobrze wyglądał na każdym urządzeniu.',
    },
    {
      icon: 'target',
      title: 'Nastawienie na kontakt',
      desc: 'Przyciski, formularze i układ treści projektujemy tak, aby ułatwić użytkownikowi wykonanie kolejnego kroku.',
    },
    {
      icon: 'refresh',
      title: 'Współpraca na każdym etapie',
      desc: 'Regularnie pokazujemy postępy prac i uwzględniamy Twoje uwagi przed zakończeniem projektu.',
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
      q: 'Czy projektujecie również logo i identyfikację wizualną?',
      a: 'Nie tworzymy identyfikacji wizualnej od podstaw. Projekt strony przygotowujemy na podstawie materiałów i stylu Twojej marki.',
    },
    {
      q: 'W jakim programie projektujecie?',
      a: 'Pracujemy w Figma. Możesz na bieżąco przeglądać projekt, dodawać komentarze i po zakończeniu otrzymujesz dostęp do pliku.',
    },
    {
      q: 'Jak wygląda proces projektowania?',
      a: 'Zaczynamy od poznania Twojej firmy i potrzeb. Następnie przygotowujemy układ strony, projekt graficzny oraz interaktywny prototyp. Na każdym etapie możesz zgłaszać uwagi.',
    },
    {
      q: 'Ile trwa przygotowanie projektu?',
      a: 'Landing page zwykle przygotowujemy w 3–5 dni roboczych, a projekt strony firmowej w około 1–2 tygodnie. Termin zależy od zakresu projektu i tempa akceptacji.',
    },
    {
      q: 'Czy otrzymam plik do edycji?',
      a: 'Tak. Po zakończeniu projektu i rozliczeniu otrzymujesz pełny dostęp do pliku Figma.',
    },
    {
      q: 'Czy projektujecie materiały do druku?',
      a: 'Nie. Skupiamy się na projektowaniu stron internetowych i interfejsów aplikacji webowych.',
    },
    {
      q: 'Czy mogę zamówić sam projekt bez wdrożenia?',
      a: 'Tak. Możesz zamówić wyłącznie projekt graficzny i przekazać go własnemu programiście lub zespołowi.',
    },
    {
      q: 'Czy projekt będzie gotowy do wdrożenia?',
      a: 'Tak. Projekt przygotowujemy w sposób ułatwiający jego późniejsze zakodowanie, dzięki czemu wdrożenie przebiega sprawniej.',
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
    'Projektujemy strony internetowe dla firm, które pomagają budować wiarygodność, ułatwiają kontakt z klientami i wspierają rozwój biznesu.',
  description:
    'Tworzymy strony internetowe dla firm z indywidualnym projektem, technicznym SEO i pełną responsywnością. Realizujemy projekty dla klientów z Wrocławia i całej Polski.',
  keywords: [
    'strony internetowe dla firm',
    'strona firmowa',
    'strona www dla firmy',
    'tworzenie stron dla firm',
    'webdesign dla biznesu',
  ],
   heroVideo: '/videos/services/business-websites.mp4',
   heroPoster: '/videos/services/business-websites-poster.webp',
  heroLabel: 'Strony firmowe',
  heroStats: [
    { value: 'od 1 500 zł', label: 'strona dla firmy' },
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
      desc: 'Dbamy o semantyczny kod, meta tagi, sitemap i pozostałe elementy technicznego SEO już na etapie tworzenia strony.',
    },
    {
      icon: 'mobile',
      title: 'Responsywność',
      desc: 'Strona działa poprawnie i wygląda estetycznie na telefonach, tabletach oraz komputerach.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Optymalizujemy stronę, aby ładowała się sprawnie i zapewniała wygodne korzystanie użytkownikom.',
    },
    {
      icon: 'target',
      title: 'Łatwy kontakt',
      desc: 'Przemyślany układ strony, formularze i przyciski CTA ułatwiają klientom wysłanie zapytania.',
    },
    {
      icon: 'lock',
      title: 'Bezpieczeństwo',
      desc: 'Wdrażamy certyfikat SSL oraz podstawowe zabezpieczenia zwiększające bezpieczeństwo strony.',
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
      from: 3000,
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
      a: 'Cena strony firmowej zaczyna się od około 3 000 zł netto. Ostateczny koszt zależy od liczby podstron, funkcjonalności oraz zakresu projektu.',
    },
    {
      q: 'Czy strona będzie przygotowana pod Google Ads?',
      a: 'Tak. Możemy przygotować stronę z myślą o kampaniach Google Ads, dbając o szybkie działanie, czytelny układ i możliwość mierzenia konwersji.',
    },
    {
      q: 'Jak długo trwa realizacja?',
      a: 'Prostsze strony firmowe realizujemy w 7–14 dni roboczych, a bardziej rozbudowane w 4–6 tygodni. Termin zależy od zakresu projektu oraz czasu przekazywania materiałów i akceptacji.',
    },
    {
      q: 'Czy strona będzie widoczna w Google?',
      a: 'Każda strona otrzymuje podstawowe SEO techniczne, które stanowi dobrą bazę do późniejszego pozycjonowania. Nie gwarantujemy konkretnych pozycji w wynikach wyszukiwania.',
    },
    {
      q: 'Czy mogę zlecić przebudowę istniejącej strony?',
      a: 'Tak. Możemy odświeżyć wygląd strony, poprawić jej wydajność i dostosować ją do aktualnych standardów.',
    },
    {
      q: 'Czy przygotowujecie treści na stronę?',
      a: 'Treści dostarcza klient. Chętnie pomożemy w zaplanowaniu struktury strony i podpowiemy, jakie informacje warto umieścić.',
    },
    {
      q: 'Czy stronę można później rozbudować?',
      a: 'Tak. Projektujemy strony w sposób umożliwiający ich dalszą rozbudowę o kolejne podstrony lub funkcjonalności.',
    },
    {
      q: 'Czy oferujecie wsparcie po wdrożeniu?',
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
    'Tworzymy strony WordPress z autorskim motywem, bez gotowych szablonów i ciężkich builderów. Szybkie, bezpieczne i wygodne w późniejszej edycji.',
  description:
    'Projektujemy i tworzymy strony WordPress dla firm z autorskim motywem, intuicyjnym panelem administracyjnym oraz indywidualnym projektem graficznym.',
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
    { value: 'Własny', label: 'motyw, bez page buildera' },
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
      desc: 'Dbamy o odpowiednią konfigurację WordPressa oraz podstawowe zabezpieczenia zwiększające bezpieczeństwo strony.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Tworzymy lekkie motywy bez zbędnych dodatków, dzięki czemu strona działa sprawnie.',
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
      desc: 'Integrujemy stronę z narzędziami analitycznymi i dbamy o techniczne SEO już na etapie wdrożenia.',
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
      from: 3100,
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
      q: 'Czym Wasze strony WordPress różnią się od gotowych szablonów?',
      a: 'Tworzymy autorski motyw dopasowany do projektu zamiast korzystać z gotowych szablonów. Dzięki temu strona jest lżejsza, szybsza i łatwiejsza do rozbudowy.',
    },
    {
      q: 'Czy po wdrożeniu mogę samodzielnie edytować stronę?',
      a: 'Tak. Konfigurujemy panel administracyjny tak, aby edycja treści była prosta. Dodatkowo pokazujemy, jak z niego korzystać.',
    },
    {
      q: 'Czy korzystacie z Elementora lub innych builderów?',
      a: 'Nie. Tworzymy autorskie motywy oparte na natywnym edytorze WordPress, dzięki czemu strona pozostaje lekka i szybka.',
    },
    {
      q: 'Czy WordPress jest bezpieczny?',
      a: 'Tak, jeśli jest odpowiednio skonfigurowany i regularnie aktualizowany. Dbamy o podstawowe zabezpieczenia już podczas wdrożenia.',
    },
    {
      q: 'Czy możecie przenieść moją obecną stronę WordPress?',
      a: 'Tak. Możemy przenieść treści oraz przygotować nową wersję strony z zachowaniem najważniejszych danych.',
    },
    {
      q: 'Czy mogę później dodać sklep internetowy?',
      a: 'Tak. W przyszłości stronę można rozbudować o WooCommerce lub inne funkcjonalności.',
    },
    {
      q: 'Czy pomagacie z hostingiem?',
      a: 'Tak. Pomagamy dobrać hosting i konfigurujemy domenę oraz certyfikat SSL.',
    },
    {
      q: 'Czy oferujecie wsparcie po wdrożeniu?',
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
    'Projektujemy landing page z jednym, jasno określonym celem, żeby ułatwić użytkownikowi kontakt, zapis lub zakup.',
  description:
    'Tworzymy landing page dla firm i kampanii reklamowych. Indywidualny projekt, szybkie działanie, techniczne SEO oraz konfiguracja analityki.',
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
    { value: '7–14', label: 'dni roboczych' },
    { value: 'PageSpeed', label: 'testujemy przed startem' },
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
      desc: 'Optymalizujemy stronę, aby ładowała się sprawnie zarówno na telefonach, jak i komputerach.',
    },
    {
      icon: 'chart',
      title: 'Pomiar efektów',
      desc: 'Konfigurujemy narzędzia analityczne, dzięki którym możesz sprawdzić skuteczność kampanii i liczbę konwersji.',
    },
    {
      icon: 'mobile',
      title: 'Responsywność',
      desc: 'Landing page działa poprawnie i wygląda dobrze na każdym urządzeniu.',
    },
    {
      icon: 'search',
      title: 'Przygotowany pod SEO lub reklamy',
      desc: 'Projekt dopasowujemy do celu. Może wspierać pozycjonowanie lub kampanie Google Ads i Meta Ads.',
    },
    {
      icon: 'speed',
      title: 'Krótki czas realizacji',
      desc: 'Większość landing page realizujemy w ciągu 7–14 dni roboczych.',
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
      a: 'Tak. Projektujemy landing page z myślą o kampaniach reklamowych, dbając o szybkie działanie, czytelny układ i możliwość mierzenia konwersji.',
    },
    {
      q: 'Jak długo trwa realizacja?',
      a: 'Najczęściej od 7 do 14 dni roboczych. Termin zależy od zakresu projektu oraz dostępności materiałów.',
    },
    {
      q: 'Czy konfigurujecie analitykę?',
      a: 'Tak. Możemy skonfigurować Google Analytics 4, Google Tag Manager oraz śledzenie konwersji. W razie potrzeby dodajemy również Meta Pixel.',
    },
    {
      q: 'Czy landing page będzie działał na telefonach?',
      a: 'Tak. Każdy projekt jest responsywny i testowany na różnych urządzeniach.',
    },
    {
      q: 'Czy mogę zamówić kilka wersji landing page?',
      a: 'Tak. W wyższych pakietach możemy przygotować kilka wariantów strony do późniejszych testów.',
    },
    {
      q: 'Czy pomagacie z hostingiem i domeną?',
      a: 'Tak. Pomagamy wybrać hosting, skonfigurować domenę oraz certyfikat SSL.',
    },
    {
      q: 'Czy możecie przebudować istniejący landing page?',
      a: 'Tak. Możemy odświeżyć wygląd, poprawić wydajność oraz dostosować stronę do nowych kampanii reklamowych.',
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
    'Tworzymy sklepy internetowe na WooCommerce i Next.js, także do sprzedaży produktów cyfrowych, takich jak e-booki czy materiały do pobrania. Wygodne zarządzanie produktami, zamówieniami i płatnościami.',
  description:
    'Sklepy internetowe dla firm z Wrocławia, Kątów Wrocławskich i całej Polski. WooCommerce lub Next.js, płatności online, produkty fizyczne i cyfrowe. Sklepy od 2 800 zł.',
  keywords: [
    'sklep internetowy',
    'sklep e-commerce',
    'woocommerce',
    'next.js ecommerce',
    'tworzenie sklepów internetowych',
    'sklepy internetowe Wrocław',
    'sklep z produktami cyfrowymi',
  ],
  heroVideo: '/videos/services/business-websites.mp4',
  heroPoster: '/videos/services/business-websites-poster.webp',
  heroLabel: 'E-commerce',
  heroStats: [
    { value: 'Stripe', label: 'integracja płatności' },
    { value: 'P24', label: 'Przelewy24 / PayU' },
    { value: 'PageSpeed', label: 'testujemy przed startem' },
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
      desc: 'Integrujemy popularne systemy płatności online, aby klienci mogli wygodnie finalizować zakupy.',
    },
    {
      icon: 'bolt',
      title: 'Szybkie działanie',
      desc: 'Dbamy o wydajność sklepu, aby zakupy były wygodne zarówno na komputerach, jak i telefonach.',
    },
    {
      icon: 'save',
      title: 'Pełna kontrola nad produktami',
      desc: 'Łatwo zarządzasz produktami, zdjęciami, wariantami oraz stanami magazynowymi.',
    },
    {
      icon: 'chart',
      title: 'Analiza sprzedaży',
      desc: 'Konfigurujemy narzędzia analityczne, dzięki którym możesz śledzić sprzedaż i zachowania użytkowników.',
    },
    {
      icon: 'search',
      title: 'Przygotowany pod SEO',
      desc: 'Dbamy o techniczne SEO sklepu, aby ułatwić jego późniejsze pozycjonowanie.',
    },
  ],
  whatTitle: 'Co otrzymujesz w ramach sklepu internetowego?',
  what: [
    'Stronę główną i katalog produktów',
    'Karty produktów z wariantami',
    'Koszyk i proces składania zamówienia',
    'Możliwość sprzedaży produktów cyfrowych (pliki do pobrania)',
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
      from: 2800,
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
      a: 'Tak. Integrujemy między innymi Przelewy24, PayU, Paynow oraz Stripe.',
    },
    {
      q: 'Ile kosztuje sklep internetowy?',
      a: 'Prosty sklep WooCommerce zaczyna się od 2 800 zł. Bardziej rozbudowane projekty wyceniamy indywidualnie po poznaniu zakresu prac.',
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
      a: 'Tak. Pokazujemy, jak obsługiwać panel administracyjny i przekazujemy podstawowe wskazówki dotyczące jego użytkowania.',
    },
    {
      q: 'Czy sklep będzie działał na telefonach?',
      a: 'Tak. Każdy sklep jest responsywny i dostosowany do urządzeń mobilnych.',
    },
    {
      q: 'Czy sklep będzie przygotowany pod SEO?',
      a: 'Tak. Wdrażamy podstawowe elementy technicznego SEO, które stanowią dobrą bazę do dalszego pozycjonowania.',
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
    desc: 'Sprawdzamy stan strony, wersje oprogramowania, aktualne problemy i miejsca, które wymagają poprawy.',
  },
  {
    step: '02',
    title: 'Zakres opieki',
    desc: 'Ustalamy, co ma obejmować miesięczna administracja strony i jak często mają być wykonywane prace.',
  },
  {
    step: '03',
    title: 'Konfiguracja',
    desc: 'Konfigurujemy potrzebne dostępy, kopie zapasowe i podstawowe narzędzia do kontroli działania strony.',
  },
  {
    step: '04',
    title: 'Stała opieka',
    desc: 'Co miesiąc wykonujemy ustalone prace, aktualizacje i drobne zmiany na stronie.',
  },
  {
    step: '05',
    title: 'Raport',
    desc: 'Wysyłamy krótkie podsumowanie wykonanych prac, aktualizacji i ewentualnych problemów.',
  },
  {
    step: '06',
    title: 'Usprawnienia',
    desc: 'W razie potrzeby proponujemy poprawki związane z szybkością działania, bezpieczeństwem lub wygodą obsługi strony.',
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
    q: 'Jakimi stronami się opiekujecie?',
    a: 'Najczęściej opiekujemy się stronami WordPress i Next.js. Możemy też pomóc przy prostych stronach HTML/CSS.',
  },
  {
    q: 'Czy strona musi być wykonana przez Was?',
    a: 'Nie. Możemy objąć opieką także stronę wykonaną przez inną osobę. W takim przypadku zaczynamy od krótkiego audytu technicznego.',
  },
  {
    q: 'Jak szybko reagujecie na zgłoszenia?',
    a: 'Na zgłoszenia odpowiadamy w godzinach roboczych. Czas reakcji zależy od wybranego pakietu i rodzaju problemu.',
  },
  {
    q: 'Co jeśli potrzebuję więcej zmian niż obejmuje pakiet?',
    a: 'Dodatkowe prace możemy rozliczyć godzinowo po wcześniejszym ustaleniu zakresu.',
  },
  {
    q: 'Czy otrzymam raport z wykonanych prac?',
    a: 'Tak. Co miesiąc wysyłamy krótkie podsumowanie wykonanych aktualizacji, zmian i ewentualnych problemów.',
  },
  {
    q: 'Czy aktualizacje mogą zepsuć stronę?',
    a: 'Przed ważniejszymi aktualizacjami wykonujemy kopię zapasową. Jeśli pojawi się problem, można przywrócić wcześniejszą wersję strony.',
  },
  {
    q: 'Czy mogę zrezygnować z opieki?',
    a: 'Tak. Opieka jest rozliczana miesięcznie, więc możesz z niej zrezygnować bez długiej umowy.',
  },
  {
    q: 'Czy możecie opiekować się sklepem WooCommerce?',
    a: 'Tak. Możemy pomagać przy aktualizacjach WooCommerce, drobnych zmianach w sklepie i podstawowej administracji produktami.',
  },
];
const websiteMaintenance: ServiceData = {
  slug: 'administracja-stron',
  title: 'Administracja stron internetowych',
  subtitle:
    'Stała opieka techniczna nad stroną w ramach miesięcznego pakietu: aktualizacje, kopie zapasowe, bezpieczeństwo i drobne zmiany. Ty zajmujesz się firmą, my pilnujemy strony.',
  description:
    'Administracja stron internetowych WordPress i Next.js: aktualizacje, kopie zapasowe, bezpieczeństwo i usuwanie usterek. Pakiety od 120 zł miesięcznie, Kąty Wrocławskie, Wrocław i cała Polska.',
  keywords: [
    'administracja stron internetowych',
    'administracja strony WordPress',
    'opieka nad stronami wordpress',
    'aktualizacje i bezpieczeństwo strony',
    'serwis techniczny strony',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Administracja',
  heroStats: [
    { value: '1 dzień', label: 'roboczy na odpowiedź' },
    { value: 'Co miesiąc', label: 'raport z wykonanych prac' },
    { value: 'od 120 zł', label: 'pakiety miesięczne' },
  ],
  whyTitle: 'Dlaczego warto zlecić administrację strony?',
  why: [
    {
      icon: 'refresh',
      title: 'Regularne aktualizacje',
      desc: 'Aktualizujemy WordPress, motywy i wtyczki, dbając o poprawne działanie strony.',
    },
    {
      icon: 'save',
      title: 'Kopie zapasowe',
      desc: 'Regularnie tworzymy kopie zapasowe, dzięki którym w razie problemów można szybko przywrócić stronę.',
    },
    {
      icon: 'bug',
      title: 'Szybka pomoc',
      desc: 'Jeśli pojawi się problem lub awaria, zajmujemy się jego diagnozą i usunięciem.',
    },
    {
      icon: 'check',
      title: 'Bieżące zmiany',
      desc: 'Dodajemy nowe treści, zdjęcia i wprowadzamy drobne zmiany bez konieczności angażowania programisty.',
    },
    {
      icon: 'chart',
      title: 'Kontrola działania',
      desc: 'Regularnie sprawdzamy dostępność strony oraz jej podstawową wydajność.',
    },
    {
      icon: 'shield',
      title: 'Bezpieczeństwo',
      desc: 'Dbamy o podstawowe zabezpieczenia oraz aktualność oprogramowania.',
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
      'Techniczna administracja stronami internetowymi WordPress oraz Next.js. Aktualizacje, kopie zapasowe i bieżące wsparcie techniczne.',
    serviceType: 'WebSiteMaintenance',
  },
  relatedService: {
    slug: 'opieka-nad-stronami',
    note: 'Coś przestało działać i potrzebujesz jednorazowej naprawy?',
    linkLabel: 'Zobacz wsparcie techniczne i naprawy',
  },
};
const procesNaprawy: ServiceProcess[] = [
  { step: '01', title: 'Zgłoszenie', desc: 'Piszesz, co się dzieje. Wystarczy opis po swojemu, zrzut ekranu i adres strony.' },
  { step: '02', title: 'Diagnoza', desc: 'Sprawdzamy stronę, wtyczki, serwer i logi błędów, żeby znaleźć przyczynę, a nie tylko objaw.' },
  { step: '03', title: 'Wycena', desc: 'Mówimy, co jest nie tak, ile zajmie naprawa i ile będzie kosztować. Bez tego nie zaczynamy.' },
  { step: '04', title: 'Kopia zapasowa', desc: 'Przed zmianami robimy kopię strony, żeby w razie czego dało się wszystko przywrócić.' },
  { step: '05', title: 'Naprawa', desc: 'Usuwamy błąd, poprawiamy to, co trzeba, i sprawdzamy, czy reszta strony działa jak należy.' },
  { step: '06', title: 'Co dalej', desc: 'Podpowiadamy, jak uniknąć podobnych problemów. Jeśli chcesz, możemy przejąć stałą opiekę nad stroną.' },
];

const faqNaprawy: ServiceFAQ[] = [
  {
    q: 'Strona przestała działać. Co mam zrobić?',
    a: 'Napisz do nas albo zadzwoń i podaj adres strony. Jeśli możesz, dołącz zrzut ekranu błędu. Nie musisz wiedzieć, co dokładnie się zepsuło.',
  },
  {
    q: 'Czy pomożecie, jeśli stronę robił ktoś inny?',
    a: 'Tak. Często pracujemy na stronach po innych wykonawcach. Zaczynamy od sprawdzenia, jak strona jest zbudowana i jaki jest jej stan.',
  },
  {
    q: 'Jakie problemy naprawiacie?',
    a: 'Najczęściej: biały ekran lub błąd krytyczny w WordPressie, niedziałający formularz kontaktowy, problemy po aktualizacji wtyczek, rozjechany wygląd na telefonie, wolne ładowanie, wirusy i podejrzane linki, wygasły certyfikat SSL.',
  },
  {
    q: 'Ile kosztuje naprawa strony?',
    a: 'To zależy od problemu. Po diagnozie podajemy cenę i czas naprawy, a prace zaczynamy dopiero po Twojej akceptacji.',
  },
  {
    q: 'Jak szybko możecie pomóc?',
    a: 'Na zgłoszenia odpowiadamy zwykle w ciągu jednego dnia roboczego. Pilne awarie, np. niedziałającą stronę sklepu, staramy się przejrzeć jak najszybciej.',
  },
  {
    q: 'Czy naprawiacie tylko strony na WordPressie?',
    a: 'Najwięcej pracujemy z WordPressem, ale pomagamy też przy stronach w Next.js i prostych stronach HTML/CSS.',
  },
  {
    q: 'Czy po naprawie mogę zostać pod Waszą opieką?',
    a: 'Tak. Możesz wybrać pakiet stałej opieki, w którym regularnie aktualizujemy stronę, robimy kopie zapasowe i reagujemy na problemy.',
  },
];

const websiteSupport: ServiceData = {
  slug: 'opieka-nad-stronami',
  title: 'Wsparcie techniczne i naprawa stron WordPress',
  subtitle:
    'Coś nie działa na Twojej stronie? Znajdujemy przyczynę i naprawiamy błędy, także na stronach zrobionych przez kogoś innego. Pomagamy jednorazowo albo w ramach stałej opieki.',
  description:
    'Naprawa stron WordPress i wsparcie techniczne: błędy po aktualizacji, niedziałające formularze, wirusy, wolne ładowanie. Opieka nad stronami WordPress dla firm z Kątów Wrocławskich, Wrocławia i całej Polski.',
  keywords: [
    'naprawa stron wordpress',
    'opieka nad stronami wordpress',
    'wsparcie techniczne strony',
    'naprawa strony internetowej',
    'błąd krytyczny wordpress',
    'opieka nad stroną internetową Wrocław',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Wsparcie i naprawy',
  heroStats: [
    { value: '1 dzień', label: 'roboczy na odpowiedź' },
    { value: 'Wycena', label: 'przed naprawą' },
    { value: 'Kopia', label: 'zapasowa przed zmianami' },
  ],
  whyTitle: 'Z czym możesz do nas przyjść?',
  why: [
    {
      icon: 'bug',
      title: 'Błędy i awarie',
      desc: 'Biały ekran, błąd krytyczny, strona, która nagle się nie otwiera. Szukamy przyczyny i naprawiamy.',
    },
    {
      icon: 'refresh',
      title: 'Problemy po aktualizacji',
      desc: 'Po aktualizacji WordPressa lub wtyczki coś przestało działać? Przywracamy działanie i porządkujemy wtyczki.',
    },
    {
      icon: 'check',
      title: 'Niedziałający formularz',
      desc: 'Wiadomości z formularza nie dochodzą albo trafiają do spamu. Sprawdzamy konfigurację i poprawiamy wysyłkę.',
    },
    {
      icon: 'shield',
      title: 'Wirusy i podejrzane linki',
      desc: 'Czyścimy zainfekowane strony, usuwamy niechciane linki i zabezpieczamy stronę na przyszłość.',
    },
    {
      icon: 'mobile',
      title: 'Wygląd na telefonie',
      desc: 'Rozjechane sekcje, za małe przyciski, coś zasłania treść. Poprawiamy wersję mobilną.',
    },
    {
      icon: 'bolt',
      title: 'Wolne ładowanie',
      desc: 'Sprawdzamy, co spowalnia stronę, i poprawiamy to bez przebudowy całości.',
    },
  ],
  whatTitle: 'Co obejmuje naprawa strony?',
  what: [
    'Diagnoza problemu i jasna informacja, co się stało',
    'Wycena przed rozpoczęciem prac',
    'Kopia zapasowa przed zmianami',
    'Naprawa błędu i sprawdzenie reszty strony',
    'Aktualizacja lub wymiana problematycznych wtyczek',
    'Poprawki w motywie, formularzach i wersji mobilnej',
    'Krótkie podsumowanie, co zostało zrobione',
    'Możliwość przejścia na stałą opiekę',
  ],
  process: procesNaprawy,
  plans: planyAdministracja,
  faq: faqNaprawy,
  schema: {
    name: 'Wsparcie techniczne i naprawa stron WordPress',
    description:
      'Naprawa stron WordPress, usuwanie błędów, problemy po aktualizacjach, wirusy i opieka nad stronami WordPress.',
    serviceType: 'WebSiteMaintenance',
  },
  relatedService: {
    slug: 'administracja-stron',
    note: 'Wolisz stałą, comiesięczną opiekę zamiast pojedynczych napraw?',
    linkLabel: 'Zobacz administrację stron',
  },
};

const websiteRedesign: ServiceData = {
  slug: 'modernizacja-stron',
  title: 'Modernizacja stron internetowych',
  subtitle:
    'Odświeżamy strony internetowe, poprawiając ich wygląd, wydajność i wygodę korzystania, bez konieczności tworzenia wszystkiego od nowa.',
  description:
    'Modernizujemy strony internetowe dla firm. Przygotowujemy nowy projekt, poprawiamy wydajność, przenosimy treści i dostosowujemy stronę do aktualnych standardów.',
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
      desc: 'Poprawiamy wydajność strony, aby korzystanie z niej było wygodniejsze dla użytkowników.',
    },
    {
      icon: 'mobile',
      title: 'Problemy na telefonach',
      desc: 'Dostosowujemy stronę do urządzeń mobilnych i aktualnych standardów responsywności.',
    },
    {
      icon: 'star',
      title: 'Przestarzały wygląd',
      desc: 'Odświeżamy projekt graficzny, zachowując charakter Twojej marki.',
    },
    {
      icon: 'lock',
      title: 'Nieaktualne oprogramowanie',
      desc: 'Pomagamy zaktualizować stronę i poprawić jej bezpieczeństwo.',
    },
    {
      icon: 'chart',
      title: 'Problemy z widocznością',
      desc: 'Usuwamy techniczne błędy, które mogą utrudniać pozycjonowanie strony.',
    },
    {
      icon: 'check',
      title: 'Trudna edycja',
      desc: 'Jeśli obecna strona jest niewygodna w obsłudze, możemy wdrożyć prostszy system zarządzania treścią.',
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
      desc: 'Sprawdzamy obecną stronę, jej wygląd, wydajność oraz najważniejsze problemy techniczne.',
    },
    {
      step: '02',
      title: 'Plan zmian',
      desc: 'Ustalamy, które elementy pozostają, a które wymagają przebudowy.',
    },
    {
      step: '03',
      title: 'Projekt',
      desc: 'Przygotowujemy nowy wygląd strony dopasowany do Twojej firmy.',
    },
    {
      step: '04',
      title: 'Realizacja',
      desc: 'Tworzymy nową wersję strony i przenosimy potrzebne treści.',
    },
    {
      step: '05',
      title: 'Testy',
      desc: 'Sprawdzamy poprawność działania strony przed publikacją.',
    },
    {
      step: '06',
      title: 'Wsparcie',
      desc: 'Po uruchomieniu strony zapewniamy 30 dni wsparcia technicznego.',
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
        'Pełna przebudowa',
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
      a: 'Odpowiednio przeprowadzona modernizacja pozwala zachować najważniejsze elementy technicznego SEO. W razie potrzeby przygotowujemy przekierowania i dbamy o zachowanie istotnych adresów URL.',
    },
    {
      q: 'Czy treści zostaną przeniesione?',
      a: 'Tak. Przenosimy teksty, zdjęcia i pozostałe materiały, które mają znaleźć się na nowej stronie.',
    },
    {
      q: 'Czy obecna strona będzie działała podczas prac?',
      a: 'Tak. Nową wersję przygotowujemy na środowisku testowym, a publikacja następuje dopiero po zakończeniu prac.',
    },
    {
      q: 'Ile kosztuje modernizacja strony?',
      a: 'Cena zaczyna się od około 2 000 zł netto. Ostateczny koszt zależy od zakresu zmian i liczby podstron.',
    },
    {
      q: 'Czy można zmienić technologię strony?',
      a: 'Tak. W razie potrzeby możemy przenieść stronę na WordPress lub Next.js, jeśli będzie to korzystniejsze dla projektu.',
    },
    {
      q: 'Jak długo trwa modernizacja?',
      a: 'Najczęściej od 1 do 6 tygodni, w zależności od wielkości strony i zakresu prac.',
    },
    {
      q: 'Czy możecie poprawić tylko szybkość strony?',
      a: 'Tak. Możemy wykonać samą optymalizację wydajności bez pełnej przebudowy strony.',
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