'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

interface DropdownMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const ICON_FALLBACK = '/icons/placeholder.webp';

export default function DropdownMenu({ isOpen, toggleMenu }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState<string>(
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  const t = useTranslations('dropdownMenu');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleMenu();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, toggleMenu]);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, x: 36 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      x: 36,
      transition: {
        duration: 0.22,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  };

  const links = [
    { name: t('home'), path: '/' },
    { name: t('process'), path: '#process' },
    { name: t('projects'), path: '/projects' },
    { name: t('pricing'), path: '#pricing' },
    { name: t('blog'), path: '/blog' }

  ];

  const scrollToHash = (h: string) => {
    const id = h.replace(/^#/, '');
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    history.replaceState(null, '', `#${id}`);
    setHash(`#${id}`);
  };

  const handleClick = (route: string) => {
    toggleMenu();

    if (route.startsWith('#')) {
      const id = route.slice(1);

      if (pathname !== '/') {
        router.push(`/#${id}`);
      } else {
        setTimeout(() => {
          scrollToHash(route);
        }, 50);
      }

      return;
    }

    router.push(route);
  };

  const linkBase =
    "group relative inline-flex items-center text-right text-white/88 transition duration-300 " +
    "after:content-[''] after:absolute after:right-0 after:-bottom-1 after:h-[2px] after:w-full " +
    "after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 " +
    'hover:text-white hover:after:scale-x-100';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-[#07152f]/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('menuAria')}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-[92vw] flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(0,122,255,0.94)_0%,rgba(0,104,221,0.96)_100%)] px-6 pb-8 pt-24 shadow-2xl backdrop-blur-xl sm:max-w-[420px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_22%)]" />

            <button
              onClick={toggleMenu}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/16"
              aria-label={t('closeAria')}
            >
              <Image
                src="/icons/close-icon.webp"
                alt="Zamknij"
                width={20}
                height={20}
                loading="lazy"
                className="h-5 w-5"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  if (!t.src.endsWith(ICON_FALLBACK)) t.src = ICON_FALLBACK;
                }}
              />
            </button>

            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="relative z-10 flex flex-col items-end gap-5"
            >
              {links.map((link, i) => {
                const isHash = link.path.startsWith('#');
                const isActive = isHash ? hash === link.path : pathname === link.path;

                return (
                  <motion.li
                    key={link.name}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.25 }}
                  >
                    <button
                      onClick={() => handleClick(link.path)}
                      className={`${linkBase} ${
                        isActive ? 'text-white after:scale-x-100' : ''
                      }`}
                      style={{
                        fontFamily: 'Libre Baskerville, serif',
                        fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {link.name}
                    </button>
                  </motion.li>
                );
              })}

              <li className="pt-4">
                <button
                  onClick={() => {
                    toggleMenu();
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-brief'));
                    }
                  }}
                  className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#007aff] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:bg-[#eef6ff]"
                  aria-label={t('ctaAria')}
                >
                  {t('cta')}
                </button>
              </li>
            </motion.ul>

            <div className="relative z-10 mt-auto pt-10 text-right text-sm text-white/65">
              <p>{t('smallText')}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}