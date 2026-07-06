// src/app/[locale]/services/page.tsx
// Strona indeksu usług — lista wszystkich usług

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getServices } from '@/data/services';

const BASE_URL = 'https://anastasiiakupriianets.pl';

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'Services | AK Web & Design' : 'Usługi | AK Web & Design',
    description: isEn
      ? 'Web development, UI/UX design, WordPress, landing pages, e-commerce stores and website maintenance.'
      : 'Tworzenie stron internetowych, projektowanie UI/UX, WordPress, landing page, sklepy internetowe i administracja stron.',
    alternates: {
      canonical: `${BASE_URL}${isEn ? '/en' : ''}/services`,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const services = getServices(locale);

  const ICONS: Record<string, string> = {
    // PL
    'tworzenie-stron-internetowych': '💻',
    'projektowanie-stron': '🎨',
    'strony-dla-firm': '🏢',
    wordpress: '🌐',
    'landing-page': '🚀',
    'sklepy-internetowe': '🛒',
    'administracja-stron': '🔧',
    'opieka-nad-stronami': '🛡️',
    'modernizacja-stron': '✨',

    // EN
    'web-development': '💻',
    'web-design': '🎨',
    'business-websites': '🏢',
    'wordpress-websites': '🌐',
    'ecommerce-websites': '🛒',
    'website-maintenance': '🔧',
    'website-support': '🛡️',
    'website-redesign': '✨',
  };

  <style>{`
  .service-card {
    border: 1px solid var(--line-soft);
    border-radius: var(--r-l);
    padding: 1.75rem 1.5rem;
    background: #fff;
    height: 100%;
    transition: transform .2s, box-shadow .2s, border-color .2s;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--sh-s);
    border-color: var(--brand);
  }
`}</style>

  return (

    <main style={{ paddingTop: 80 }}>
      <section
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding:
            'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4.5rem) clamp(4rem,7vw,6rem)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: '.72rem',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--brand)',
            marginBottom: '1rem',
          }}
        >
          {isEn ? 'Offer' : 'Oferta'}
        </p>

        <h1
          style={{
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: 'clamp(2rem,5vw,3.4rem)',
            letterSpacing: '-.04em',
            color: 'var(--ink)',
            lineHeight: 1.08,
            marginBottom: '1rem',
          }}
        >
          {isEn ? 'Services' : 'Usługi'}
        </h1>

        <p
          style={{
            fontFamily: 'var(--fd)',
            fontSize: '1rem',
            color: 'var(--muted)',
            maxWidth: '54ch',
            lineHeight: 1.65,
            marginBottom: '3rem',
          }}
        >
          {isEn
            ? 'I build websites, online stores and web applications for businesses and freelancers. Every project is custom-made without pre-built templates.'
            : 'Tworzę strony internetowe, sklepy i aplikacje webowe dla firm i freelancerów. Każdy projekt jest indywidualny — bez gotowych szablonów.'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {services.map(service => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  border: '1px solid var(--line-soft)',
                  borderRadius: 'var(--r-l)',
                  padding: '1.75rem 1.5rem',
                  background: '#fff',
                  height: '100%',
                  transition: 'transform .2s, box-shadow .2s, border-color .2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '2rem' }}>
                  {ICONS[service.slug] ?? '🌐'}
                </span>

                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--fd)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--ink)',
                      marginBottom: '.4rem',
                    }}
                  >
                    {service.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: 'var(--fd)',
                      fontSize: '.88rem',
                      color: 'var(--muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {service.subtitle.slice(0, 100)}…
                  </p>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--fd)',
                    fontWeight: 600,
                    fontSize: '.82rem',
                    color: 'var(--brand)',
                    marginTop: 'auto',
                  }}
                >
                  {isEn ? 'Learn more →' : 'Dowiedz się więcej →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}