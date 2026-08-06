'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface Props { isOpen: boolean; toggleMenu: () => void; }

const SERVICE_LINKS_PL = [
  { href: '/services/tworzenie-stron-internetowych', label: 'Tworzenie stron' },
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
  { href: '/services/tworzenie-stron-internetowych', label: 'Website Development' },
  { href: '/services/projektowanie-stron',           label: 'Web Design' },
  { href: '/services/strony-dla-firm',               label: 'Business Websites' },
  { href: '/services/wordpress',                     label: 'WordPress' },
  { href: '/services/landing-page',                  label: 'Landing Pages' },
  { href: '/services/sklepy-internetowe',            label: 'Online Stores' },
  { href: '/services/administracja-stron',           label: 'Website Administration' },
  { href: '/services/opieka-nad-stronami',           label: 'Website Care' },
  { href: '/services/modernizacja-stron',            label: 'Website Redesign' },
];

export default function DropdownMenu({ isOpen, toggleMenu }: Props) {
  const locale           = useLocale();
  const isEn             = locale === 'en';
  const [servOpen, setServOpen] = useState(false);

  const serviceLinks = isEn ? SERVICE_LINKS_EN : SERVICE_LINKS_PL;

  const links = [
    { href: '/',              label: isEn ? 'Home'        : 'Start'        },
    { href: '/projects',      label: isEn ? 'Work'        : 'Projekty'     },
    { href: '/#process',      label: isEn ? 'Process'     : 'Proces'       },
    { href: '/#why-us',       label: isEn ? 'Why us'      : 'Dlaczego my'  },
    // Usługi accordion wchodzi po tym — renderowane osobno
    { href: '/blog',          label: 'Blog'                                },
    { href: '/partners/offer',label: isEn ? 'Partnership' : 'Współpraca'   },
    { href: '/#contact',      label: isEn ? 'Contact'     : 'Kontakt'     },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleMenu}
            style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(4px)' }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed', right: 0, top: 0, zIndex: 95,
              height: '100%', width: '100%', maxWidth: 360,
              display: 'flex', flexDirection: 'column',
              background: 'linear-gradient(160deg,#1d4ed8 0%,#16308f 100%)',
              padding: '20px 24px 32px',
              boxSizing: 'border-box',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem', color: '#fff', letterSpacing: '-.01em' }}>
                AK Web & Design
              </span>
              <button
                onClick={toggleMenu}
                aria-label="Zamknij menu"
                style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem', flexShrink: 0 }}>
                ✕
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, overflowY: 'auto' }}>

              {/* Start, Projekty, Proces, Dlaczego my */}
              {links.slice(0, 4).map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={href}
                    onClick={toggleMenu}
                    style={{ display: 'block', padding: '15px 4px', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '1.25rem', color: 'rgba(255,255,255,.88)', letterSpacing: '-.01em', borderBottom: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Usługi — accordion */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 4 * 0.05 + 0.1 }}
              >
                {/* Trigger */}
                <button
                  onClick={() => setServOpen(v => !v)}
                  style={{
                    width:       '100%',
                    display:     'flex',
                    alignItems:  'center',
                    justifyContent: 'space-between',
                    padding:     '15px 4px',
                    fontFamily:  'var(--fd)',
                    fontWeight:  600,
                    fontSize:    '1.25rem',
                    color:       'rgba(255,255,255,.88)',
                    letterSpacing: '-.01em',
                    borderBottom: '1px solid rgba(255,255,255,.1)',
                    background:  'transparent',
                    border:      'none',
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'rgba(255,255,255,.1)',
                    cursor:      'pointer',
                    textAlign:   'left',
                  }}
                  aria-expanded={servOpen}
                >
                  {isEn ? 'Services' : 'Usługi'}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ transition: 'transform .25s', transform: servOpen ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
                  >
                    <path d="M3 6L8 11L13 6" stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Accordion body */}
                <AnimatePresence>
                  {servOpen && (
                    <motion.div
                      key="services-list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingLeft: 12, paddingBottom: 4, paddingTop: 4 }}>
                        {serviceLinks.map(({ href, label }, i) => (
                          <motion.div
                            key={href}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                          >
                            <Link
                              href={href}
                              onClick={toggleMenu}
                              style={{
                                display:     'block',
                                padding:     '11px 4px',
                                fontFamily:  'var(--fd)',
                                fontWeight:  500,
                                fontSize:    '1rem',
                                color:       'rgba(255,255,255,.72)',
                                letterSpacing: '-.01em',
                                borderBottom: '1px solid rgba(255,255,255,.07)',
                                textDecoration: 'none',
                                transition:  'color .15s',
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.72)')}
                            >
                              {label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Blog, Współpraca, Kontakt */}
              {links.slice(4).map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (5 + i) * 0.05 + 0.1 }}
                >
                  <Link
                    href={href}
                    onClick={toggleMenu}
                    style={{ display: 'block', padding: '15px 4px', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '1.25rem', color: 'rgba(255,255,255,.88)', letterSpacing: '-.01em', borderBottom: '1px solid rgba(255,255,255,.1)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </motion.div>
              ))}

            </nav>
            <div style={{ marginTop: 32, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => { toggleMenu(); window.dispatchEvent(new Event('open-brief')); }}
                style={{ width: '100%', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '1rem', background: '#fff', color: 'var(--brand)', borderRadius: 99, padding: '.85em 1.5em', border: 'none', cursor: 'pointer', transition: 'opacity .2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                {isEn ? 'Start a project' : 'Rozpocznij projekt'}
              </button>

              <Link
                href="/wycena"
                locale={locale}
                onClick={toggleMenu}
                style={{ width: '100%', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '1rem', background: 'transparent', color: '#fff', borderRadius: 99, padding: '.85em 1.5em', border: '1.5px solid rgba(255,255,255,.4)', cursor: 'pointer', textDecoration: 'none', textAlign: 'center', display: 'block', transition: 'background .18s, border-color .18s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,.12)'; el.style.borderColor = 'rgba(255,255,255,.7)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(255,255,255,.4)'; }}>
                {isEn ? 'Get a quote' : 'Wycena'}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}