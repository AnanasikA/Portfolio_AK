import type { MetadataRoute } from 'next';
import { getServices, getTranslatedServiceSlug } from '@/data/services';
import { projects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';
import { url } from '@/lib/site';

type Entry = MetadataRoute.Sitemap[number];

function pair(path: string, enPath = path, priority = 0.7, changeFrequency: Entry['changeFrequency'] = 'monthly'): MetadataRoute.Sitemap {
  const languages = { pl: url('pl', path), en: url('en', enPath) };
  const lastModified = new Date();
  return [
    { url: languages.pl, lastModified, changeFrequency, priority, alternates: { languages } },
    { url: languages.en, lastModified, changeFrequency, priority: Math.max(0.1, priority - 0.2), alternates: { languages } },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices('pl').flatMap(s =>
    pair(`/services/${s.slug}`, `/services/${getTranslatedServiceSlug('pl', 'en', s.slug)}`, 0.9),
  );

  const projectPages = projects.flatMap(p => pair(`/projects/${p.slug}`, `/projects/${p.slug}`, p.concept ? 0.4 : 0.6));

  const blog: MetadataRoute.Sitemap = (['pl', 'en'] as const).flatMap(locale =>
    getAllPosts(locale).map(post => ({
      url: url(locale, `/blog/${post.slug}`),
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === 'pl' ? 0.7 : 0.5,
    })),
  );

  const legal: MetadataRoute.Sitemap = ['/polityka-prywatnosci', '/regulamin', '/cookies'].map(path => ({
    url: url('pl', path),
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.2,
  }));

  return [
    ...pair('', '', 1.0, 'weekly'),
    ...pair('/services', '/services', 0.8),
    ...services,
    ...pair('/projects', '/projects', 0.7),
    ...projectPages,
    ...pair('/blog', '/blog', 0.7, 'weekly'),
    ...blog,
    ...pair('/wycena', '/wycena', 0.6),
    ...legal,
  ];
}

export const dynamic = 'force-static';
