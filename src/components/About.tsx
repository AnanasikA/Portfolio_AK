'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FiX, FiMail, FiArrowRight, FiCalendar, FiCheck } from 'react-icons/fi';

export default function About() {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => nameRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const steps = [
    { step: '1', title: 'Kontakt', text: 'Napisz do mnie lub wypełnij formularz. Odpowiem szybko i konkretnie.' },
    { step: '2', title: 'Rozmowa i brief', text: 'Omówimy, czego potrzebujesz i jaką stronę chcesz stworzyć.' },
    { step: '3', title: 'Projekt UX/UI', text: 'Zaproponuję estetyczny i funkcjonalny design dopasowany do Twojej marki.' },
    { step: '4', title: 'Kodowanie', text: 'Zamieniam projekt w działającą stronę przy użyciu Next.js i Tailwind CSS.' },
    { step: '5', title: 'Testy i poprawki', text: 'Sprawdzam responsywność, szybkość, formularze i wygodę użytkowania.' },
    { step: '6', title: 'Wdrożenie i wsparcie', text: 'Publikuję stronę, pomagam z domeną i oferuję dalsze wsparcie.' },
  ];

  return (
    <>
      <section
        id="how"
        aria-labelledby="how-heading"
        itemScope
        itemType="https://schema.org/HowTo"
        className="w-full min-h-screen overflow-hidden bg-[#007aff]"
      >
        <meta itemProp="name" content="Jak pracuję nad Twoją stroną internetową" />

        <div className="grid lg:grid-cols-2 items-stretch">
          {/* OBRAZ */}
          <div className="order-2 lg:order-1 relative px-6 sm:px-10 pb-16 lg:pb-0">
            <div className="relative w-full h-[42vh] sm:h-[52vh] md:h-[58vh] lg:h-full rounded-2xl overflow-hidden">
              <Image
                src="/about-illustration.webp"
                alt="Proces tworzenia strony: od kontaktu, przez projekt, po wdrożenie"
                fill
                className="object-contain p-6 sm:p-8 lg:p-10"
                sizes="(min-width:1024px) 50vw, 100vw"
                itemProp="image"
              />
            </div>
          </div>

          {/* TEKST */}
          <div className="order-1 lg:order-2 text-white flex items-center justify-center px-6 sm:px-10 pt-16 sm:pt-20 pb-10 lg:py-20">
            <div className="max-w-2xl">
              <motion.h2
                id="how-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-light mb-6 font-serif"
              >
                Freelancer to nie agencja. <br /> Tu każdy etap ma sens.
              </motion.h2>

              <motion.p
                itemProp="description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-[#eaf6ff] font-light mb-12"
              >
                Poniżej znajdziesz konkretny, uporządkowany proces – od pierwszego kontaktu po publikację strony.
              </motion.p>

              <ol className="relative border-l-2 border-white/40 pl-6 space-y-10 mb-0" itemProp="step">
                {steps.map((item, index) => (
                  <motion.li
                    key={index}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/HowToStep"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#007aff] font-bold text-lg shadow">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-white mb-1" itemProp="name">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#eaf6ff] font-light" itemProp="text">
                        {item.text}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* CTA na końcu sekcji – minimalistyczny outline */}
        <div className="px-6 sm:px-10 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-controls="brief-modal"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-light
                           bg-transparent text-white border border-white/70
                           hover:bg-white/10 active:scale-[0.99]
                           transition focus:outline-none
                           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]"
              >
                Zacznijmy współpracę
                <FiArrowRight className="opacity-90" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* === MODAL (minimal) === */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4"
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setOpen(false);
                }}
              >
                <motion.div
                  key="modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="brief-modal-title"
                  aria-describedby="brief-modal-desc"
                  id="brief-modal"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="w-full max-w-2xl rounded-2xl bg-white text-[#0f172a] shadow-lg border border-slate-200"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {/* Header prosty */}
                  <div className="flex items-start gap-3 px-6 pt-5 pb-3 border-b border-slate-200">
                    <div className="shrink-0 mt-0.5 rounded-lg bg-[#007aff]/10 p-2">
                      <FiMail className="w-5 h-5 text-[#007aff]" />
                    </div>
                    <div className="flex-1">
                      <h3 id="brief-modal-title" className="text-xl sm:text-2xl font-serif font-light leading-snug">
                        Zacznijmy od krótkiego briefu
                      </h3>
                      <p id="brief-modal-desc" className="text-sm text-slate-600 mt-1">
                        Napisz w 2–3 zdaniach, jaką stronę potrzebujesz i jaki cel ma spełniać. Odpowiem
                        ze wstępną wyceną i proponowanym terminem.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {['Bezpłatna konsultacja', 'Wstępna wycena', 'Proponowany termin'].map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                          >
                            <FiCheck className="w-4 h-4 text-emerald-600" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      aria-label="Zamknij"
                      onClick={() => setOpen(false)}
                      className="rounded-full p-2 hover:bg-slate-100"
                    >
                      <FiX className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>

                  {/* Formularz */}
                  <div className="px-6 pb-6 pt-4">
                    <form
                      action="https://formsubmit.co/kontakt@anastasiiakupriianets.pl"
                      method="POST"
                      target="_blank"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {/* FormSubmit config */}
                      <input type="hidden" name="_subject" value="Nowe zapytanie (Modal brief)" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />

                      <div className="col-span-1">
                        <label className="block text-xs text-slate-600 mb-1">Imię</label>
                        <input
                          ref={nameRef}
                          type="text"
                          name="name"
                          required
                          placeholder="Twoje imię"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                     focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-xs text-slate-600 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="np. jan@firma.pl"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                     focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-xs text-slate-600 mb-1">Budżet (orientacyjnie)</label>
                        <select
                          name="budget"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                     focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Wybierz zakres
                          </option>
                          <option>do 2 000 zł</option>
                          <option>2 000–4 000 zł</option>
                          <option>4 000–8 000 zł</option>
                          <option>powyżej 8 000 zł</option>
                          <option>nie wiem / zależy</option>
                        </select>
                      </div>

                      <div className="col-span-1">
                        <label className="block text-xs text-slate-600 mb-1">Termin</label>
                        <div className="relative">
                          <FiCalendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <select
                            name="timeline"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-9 text-sm outline-none
                                       focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Wybierz termin
                            </option>
                            <option>jak najszybciej</option>
                            <option>2–4 tygodnie</option>
                            <option>1–2 miesiące</option>
                            <option>nie mam sztywnego terminu</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-1 sm:col-span-2">
                        <label className="block text-xs text-slate-600 mb-1">Opis projektu</label>
                        <textarea
                          name="message"
                          required
                          placeholder="Krótko opisz projekt (typ strony, 2–3 kluczowe funkcje, inspiracje)"
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 h-28 text-sm outline-none
                                     focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                        />
                      </div>

                      <div className="col-span-1 sm:col-span-2 flex items-start gap-2">
                        <input id="consent" name="consent" type="checkbox" required className="mt-0.5" />
                        <label htmlFor="consent" className="text-xs text-slate-600">
                          Zgadzam się na kontakt w sprawie mojego zapytania. Więcej w{' '}
                          <a href="/polityka-prywatnosci" className="underline hover:no-underline text-slate-700">
                            Polityce prywatności
                          </a>
                          .
                        </label>
                      </div>

                      <div className="col-span-1 sm:col-span-2 mt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-light text-white
                                     active:scale-[0.99] transition"
                          style={{ backgroundColor: '#007aff' }}
                        >
                          Wyślij brief
                          <FiArrowRight className="opacity-90" />
                        </button>

                        <a
                          href="mailto:kontakt@anastasiiakupriianets.pl"
                          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <FiMail />
                          Wyślij maila
                        </a>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
