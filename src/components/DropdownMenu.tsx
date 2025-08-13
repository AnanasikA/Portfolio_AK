'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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

  // ESC + klik poza
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && toggleMenu();
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) toggleMenu();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  // śledzenie #hash (dla podświetlenia aktywnego)
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const links = [
    { name: 'Start', path: '/' },
    { name: 'Jak działam', path: '#how' },
    { name: 'Projekty', path: '/projects' },
    { name: 'Cennik', path: '#pricing' },
    { name: 'Kontakt', path: '#contact' },
  ];

  const scrollToHash = (h: string) => {
    const id = h.replace(/^#/, '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    setHash(`#${id}`);
  };

  const handleClick = (route: string) => {
    toggleMenu();

    // link do sekcji
    if (route.startsWith('#')) {
      const id = route.slice(1);
      if (pathname !== '/') {
        // Przejście na stronę główną z kotwicą (twój HashScroller to przechwyci i przewinie)
        router.push(`/#${id}`);
      } else {
        scrollToHash(route);
      }
      return;
    }

    // zwykła nawigacja
    router.push(route);
  };

  const linkBase =
    "relative group inline-flex items-center text-right " +
    "text-[#0a1d3e] transition-colors duration-300 font-normal " +
    "after:content-[''] after:absolute after:right-0 after:-bottom-1 after:h-[1.5px] after:w-0 " +
    "after:bg-[#ff7aac] after:transition-all after:duration-300 " +
    "hover:text-[#ff7aac] hover:after:w-full";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu nawigacyjne"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="
            fixed top-0 right-0 h-full w-full sm:w-[70%] md:w-[50%] lg:w-[40%]
            bg-white/20 supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:backdrop-blur-sm
            shadow-2xl border-l border-[#99CCFF]/40 z-50 px-6 pt-16 pb-8
          "
        >
          {/* Zamknij */}
          <button
            onClick={toggleMenu}
            className="absolute top-3.5 right-5 p-1.5 rounded-full hover:bg-white/40 transition"
            aria-label="Zamknij menu"
          >
            <Image
              src="/icons/close-icon.webp"
              alt="Zamknij"
              width={24}
              height={24}
              loading="lazy"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                if (!t.src.endsWith(ICON_FALLBACK)) t.src = ICON_FALLBACK;
              }}
            />
          </button>

          {/* Linki */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="flex flex-col items-end gap-5 mt-6"
          >
            {links.map((link, i) => {
              const isHash = link.path.startsWith('#');
              const isActive = isHash ? hash === link.path : pathname === link.path;

              return (
                <motion.li
                  key={link.name}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleClick(link.path)}
                    className={`${linkBase} ${isActive ? 'text-[#ff7aac] after:w-full' : ''}`}
                    style={{ fontSize: '18px', letterSpacing: '0.2px' }}
                  >
                    {link.name}
                  </button>
                </motion.li>
              );
            })}

            {/* CTA – biały przycisk, niebieski tekst */}
            <li className="pt-2">
              <button
                onClick={() => {
                  toggleMenu();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('open-brief'));
                  }
                }}
                className="
                  inline-flex items-center justify-center rounded-full
                  bg-white text-[#007aff] px-5 py-2 text-base font-light tracking-wide
                  hover:bg-[#f5faff] transition border border-[#007aff]/20
                "
                aria-label="Wyceń projekt"
              >
                Wyceń projekt
              </button>
            </li>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
