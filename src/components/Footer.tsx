'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

type NavLink = { label: string; href: string; external?: boolean };
type NavCol  = { head: string; links: NavLink[] };

export default function Footer() {
  const t    = useTranslations('footer');
  const locale = useLocale();
  const isEn   = locale === 'en';

  const year    = new Date().getFullYear();
  const email   = 'kontakt@anastasiiakupriianets.pl';
  const website = 'anastasiiakupriianets.pl';
  const nip     = '8961662887';

  const schema = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'AK Web & Design | Anastasiia Kupriianets',
    url: 'https://anastasiiakupriianets.pl', email, taxID: nip,
    contactPoint: [{ '@type': 'ContactPoint', contactType: isEn ? 'customer support' : 'obsługa klienta', email, availableLanguage: ['Polish', 'English'] }],
  };

  const cols: NavCol[] = [
    {
      head: isEn ? 'Navigation' : 'Nawigacja',
      links: [
        { label: isEn ? 'Home'     : 'Start',    href: '/'         },
        { label: isEn ? 'Projects' : 'Projekty', href: '/projects' },
        ...(isEn ? [] : [{ href: '/partners/offer', label: 'Współpraca' }]),
        { label: isEn ? 'Process'  : 'Proces',   href: '/#process'  },
        { label: isEn ? 'Estimate' : 'Wycena',   href: '/wycena'    },
        { label: 'FAQ',                           href: '/#faq'      },
        { label: 'Blog',                          href: '/blog'      },
      ],
    },
    {
      head: isEn ? 'Services' : 'Usługi',
      links: isEn
        ? [
            { label: 'Website Development',   href: '/services/tworzenie-stron-internetowych' },
            { label: 'Web Design',            href: '/services/projektowanie-stron'           },
            { label: 'Business Websites',     href: '/services/strony-dla-firm'               },
            { label: 'WordPress',             href: '/services/wordpress'                     },
            { label: 'Landing Pages',         href: '/services/landing-page'                  },
            { label: 'Online Stores',         href: '/services/sklepy-internetowe'            },
            { label: 'Website Care',          href: '/services/opieka-nad-stronami'           },
            { label: 'Website Redesign',      href: '/services/modernizacja-stron'            },
          ]
        : [
            { label: 'Tworzenie stron',       href: '/services/tworzenie-stron-internetowych' },
            { label: 'Projektowanie stron',   href: '/services/projektowanie-stron'           },
            { label: 'Strony dla firm',       href: '/services/strony-dla-firm'               },
            { label: 'WordPress',             href: '/services/wordpress'                     },
            { label: 'Landing page',          href: '/services/landing-page'                  },
            { label: 'Sklepy internetowe',    href: '/services/sklepy-internetowe'            },
            { label: 'Opieka nad stronami',   href: '/services/opieka-nad-stronami'           },
            { label: 'Modernizacja stron',    href: '/services/modernizacja-stron'            },
          ],
    },
    {
      head: isEn ? 'Contact' : 'Kontakt',
      links: [
        { label: email,             href: `mailto:${email}`      },
        { label: '+48 576 564 682', href: 'tel:+48576564682'     },
        { label: website,           href: `https://${website}`, external: true },
      ],
    },
  ];

  const legal = [
    { href: '/polityka-prywatnosci', label: t('privacy') },
    { href: '/regulamin',            label: t('terms')   },
    { href: '/cookies',              label: t('cookies') },
  ];

  const linkStyle = {
    fontFamily: 'var(--fb)', fontSize: '.88rem',
    color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s',
  };

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,72px) 0' }}>

        <style>{`
          .ft-grid {
            display: grid;
            grid-template-columns: 1.6fr 1.2fr 1fr 1fr;
            gap: clamp(24px,3vw,48px);
            padding-bottom: clamp(32px,5vw,48px);
            border-bottom: 1px solid var(--line);
          }
          @media (max-width: 900px) {
            .ft-grid { grid-template-columns: 1fr 1fr; }
            .ft-brand-col { grid-column: 1 / -1; }
          }
          @media (max-width: 480px) {
            .ft-grid { grid-template-columns: 1fr; }
            .ft-brand-col { grid-column: 1; }
          }
          .ft-link:hover { color: var(--brand) !important; }
        `}</style>

        <div className="ft-grid">

          {/* Brand */}
          <div className="ft-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--brand)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.82rem', flexShrink: 0 }}>AK</span>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.2 }}>
                AK Web & Design
              </span>
            </div>
            <p style={{ fontFamily: 'var(--fb)', fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.65, maxWidth: '34ch', marginBottom: 20 }}>
              {isEn
                ? 'Web design studio — fast, modern sites built for real results.'
                : 'Studio projektowania stron — nowoczesne, szybkie witryny nastawione na efekty.'}
            </p>
            {/* Social / email shortcut */}
            <a
              href="mailto:kontakt@anastasiiakupriianets.pl"
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          8,
                fontFamily:   'var(--fd)',
                fontWeight:   600,
                fontSize:     '.82rem',
                color:        'var(--brand)',
                textDecoration: 'none',
                padding:      '6px 14px',
                border:       '1.5px solid var(--brand)',
                borderRadius: 99,
                transition:   'background .18s, color .18s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'var(--brand)'; el.style.color = '#fff'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = 'var(--brand)'; }}
            >
              ✉ {isEn ? 'Write to me' : 'Napisz do mnie'}
            </a>
          </div>

          {/* Nav cols */}
          {cols.map(col => (
            <div key={col.head}>
              <p style={{
                fontFamily:    'var(--fd)',
                fontWeight:    600,
                fontSize:      '.72rem',
                letterSpacing: '.18em',
                textTransform: 'uppercase' as const,
                color:         'var(--muted-2)',
                marginBottom:  16,
              }}>
                {col.head}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' as const, gap: 9 }}>
                {col.links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="ft-link" style={linkStyle}>
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className="ft-link" style={linkStyle}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px 16px', padding: '18px 0' }}>
          <p style={{ fontFamily: 'var(--fb)', fontSize: '.82rem', color: 'var(--muted-2)' }}>
            © {year} AK Web & Design · Anastasiia Kupriianets · NIP {nip}
          </p>
          <nav aria-label={t('legal_aria')} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
            {legal.map(({ href, label }) => (
              <Link key={href} href={href} className="ft-link"
                style={{ fontFamily: 'var(--fb)', fontSize: '.82rem', color: 'var(--muted-2)', textDecoration: 'none', transition: 'color .2s' }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}