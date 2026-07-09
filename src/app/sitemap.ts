import type { MetadataRoute } from 'next';

const BASE_URL = 'https://anastasiiakupriianets.pl';

const blogSlugsPL = [
  'ile-kosztuje-strona-internetowa',
  'wordpress-vs-nextjs-co-wybrac',
  'jak-wyglada-wspolpraca-przy-tworzeniu-strony',
  'co-powinna-zawierac-strona-dla-firmy-uslugowej',
  'dlaczego-szybkosc-strony-ma-znaczenie',
  'jak-przygotowac-sie-do-rozmowy-z-webdeveloperem',
  'czy-twoja-strona-jest-gotowa-na-klientow',
  'ile-trwa-stworzenie-strony-internetowej',
];

const blogSlugsEN = [
  'how-much-does-a-website-cost',
  'wordpress-vs-nextjs-which-to-choose',
  'what-does-website-collaboration-look-like',
  'what-should-a-service-website-include',
  'why-website-speed-matters',
  'how-to-prepare-for-working-with-a-web-developer',
  'is-your-website-ready-for-clients',
  'how-long-does-it-take-to-build-a-website',
];

const projectSlugsPL = [
  'spiro-pilates-mobility',
  'crescent-development',
  'luisowka',
];

const serviceSlugs = [
  'tworzenie-stron-internetowych',
  'projektowanie-stron',
  'strony-dla-firm',
  'wordpress',
  'landing-page',
  'sklepy-internetowe',
  'administracja-stron',
  'opieka-nad-stronami',
  'modernizacja-stron',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,        lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
  ];

  const blogListPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pl/blog`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/en/blog`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ];

  const projectListPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pl/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const servicesPL: MetadataRoute.Sitemap = serviceSlugs.map(slug => ({
    url:             `${BASE_URL}/pl/services/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }));

  const servicesEN: MetadataRoute.Sitemap = serviceSlugs.map(slug => ({
    url:             `${BASE_URL}/en/services/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }));

  const blogPL: MetadataRoute.Sitemap = blogSlugsPL.map(slug => ({
    url:             `${BASE_URL}/pl/blog/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  const blogEN: MetadataRoute.Sitemap = blogSlugsEN.map(slug => ({
    url:             `${BASE_URL}/en/blog/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  const projectsPL: MetadataRoute.Sitemap = projectSlugsPL.map(slug => ({
    url:             `${BASE_URL}/pl/projects/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  const projectsEN: MetadataRoute.Sitemap = projectSlugsPL.map(slug => ({
    url:             `${BASE_URL}/en/projects/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pl/polityka-prywatnosci`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/pl/regulamin`,            lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/pl/cookies`,              lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  return [
    ...mainPages,
    ...blogListPages,
    ...projectListPages,
    ...servicesPL,
    ...servicesEN,
    ...blogPL,
    ...blogEN,
    ...projectsPL,
    ...projectsEN,
    ...staticPages,
  ];
}