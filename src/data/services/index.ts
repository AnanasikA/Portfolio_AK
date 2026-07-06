import type { ServiceData } from './types';
import { SERVICES_PL } from './pl';
import { SERVICES_EN } from './en';

export function getServices(locale: string): ServiceData[] {
  return locale === 'en' ? SERVICES_EN : SERVICES_PL;
}

export function getService(
  locale: string,
  slug: string
): ServiceData | undefined {
  return getServices(locale).find(service => service.slug === slug);
}

export type {
  ServiceData,
  ServiceFeature,
  ServiceProcess,
  ServicePlan,
  ServiceFAQ,
} from './types';

export const SERVICE_SLUGS = {
  pl: {
    webDevelopment: 'tworzenie-stron-internetowych',
    webDesign: 'projektowanie-stron',
    businessWebsites: 'strony-dla-firm',
    wordpressWebsites: 'wordpress',
    landingPage: 'landing-page',
    ecommerceWebsites: 'sklepy-internetowe',
    websiteMaintenance: 'administracja-stron',
    websiteSupport: 'opieka-nad-stronami',
    websiteRedesign: 'modernizacja-stron',
  },
  en: {
    webDevelopment: 'web-development',
    webDesign: 'web-design',
    businessWebsites: 'business-websites',
    wordpressWebsites: 'wordpress-websites',
    landingPage: 'landing-page',
    ecommerceWebsites: 'ecommerce-websites',
    websiteMaintenance: 'website-maintenance',
    websiteSupport: 'website-support',
    websiteRedesign: 'website-redesign',
  },
} as const;

export function getTranslatedServiceSlug(
  currentLocale: string,
  targetLocale: string,
  currentSlug: string
): string {
  const current = currentLocale === 'en' ? SERVICE_SLUGS.en : SERVICE_SLUGS.pl;
  const target = targetLocale === 'en' ? SERVICE_SLUGS.en : SERVICE_SLUGS.pl;

  const entry = Object.entries(current).find(
    ([, slug]) => slug === currentSlug
  );

  if (!entry) return currentSlug;

  const [key] = entry;

  return target[key as keyof typeof target];
}