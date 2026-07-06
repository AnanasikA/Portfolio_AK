'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import PaperPlaneButton from '@/components/PaperPlane';
import { getTranslatedServiceSlug } from '@/data/services';
import dynamic from 'next/dynamic';

const QuoteModal  = dynamic(() => import('@/components/QuoteModal'),  { ssr: false });
const DropdownMenu = dynamic(() => import('@/components/DropdownMenu'), { ssr: false });

interface HeaderProps { isOpen: boolean; toggleMenu: () => void; }

// ─── Usługi dropdown data ─────────────────────────────────────────────────────
const SERVICE_LINKS_PL = [
  { href: '/services/tworzenie-stron-internetowych', label: 'Tworzenie stron internetowych' },
  { href: '/services/projektowanie-stron',           label: 'Projektowanie stron' },
  { href: '/services/strony-dla-firm',               label: 'Strony dla firm' },
  { href: '/services/wordpress',                     label: 'WordPress' },
  { href: '/services/landing-page',                  label: 'Landing page' },
  { href: '/services/sklepy-internetowe',            label: 'Sklepy internetowe' },
  { href: '/services/administracja-stron',           label: 'Administracja stron' },
  { href: '/services/opieka-nad-stronami',           label: 'Opieka nad stronami' },
  { href: '/services/modernizacja-stron',            label: 'Modernizacja stron' },
];

