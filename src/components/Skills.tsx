'use client';

import Script from 'next/script';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const benefits = [
  {
    key: 'image',
    src: 'https://cdn.lordicon.com/ogjpwrxe.json',
  },
  {
    key: 'offer',
    src: 'https://cdn.lordicon.com/sobzmbzh.json',
  },
  {
    key: 'contact',
    src: 'https://cdn.lordicon.com/ailnzwyn.json',
  },
  {
    key: 'responsive',
    src: 'https://cdn.lordicon.com/ggnoyhfp.json',
  },
];

export default function BenefitsSection() {
  const t = useTranslations('benefits');
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative w-full overflow-hidden bg-[#007aff] text-white"
    >
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_45%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.1),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.07),transparent_26%)]" />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <motion.header
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
          >
            {isEn ? 'Business benefits' : 'Korzyści dla Twojej firmy'}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="benefits-heading"
            itemProp="name"
            className="mx-auto max-w-[18ch] font-serif text-[1.8rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[2.1rem] md:text-[2.4rem] lg:text-[2.7rem]"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            itemProp="description"
            className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-white/75 sm:text-base sm:leading-7"
          >
            {t('description')}
          </motion.p>
        </motion.header>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {benefits.map((benefit, index) => (
            <motion.li
              key={benefit.key}
              variants={cardVariant}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="list-none"
            >
              <meta itemProp="position" content={String(index + 1)} />

              <article className="group relative h-full overflow-hidden rounded-[22px] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] sm:p-6">
                <div
                  itemProp="item"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/10 transition duration-500 group-hover:bg-white/15">
                    <lord-icon
                      src={benefit.src}
                      trigger="loop"
                      delay="1500"
                      colors="primary:#f8fafc,secondary:#bfdbfe"
                      style={{ width: '28px', height: '28px' }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      itemProp="name"
                      className="text-base font-semibold text-white sm:text-lg"
                    >
                      {t(`${benefit.key}.title`)}
                    </h3>

                    <p
                      itemProp="description"
                      className="mt-1.5 max-w-[34ch] text-sm leading-6 text-white/70"
                    >
                      {t(`${benefit.key}.description`)}
                    </p>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/projects"
            aria-label={t('cta_aria')}
            className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            {t('cta')}
            <FiArrowRight className="opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}