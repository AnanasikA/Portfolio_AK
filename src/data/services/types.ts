export interface ServiceFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServicePlan {
  name: string;
  from: number;
  features: string[];
  highlight?: boolean;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  heroLabel: string;
  heroVideo?: string;
  heroPoster?: string;
  heroStats: {
    value: string;
    label: string;
  }[];
  whyTitle: string;
  why: ServiceFeature[];
  whatTitle: string;
  what: string[];
  process: ServiceProcess[];
  plans: ServicePlan[];
  faq: ServiceFAQ[];
  schema: {
    name: string;
    description: string;
    serviceType: string;
  };
}