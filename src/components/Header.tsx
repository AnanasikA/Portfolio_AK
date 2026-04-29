'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const ICON_FALLBACK = '/icons/placeholder.webp';

/* ---------------- Modal briefu ---------------- */
function BriefModal({
  open,
  onClose,
  nameRef,
}: {
  open: boolean;
  onClose: () => void;
  nameRef: React.MutableRefObject<HTMLInputElement | null>;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const locale = useLocale();
  
  const isEn = locale === 'en';

  if (typeof window === 'undefined') return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('_captcha', 'false');
    fd.set(
      '_subject',
      isEn ? 'New quote request from portfolio brief' : 'Nowe zapytanie o wycenę z briefu'
    );

    try {
      const res = await fetch('https://formsubmit.co/ajax/kontakt@anastasiiakupriianets.pl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

form.reset();
window.location.href = isEn ? '/en/thank-you' : '/thank-you';

    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? `Ups… ${err.message}`
          : isEn
            ? 'Oops… something went wrong. Please try again in a moment.'
            : 'Ups… nie udało się wysłać. Spróbuj ponownie za chwilę.'
      );
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1220]/55 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brief-modal-title"
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl rounded-[28px] bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.22)] sm:p-8"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label={isEn ? 'Close form' : 'Zamknij formularz'}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f7ff] text-slate-600 transition hover:bg-[#e8f0ff] hover:text-slate-900"
            >
              <FiX className="text-xl" />
            </button>

            {status === 'sent' ? (
              <div className="py-10 text-center">
                <p className="mb-3 inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-medium text-[#007aff]"
                   style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                >
                  {isEn ? 'Quote request sent' : 'Zapytanie wysłane'}
                </p>

                <h3
                  className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                >
                  {isEn ? 'Thank you!' : 'Dziękuję!'}
                </h3>

                <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-6 text-slate-600 sm:text-base"
                   style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                >
                  {isEn
                    ? 'Your request has been sent successfully. I will get back to you within 24 hours.'
                    : 'Twoje zapytanie zostało wysłane. Wrócę do Ciebie z odpowiedzią w ciągu 24 godzin.'}
                </p>

                <button
                  onClick={onClose}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                  className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#007aff] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#006ae0]"
                >
                  {isEn ? 'Close' : 'Zamknij'}
                </button>
              </div>
            ) : (
              <>
                <div className="max-w-xl">
                  <p className="mb-3 inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-medium text-[#007aff]"
                     style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                  >
                    {isEn ? 'Free quote' : 'Bezpłatna wycena'}
                  </p>

                  <h3
                    id="brief-modal-title"
                    className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-3xl"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {isEn ? 'Tell me about your project' : 'Opowiedz mi o swoim projekcie'}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base"
                     style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                  >
                    {isEn
                      ? 'Fill out a short brief and I will get back to you with an initial scope, timeline, and estimate.'
                      : 'Wypełnij krótki brief, a wrócę do Ciebie z wstępnym zakresem, terminem i orientacyjną wyceną.'}
                  </p>
                </div>

                {status === 'error' && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" style={{ fontFamily: 'Inter, system-ui, sans-serif'}}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_subject"
                    value={isEn ? 'New quote request from portfolio' : 'Nowe zapytanie o wycenę'}
                  />
                  <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800"
                             style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      >
                        {isEn ? 'Full name' : 'Imię i nazwisko'}
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        name="Imię i nazwisko"
                        required
                        autoComplete="name"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                        placeholder={isEn ? 'Your full name' : 'Twoje imię i nazwisko'}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="Email"
                        required
                        autoComplete="email"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                        placeholder={isEn ? 'your@email.com' : 'twoj@email.com'}
                        style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800"
                             style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      >
                        {isEn ? 'Type of website' : 'Rodzaj strony'}
                      </label>
                      <select
                        name="Rodzaj strony"
                        required
                        defaultValue=""
                        style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                      >
                        <option value="" disabled>
                          {isEn ? 'Choose...' : 'Wybierz...'}
                        </option>
                        <option value="Landing page">
                          {isEn ? 'Landing page' : 'Landing page'}
                        </option>
                        <option value="Strona firmowa">
                          {isEn ? 'Company website' : 'Strona firmowa'}
                        </option>
                        <option value="Portfolio">
                          {isEn ? 'Portfolio' : 'Portfolio'}
                        </option>
                        <option value="Redesign">
                          {isEn ? 'Redesign' : 'Redesign'}
                        </option>
                        <option value="Nie wiem jeszcze">
                          {isEn ? "I'm not sure yet" : 'Nie wiem jeszcze'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800"
                             style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      >
                        {isEn ? 'Budget' : 'Budżet'}
                      </label>
                      <select
                        name="Budżet"
                        required
                        defaultValue=""
                        style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                      >
                        <option value="" disabled>
                          {isEn ? 'Choose...' : 'Wybierz...'}
                        </option>
                        <option value="1500–3000 zł">1500–3000 zł</option>
                        <option value="3000–5000 zł">3000–5000 zł</option>
                        <option value="5000+ zł">5000+ zł</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800"
                           style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                    >
                      {isEn ? 'Do you have a logo?' : 'Czy masz logo?'}
                    </label>
                    <select
                      name="Logo"
                      required
                      defaultValue=""
                      style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                    >
                      <option value="" disabled>
                        {isEn ? 'Choose...' : 'Wybierz...'}
                      </option>
                      <option value="Tak">{isEn ? 'Yes' : 'Tak'}</option>
                      <option value="Nie">{isEn ? 'No' : 'Nie'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800"
                           style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                    >
                      {isEn ? 'Project description' : 'Opis projektu'}
                    </label>
                    <textarea
                      name="Opis projektu"
                      rows={5}
                      required
                      style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                      placeholder={
                        isEn
                          ? 'Tell me briefly what kind of website you need, what the goal is, and what matters most to you.'
                          : 'Napisz krótko, jakiej strony potrzebujesz, jaki ma być jej cel i co jest dla Ciebie najważniejsze.'
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif'}}
                    className="mt-2 inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#007aff] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#006ae0] disabled:opacity-60"
                  >
                    {status === 'sending'
                      ? isEn
                        ? 'Sending...'
                        : 'Wysyłanie...'
                      : isEn
                        ? 'Send request'
                        : 'Wyślij zapytanie'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---------------- Przełącznik języka ---------------- */
function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const cleanPath = pathname.replace(/^\/(pl|en)(?=\/|$)/, '') || '/';

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/25 bg-white/5 px-1.5 py-1 backdrop-blur-sm">
      <Link
        href={cleanPath}
        locale="pl"
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase transition-colors sm:text-xs ${
          locale === 'pl'
            ? 'bg-white text-[#007aff]'
            : 'text-white/75 hover:text-white'
        }`}
      >
        PL
      </Link>

      <Link
        href={cleanPath}
        locale="en"
        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase transition-colors sm:text-xs ${
          locale === 'en'
            ? 'bg-white text-[#007aff]'
            : 'text-white/75 hover:text-white'
        }`}
      >
        EN
      </Link>
    </div>
  );
}

/* ---------------- Header ---------------- */
export default function Header({ isOpen, toggleMenu }: HeaderProps) {
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const locale = useLocale();
  const isEn = locale === 'en';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsBriefOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isBriefOpen) {
      setTimeout(() => nameRef.current?.focus(), 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isBriefOpen]);

  useEffect(() => {
    const open = () => setIsBriefOpen(true);
    window.addEventListener('open-brief', open);
    return () => window.removeEventListener('open-brief', open);
  }, []);

  const linkBase =
    "relative inline-flex items-center py-1.5 text-white/88 transition-colors duration-300 " +
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full " +
    'after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 ' +
    'hover:text-white hover:after:scale-x-100 focus-visible:text-white focus-visible:after:scale-x-100';

  return (
    <>
      <header
        role="banner"
        className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[rgba(0,122,255,0.65)] px-4 py-3 backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
          <Link href="/" aria-label={isEn ? 'Home' : 'Strona główna'} className="shrink-0">
            <Image
              src="/icons/logo.webp"
              alt="Anastasiia Kupriianets logo"
              width={64}
              height={42}
              priority
              className="h-auto w-14 sm:w-16"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                if (!t.src.endsWith(ICON_FALLBACK)) t.src = ICON_FALLBACK;
              }}
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium tracking-tight"
            style={{ fontFamily: 'Libre Baskerville, serif' }}
            aria-label={isEn ? 'Primary navigation' : 'Główna nawigacja strony'}
          >
            <Link href="/" className={linkBase}>
              {isEn ? 'Home' : 'Start'}
            </Link>

            <Link href="/projects" className={linkBase}>
              {isEn ? 'Work' : 'Projekty'}
            </Link>

            <Link href="/#pricing" className={linkBase}>
              {isEn ? 'Pricing' : 'Cennik'}
            </Link>

            <Link href="/#faq" className={linkBase}>
              FAQ
            </Link>

            <Link href="/#contact" className={linkBase}>
              {isEn ? 'Contact' : 'Kontakt'}
            </Link>

            <LangSwitcher />

            <button
              type="button"
              onClick={() => setIsBriefOpen(true)}
              aria-haspopup="dialog"
              className="ml-2 inline-flex min-h-[46px] items-center rounded-full border border-white/35 bg-white/8 px-5 py-2.5 text-sm font-medium leading-none text-white shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/14 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 xl:px-6"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {isEn ? 'Request a quote' : 'Zapytaj o wycenę'}
            </button>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <LangSwitcher />

            <button
              type="button"
              onClick={() => setIsBriefOpen(true)}
              className="hidden sm:inline-flex min-h-[42px] items-center rounded-full border border-white/30 bg-white/8 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/12"
            >
              {isEn ? 'Quote' : 'Wycena'}
            </button>

            <button
              onClick={toggleMenu}
              aria-label={
                isOpen
                  ? isEn
                    ? 'Close menu'
                    : 'Zamknij menu'
                  : isEn
                    ? 'Open menu'
                    : 'Otwórz menu'
              }
              aria-expanded={isOpen}
              aria-controls="main-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/8 backdrop-blur-sm transition hover:bg-white/12"
            >
              <Image
                src="/icons/menu-icon.webp"
                alt="Menu"
                width={28}
                height={28}
                className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  if (!t.src.endsWith(ICON_FALLBACK)) t.src = ICON_FALLBACK;
                }}
              />
            </button>
          </div>
        </div>
      </header>

      <BriefModal
        open={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        nameRef={nameRef}
      />
    </>
  );
}