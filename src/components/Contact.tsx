'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMail, FiCheckCircle } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const panelVariant = {
  hidden: { opacity: 0, y: 34, scale: 0.985, filter: 'blur(10px)' },
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

const successVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isEn = locale === 'en';
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === 'sending') return;

    setStatus('sending');

    try {
      const formData = new FormData(formRef.current);

      if ((formData.get('_honey') as string)?.trim()) {
        setStatus('success');
        formRef.current.reset();
        return;
      }

      const res = await fetch(
        'https://formsubmit.co/ajax/kontakt@anastasiiakupriianets.pl',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (res.ok) {
        if (
          typeof window !== 'undefined' &&
          typeof window.gtag !== 'undefined'
        ) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-XXXXXXX/YYYYYYYYYYYY',
          });
        }

        setStatus('success');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      itemScope
      itemType="https://schema.org/ContactPage"
      className="relative w-full overflow-hidden bg-[#f4f8ff] text-[#0f172a]"
    >
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,122,255,0.10),transparent_24%),radial-gradient(circle_at_85%_30%,rgba(0,122,255,0.08),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(0,122,255,0.06),transparent_28%)]" />
      <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[#007aff]/10 blur-3xl sm:h-64 sm:w-64" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#007aff]/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#007aff]/[0.06] blur-3xl sm:h-[460px] sm:w-[460px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-12 lg:py-24 xl:px-16 xl:py-28 2xl:px-20">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.05fr] lg:gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:gap-14">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex rounded-full border border-[#007aff]/15 bg-white/75 px-4 py-2 text-xs text-[#007aff] backdrop-blur-md sm:text-sm"
            >
              {isEn ? 'Let’s talk' : 'Porozmawiajmy o projekcie'}
            </motion.span>

            <motion.h2
              id="contact-heading"
              itemProp="name"
              variants={fadeUp}
              className="text-[2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.15rem] xl:text-[3.45rem]"
            >
              {t('title')}
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="mt-6 space-y-4 text-sm text-slate-700 sm:mt-7 sm:text-[15px]"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-[#007aff]/10 text-[#007aff]">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                </span>
                <p className="leading-6 sm:leading-7">
                  {isEn
                    ? 'A short message is enough to get an initial direction and quote.'
                    : 'Wystarczy krótka wiadomość, żeby otrzymać wstępny kierunek i wycenę.'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-[#007aff]/10 text-[#007aff]">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                </span>
                <p className="leading-6 sm:leading-7">
                  {isEn
                    ? 'I create websites for businesses in WordPress and Next.js, with a strong focus on clarity, responsiveness and modern design.'
                    : 'Tworzę strony internetowe dla firm w WordPressie i Next.js, z naciskiem na czytelność, responsywność i nowoczesny design.'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-[#007aff]/10 text-[#007aff]">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                </span>
                <p className="leading-6 sm:leading-7">
                  {isEn
                    ? 'Remote collaboration is simple and efficient, no matter where your business is based.'
                    : 'Współpraca zdalna jest prosta i wygodna, niezależnie od tego, gdzie działa Twoja firma.'}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 sm:mt-8">
              <a
                href="mailto:kontakt@anastasiiakupriianets.pl"
                className="group inline-flex items-center gap-2 text-sm text-slate-700 transition duration-300 hover:text-[#007aff] sm:text-[15px]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#007aff]/10 bg-white/80 text-[#007aff] transition duration-300 group-hover:scale-105 group-hover:bg-white">
                  <FiMail className="h-4 w-4" />
                </span>
                kontakt@anastasiiakupriianets.pl
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={panelVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/80 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:rounded-[30px] sm:p-7 lg:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,122,255,0.07),transparent)]" />
            <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#007aff]/10 blur-2xl" />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  variants={successVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 10 }}
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[360px] flex-col items-center justify-center px-2 py-6 text-center sm:min-h-[420px]"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#007aff]/10 text-[#007aff]"
                  >
                    <FiCheckCircle className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                    {t('success_title')}
                  </h3>

                  <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                    {t('success_text')}
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="rounded-full border border-slate-300 px-5 py-3 text-sm text-slate-800 transition hover:bg-slate-50"
                    >
                      {t('send_another')}
                    </button>

                    <a
                      href="mailto:kontakt@anastasiiakupriianets.pl"
                      className="rounded-full bg-[#007aff] px-5 py-3 text-sm text-white transition hover:bg-[#0062cc]"
                    >
                      {t('write_email')}
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={sendForm}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="relative space-y-5"
                  itemProp="mainEntity"
                  itemScope
                  itemType="https://schema.org/ContactPoint"
                >
                  <meta
                    itemProp="contactType"
                    content={isEn ? 'customer inquiries' : 'zapytania ofertowe'}
                  />

                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="Nowa wiadomość z portfolio"
                  />
                  <input
                    type="text"
                    name="_honey"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {t('error')}{' '}
                      <a
                        className="underline"
                        href="mailto:kontakt@anastasiiakupriianets.pl"
                      >
                        kontakt@anastasiiakupriianets.pl
                      </a>
                      .
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        {t('form.name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:-translate-y-[1px] focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/15"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        {t('form.email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:-translate-y-[1px] focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      {t('form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="min-h-[160px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:-translate-y-[1px] focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/15 sm:min-h-[180px]"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className={`group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition duration-300 ${
                        status === 'sending'
                          ? 'cursor-not-allowed bg-[#7fb6ff]'
                          : 'bg-[#007aff] hover:-translate-y-0.5 hover:bg-[#0062cc]'
                      }`}
                    >
                      <FiSend className="text-base transition-transform duration-300 group-hover:translate-x-[1px]" />
                      {status === 'sending' ? t('sending') : t('form.submit')}
                    </button>

                    <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                      {isEn
                        ? 'Usually I reply with an initial response within 1–2 business days.'
                        : 'Zwykle odpowiadam ze wstępną informacją w ciągu 1–2 dni roboczych.'}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}