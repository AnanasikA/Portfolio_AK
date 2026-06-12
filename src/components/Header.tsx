'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import PaperPlaneButton from '@/components/PaperPlane';
import dynamic from 'next/dynamic';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'), { ssr: false });
const DropdownMenu = dynamic(() => import('@/components/DropdownMenu'), { ssr: false });

interface HeaderProps { isOpen: boolean; toggleMenu: () => void; }

function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const clean = pathname.replace(/^\/(pl|en)(?=\/|$)/, '') || '/';
  return (
    <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 99, padding: 3, gap: 2 }}>
      {(['pl', 'en'] as const).map(l => (
        <Link key={l} href={clean} locale={l}
          style={{ display: 'block', padding: '4px 10px', borderRadius: 99, fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', textDecoration: 'none', background: locale === l ? '#fff' : 'transparent', color: locale === l ? 'var(--brand)' : 'var(--muted-2)', boxShadow: locale === l ? '0 1px 4px rgba(0,0,0,.08)' : 'none', transition: 'all .2s' }}>
          {l}
        </Link>
      ))}
    </div>
  );
}

export default function Header({ isOpen, toggleMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const locale = useLocale();
  const isEn = locale === 'en';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (briefOpen) document.body.classList.add('is-locked');
    else document.body.classList.remove('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, [briefOpen]);

  useEffect(() => {
    const open = () => setBriefOpen(true);
    window.addEventListener('open-brief', open);
    return () => window.removeEventListener('open-brief', open);
  }, []);

  const links = [
    { href: '/projects',  label: isEn ? 'Work'      : 'Projekty'    },
    { href: '/#process',  label: isEn ? 'Process'   : 'Proces'      },
    { href: '/#why-us',   label: isEn ? 'Why us'    : 'Dlaczego my' },
    { href: '/blog',      label: 'Blog'                              },
    { href: '/#contact',  label: isEn ? 'Contact'   : 'Kontakt'     },
  ];

  return (
    <>
      <style>{`
        .nav-links    { display: flex !important; align-items: center; gap: 2px; }
        .nav-cta-btn  { display: inline-flex !important; }
        .nav-burger   { display: none !important; }
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
          transition: background .18s, color .18s, border-color .18s;
        }
        .nav-quote-btn:hover {
          background: var(--brand);
          color: #fff;
          border-color: var(--brand);
        }
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
            {links.map(({ href, label }) => (
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

            <PaperPlaneButton
              onClick={() => setBriefOpen(true)}
              className="nav-cta-btn"
              style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 99, padding: '.6em 1.3em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity .2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '.85'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              {isEn ? 'Start a project' : 'Rozpocznij projekt'}
            </PaperPlaneButton>

            <Link
              href="/wycena"
              locale={locale}
              className="nav-quote-btn nav-cta-btn"
            >
              {isEn ? 'Get a quote' : 'Wycena'}
            </Link>

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