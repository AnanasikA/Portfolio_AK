'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  FiX,
  FiMail,
  FiArrowRight,
  FiCalendar,
  FiCheck,
} from 'react-icons/fi';
import { useLocale } from 'next-intl';


const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05, 
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const itemReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.98, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const modalOverlay = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const modalPanel = {
  hidden: { opacity: 0, y: 28, scale: 0.97, rotateX: 4 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 22,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: 'easeInOut' as const ,
    },
  },
};

export default function About() {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();
  const isEn = locale === 'en';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);

    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => nameRef.current?.focus(), 80);
    }

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-brief', handler as EventListener);
    return () =>
      window.removeEventListener('open-brief', handler as EventListener);
  }, []);

  const steps = isEn
    ? [
        {
          step: '01',
          title: 'Contact',
          text: 'Write to me or fill out the form. I will reply quickly and clearly.',
        },
        {
          step: '02',
          title: 'Brief & goals',
          text: 'We define what kind of website you need, what it should include and what result it should achieve.',
        },
        {
          step: '03',
          title: 'UX/UI concept',
          text: 'I prepare a clean, modern and brand-matched direction for your website.',
        },
        {
          step: '04',
          title: 'Build',
          text: 'I create the website in WordPress or Next.js with strong responsiveness and performance.',
        },
        {
          step: '05',
          title: 'Refinement',
          text: 'I test layout, content flow, forms and details to make the website feel polished.',
        },
        {
          step: '06',
          title: 'Launch',
          text: 'I publish the website and support you after launch if needed.',
        },
      ]
    : [
        {
          step: '01',
          title: 'Kontakt',
          text: 'Napisz do mnie lub wypełnij formularz. Odpowiem szybko i konkretnie.',
        },
        {
          step: '02',
          title: 'Brief i cele',
          text: 'Ustalamy, jakiej strony potrzebujesz, co ma zawierać i jaki efekt ma przynieść.',
        },
        {
          step: '03',
          title: 'Koncepcja UX/UI',
          text: 'Przygotowuję czysty, nowoczesny i dopasowany do marki kierunek strony.',
        },
        {
          step: '04',
          title: 'Realizacja',
          text: 'Tworzę stronę w WordPressie lub Next.js z naciskiem na responsywność i wydajność.',
        },
        {
          step: '05',
          title: 'Dopracowanie',
          text: 'Testuję układ, treści, formularze i detale, aby całość była spójna i dopracowana.',
        },
        {
          step: '06',
          title: 'Wdrożenie',
          text: 'Publikuję stronę i w razie potrzeby wspieram Cię także po starcie.',
        },
      ];

  return (
    <>
      <section
        id="about"
        aria-labelledby="about-heading"
        itemScope
        itemType="https://schema.org/Service"
        className="relative overflow-hidden bg-[#007aff] text-white"
      >
        <meta
          itemProp="name"
          content={
            isEn
              ? 'Website design and development process'
              : 'Proces projektowania i tworzenia stron internetowych'
          }
        />
        <meta
          itemProp="serviceType"
          content={
            isEn
              ? 'Web design and web development'
              : 'Projektowanie i tworzenie stron internetowych'
          }
        />
        <meta
          itemProp="description"
          content={
            isEn
              ? 'A structured process of creating websites for businesses: from first contact and brief to launch.'
              : 'Uporządkowany proces tworzenia stron internetowych dla firm: od pierwszego kontaktu i briefu po wdrożenie.'
          }
        />

        {/* background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_40%,#006bde_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.06),transparent_28%)]" />
        <div className="absolute left-[-10%] top-[8%] h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute bottom-[-10%] right-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl sm:h-[520px] sm:w-[520px]" />

        <div className="relative mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-12 lg:py-28 xl:px-16 xl:py-32 2xl:px-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-[820px] text-center"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-md"
            >
              {isEn ? 'How I work' : 'Jak pracuję'}
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              itemProp="headline"
              className="font-sans text-[2.1rem] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.9rem]"
            >
              {isEn
                ? 'A clear process. A modern website. No unnecessary chaos.'
                : 'Jasny proces. Nowoczesna strona. Bez zbędnego chaosu.'}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-[760px] text-[15px] leading-7 text-white/90 sm:mt-6 sm:text-[17px] sm:leading-8 md:text-lg"
            >
              {isEn
                ? 'I create websites for businesses in a simple and structured way — from first contact and brief, through design and development, to launch. This makes the whole collaboration smoother and more effective.'
                : 'Tworzę strony internetowe dla firm w prosty i uporządkowany sposób — od pierwszego kontaktu i briefu, przez projekt i realizację, aż po wdrożenie. Dzięki temu współpraca jest spokojniejsza, czytelniejsza i skuteczniejsza.'}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {(isEn
                ? ['WordPress + Next.js', 'Remote collaboration', 'Responsive websites']
                : ['WordPress + Next.js', 'Współpraca zdalna', 'Responsywne strony']
              ).map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/90 backdrop-blur-md sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:gap-5 xl:mt-20 xl:grid-cols-3"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            {steps.map((item, index) => (
              <motion.article
                key={item.step}
                variants={itemReveal}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="
                  group relative overflow-hidden rounded-[24px] border border-white/15
                  bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.08))]
                  p-5 backdrop-blur-xl transition-all duration-500
                  hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/[0.14]
                  sm:p-6 lg:min-h-[220px]
                "
              >
                <meta itemProp="position" content={String(index + 1)} />

                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -left-8 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/5" />

                <div
                  itemProp="item"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                  className="relative flex h-full flex-col"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm tracking-[0.22em] text-white/60">
                      {item.step}
                    </span>
                    <div className="h-px w-10 bg-gradient-to-r from-white/10 to-white/30" />
                  </div>

                  <h3
                    className="text-lg font-semibold text-white sm:text-xl"
                    itemProp="name"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-2 text-sm leading-6 text-white/85 sm:text-[15px] sm:leading-7"
                    itemProp="text"
                  >
                    {item.text}
                  </p>

                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-12 flex flex-col justify-center gap-3 sm:mt-14 sm:flex-row sm:gap-4"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="
                inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full
                bg-white px-6 py-3.5 text-sm font-medium text-[#007aff] shadow-lg
                transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(255,255,255,0.16)]
              "
            >
              {isEn ? 'Start with a brief' : 'Zacznij od briefu'}
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="#projects"
              className="
                inline-flex min-h-[52px] items-center justify-center rounded-full
                border border-white/40 px-6 py-3.5 text-sm font-medium backdrop-blur-sm
                transition duration-300 hover:-translate-y-0.5 hover:bg-white/10
              "
            >
              {isEn ? 'See projects' : 'Zobacz realizacje'}
            </a>
          </motion.div>
        </div>
      </section>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="overlay"
                variants={modalOverlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-3 sm:p-4"
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setOpen(false);
                }}
              >
                <motion.div
                  key="modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="brief-modal-title"
                  id="brief-modal"
                  variants={modalPanel}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="
                    relative w-full max-w-2xl overflow-hidden rounded-[24px]
                    border border-slate-200 bg-white text-[#0f172a] shadow-[0_30px_100px_rgba(0,0,0,0.22)]
                    max-h-[90vh] overflow-y-auto
                  "
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,122,255,0.08),transparent)] pointer-events-none" />

                  <div className="flex items-start gap-3 border-b border-slate-200 px-4 pb-3 pt-5 sm:px-6">
                    <div className="mt-0.5 shrink-0 rounded-xl bg-[#007aff]/10 p-2.5">
                      <FiMail className="h-5 w-5 text-[#007aff]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        id="brief-modal-title"
                        className="text-xl font-semibold leading-snug sm:text-2xl"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {isEn ? 'Start with a short brief' : 'Zacznijmy od krótkiego briefu'}
                      </h3>

                      <p
                        className="mt-1 text-sm leading-6 text-slate-600"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {isEn
                          ? 'Briefly describe what website you need and what goal it should serve. I will reply with an initial quote and proposed timeline.'
                          : 'Napisz w 2–3 zdaniach, jaką stronę potrzebujesz. Odpowiem ze wstępną wyceną i proponowanym terminem.'}
                      </p>

                      <div
                        className="mt-3 flex flex-wrap gap-2"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {(isEn
                          ? ['Free consultation', 'Initial quote', 'Proposed timeline']
                          : ['Bezpłatna konsultacja', 'Wstępna wycena', 'Proponowany termin']
                        ).map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                          >
                            <FiCheck className="h-4 w-4 text-emerald-600" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      aria-label={isEn ? 'Close' : 'Zamknij'}
                      onClick={() => setOpen(false)}
                      className="rounded-full p-2 transition hover:bg-slate-100"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      <FiX className="h-5 w-5 text-slate-700" />
                    </button>
                  </div>

                  <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <form
                      action="https://formsubmit.co/kontakt@anastasiiakupriianets.pl"
                      method="POST"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                      <input type="hidden" name="_subject" value="Nowe zapytanie (Modal brief)" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />

                      <div className="col-span-1">
                        <label
                          className="mb-1 block text-xs text-slate-600"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {isEn ? 'First name' : 'Imię'}
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          name="name"
                          required
                          placeholder={isEn ? 'Your name' : 'Twoje imię'}
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                        />
                      </div>

                      <div className="col-span-1">
                        <label
                          className="mb-1 block text-xs text-slate-600"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          placeholder={isEn ? 'e.g. john@company.com' : 'np. jan@firma.pl'}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                        />
                      </div>

                      <div className="col-span-1">
                        <label
                          className="mb-1 block text-xs text-slate-600"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {isEn ? 'Budget (approx.)' : 'Budżet (orientacyjnie)'}
                        </label>
                        <select
                          name="budget"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            {isEn ? 'Select range' : 'Wybierz zakres'}
                          </option>
                          <option>{isEn ? 'up to €400' : 'do 2 000 zł'}</option>
                          <option>{isEn ? '€400–€1 000' : '2 000–4 000 zł'}</option>
                          <option>{isEn ? '€1 000–€2 000' : '4 000–8 000 zł'}</option>
                          <option>{isEn ? 'above €2 000' : 'powyżej 8 000 zł'}</option>
                          <option>{isEn ? "don't know / depends" : 'nie wiem / zależy'}</option>
                        </select>
                      </div>

                      <div className="col-span-1">
                        <label
                          className="mb-1 block text-xs text-slate-600"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {isEn ? 'Timeline' : 'Termin'}
                        </label>
                        <div className="relative" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          <FiCalendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <select
                            name="timeline"
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 pr-9 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              {isEn ? 'Select timeline' : 'Wybierz termin'}
                            </option>
                            <option>{isEn ? 'as soon as possible' : 'jak najszybciej'}</option>
                            <option>{isEn ? '2–4 weeks' : '2–4 tygodnie'}</option>
                            <option>{isEn ? '1–2 months' : '1–2 miesiące'}</option>
                            <option>{isEn ? 'no fixed deadline' : 'nie mam sztywnego terminu'}</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-1 sm:col-span-2">
                        <label
                          className="mb-1 block text-xs text-slate-600"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {isEn ? 'Project description' : 'Opis projektu'}
                        </label>
                        <textarea
                          name="message"
                          required
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          placeholder={
                            isEn
                              ? 'Briefly describe the project (type of site, key features, inspirations)'
                              : 'Krótko opisz projekt (typ strony, 2–3 kluczowe funkcje, inspiracje)'
                          }
                          className="h-32 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30 sm:h-28"
                        />
                      </div>

                      <div className="col-span-1 flex items-start gap-2 sm:col-span-2">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          required
                          className="mt-0.5"
                        />
                        <label
                          htmlFor="consent"
                          className="text-xs leading-5 text-slate-600"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {isEn ? (
                            <>
                              I agree to be contacted regarding my enquiry. See the{' '}
                              <a
                                href="/en/polityka-prywatnosci"
                                className="text-slate-700 underline hover:no-underline"
                              >
                                Privacy Policy
                              </a>
                              .
                            </>
                          ) : (
                            <>
                              Zgadzam się na kontakt w sprawie mojego zapytania. Więcej w{' '}
                              <a
                                href="/polityka-prywatnosci"
                                className="text-slate-700 underline hover:no-underline"
                              >
                                Polityce prywatności
                              </a>
                              .
                            </>
                          )}
                        </label>
                      </div>

                      <div className="col-span-1 mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap sm:items-center">
                        <button
                          type="submit"
                          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 active:scale-[0.99]"
                          style={{
                            backgroundColor: '#007aff',
                            fontFamily: 'Inter, system-ui, sans-serif',
                          }}
                        >
                          {isEn ? 'Send brief' : 'Wyślij brief'}
                          <FiArrowRight className="opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <a
                          href="mailto:kontakt@anastasiiakupriianets.pl"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                          <FiMail />
                          {isEn ? 'Send email' : 'Wyślij maila'}
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