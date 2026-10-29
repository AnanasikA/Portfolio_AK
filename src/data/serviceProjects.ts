import { projects, type ProjectItem } from './projects';

type ServiceProjectRule = {

  tags: string[];

  fallbackTags?: string[];

  exclude?: string[];
};

const SERVICE_PROJECT_RULES: Record<string, ServiceProjectRule> = {
  'tworzenie-stron-internetowych': { tags: [] },
  'projektowanie-stron': { tags: ['Figma'] },
  'strony-dla-firm': {
    tags: ['Polish Website', 'SEO Ready'],
    fallbackTags: ['UI/UX Design'],
  },
  wordpress: { tags: ['WordPress'] },
  'landing-page': {
    tags: ['EmailJS'],
    fallbackTags: ['Framer Motion', 'Google Fonts'],
    exclude: ['E-commerce', 'Stripe'],
  },
  'sklepy-internetowe': { tags: ['E-commerce', 'Stripe', 'WooCommerce'] },
  'administracja-stron': { tags: [] },
  'opieka-nad-stronami': { tags: [] },
  'modernizacja-stron': { tags: [] },
};

function hasAnyTag(project: ProjectItem, tags: string[]): boolean {
  return (
    tags.length > 0 &&
    project.tech.some(t => tags.some(tag => t.toLowerCase().includes(tag.toLowerCase())))
  );
}

export function getProjectsForService(serviceSlug: string, max = 3): ProjectItem[] {
  const rule = SERVICE_PROJECT_RULES[serviceSlug] ?? { tags: [] };
  const hasFilter = rule.tags.length > 0 || (rule.fallbackTags?.length ?? 0) > 0;
  const excluded = rule.exclude ?? [];

  const eligible = projects.filter(p => !hasAnyTag(p, excluded));

  if (!hasFilter) {
    return eligible.slice(0, max);
  }

  const primary = eligible.filter(p => hasAnyTag(p, rule.tags));
  const secondary = rule.fallbackTags
    ? eligible.filter(p => !primary.includes(p) && hasAnyTag(p, rule.fallbackTags!))
    : [];

  return [...primary, ...secondary].slice(0, max);
}