const SERVICE_LINKS_EN = [
  { href: '/services/web-development',               label: 'Website Development' },
  { href: '/services/web-design',                    label: 'Web Design' },
  { href: '/services/business-websites',             label: 'Business Websites' },
  { href: '/services/wordpress-websites',            label: 'WordPress Websites' },
  { href: '/services/landing-page',                  label: 'Landing Pages' },
  { href: '/services/ecommerce-websites',            label: 'E-commerce Websites' },
  { href: '/services/website-maintenance',           label: 'Website Maintenance' },
  { href: '/services/website-support',               label: 'Website Support' },
  { href: '/services/website-redesign',              label: 'Website Redesign' },
];
// ─── Lang switcher ────────────────────────────────────────────────────────────
function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  function getLocalizedHref(targetLocale: 'pl' | 'en') {
    const clean = pathname.replace(/^\/(pl|en)(?=\/|$)/, '') || '/';
    const segments = clean.split('/');

    // /services/[slug]
    if (segments[1] === 'services' && segments[2]) {
      segments[2] = getTranslatedServiceSlug(
        locale,
        targetLocale,
        segments[2]
      );
    }

    return segments.join('/') || '/';
  }

  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--surface)',
        borderRadius: 99,
        padding: 3,
        gap: 2,
      }}
    >
      {(['pl', 'en'] as const).map(l => (
        <Link
          key={l}
          href={getLocalizedHref(l)}
          locale={l}
          style={{
            display: 'block',
            padding: '4px 10px',
            borderRadius: 99,
            fontFamily: 'var(--fd)',
            fontWeight: 700,
            fontSize: '.72rem',
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            textDecoration: 'none',
            background: locale === l ? '#fff' : 'transparent',
            color: locale === l ? 'var(--brand)' : 'var(--muted-2)',
            boxShadow: locale === l ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
            transition: 'all .2s',
          }}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

// ─── Services dropdown ────────────────────────────────────────────────────────
function ServicesDropdown({ isEn, locale }: { isEn: boolean; locale: string }) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const links           = isEn ? SERVICE_LINKS_EN : SERVICE_LINKS_PL;

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          5,
          fontFamily:   'var(--fd)',
          fontWeight:   500,
          fontSize:     '.88rem',
          color:        open ? 'var(--brand)' : 'var(--ink-soft)',
          padding:      '.45em .8em',
          borderRadius: 99,
          background:   open ? 'var(--surface)' : 'transparent',
          border:       'none',
          cursor:       'pointer',
          whiteSpace:   'nowrap',
          transition:   'background .18s, color .18s',
        }}
        onMouseEnter={e => { if (!open) { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand)'; } }}
        onMouseLeave={e => { if (!open) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; } }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {isEn ? 'Services' : 'Usługi'}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position:     'absolute',
          top:          'calc(100% + 8px)',
          left:         '50%',
          transform:    'translateX(-50%)',
          background:   '#fff',
          border:       '1px solid var(--line-soft)',
          borderRadius: 'var(--r)',
          boxShadow:    'var(--sh)',
          padding:      '8px',
          minWidth:     240,
          zIndex:       200,
        }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              locale={locale}
              onClick={() => setOpen(false)}
              style={{
                display:      'block',
                fontFamily:   'var(--fd)',
                fontWeight:   500,
                fontSize:     '.85rem',
                color:        'var(--ink-soft)',
                padding:      '.5em .9em',
                borderRadius: 'var(--r-s)',
                textDecoration: 'none',
                transition:   'background .15s, color .15s',
                whiteSpace:   'nowrap',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--surface)'; el.style.color = 'var(--brand)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--ink-soft)'; }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header({ isOpen, toggleMenu }: HeaderProps) {
  const [scrolled,   setScrolled]   = useState(false);
  const [briefOpen,  setBriefOpen]  = useState(false);
  const locale  = useLocale();
  const isEn    = locale === 'en';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (briefOpen) document.body.classList.add('is-locked');
    else           document.body.classList.remove('is-locked');
    return ()      => document.body.classList.remove('is-locked');
  }, [briefOpen]);

  useEffect(() => {
    const open = () => setBriefOpen(true);
    window.addEventListener('open-brief', open);
    return () => window.removeEventListener('open-brief', open);
  }, []);

  const links = [
    { href: '/projects',  label: isEn ? 'Work'    : 'Projekty'    },
    { href: '/#process',  label: isEn ? 'Process' : 'Proces'      },
    { href: '/#why-us',   label: isEn ? 'Why us'  : 'Dlaczego my' },
    // Usługi dropdown wchodzi tutaj — renderowane osobno poniżej
    { href: '/blog',      label: 'Blog'                            },
    { href: '/#contact',  label: isEn ? 'Contact' : 'Kontakt'     },
  ];

  return (
    <>
      <style>{`
        .nav-links   { display: flex !important; align-items: center; gap: 2px; }
        .nav-cta-btn { display: inline-flex !important; }
        .nav-burger  { display: none !important; }
        .nav-quote-btn {
          font-family: var(--fd);
          font-weight: 600;
          font-size: .88rem;
          background: transparent;
          color: var(--brand);
          border: 1.5px solid var(--brand);
          border-radius: 99px;
          padding: .6em 1.3em;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: background .18s, color .18s;
        }
        .nav-quote-btn:hover { background: var(--brand); color: #fff; }
        @media (max-width: 1023px) {
          .nav-links   { display: none !important; }
          .nav-cta-btn { display: inline-flex !important; }
          .nav-burger  { display: flex !important; }
        }
        @media (max-width: 599px) {
          .nav-cta-btn { display: none !important; }
        }
      `}</style>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: scrolled ? '8px 16px' : '14px 16px', transition: 'padding .35s' }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 20, padding: '6px 6px 6px 14px',
          border: '1px solid var(--line-soft)',
          boxShadow: scrolled ? 'var(--sh)' : 'none',
          transition: 'box-shadow .35s',
        }}>

          {/* Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--brand)', display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.88rem', flexShrink: 0 }}>AK</span>
            <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', letterSpacing: '-.02em', color: 'var(--ink)', lineHeight: 1.15 }}>
              AK Web & Design
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-links">
            {/* Projekty, Proces, Dlaczego my */}
            {links.slice(0, 3).map(({ href, label }) => (
              <Link key={href} href={href} locale={locale}
                style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '.88rem', color: 'var(--ink-soft)', padding: '.45em .8em', borderRadius: 99, textDecoration: 'none', transition: 'background .18s, color .18s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--surface)'; el.style.color = 'var(--brand)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--ink-soft)'; }}>
                {label}
              </Link>
            ))}
            {/* Usługi dropdown — między Dlaczego my a Blog */}
            <ServicesDropdown isEn={isEn} locale={locale} />
            {/* Blog, Kontakt */}
            {links.slice(3).map(({ href, label }) => (
              <Link key={href} href={href} locale={locale}
                style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '.88rem', color: 'var(--ink-soft)', padding: '.45em .8em', borderRadius: 99, textDecoration: 'none', transition: 'background .18s, color .18s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--surface)'; el.style.color = 'var(--brand)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'var(--ink-soft)'; }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <LangSwitcher />

            <Link href="/wycena" locale={locale} className="nav-quote-btn nav-cta-btn">
              {isEn ? 'Get a quote' : 'Wycena'}
            </Link>

            <PaperPlaneButton
              onClick={() => setBriefOpen(true)}
              className="nav-cta-btn"
              style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 99, padding: '.6em 1.3em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '.85'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              {isEn ? 'Start a project' : 'Rozpocznij projekt'}
            </PaperPlaneButton>

            {/* Burger */}
            <button className="nav-burger" onClick={toggleMenu} aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
              style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: '10px 9px' }}>
              <span style={{ display: 'block', width: '100%', height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'transform .25s', transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: '100%', height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'opacity .25s', opacity: isOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '100%', height: 2, background: 'var(--ink)', borderRadius: 2, transition: 'transform .25s', transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      <QuoteModal isOpen={briefOpen} onClose={() => setBriefOpen(false)} />
    </>
  );
}