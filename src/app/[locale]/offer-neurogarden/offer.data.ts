// src/data/offer.data.ts

export const offerData = {
  clientName:   'NeuroGarden',
  projectTitle: 'Projekt i wykonanie nowoczesnej strony internetowej',
  date:         '21 lipca 2026',
  validUntil:   '21 sierpnia 2026',
  deliveryTime: '2–4 tygodnie',
  priceFrom:    'Od 2 500 zł netto*',
  priceNote:    '* Ostateczna wycena zostanie przygotowana po ustaleniu zakresu projektu.',
  pdfPath:      '/oferta-neurogarden.pdf',

  description: 'Przygotowałam wstępną ofertę wykonania nowoczesnej strony internetowej dla NeuroGarden. Poniżej przedstawiam zakres prac, etapy realizacji oraz orientacyjną wycenę projektu.',

 screens: [
  {
    src:   '/projects/SpiroPilates1.webp',
    alt:   'Spiro Pilates',
    title: 'Spiro Pilates',
    desc:  'Nowoczesna strona internetowa dla studia pilates. Przejrzysta prezentacja oferty, harmonogram zajęć oraz intuicyjny system rezerwacji online.',
    url:   'https://spiropilatesmobility.pl/',
  },
  {
    src:   '/projects/Luisowka1.webp',
    alt:   'Luisówka',
    title: 'Luisówka',
    desc:  'Elegancka strona dla obiektu noclegowego i restauracji. Przejrzysta prezentacja oferty, galeria zdjęć oraz wygodny kontakt z klientami.',
    url:   'https://luisowka.com/',
  },
  {
    src:   '/projects/accounting/hero.webp',
    alt:   'Biuro rachunkowe',
    title: 'Biuro rachunkowe',
    desc:  'Profesjonalna strona dla biura rachunkowego z czytelną prezentacją usług, formularzem kontaktowym oraz optymalizacją pod wyszukiwarki.',
    url:   'https://rachunkowosc.vercel.app/',
  },
],

  scope: [
    'Indywidualny projekt strony dopasowany do identyfikacji wizualnej NeuroGarden',
    'Nowoczesna, responsywna strona działająca na komputerach, tabletach i telefonach',
    'Przejrzysta prezentacja oferty, zespołu oraz danych kontaktowych',
    'Formularz kontaktowy ułatwiający szybki kontakt z gabinetem',
    'Podstawowa optymalizacja SEO zwiększająca widoczność w Google',
    'Szybkie działanie strony i optymalizacja wydajności',
    'Integracja z Google Analytics oraz baner zgody na pliki cookies',
    '2 rundy poprawek w cenie projektu',
    '30 dni wsparcia technicznego po publikacji strony',
  ],

  basePrice:     2500,
  pricePerPage:  250,
  includedPages: 5,

  extras: [
    { id: 'booking', label: 'System rezerwacji online',      price: 800, monthly: false },
    { id: 'intake',  label: 'Formularz intake / wywiad',     price: 300, monthly: false },
    { id: 'methods', label: 'Sekcja metody / specjalizacje', price: 400, monthly: false },
    { id: 'blog',    label: 'Blog / artykuły',               price: 500, monthly: false },
    { id: 'seo',     label: 'SEO rozszerzone',               price: 500, monthly: false },
    { id: 'lang',    label: 'Wersja angielska',              price: 500, monthly: false },
    { id: 'care',    label: 'Opieka miesięczna',             price: 120, monthly: true  },
  ],

  contact: {
    name:    'Anastasiia Kupriianets',
    company: 'AK Web & Design',
    email:   'kontakt@anastasiiakupriianets.pl',
    phone:   '+48 576 564 682',
    website: 'https://anastasiiakupriianets.pl',
  },
};

export type OfferData = typeof offerData;