import { projects, type ProjectItem } from './projects';

type ServiceProjectRule = {
  /** Ścisłe tagi — projekty z nich pojawiają się jako pierwsze. */
  tags: string[];
  /**
   * Luźniejsze tagi używane WYŁĄCZNIE do dopełnienia listy, gdy ścisłych
   * dopasowań jest za mało (ale wciąż tylko projekty faktycznie pasujące —
   * bez sztucznego dopychania czymkolwiek innym).
   */
  fallbackTags?: string[];
  /**
   * Tagi, które od razu wykluczają projekt z tej kategorii — nawet jeśli
   * technicznie dzieli jakiś wspólny tag z `tags`/`fallbackTags`.
   */
  exclude?: string[];
};

/**
 * Mapowanie slug usługi → reguła doboru projektów z portfolio.
 * Puste `tags` (bez `fallbackTags`) = brak filtra — pokazywany jest ogólny
 * przekrój najnowszych realizacji (dla usług bez dedykowanych case studies,
 * np. administracja/opieka/modernizacja, oraz dla strony ogólnej).
 */
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

/**
 * Zwraca listę projektów dopasowanych do danej usługi.
 *
 * Jeśli usługa ma zdefiniowane konkretne tagi (`tags`/`fallbackTags`),
 * pokazywane są WYŁĄCZNIE realnie pasujące projekty — bez sztucznego
 * dopychania nieistotnymi, nawet jeśli wynik to tylko 1 projekt
 * (np. "sklepy internetowe" pokaże samego Booknesta, i to jest OK).
 *
 * Jeśli usługa nie ma żadnych tagów (pusty filtr — usługi ogólne lub
 * bez dedykowanych case studies), pokazywany jest ogólny przekrój
 * najnowszych realizacji, dopełniony do `max`.
 */
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