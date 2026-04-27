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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.985, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
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
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 28,
    scale: 0.98,
    transition: { duration: 0.18, ease: 'easeInOut' as const },
  },
};

const packages = [
  {
    key: 'landing',
    iconSrc: 'https://cdn.lordicon.com/fikcyfpp.json',
    priceValue: '1500',
    recommended: false,
  },
  {
    key: 'company',
    iconSrc: 'https://cdn.lordicon.com/zhiiqoue.json',
    priceValue: '3000',
    recommended: true,
  },
  {
    key: 'premium',
    iconSrc: 'https://cdn.lordicon.com/sjoccsdj.json',
    priceValue: '5000',
    recommended: false,
  },
];

export default function PricingSection() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const isEn = locale === 'en';
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };

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
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_45%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="absolute left-[-12%] top-[8%] h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute bottom-[-12%] right-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />

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
            className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
          >
            {isEn ? 'Pricing & packages' : 'Pakiety i wycena'}
          </motion.span>

          <motion.h2
  id="pricing-heading"
  itemProp="name"
  variants={fadeUp}
  className="font-serif text-[1.8rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[2.1rem] md:text-[2.4rem] lg:text-[2.7rem] xl:text-[3rem]"
>
  {t('title')}
</motion.h2>

          <motion.p
            itemProp="description"
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/90 sm:text-[17px] sm:leading-8 md:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm font-medium text-white/85 sm:text-base"
          >
            {t('highlights')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
        >
          {packages.map((item, index) => (
            <motion.article
              key={item.key}
              variants={cardVariant}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className={`group relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl transition-all duration-500 sm:p-7 lg:p-8 ${
                item.recommended
                  ? 'border-white/35 bg-white/[0.15] shadow-[0_20px_80px_rgba(0,0,0,0.18)] xl:-translate-y-3 hover:-translate-y-4'
                  : 'border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.07))] hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.12]'
              } ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
            >
              <meta itemProp="position" content={String(index + 1)} />

              <div itemProp="item" itemScope itemType="https://schema.org/Service" className="relative flex h-full flex-col">
                <div className="mb-5 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">
                  {t(`items.${item.key}.badge`)}
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 min-w-[56px] items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                    <lord-icon
                      src={item.iconSrc}
                      trigger="loop"
                      delay="1200"
                      colors="primary:#f8fafc,secondary:#bfdbfe"
                      style={{ width: '34px', height: '34px' }}
                    />
                  </div>

                  <h3 itemProp="name" className="text-[1.55rem] font-semibold text-white sm:text-[1.8rem]">
                    {t(`items.${item.key}.title`)}
                  </h3>
                </div>

                <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="mb-5">
                  <div className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                    {t(`items.${item.key}.priceLabel`)}
                  </div>
                  <meta itemProp="priceCurrency" content={isEn ? 'EUR' : 'PLN'} />
                  <meta itemProp="price" content={item.priceValue} />
                </div>

                <p itemProp="description" className="mb-6 text-sm leading-6 text-white/88 sm:text-[15px] sm:leading-7">
                  {t(`items.${item.key}.description`)}
                </p>

                <ul className="space-y-3" aria-label={t('package_aria')}>
                  {t.raw(`items.${item.key}.features`).map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/88 sm:text-[15px]">
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
            {t('cta_subtext')}
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-controls="pricing-modal"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/70 bg-transparent px-7 py-3 text-base font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            {t('cta')}
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
              <div className="relative flex items-start gap-3 border-b border-slate-200 px-4 pb-3 pt-5 sm:px-6">
                <div className="min-w-0 flex-1">
                  <h3 id="pricing-modal-title" className="text-xl font-semibold leading-snug sm:text-2xl">
                    {t('modal.title')}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {t('modal.subtitle')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
                  aria-label={t('modal.close')}
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
                  <input type="hidden" name="_subject" value="Nowe zapytanie o wycenę" />
                  <input type="hidden" name="_template" value="table" />

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">{t('form.name')}</label>
                    <input name="name" required autoComplete="name" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30" />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">{t('form.email')}</label>
                    <input type="email" name="email" required autoComplete="email" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30" />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">{t('form.websiteType')}</label>
                    <select name="websiteType" required defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30">
                      <option value="" disabled>{t('form.choose')}</option>
                      <option value={t('form.options.landing')}>{t('form.options.landing')}</option>
                      <option value={t('form.options.company')}>{t('form.options.company')}</option>
                      <option value={t('form.options.premium')}>{t('form.options.premium')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-slate-600">{t('form.budget')}</label>
                    <select name="budget" required defaultValue="" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30">
                      <option value="" disabled>{t('form.choose')}</option>
                      <option value="1500–3000 zł / €350–€700">1500–3000 zł / €350–€700</option>
                      <option value="3000–5000 zł / €700–€1200">3000–5000 zł / €700–€1200</option>
                      <option value="5000+ zł / €1200+">5000+ zł / €1200+</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-slate-600">{t('form.description')}</label>
                    <textarea name="description" rows={4} required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30" />
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#007aff] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5"
                    >
                      {t('form.submit')}
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