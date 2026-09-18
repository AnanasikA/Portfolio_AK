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
  /**
   * Optional natural cross-link to a closely related service whose search
   * intent could otherwise overlap with this one (e.g. administracja-stron
   * vs opieka-nad-stronami). Rendered as a small note + link near the hero,
   * helping both users and search engines tell the two services apart.
   */
  relatedService?: {
    slug: string;
    note: string;
    linkLabel: string;
  };
}