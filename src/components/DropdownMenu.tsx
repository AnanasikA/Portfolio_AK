'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface Props { isOpen: boolean; toggleMenu: () => void; }

export default function DropdownMenu({ isOpen, toggleMenu }: Props) {
  const locale = useLocale();
  const isEn = locale === 'en';

  const links = [
    { href: '/',          label: isEn ? 'Home'       : 'Start'        },
    { href: '/projects',  label: isEn ? 'Work'       : 'Projekty'     },
    { href: '/#process',  label: isEn ? 'Process'    : 'Proces'       },
    { href: '/#why-us',   label: isEn ? 'Why us'     : 'Dlaczego my'  },
    { href: '/blog',      label: 'Blog'                               },
    { href: '/#contact',  label: isEn ? 'Contact'    : 'Kontakt'      },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleMenu}
            style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(4px)' }}
          />

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
            {/* top row */}
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

            {/* links */}
            <nav style={{ flex: 1, overflowY: 'auto' }}>
              {links.map(({ href, label }, i) => (
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
            </nav>

            {/* bottom */}
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