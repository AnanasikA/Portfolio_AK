'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
type NavLink = { label: string; href: string; external?: boolean };
type NavCol  = { head: string; links: NavLink[] };

// lucide-react nie eksportuje już ikon marek (Facebook, LinkedIn itd.),
// więc trzymamy je jako lokalne SVG.
function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.1h2.72l.41-3.16h-3.13V7.73c0-.91.25-1.53 1.56-1.53h1.67V3.38C15.94 3.28 15 3.2 13.9 3.2c-2.32 0-3.9 1.42-3.9 4.02v2.52H7.27v3.16H10v8.1h3.5Z" />
    </svg>
  );
}

export default function Footer() {
  const t    = useTranslations('footer');
  const locale = useLocale();
  const isEn   = locale === 'en';

  const year    = new Date().getFullYear();
  const email   = 'kontakt@anastasiiakupriianets.pl';
  const website = 'anastasiiakupriianets.pl';
  const nip     = '8961662887';

  const social = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ak-web-design-anastasiia-kupriianets/', Icon: LinkedinIcon },
    { label: 'Facebook', href: 'https://www.facebook.com/akwebdesign.pol/',                                Icon: FacebookIcon },
  ];

  const schema = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'AK Web & Design | Anastasiia Kupriianets',
    url: 'https://anastasiiakupriianets.pl', email, taxID: nip,
    sameAs: social.map(s => s.href),
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
          .ft-social:hover { background: var(--brand) !important; border-color: var(--brand) !important; color: #fff !important; }
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
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

              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="ft-social"
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    width:        34,
                    height:       34,
                    borderRadius: 99,
                    border:       '1.5px solid var(--line)',
                    color:        'var(--muted)',
                    background:   'transparent',
                    transition:   'background .18s, border-color .18s, color .18s',
                    flexShrink:   0,
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
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