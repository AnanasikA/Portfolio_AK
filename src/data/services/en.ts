import type {
  ServiceData,
  ServiceProcess,
  ServicePlan,
  ServiceFAQ,
} from './types';

const PROCESS_DEFAULT: ServiceProcess[] = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We learn about your business, goals and target audience. Together we define the project scope, timeline and budget.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'We create the website design in Figma. You receive a preview and can request revisions before development begins.',
  },
  {
    step: '03',
    title: 'Development',
    desc: 'We build the website based on the approved design, focusing on clean code, performance and responsive layouts.',
  },
  {
    step: '04',
    title: 'Revisions',
    desc: 'Two rounds of revisions are included. We refine every detail to match your expectations.',
  },
  {
    step: '05',
    title: 'Launch',
    desc: 'We deploy the website to your hosting, configure the domain and SSL certificate, and make sure everything works correctly.',
  },
  {
    step: '06',
    title: 'Support',
    desc: '30 days of technical support are included. If you have any questions after launch, we’re here to help.',
  },
];

const webDevelopment: ServiceData = {
  slug: 'web-development',
  title: 'Website Development',
  subtitle:
    'We design and build custom websites from scratch, without templates. Every project is tailored to your business, performance goals, and user experience.',
  description:
    'We create custom websites for businesses and freelancers. Every project is built from the ground up with a focus on performance, SEO, and a seamless experience across all devices.',
  keywords: [
    'website development',
    'business website',
    'custom website development',
    'web design',
    'Next.js developer',
    'WordPress developer',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Web Development',
  heroStats: [
    { value: 'from 1,500', label: 'PLN for a simple site' },
    { value: '7–14 days', label: 'for a simple site' },
    { value: '30 days', label: 'free support' },
  ],
  whyTitle: 'Why work with us?',
  why: [
    {
      icon: 'star',
      title: 'Custom Design',
      desc: 'Every website is designed specifically for your business, no templates or generic layouts.',
    },
    {
      icon: 'bolt',
      title: 'Fast Performance',
      desc: 'We optimize every website for fast loading times, creating a better experience for visitors and a solid technical foundation for SEO.',
    },
    {
      icon: 'mobile',
      title: 'Responsive Design',
      desc: 'Your website will look and work great on desktops, tablets, and mobile devices.',
    },
    {
      icon: 'search',
      title: 'SEO Ready',
      desc: 'We implement semantic HTML, meta tags, sitemap, and robots.txt to prepare your website for search engines.',
    },
    {
      icon: 'shield',
      title: 'Security',
      desc: 'Every website includes SSL, secure HTTP headers, and essential security best practices.',
    },
    {
      icon: 'chat',
      title: 'User-Focused UX/UI',
      desc: 'We design layouts that make it easy for visitors to find information and get in touch.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Custom website design in Figma',
    'Responsive website',
    'Technical SEO setup (meta tags, Open Graph, sitemap, robots.txt)',
    'Google Analytics / Tag Manager integration',
    'Contact form with email notifications',
    'SSL certificate',
    'Hosting and domain configuration',
    'Performance optimization (WebP, lazy loading)',
    'Two rounds of revisions',
    '30 days of technical support',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 1500,
      features: [
        'Landing page',
        'Custom design',
        'Contact form',
        'Basic SEO setup',
        'SSL + hosting configuration',
      ],
    },
    {
      name: 'Business',
      from: 2800,
      features: [
        'Up to 7 pages',
        'Custom design',
        'Blog',
        'Extended SEO setup',
        'Google Analytics',
        'Cookie banner & legal pages',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 5500,
      features: [
        'Unlimited pages',
        'Framer Motion animations',
        'CMS integration',
        'Multilingual support',
        'Booking or payment systems',
        'Priority support',
      ],
    },
  ],
  faq: [
    {
      q: 'How much does a website cost?',
      a: 'Pricing depends on the project scope. Landing pages start at 1,500 PLN, while business websites typically start at 3,000 PLN. We provide a custom quote after a short consultation.',
    },
    {
      q: 'How long does it take to build a website?',
      a: 'Simple websites and landing pages take 7–14 business days, while more complex business websites take 4–6 weeks, depending on the project scope and the availability of content.',
    },
    {
      q: 'Will my website work on mobile devices?',
      a: 'Yes. Every website is built with a mobile-first approach and tested across different screen sizes and devices.',
    },
    {
      q: 'Which technologies do you use?',
      a: 'We primarily work with Next.js, React, Tailwind CSS, and WordPress with custom themes. The technology is always chosen based on your project requirements.',
    },
    {
      q: 'Can I edit the website myself after launch?',
      a: 'Yes. WordPress websites include an easy-to-use admin panel. For Next.js projects, we can integrate a CMS if required.',
    },
    {
      q: 'Can you help with hosting and domains?',
      a: 'Yes. We can help you choose, configure, and deploy your website to the right hosting provider and connect your domain.',
    },
    {
      q: 'Do you provide SEO services?',
      a: 'Every website includes technical SEO, such as semantic HTML, meta tags, sitemap, robots.txt, and Open Graph tags. We do not provide ongoing SEO campaigns.',
    },
    {
      q: 'What if I want changes to the design?',
      a: 'Two rounds of revisions are included. Since the design is prepared in Figma first, you can review everything before development begins.',
    },
  ],
  schema: {
    name: 'Website Development',
    description:
      'Custom website development for businesses and freelancers using Next.js and WordPress.',
    serviceType: 'WebDesign',
  },
};

const webDesign: ServiceData = {
  slug: 'web-design',
  title: 'Website Design',
  subtitle:
    'We design websites in Figma that are clean, user-friendly, and tailored to your brand and audience.',
  description:
    'We create custom website designs in Figma for businesses and freelancers. Every project focuses on usability, visual consistency, and a clear user experience.',
  keywords: [
    'website design',
    'UI UX design',
    'Figma web design',
    'website mockup',
    'web designer',
  ],
  heroVideo: '/videos/services/web-design.mp4',
  heroPoster: '/videos/services/web-design-poster.webp',
  heroLabel: 'UI / UX Design',
  heroStats: [
    { value: 'Figma', label: 'design tool' },
    { value: '100%', label: 'custom design' },
    { value: '2 rounds', label: 'of revisions included' },
  ],
  whyTitle: 'Why start with a design?',
  why: [
    {
      icon: 'star',
      title: 'Tailored to Your Brand',
      desc: 'Every design is created to match your brand identity, including colors, typography, and overall visual style.',
    },
    {
      icon: 'search',
      title: 'User-Centered Design',
      desc: 'We structure every page to help visitors quickly find information and take the next step.',
    },
    {
      icon: 'code',
      title: 'Interactive Prototype',
      desc: 'Before development begins, you can preview the website, click through it, and request any changes.',
    },
    {
      icon: 'mobile',
      title: 'Responsive Design',
      desc: 'Every design is created for desktop, tablet, and mobile devices to ensure a consistent experience.',
    },
    {
      icon: 'target',
      title: 'Designed for Action',
      desc: 'Buttons, forms, and page layouts are planned to make it easy for visitors to contact you or take action.',
    },
    {
      icon: 'refresh',
      title: 'Collaborative Process',
      desc: 'We share progress throughout the project and incorporate your feedback before the design is finalized.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Custom website design in Figma',
    'Desktop and mobile layouts',
    'Interactive prototype',
    'Color palette and typography',
    'UI components (buttons, forms, cards)',
    'Developer-ready design files',
    'Exported icons and graphics',
    'Two rounds of revisions',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 800,
      features: [
        'Landing page design',
        'Desktop & mobile layouts',
        'Interactive prototype',
        'One round of revisions',
      ],
    },
    {
      name: 'Business',
      from: 1800,
      features: [
        'Up to 7 pages',
        'Design system',
        'Interactive prototype',
        'Two rounds of revisions',
        'Developer handoff',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 3500,
      features: [
        'Unlimited pages',
        'Advanced design system',
        'Animation concepts',
        'Alternative page variations',
        'Priority delivery',
      ],
    },
  ],
  faq: [
    {
      q: 'Do you design logos or brand identity?',
      a: 'We do not create complete brand identities from scratch. Website designs are based on your existing branding and visual materials.',
    },
    {
      q: 'Which design tool do you use?',
      a: 'We work in Figma. You can review the project, leave comments, and receive full access to the file once the project is complete.',
    },
    {
      q: 'How does the design process work?',
      a: 'We start by learning about your business and goals. Then we create the page structure, visual design, and an interactive prototype. You can provide feedback at every stage.',
    },
    {
      q: 'How long does the design process take?',
      a: 'Landing pages usually take 3–5 business days, while business websites typically take 1–2 weeks, depending on the project scope and feedback process.',
    },
    {
      q: 'Will I receive the Figma file?',
      a: 'Yes. Once the project is completed and paid for, you receive full access to the Figma file.',
    },
    {
      q: 'Do you design printed materials?',
      a: 'No. We specialize in website and web application interface design.',
    },
    {
      q: 'Can I order only the design without development?',
      a: 'Yes. You can order the design only and pass it to your own developer or development team.',
    },
    {
      q: 'Will the design be ready for development?',
      a: 'Yes. Every design is prepared with developers in mind, making the implementation process faster and more efficient.',
    },
  ],
  schema: {
    name: 'Website Design',
    description:
      'Custom website design in Figma for businesses and freelancers. Interactive prototypes, UI/UX design, and developer-ready files.',
    serviceType: 'GraphicDesign',
  },
};
const businessWebsites: ServiceData = {
  slug: 'business-websites',
  title: 'Business Websites',
  subtitle:
    'We create business websites that build credibility, make it easy for customers to get in touch, and support the growth of your business.',
  description:
    'We design and develop custom business websites with technical SEO, responsive layouts, and a unique design tailored to your company.',
  keywords: [
    'business website',
    'business website development',
    'company website',
    'website for business',
    'custom business website',
  ],
  heroVideo: '/videos/services/business-websites.mp4',
  heroPoster: '/videos/services/business-websites-poster.webp',
  heroLabel: 'Business Websites',
  heroStats: [
    { value: 'from 1,500', label: 'PLN for a business site' },
    { value: '2–4', label: 'weeks delivery time' },
    { value: 'SEO', label: 'technical setup included' },
  ],
  whyTitle: 'Why invest in a business website?',
  why: [
    {
      icon: 'shield',
      title: 'Build Trust',
      desc: 'A professional website helps establish credibility and gives potential clients confidence in your business.',
    },
    {
      icon: 'search',
      title: 'SEO Ready',
      desc: 'Every website includes semantic HTML, meta tags, sitemap, and other technical SEO essentials from day one.',
    },
    {
      icon: 'mobile',
      title: 'Responsive Design',
      desc: 'Your website will look and work perfectly across desktops, tablets, and mobile devices.',
    },
    {
      icon: 'bolt',
      title: 'Fast Performance',
      desc: 'We optimize every website to provide fast loading times and a smooth browsing experience.',
    },
    {
      icon: 'target',
      title: 'Easy Contact',
      desc: 'Well-designed layouts, contact forms, and clear call-to-action buttons make it simple for visitors to reach you.',
    },
    {
      icon: 'lock',
      title: 'Security',
      desc: 'Every website includes SSL and essential security best practices to help protect your business.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Homepage and up to 7 pages',
    'About Us page',
    'Services or Offer page',
    'Portfolio or Gallery',
    'Contact form',
    'Contact details with Google Maps',
    'Blog or News section (optional)',
    'Technical SEO setup',
    'Google Analytics integration',
    'Cookie banner and essential legal pages',
    'SSL certificate',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 3000,
      features: [
        'Up to 5 pages',
        'Custom design',
        'Contact form',
        'Basic SEO setup',
        'SSL + hosting configuration',
      ],
    },
    {
      name: 'Business',
      from: 4200,
      features: [
        'Up to 10 pages',
        'Blog',
        'Google Analytics',
        'Cookie banner & legal pages',
        'Google Maps integration',
        'Two rounds of revisions',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 7000,
      features: [
        'Unlimited pages',
        'Multilingual website',
        'CMS integration',
        'Animations',
        'Extended post-launch support',
      ],
    },
  ],
  faq: [
    {
      q: 'How much does a business website cost?',
      a: 'Business websites typically start at PLN 3,000. The final price depends on the number of pages, required features, and overall project scope.',
    },
    {
      q: 'Can the website be prepared for Google Ads?',
      a: 'Yes. We can build your website with Google Ads campaigns in mind, focusing on performance, clear calls to action, and conversion tracking.',
    },
    {
      q: 'How long does the project take?',
      a: 'Simpler business websites take 7–14 business days, while more complex ones take 4–6 weeks. The timeline depends on the project scope and how quickly materials and feedback are provided.',
    },
    {
      q: 'Will my website appear in Google search?',
      a: 'Every website includes technical SEO as a solid foundation for future search engine optimization. However, we do not guarantee specific rankings.',
    },
    {
      q: 'Can you redesign my existing website?',
      a: 'Yes. We can refresh your website, improve its performance, and update it to modern web standards.',
    },
    {
      q: 'Do you write website content?',
      a: 'Content is provided by the client. We’re happy to help organize the structure and suggest what information should be included.',
    },
    {
      q: 'Can the website be expanded later?',
      a: 'Absolutely. Every website is built with future growth in mind, making it easy to add new pages or features later.',
    },
    {
      q: 'Do you provide support after launch?',
      a: 'Yes. Every project includes 30 days of technical support after the website goes live.',
    },
  ],
  schema: {
    name: 'Business Websites',
    description:
      'Custom business website design and development with responsive layouts, technical SEO, and modern web technologies.',
    serviceType: 'WebDesign',
  },
};
const wordpressWebsites: ServiceData = {
  slug: 'wordpress-websites',
  title: 'WordPress Websites',
  subtitle:
    'We build custom WordPress websites with handcrafted themes, no templates or heavy page builders. Fast, secure, and easy to manage.',
  description:
    'We design and develop custom WordPress websites with handcrafted themes, an intuitive admin panel, and a design tailored to your business.',
  keywords: [
    'WordPress websites',
    'WordPress development',
    'custom WordPress theme',
    'business WordPress website',
    'WordPress developer',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'WordPress',
  heroStats: [
    { value: 'Custom', label: 'theme, no page builder' },
    { value: 'ACF', label: 'easy content editing' },
    { value: '100%', label: 'custom theme' },
  ],
  whyTitle: 'Why choose WordPress?',
  why: [
    {
      icon: 'check',
      title: 'Easy Content Management',
      desc: 'Update text, images, and other content yourself without any programming knowledge.',
    },
    {
      icon: 'shield',
      title: 'Security',
      desc: 'We configure WordPress properly and implement essential security best practices to help protect your website.',
    },
    {
      icon: 'bolt',
      title: 'Fast Performance',
      desc: 'Custom lightweight themes ensure your website loads quickly without unnecessary bloat.',
    },
    {
      icon: 'code',
      title: 'Custom Theme',
      desc: 'Every website is built from scratch and tailored to your business instead of relying on ready-made templates.',
    },
    {
      icon: 'globe',
      title: 'Scalable Solution',
      desc: 'Your website can easily be expanded with additional languages, a blog, an online store, or new features in the future.',
    },
    {
      icon: 'chart',
      title: 'SEO Ready',
      desc: 'We integrate analytics tools and implement technical SEO from the very beginning.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Custom WordPress theme',
    'Responsive website',
    'Easy-to-use admin panel',
    'ACF configuration for simple content editing',
    'Yoast SEO integration',
    'Google Analytics & Tag Manager',
    'Hosting, domain, and SSL configuration',
    '30-minute admin panel training',
    '30 days of technical support',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 3100,
      features: [
        'Up to 5 pages',
        'Custom theme',
        'Gutenberg editor',
        'Basic SEO setup',
        'SSL & hosting configuration',
      ],
    },
    {
      name: 'Business',
      from: 3800,
      features: [
        'Up to 10 pages',
        'ACF integration',
        'Blog',
        'Multilingual support',
        'Google Analytics',
        'Two rounds of revisions',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 6000,
      features: [
        'Unlimited pages',
        'WooCommerce',
        'Booking system',
        'Enhanced security',
        'Extended post-launch support',
      ],
    },
  ],
  faq: [
    {
      q: 'How is your WordPress website different from a template?',
      a: 'We build custom themes tailored to your project instead of using ready-made templates. This results in a faster, lighter, and more flexible website.',
    },
    {
      q: 'Can I edit the website myself after launch?',
      a: 'Yes. We configure the admin panel to make content editing simple and show you how to use it.',
    },
    {
      q: 'Do you use Elementor or other page builders?',
      a: 'No. We build custom themes using the native WordPress editor, keeping the website lightweight and easy to maintain.',
    },
    {
      q: 'Is WordPress secure?',
      a: 'Yes, when it is properly configured and regularly updated. We implement essential security measures during development.',
    },
    {
      q: 'Can you migrate my existing WordPress website?',
      a: 'Yes. We can migrate your content and rebuild your website while preserving the most important information.',
    },
    {
      q: 'Can I add an online store later?',
      a: 'Absolutely. Your website can be expanded with WooCommerce or other features whenever you need them.',
    },
    {
      q: 'Can you help with hosting?',
      a: 'Yes. We can recommend the right hosting provider and configure your domain and SSL certificate.',
    },
    {
      q: 'Do you provide support after launch?',
      a: 'Yes. Every project includes 30 days of technical support, and ongoing maintenance plans are also available.',
    },
  ],
  schema: {
    name: 'WordPress Websites',
    description:
      'Custom WordPress website development with handcrafted themes, easy content management, and technical SEO.',
    serviceType: 'WebDesign',
  },
};
const landingPage: ServiceData = {
  slug: 'landing-page',
  title: 'Landing Pages',
  subtitle:
    'We design landing pages with one clear goal, helping visitors contact you, sign up, or make a purchase.',
  description:
    'We create custom landing pages for businesses and advertising campaigns. Every project includes a unique design, fast performance, technical SEO, and analytics setup.',
  keywords: [
    'landing page',
    'landing page design',
    'Google Ads landing page',
    'conversion landing page',
    'landing page development',
  ],
  heroVideo: '/videos/services/web-design.mp4',
  heroPoster: '/videos/services/web-design-poster.webp',
  heroLabel: 'Landing Pages',
  heroStats: [
    { value: '7–14', label: 'business days' },
    { value: 'PageSpeed', label: 'tested before launch' },
    { value: 'GA4', label: 'analytics setup' },
  ],
  whyTitle: 'Why choose a landing page?',
  why: [
    {
      icon: 'target',
      title: 'One Clear Goal',
      desc: 'A landing page focuses visitors on a single action without unnecessary distractions.',
    },
    {
      icon: 'bolt',
      title: 'Fast Performance',
      desc: 'We optimize every landing page to load quickly on both mobile devices and desktops.',
    },
    {
      icon: 'chart',
      title: 'Track Results',
      desc: 'Analytics tools are configured so you can measure conversions and campaign performance.',
    },
    {
      icon: 'mobile',
      title: 'Responsive Design',
      desc: 'Your landing page will work and look great on every device.',
    },
    {
      icon: 'search',
      title: 'Built for SEO or Ads',
      desc: 'The page can be optimized either for search engines or advertising campaigns such as Google Ads and Meta Ads.',
    },
    {
      icon: 'speed',
      title: 'Fast Delivery',
      desc: 'Most landing pages are completed within 7–14 business days.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Custom landing page design',
    'Desktop and mobile layouts',
    'Hero section with a clear call to action',
    'Offer or benefits section',
    'Testimonials or trust-building elements',
    'Contact form with email notifications',
    'SSL certificate',
    'Google Analytics 4 and conversion tracking setup',
    'Performance optimization',
    'Meta tags and Open Graph',
    '30 days of technical support',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 1500,
      features: [
        'Landing page',
        'Custom design',
        'Contact form',
        'SSL & Google Analytics',
      ],
    },
    {
      name: 'Business',
      from: 2200,
      features: [
        'Landing page + thank you page',
        'A/B testing ready',
        'Google Tag Manager',
        'Meta Pixel',
        'Conversion tracking',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 3500,
      features: [
        'Landing page + 2 variations',
        'Animations',
        'CRM integration',
        'Optimized for ad campaigns',
        'Priority delivery',
      ],
    },
  ],
  faq: [
    {
      q: 'What is the difference between a landing page and a business website?',
      a: 'A landing page focuses on one specific goal, such as generating leads or sales. A business website presents your company, services, and additional information.',
    },
    {
      q: 'Is a landing page suitable for Google Ads?',
      a: 'Yes. We design landing pages specifically for advertising campaigns, focusing on performance, clear messaging, and conversion tracking.',
    },
    {
      q: 'How long does it take to build a landing page?',
      a: 'Most landing pages are completed within 7–14 business days. The timeline depends on the project scope and the availability of content.',
    },
    {
      q: 'Do you set up analytics?',
      a: 'Yes. We can configure Google Analytics 4, Google Tag Manager, conversion tracking, and Meta Pixel if needed.',
    },
    {
      q: 'Will my landing page work on mobile devices?',
      a: 'Yes. Every landing page is fully responsive and tested across multiple screen sizes.',
    },
    {
      q: 'Can I order multiple landing page versions?',
      a: 'Yes. Higher plans include multiple page variations that can be used for future A/B testing.',
    },
    {
      q: 'Can you help with hosting and domains?',
      a: 'Yes. We can help you choose a hosting provider, configure your domain, and install an SSL certificate.',
    },
    {
      q: 'Can you redesign my existing landing page?',
      a: 'Yes. We can redesign your existing landing page, improve its performance, and prepare it for new advertising campaigns.',
    },
  ],
  schema: {
    name: 'Landing Pages',
    description:
      'Custom landing page design and development for Google Ads, Meta Ads, and digital marketing campaigns. Fast, responsive, and conversion-focused.',
    serviceType: 'WebDesign',
  },
};
const ecommerceWebsites: ServiceData = {
  slug: 'ecommerce-websites',
  title: 'E-commerce Websites',
  subtitle:
    'We build online stores with WooCommerce and Next.js, making it easy to manage products, orders, and online payments.',
  description:
    'We design and develop custom e-commerce websites with payment gateway integration, an intuitive admin panel, and technical SEO built in from the start.',
  keywords: [
    'e-commerce website',
    'online store development',
    'WooCommerce development',
    'Next.js ecommerce',
    'custom online store',
  ],
  heroVideo: '/videos/services/business-websites.mp4',
  heroPoster: '/videos/services/business-websites-poster.webp',
  heroLabel: 'E-commerce',
  heroStats: [
    { value: 'Stripe', label: 'payment integration' },
    { value: 'P24', label: 'Przelewy24 / PayU' },
    { value: 'PageSpeed', label: 'tested before launch' },
  ],
  whyTitle: 'Why invest in an online store?',
  why: [
    {
      icon: 'cart',
      title: 'Easy Store Management',
      desc: 'Manage products, prices, inventory, and orders yourself through an intuitive admin panel.',
    },
    {
      icon: 'shield',
      title: 'Secure Payments',
      desc: 'We integrate trusted payment gateways so customers can complete purchases quickly and securely.',
    },
    {
      icon: 'bolt',
      title: 'Fast Performance',
      desc: 'Every online store is optimized to provide a smooth shopping experience on both desktop and mobile devices.',
    },
    {
      icon: 'save',
      title: 'Full Product Control',
      desc: 'Easily manage products, images, variations, categories, and stock levels.',
    },
    {
      icon: 'chart',
      title: 'Sales Analytics',
      desc: 'Analytics tools help you track sales, customer behavior, and the performance of your online store.',
    },
    {
      icon: 'search',
      title: 'SEO Ready',
      desc: 'Technical SEO is implemented from the beginning to provide a solid foundation for future search engine optimization.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Homepage and product catalog',
    'Product pages with variations',
    'Shopping cart and checkout',
    'Online payment integration',
    'Admin panel for products and orders',
    'Email notifications for customers and administrators',
    'Technical SEO setup',
    'Google Analytics 4',
    'SSL certificate',
    'Admin panel training',
  ],
  process: PROCESS_DEFAULT,
  plans: [
    {
      name: 'Starter',
      from: 2800,
      features: [
        'Up to 50 products',
        'WooCommerce',
        'Stripe integration',
        'Basic SEO setup',
        'Admin panel',
      ],
    },
    {
      name: 'Business',
      from: 7500,
      features: [
        'Unlimited products',
        'Przelewy24 / PayU',
        'Product variations',
        'Google Analytics e-commerce',
        'Email integration',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 12000,
      features: [
        'Next.js headless architecture',
        'CMS integration',
        'Product filtering',
        'Customer accounts',
        'Extended post-launch support',
      ],
    },
  ],
  faq: [
    {
      q: 'Which e-commerce platform should I choose?',
      a: 'The right solution depends on your business. WooCommerce works well for most small and medium-sized stores, while Next.js is a great choice for larger and more advanced projects.',
    },
    {
      q: 'Can the store support online payments?',
      a: 'Yes. We integrate payment providers such as Stripe, PayPal, Przelewy24, PayU, and Paynow depending on your requirements.',
    },
    {
      q: 'How much does an online store cost?',
      a: 'A basic WooCommerce store starts from 2,800 PLN. Larger or more complex projects are quoted individually after discussing your requirements.',
    },
    {
      q: 'Will I get an admin panel?',
      a: 'Yes. You will be able to manage products, orders, and website content through an easy-to-use administration panel.',
    },
    {
      q: 'How long does it take to build an online store?',
      a: 'WooCommerce stores usually take 3–6 weeks, while larger Next.js projects typically take 6–10 weeks, depending on the scope.',
    },
    {
      q: 'Can I add products myself?',
      a: 'Yes. We provide training and show you how to manage products, orders, and other store content.',
    },
    {
      q: 'Will my store work on mobile devices?',
      a: 'Yes. Every online store is fully responsive and optimized for mobile shopping.',
    },
    {
      q: 'Will the store be SEO-friendly?',
      a: 'Yes. Every project includes the essential technical SEO elements needed to build a strong foundation for future optimization.',
    },
  ],
  schema: {
    name: 'E-commerce Websites',
    description:
      'Custom e-commerce website development with WooCommerce and Next.js, including payment integration, admin panel, and technical SEO.',
    serviceType: 'WebDesign',
  },
};
const websiteMaintenanceProcess: ServiceProcess[] = [
  {
    step: '01',
    title: 'Audit',
    desc: 'We review your website, software versions, existing issues, and areas that may need improvement.',
  },
  {
    step: '02',
    title: 'Maintenance Plan',
    desc: 'Together we define what your monthly website maintenance should include and how often tasks will be performed.',
  },
  {
    step: '03',
    title: 'Setup',
    desc: 'We configure the necessary access, backups, and essential tools to monitor your website.',
  },
  {
    step: '04',
    title: 'Ongoing Maintenance',
    desc: 'Each month we perform the agreed updates, maintenance tasks, and small website changes.',
  },
  {
    step: '05',
    title: 'Report',
    desc: 'You receive a summary of completed work, updates, and any issues that require attention.',
  },
  {
    step: '06',
    title: 'Improvements',
    desc: 'Whenever needed, we suggest improvements related to performance, security, or overall usability.',
  },
];

const websiteMaintenancePlans: ServicePlan[] = [
  {
    name: 'Basic',
    from: 120,
    features: [
      'Up to 1 hour of changes per month',
      'WordPress updates',
      'Monthly backup',
      'Email report',
    ],
  },
  {
    name: 'Standard',
    from: 220,
    features: [
      'Up to 2 hours of changes per month',
      'Weekly backup',
      'Uptime monitoring',
      'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Pro',
    from: 400,
    features: [
      'Up to 4 hours of changes per month',
      'Daily backup',
      'Performance optimization',
      'Enhanced security',
      'Phone support',
    ],
  },
];

const websiteMaintenanceFaq: ServiceFAQ[] = [
  {
    q: 'Which websites do you maintain?',
    a: 'We primarily maintain WordPress and Next.js websites, but we can also help with simple HTML/CSS websites.',
  },
  {
    q: 'Does the website have to be built by you?',
    a: 'No. We also provide maintenance for websites created by other developers. We usually start with a short technical audit.',
  },
  {
    q: 'How quickly do you respond to requests?',
    a: 'We respond during business hours. Response times depend on your maintenance plan and the type of issue.',
  },
  {
    q: 'What if I need more work than my plan includes?',
    a: 'Additional work can be billed hourly after we agree on the scope.',
  },
  {
    q: 'Will I receive a maintenance report?',
    a: 'Yes. Every month you receive a summary of completed updates, changes, and any important issues.',
  },
  {
    q: 'Can updates break my website?',
    a: 'Before major updates we create a backup, so your website can be restored if any unexpected issues occur.',
  },
  {
    q: 'Can I cancel the maintenance plan?',
    a: 'Yes. Maintenance is billed monthly, so you can cancel at any time without a long-term contract.',
  },
  {
    q: 'Can you maintain a WooCommerce store?',
    a: 'Yes. We can update WooCommerce, make small changes, and help manage products and the online store.',
  },
];
const websiteMaintenance: ServiceData = {
  slug: 'website-maintenance',
  title: 'Website Maintenance',
  subtitle:
    'Ongoing technical care within a monthly plan: updates, backups, security and small changes. You run your business, we look after the website.',
  description:
    'We handle technical maintenance for WordPress and Next.js websites: updates, backups, security and fixing issues as they come up.',
  keywords: [
    'website maintenance',
    'WordPress maintenance',
    'technical website management',
    'website updates and security',
    'website technical support',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Maintenance',
  heroStats: [
    { value: '24h', label: 'maximum response time*' },
    { value: 'Monthly', label: 'maintenance reports' },
    { value: 'from PLN 120', label: 'monthly plans' },
  ],
  whyTitle: 'Why choose website maintenance?',
  why: [
    {
      icon: 'refresh',
      title: 'Regular Updates',
      desc: 'We keep WordPress, themes, and plugins up to date to ensure your website continues to work properly.',
    },
    {
      icon: 'save',
      title: 'Backups',
      desc: 'Regular backups allow your website to be restored quickly if something goes wrong.',
    },
    {
      icon: 'bug',
      title: 'Quick Support',
      desc: 'If an issue occurs, we investigate it and work on resolving it as quickly as possible.',
    },
    {
      icon: 'check',
      title: 'Content Updates',
      desc: 'We can update text, images, and other small website content without the need to hire a developer.',
    },
    {
      icon: 'chart',
      title: 'Website Monitoring',
      desc: 'We regularly check website availability and basic performance.',
    },
    {
      icon: 'shield',
      title: 'Security',
      desc: 'We keep your website software updated and apply essential security best practices.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'WordPress, theme, and plugin updates',
    'Regular backups',
    'Website uptime monitoring',
    'Content updates according to your plan',
    'Basic database optimization',
    'Technical issue monitoring',
    'Monthly maintenance report',
    'Email support',
  ],
  process: websiteMaintenanceProcess,
  plans: websiteMaintenancePlans,
  faq: websiteMaintenanceFaq,
  schema: {
    name: 'Website Maintenance',
    description:
      'Technical maintenance for WordPress and Next.js websites including updates, backups, monitoring, and technical support.',
    serviceType: 'WebSiteMaintenance',
  },
  relatedService: {
    slug: 'website-support',
    note: 'Something stopped working and you need a one-off fix?',
    linkLabel: 'See technical support & fixes',
  },
};

const websiteSupport: ServiceData = {
  slug: 'website-support',
  title: 'Technical Support & WordPress Fixes',
  subtitle:
    'Something not working on your website? We find the cause and fix it, including sites built by someone else. One-off help or ongoing care.',
  description:
    'WordPress fixes and technical support: errors after updates, broken contact forms, malware, slow loading. Website care for businesses in Wrocław and across Poland.',
  keywords: [
    'website support',
    'ongoing website care',
    'monthly website support',
    'website maintenance service',
    'WordPress support',
  ],
  heroVideo: '/videos/services/web-development.mp4',
  heroPoster: '/videos/services/web-development-poster.webp',
  heroLabel: 'Technical Support',
  heroStats: [
    { value: 'Monthly', label: 'ongoing support' },
    { value: 'Report', label: 'work summary' },
    { value: 'from PLN 120', label: 'monthly plans' },
  ],
  whyTitle: 'Why choose ongoing website support?',
  why: [
    {
      icon: 'shield',
      title: 'Security',
      desc: 'We take care of updates, backups, and essential security measures to keep your website protected.',
    },
    {
      icon: 'save',
      title: 'Regular Backups',
      desc: 'Frequent backups make it easy to restore your website if needed.',
    },
    {
      icon: 'bolt',
      title: 'Reliable Performance',
      desc: 'We monitor your website and suggest improvements whenever necessary.',
    },
    {
      icon: 'chat',
      title: 'Direct Contact',
      desc: 'You communicate directly with us instead of going through a help desk or ticket system.',
    },
    {
      icon: 'chart',
      title: 'Website Monitoring',
      desc: 'We monitor your website and respond whenever technical issues arise.',
    },
    {
      icon: 'check',
      title: 'Small Content Changes',
      desc: 'Need to update text, pricing, opening hours, or images? We can handle those changes as part of your plan.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Website uptime monitoring',
    'Regular backups according to your plan',
    'WordPress, theme, and plugin updates',
    'Basic security checks',
    'Basic database optimization',
    'Content updates according to your plan',
    'Email support',
    'Monthly maintenance summary',
  ],
  process: websiteMaintenanceProcess,
  plans: websiteMaintenancePlans,
  faq: websiteMaintenanceFaq,
  schema: {
    name: 'Website Support',
    description:
      'Ongoing, monthly website support including updates, backups, content changes, monitoring, and technical assistance.',
    serviceType: 'WebSiteMaintenance',
  },
  relatedService: {
    slug: 'website-maintenance',
    note: 'Prefer ongoing monthly care instead of one-off fixes?',
    linkLabel: 'See website maintenance',
  },
};
const websiteRedesign: ServiceData = {
  slug: 'website-redesign',
  title: 'Website Redesign',
  subtitle:
    'We refresh existing websites by improving their look, performance, and usability without rebuilding everything from scratch.',
  description:
    'We modernize business websites with a new design, better performance, content migration, and updates aligned with current web standards.',
  keywords: [
    'website redesign',
    'website modernization',
    'website refresh',
    'business website redesign',
    'website rebuild',
  ],
  heroVideo: '/videos/services/web-design.mp4',
  heroPoster: '/videos/services/web-design-poster.webp',
  heroLabel: 'Redesign',
  heroStats: [
    { value: 'New look', label: 'custom design' },
    { value: 'Migration', label: 'content transfer' },
    { value: 'SEO', label: 'technical setup included' },
  ],
  whyTitle: 'When should you redesign your website?',
  why: [
    {
      icon: 'clock',
      title: 'Slow Performance',
      desc: 'We improve website performance to make browsing smoother and more comfortable for users.',
    },
    {
      icon: 'mobile',
      title: 'Mobile Issues',
      desc: 'We adapt your website to mobile devices and current responsive design standards.',
    },
    {
      icon: 'star',
      title: 'Outdated Design',
      desc: 'We refresh the visual design while keeping the character of your brand.',
    },
    {
      icon: 'lock',
      title: 'Outdated Software',
      desc: 'We help update your website and improve its overall security.',
    },
    {
      icon: 'chart',
      title: 'Visibility Problems',
      desc: 'We fix technical issues that may make future SEO work harder.',
    },
    {
      icon: 'check',
      title: 'Difficult Editing',
      desc: 'If your current website is hard to manage, we can implement a simpler content management system.',
    },
  ],
  whatTitle: "What's included?",
  what: [
    'Technical and visual audit',
    'New website design',
    'Content migration',
    'Performance optimization',
    'Responsive website version',
    'Technical SEO improvements',
    'URL structure review or cleanup',
    'Google Analytics configuration',
    'Update of essential legal information',
    'Website management training',
  ],
  process: [
    {
      step: '01',
      title: 'Audit',
      desc: 'We review your current website, including its design, performance, and key technical issues.',
    },
    {
      step: '02',
      title: 'Change Plan',
      desc: 'Together we define which elements should stay and which parts need to be rebuilt.',
    },
    {
      step: '03',
      title: 'Design',
      desc: 'We prepare a refreshed website design tailored to your business.',
    },
    {
      step: '04',
      title: 'Development',
      desc: 'We build the new version of the website and migrate the required content.',
    },
    {
      step: '05',
      title: 'Testing',
      desc: 'We test the website before publication to make sure everything works correctly.',
    },
    {
      step: '06',
      title: 'Support',
      desc: 'After launch, you receive 30 days of technical support.',
    },
  ],
  plans: [
    {
      name: 'Starter',
      from: 2000,
      features: [
        'Redesign up to 5 pages',
        'New design',
        'Content migration',
        'Performance optimization',
      ],
    },
    {
      name: 'Business',
      from: 3800,
      features: [
        'Redesign up to 10 pages',
        'Technical SEO audit',
        'New CMS',
        'Google Analytics',
        'URL structure preservation',
      ],
      highlight: true,
    },
    {
      name: 'Premium',
      from: 7000,
      features: [
        'Full website rebuild',
        'Technology migration',
        'Multilingual website',
        'E-commerce extension',
        'Extended post-launch support',
      ],
    },
  ],
  faq: [
    {
      q: 'Can a redesign affect SEO?',
      a: 'A properly planned redesign helps preserve the most important technical SEO elements. If needed, we prepare redirects and keep important URLs in place.',
    },
    {
      q: 'Will my content be migrated?',
      a: 'Yes. We migrate the text, images, and other materials that should appear on the new website.',
    },
    {
      q: 'Will my current website stay online during the work?',
      a: 'Yes. We prepare the new version in a test environment, and the final launch happens only after the work is complete.',
    },
    {
      q: 'How much does a website redesign cost?',
      a: 'Website redesign starts from around PLN 2,000. The final price depends on the scope of changes and the number of pages.',
    },
    {
      q: 'Can you change the website technology?',
      a: 'Yes. If it makes sense for the project, we can move your website to WordPress or Next.js.',
    },
    {
      q: 'How long does a redesign take?',
      a: 'Most redesign projects take between 1 and 6 weeks, depending on the size of the website and the scope of work.',
    },
    {
      q: 'Can you only improve website speed?',
      a: 'Yes. We can provide performance optimization without a full website redesign.',
    },
    {
      q: 'Can I keep my current hosting?',
      a: 'Yes. If your hosting meets the project requirements, there is no need to change it.',
    },
  ],
  schema: {
    name: 'Website Redesign',
    description:
      'Website redesign and modernization with a refreshed design, performance improvements, content migration, and technical SEO.',
    serviceType: 'WebDesign',
  },
};

export const SERVICES_EN: ServiceData[] = [
  webDevelopment,
  webDesign,
  businessWebsites,
  wordpressWebsites,
  landingPage,
  ecommerceWebsites,
  websiteMaintenance,
  websiteSupport,
  websiteRedesign,
];