export type ProjectItem = {
  slug: string;
  image: string;
  cardImage: string;
  ratio?: number;
  tech: string[];
  link?: string;
};

export const projects: ProjectItem[] = [
  {
  slug: 'crescent-development',
  image: '/projects/Crescent1.webp',
  cardImage: '/projects/Crescent.webp',
  tech: [
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Responsive Design',
    'UI/UX Design',
    'SEO Ready',
  ],
  link: 'https://nieruchomosci-six.vercel.app/',
},
  {
    slug: 'spiro-pilates-mobility',
    image: '/projects/SpiroPilates1.webp',
    cardImage: '/projects/SpiroPilates.webp',
    tech: [
      'WordPress',
      'Custom Theme',
      'ACF',
      'Polylang',
      'SEO',
      'Responsive Design',
    ],
    link: 'https://spiropilatesmobility.pl/',
  },
  {
    slug: 'lion-force-weld',
    image: '/projects/LionForceWeld(1).webp',
    cardImage: '/projects/LionForceWeld.webp',
    tech: ['WordPress', 'ACF', 'Tailwind CSS', 'SEO'],
    link: 'https://lionforceweld.pl',
  },
  {
    slug: 'luisowka',
    image: '/projects/Luisowka.webp',
    cardImage: '/projects/Luisowka1.webp',
    tech: [
      'Next.js',
      'Tailwind CSS',
      'Firebase',
      'Firestore',
      'React Calendar',
      'Vercel',
      'FormSubmit',
    ],
    link: 'https://luisowka.com',
  },
  {
    slug: 'zdrowie-plus',
    image: '/projects/Zdrowie+1.webp',
    cardImage: '/projects/Zdrowie+.webp',
    ratio: 1.6,
    tech: [
      'React',
      'Tailwind CSS',
      'Figma',
      'Framer Motion',
      'Google Fonts',
      'EmailJS',
    ],
    link: 'https://ananasika.github.io/Bella-Italia/',
  },
  {
    slug: 'quest-for-paws',
    image: '/projects/Paws1.webp',
    cardImage: '/projects/Paws.webp',
    tech: [
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'Google Fonts',
      'EmailJS',
      'Figma',
    ],
    link: 'https://ananasika.github.io/konferencja/',
  },
  {
    slug: 'realestate',
    image: '/projects/RealEstate1.webp',
    cardImage: '/projects/RealEstate.webp',
    tech: [
      'React',
      'Tailwind CSS',
      'Figma',
      'Framer Motion',
      'Google Fonts',
      'EmailJS',
    ],
    link: 'https://ananasika.github.io/drone-product-page/',
  },
  {
    slug: 'marecki-24-7',
    image: '/projects/Warsztat1.webp',
    cardImage: '/projects/Warsztat.webp',
    tech: [
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'Google Fonts',
      'EmailJS',
      'Figma',
    ],
    link: 'https://auto-pomoc.vercel.app/',
  },
  {
    slug: 'goports',
    image: '/projects/goports21.webp',
    cardImage: '/projects/goports2.webp',
    tech: [
      'WordPress',
      'PHP',
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive Design',
    ],
    link: 'https://goports.ct.ws',
  },
  {
    slug: 'studybuddy',
    image: '/projects/studybuddy1.webp',
    cardImage: '/projects/studybuddy.webp',
    tech: [
      'Next.js',
      'Tailwind CSS',
      'Spline',
      'Blender',
      'Framer Motion',
      'Figma',
    ],
    link: 'https://studybuddy-b7nk.vercel.app/',
  },
  {
    slug: 'photographer',
    image: '/projects/photographer-site1.webp',
    cardImage: '/projects/photographer-site.webp',
    tech: [
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'Google Fonts',
      'Responsive Design',
      'Figma',
    ],
    link: 'https://ananasika.github.io/portfolio-photographer/',
  },
  {
    slug: 'luxenails',
    image: '/projects/startup-site1.webp',
    cardImage: '/projects/startup-site.webp',
    tech: [
      'React',
      'Tailwind CSS',
      'HTML',
      'CSS',
      'Google Fonts',
      'Figma',
    ],
    link: 'https://ananasika.github.io/Strona_startup/',
  },
];