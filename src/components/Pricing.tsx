'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
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

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.985, filter: 'blur(10px)' },
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
    backdropFilter: 'blur(10px)',
    transition: { duration: 0.24, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.18, ease: 'easeInOut' as const },
  },
};

const modalPanel = {
  hidden: { opacity: 0, y: 40, scale: 0.97, rotateX: 4 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 28,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: 'easeInOut' as const,
    },
  },
};

export default function PricingSection() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const isEn = locale === 'en';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pricingData = [
    {
      key: 'starter',
      iconSrc: 'https://cdn.lordicon.com/fikcyfpp.json',
      priceLabel: isEn ? 'from €350' : 'od 1500 zł',
      priceValue: '1500',
      title: isEn ? 'Starter' : 'Start',
      description: isEn
        ? 'A simple, aesthetic website for a small business that needs a clear online presence.'
        : 'Prosta i estetyczna strona dla małej firmy, która potrzebuje profesjonalnej obecności w internecie.',
      badge: isEn ? 'Good for a start' : 'Dobry na start',
      features: isEn
        ? [
            'one-page website or simple landing page',
            'responsive layout for mobile and desktop',
            'contact form and basic SEO setup',
            'clean, modern visual design',
          ]
        : [
            'strona one page lub prosty landing page',
            'responsywny układ na mobile i desktop',
            'formularz kontaktowy i podstawowe SEO',
            'czysty, nowoczesny wygląd',
          ],
      recommended: false,
    },
    {
      key: 'business',
      iconSrc: 'https://cdn.lordicon.com/zhiiqoue.json',
      priceLabel: isEn ? 'from €700' : 'od 3000 zł',
      priceValue: '3000',
      title: isEn ? 'Business' : 'Firma',
      description: isEn
        ? 'The best choice for companies that want a stronger brand image and a more complete website.'
        : 'Najlepszy wybór dla firm, które chcą budować profesjonalny wizerunek i mieć bardziej kompletną stronę.',
      badge: isEn ? 'Most popular' : 'Najczęściej wybierany',
      features: isEn
        ? [
            'multi-section or multi-page company website',
            'custom design tailored to your brand',
            'better structure for offers, services and trust',
            'responsive build in WordPress or Next.js',
          ]
        : [
            'rozbudowana strona firmowa lub kilka podstron',
            'indywidualny projekt dopasowany do marki',
            'lepsza struktura oferty, usług i zaufania',
            'responsywna realizacja w WordPress lub Next.js',
          ],
      recommended: true,
    },
    {
      key: 'premium',
      iconSrc: 'https://cdn.lordicon.com/sjoccsdj.json',
      priceLabel: isEn ? 'from €1150' : 'od 5000 zł',
      priceValue: '5000',
      title: isEn ? 'Premium' : 'Premium',
      description: isEn
        ? 'For brands that need a more advanced website with stronger UX, more sections and a polished premium feel.'
        : 'Dla marek, które potrzebują bardziej dopracowanej strony z mocniejszym UX, większą liczbą sekcji i premium wyglądem.',
      badge: isEn ? 'For bigger goals' : 'Dla większych celów',
      features: isEn
        ? [
            'advanced company website or custom structure',
            'stronger sales-focused UX and content flow',
            'premium visual direction and refined details',
            'more flexibility for future growth',
          ]
        : [
            'bardziej rozbudowana strona lub indywidualna struktura',
            'mocniejszy UX sprzedażowy i lepszy przepływ treści',
            'premium design i dopracowane detale',
            'większa elastyczność pod dalszy rozwój',
          ],
      recommended: false,
    },
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setIsModalOpen(false);

    if (isModalOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative w-full overflow-hidden bg-[#007aff] text-white"
    >
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      {/* background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_45%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute left-[-12%] top-[8%] h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute bottom-[-12%] right-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl sm:h-[520px] sm:w-[520px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-12 lg:py-28 xl:px-16 xl:py-32 2xl:px-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-md"
          >
            {isEn ? 'Pricing & packages' : 'Pakiety i wycena'}
          </motion.span>

          <motion.h2
            id="pricing-heading"
            itemProp="name"
            variants={fadeUp}
            className="text-[2.1rem] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.9rem]"
          >
            {isEn
              ? 'Choose the package that fits your business stage'
              : 'Wybierz pakiet dopasowany do etapu rozwoju Twojej firmy'}
          </motion.h2>

          <motion.p
            itemProp="description"
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/90 sm:text-[17px] sm:leading-8 md:text-lg"
          >
            {isEn
              ? 'Clear pricing makes it easier to start. You choose the scope, and I help you create a website that looks professional and supports your business goals.'
              : 'Przejrzysta wycena ułatwia start. Wybierasz zakres, a ja pomagam stworzyć stronę, która wygląda profesjonalnie i wspiera rozwój Twojej firmy.'}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
        >
          {pricingData.map((item, index) => (
            <motion.article
              key={item.key}
              variants={cardVariant}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className={`group relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl transition-all duration-500 sm:p-7 lg:p-8 ${
                item.recommended
                  ? 'xl:-translate-y-3 border-white/35 bg-white/[0.15] shadow-[0_20px_80px_rgba(0,0,0,0.18)] hover:-translate-y-4'
                  : 'border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.07))] hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.12]'
              } ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
            >
              <meta itemProp="position" content={String(index + 1)} />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/5" />

              <div
                itemProp="item"
                itemScope
                itemType="https://schema.org/Service"
                className="relative flex h-full flex-col"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs ${
                      item.recommended
                        ? 'bg-white text-[#007aff] font-medium'
                        : 'border border-white/20 bg-white/10 text-white/85'
                    }`}
                  >
                    {item.badge}
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 min-w-[56px] items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition duration-500 group-hover:scale-110 group-hover:bg-white/15">
                    <lord-icon
                      src={item.iconSrc}
                      trigger="loop"
                      delay="1200"
                      colors="primary:#f8fafc,secondary:#bfdbfe"
                      style={{ width: '34px', height: '34px' }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-[1.7rem] font-semibold text-white sm:text-[1.9rem]"
                      itemProp="name"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/75">{item.badge}</p>
                  </div>
                </div>

                <div
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                  className="mb-5"
                >
                  <div className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl xl:text-[2.6rem]">
                    {item.priceLabel}
                  </div>
                  <meta itemProp="priceCurrency" content="PLN" />
                  <meta itemProp="price" content={item.priceValue} />
                </div>

                <p
                  itemProp="description"
                  className="mb-6 text-sm leading-6 text-white/88 sm:text-[15px] sm:leading-7"
                >
                  {item.description}
                </p>

                <ul
                  className="space-y-3"
                  aria-label={isEn ? 'Package features' : 'Zawartość pakietu'}
                >
                  {item.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-white/88 sm:text-[15px]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-white/14">
                        <FiCheck className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mx-auto mt-12 max-w-2xl text-center sm:mt-14"
        >
          <p className="mb-6 text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            {isEn
              ? 'Need something more custom? I also prepare individual offers based on your business goals, content and scope.'
              : 'Potrzebujesz czegoś bardziej indywidualnego? Przygotowuję też wyceny dopasowane do celów biznesowych, zakresu i rodzaju strony.'}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-controls="pricing-modal"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/70 bg-transparent px-7 py-3 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cfe3ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#007aff]"
          >
            {isEn ? 'Ask for a quote' : 'Poproś o wycenę'}
            <FiArrowRight className="opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            <motion.div
              id="pricing-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="pricing-modal-title"
              variants={modalPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white text-gray-900 shadow-[0_30px_100px_rgba(0,0,0,0.22)]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,122,255,0.08),transparent)]" />

              <div className="relative flex items-start gap-3 border-b border-slate-200 px-4 pb-3 pt-5 sm:px-6">
                <div className="flex-1 min-w-0">
                  <h3
                    id="pricing-modal-title"
                    className="text-xl font-semibold leading-snug sm:text-2xl"
                  >
                    {isEn
                      ? 'Tell me about your project'
                      : 'Opowiedz mi o swoim projekcie'}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {isEn
                      ? 'Fill out a short form and I will come back with an initial quote.'
                      : 'Wypełnij krótki formularz, a wrócę do Ciebie ze wstępną wyceną.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
                  aria-label={isEn ? 'Close' : 'Zamknij'}
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                <form
                  action="https://formsubmit.co/kontakt@anastasiiakupriianets.pl"
                  method="POST"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="Nowe zapytanie o wycenę"
                  />
                  <input type="hidden" name="_template" value="table" />

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">
                      {isEn ? 'Name' : 'Imię i nazwisko'}
                    </label>
                    <input
                      type="text"
                      name="Imię i nazwisko"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">
                      Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">
                      {isEn ? 'Website type' : 'Rodzaj strony'}
                    </label>
                    <select
                      name="Rodzaj strony"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    >
                      <option value="" disabled>
                        {isEn ? 'Choose option' : 'Wybierz opcję'}
                      </option>
                      <option
                        value={isEn ? 'Starter package' : 'Pakiet Start'}
                      >
                        {isEn ? 'Starter package' : 'Pakiet Start'}
                      </option>
                      <option
                        value={isEn ? 'Business package' : 'Pakiet Firma'}
                      >
                        {isEn ? 'Business package' : 'Pakiet Firma'}
                      </option>
                      <option
                        value={isEn ? 'Premium package' : 'Pakiet Premium'}
                      >
                        {isEn ? 'Premium package' : 'Pakiet Premium'}
                      </option>
                      <option
                        value={isEn ? 'Custom quote' : 'Wycena indywidualna'}
                      >
                        {isEn ? 'Custom quote' : 'Wycena indywidualna'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">
                      {isEn ? 'Budget' : 'Budżet'}
                    </label>
                    <select
                      name="Budżet"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    >
                      <option value="" disabled>
                        {isEn ? 'Choose option' : 'Wybierz opcję'}
                      </option>
                      <option value="1500–3000 zł">1500–3000 zł</option>
                      <option value="3000–5000 zł">3000–5000 zł</option>
                      <option value="5000–8000 zł">5000–8000 zł</option>
                      <option value="8000+ zł">8000+ zł</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-600">
                      {isEn ? 'Project description' : 'Opis projektu'}
                    </label>
                    <textarea
                      name="Opis projektu"
                      rows={4}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <button
                      type="submit"
                      className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 active:scale-[0.99]"
                      style={{ backgroundColor: '#007aff' }}
                    >
                      {isEn ? 'Send enquiry' : 'Wyślij zapytanie'}
                      <FiArrowRight className="opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}