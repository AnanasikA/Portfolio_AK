'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface HeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

/* --- Modal w portalu --- */
function BriefModal({
  open,
  onClose,
  nameRef,
}: {
  open: boolean;
  onClose: () => void;
  // ✅ zgodny typ z useRef(null)
  nameRef: React.MutableRefObject<HTMLInputElement | null>;
}) {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(e) => { if (e.currentTarget === e.target) onClose(); }}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="brief-modal-title"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            className="bg-white text-gray-900 rounded-3xl w-full max-w-2xl p-8 relative shadow-xl"
          >
            <button onClick={onClose} aria-label="Zamknij formularz"
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition">
              <FiX className="text-2xl" />
            </button>

            <h3 id="brief-modal-title" className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Libre Baskerville, serif' }}>
              Krótkie zapytanie ofertowe
            </h3>

            <form action="https://formsubmit.co/kontakt@anastasiiakupriianets.pl" method="POST" className="space-y-4">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nowe zapytanie o wycenę" />

              <div>
                <label className="block mb-1 text-sm font-medium">Imię i nazwisko</label>
                <input
                  ref={nameRef}
                  type="text"
                  name="Imię i nazwisko"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input type="email" name="Email" required className="w-full border border-gray-300 rounded-lg px-4 py-2" autoComplete="email" />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Rodzaj strony</label>
                <select name="Rodzaj strony" required className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue="">
                  <option value="" disabled>Wybierz...</option>
                  <option value="Strona wizytówka / Landing Page">Strona wizytówka / Landing Page</option>
                  <option value="Rozbudowana strona firmowa">Rozbudowana strona firmowa</option>
                </select>
              </div>

              <div>
                <span className="block mb-1 text-sm font-medium">Czy masz logo?</span>
                <div className="flex gap-6 mt-1">
                  <label className="flex items-center gap-2"><input type="radio" name="Logo" value="Tak" required /> Tak</label>
                  <label className="flex items-center gap-2"><input type="radio" name="Logo" value="Nie" /> Nie</label>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Budżet</label>
                <select name="Budżet" required className="w-full border border-gray-300 rounded-lg px-4 py-2" defaultValue="">
                  <option value="" disabled>Wybierz...</option>
                  <option value="1500–3000 zł">1500–3000 zł</option>
                  <option value="3000–5000 zł">3000–5000 zł</option>
                  <option value="5000+ zł">5000+ zł</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Opis projektu</label>
                <textarea name="Opis projektu" rows={4} required className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-[#007aff] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#005fcc] transition">
                  Wyślij brief
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Header({ isOpen, toggleMenu }: HeaderProps) {
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  // ✅ zgodnie z typem w BriefModal
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsBriefOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isBriefOpen) {
      setTimeout(() => nameRef.current?.focus(), 0);
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }
    return () => document.body.classList.remove('is-locked');
  }, [isBriefOpen]);

  const linkBase =
    'relative group inline-flex items-center py-1.5 md:py-2 ' +
    'text-[#0a1d3e] transition-colors duration-300 ' +
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full " +
    'after:origin-left after:scale-x-0 after:bg-[#ff7aac] after:transition-transform after:duration-300 ' +
    'hover:text-[#ff7aac] hover:after:scale-x-100 focus-visible:after:scale-x-100';

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 w-full flex items-center justify-between z-50 bg-[#D4E6FF]/20 backdrop-blur-md shadow-sm px-4 py-3"
      >
        {/* Logo */}
        <Link href="/" aria-label="Strona główna">
          <Image
            src="/logo.png"
            alt="Anastasiia Kupriianets logo"
            width={60}
            height={40}
            priority
            className="w-14 sm:w-16 h-auto"
          />
        </Link>

        {/* Nawigacja desktop + CTA */}
        <nav
          className="
            hidden md:flex items-center
            gap-8 lg:gap-10 xl:gap-12
            text-[16px] md:text-[18px] lg:text-[20px] xl:text-[21px] 2xl:text-[22px]
            font-medium tracking-tight
          "
          style={{ fontFamily: 'Libre Baskerville, serif' }}
          aria-label="Główna nawigacja"
        >
          <Link href="#start" className={linkBase}>Start</Link>
          <Link href="#how" className={linkBase}>Jak działam</Link>
          <Link href="/projects" className={linkBase}>Projekty</Link>
          <Link href="#pricing" className={linkBase}>Cennik</Link>
          <Link href="#contact" className={linkBase}>Kontakt</Link>

          {/* CTA – cieńsza czcionka + niebieski brand */}
         <button
  type="button"
  onClick={() => setIsBriefOpen(true)}
  aria-haspopup="dialog"
  aria-controls="brief-modal"
  className="
    ml-2 inline-flex items-center rounded-full
    bg-transparent text-white border-2 border-white
    px-5 py-2.5 md:px-6 md:py-2.5 lg:px-7 lg:py-3
    text-base md:text-lg lg:text-xl leading-none
    font-light tracking-wide shadow-sm
    hover:bg-white/10 active:scale-[0.99]
    transition focus:outline-none
    focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]
  "
  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
>
  Wyceń projekt
</button>

        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          className="md:hidden p-2"
        >
          <Image
            src="/menu-icon.png"
            alt="Menu"
            width={28}
            height={28}
            className={`w-7 h-7 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
      </header>

      {/* Modal w BODY */}
      <BriefModal open={isBriefOpen} onClose={() => setIsBriefOpen(false)} nameRef={nameRef} />
    </>
  );
}
