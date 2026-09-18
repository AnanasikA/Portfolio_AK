import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { projects } from '@/data/projects';
import { SERVICE_SLUGS } from '@/data/services';

const BASE_URL = 'https://anastasiiakupriianets.pl';

// Uwaga: slugi usług, wpisów blogowych i projektów są pobierane bezpośrednio
// ze źródeł danych (a nie utrzymywane ręcznie w osobnych tablicach), żeby
// sitemap nie mogła się nigdy rozjechać z rzeczywistymi stronami — to był
// główny powód błędów 404 i brakujących stron w Google Search Console
// (patrz audyt SEO, punkty C2 i C7).

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pl`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
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

  // Usługi PL i EN mają różne slugi (np. "sklepy-internetowe" vs "ecommerce-websites") —
  // każda lista musi używać właściwych slugów dla swojego języka.
  const servicesPL: MetadataRoute.Sitemap = Object.values(SERVICE_SLUGS.pl).map(slug => ({
    url:             `${BASE_URL}/pl/services/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }));

  const servicesEN: MetadataRoute.Sitemap = Object.values(SERVICE_SLUGS.en).map(slug => ({
    url:             `${BASE_URL}/en/services/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }));

  // Wszystkie opublikowane wpisy blogowe, pobrane bezpośrednio z content/blog —
  // żaden artykuł nie zostanie pominięty, tak jak wcześniej.
  const blogPL: MetadataRoute.Sitemap = getAllPosts('pl').map(post => ({
    url:             `${BASE_URL}/pl/blog/${post.slug}`,
    lastModified:    post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  const blogEN: MetadataRoute.Sitemap = getAllPosts('en').map(post => ({
    url:             `${BASE_URL}/en/blog/${post.slug}`,
    lastModified:    post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  // Slugi projektów są te same w obu językach (nie są tłumaczone),
  // więc obie listy (PL/EN) celowo korzystają z tego samego źródła —
  // bezpośrednio z src/data/projects.ts, żeby nie powielać listy ręcznie.
  const projectsPL: MetadataRoute.Sitemap = projects.map(project => ({
    url:             `${BASE_URL}/pl/projects/${project.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  const projectsEN: MetadataRoute.Sitemap = projects.map(project => ({
    url:             `${BASE_URL}/en/projects/${project.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pl/polityka-prywatnosci`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/en/polityka-prywatnosci`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/pl/regulamin`,            lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/en/regulamin`,            lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/pl/cookies`,              lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/en/cookies`,              lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
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
