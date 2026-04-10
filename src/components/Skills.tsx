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
      staggerChildren: 0.12,
      delayChildren: 0.08,
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
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function SkillsSection() {
  const t = useTranslations('skills');
  const locale = useLocale();
  const isEn = locale === 'en';

  const skills = [
    {
      key: 'web',
      src: 'https://cdn.lordicon.com/ogjpwrxe.json',
    },
    {
      key: 'ux',
      src: 'https://cdn.lordicon.com/sobzmbzh.json',
    },
    {
      key: 'frontend',
      src: 'https://cdn.lordicon.com/ailnzwyn.json',
    },
    {
      key: 'responsive',
      src: 'https://cdn.lordicon.com/ggnoyhfp.json',
    },
  ];

  return (
    <section
      id="services"
      aria-labelledby="skills-heading"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_28%)]" />

      {/* glows */}
      <div className="absolute left-[-12%] top-[6%] h-52 w-52 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute bottom-[-10%] right-[-8%] h-60 w-60 rounded-full bg-white/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl sm:h-[520px] sm:w-[520px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-12 lg:py-28 xl:px-16 xl:py-32 2xl:px-20">
        <motion.header
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
          >
            {isEn ? 'Skills & expertise' : 'Umiejętności i specjalizacja'}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="skills-heading"
            itemProp="name"
            className="text-[2.1rem] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[3.9rem]"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            itemProp="description"
            className="mx-auto mt-5 max-w-[760px] text-[15px] leading-7 text-white/90 sm:text-[17px] sm:leading-8 md:text-lg"
          >
            {isEn
              ? 'I design and build modern websites for businesses — with a strong focus on clean UX, responsive layouts, WordPress, Next.js and polished frontend execution.'
              : 'Projektuję i tworzę nowoczesne strony internetowe dla firm — z naciskiem na czytelny UX, responsywne układy, WordPress, Next.js i dopracowany frontend.'}
          </motion.p>
        </motion.header>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 md:mt-16 md:grid-cols-2 lg:gap-6 xl:mt-20"
        >
          {skills.map((skill, index) => (
            <motion.li
              key={skill.key}
              variants={cardVariant}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="list-none"
            >
              <meta itemProp="position" content={String(index + 1)} />

              <article
                className="
                  group relative h-full overflow-hidden rounded-[24px] border border-white/15
                  bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.07))]
                  p-5 backdrop-blur-xl transition-all duration-500
                  hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/[0.12]
                  sm:rounded-[28px] sm:p-6 lg:p-7
                "
              >
                {/* inner glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                </div>

                {/* subtle border shine */}
                <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/5 sm:rounded-[28px]" />

                <div className="relative flex h-full flex-col gap-5 sm:gap-6">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className="
                        flex h-14 w-14 min-w-[56px] items-center justify-center rounded-2xl
                        border border-white/15 bg-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.08)]
                        transition duration-500 group-hover:scale-110 group-hover:bg-white/15
                      "
                    >
                      <lord-icon
                        src={skill.src}
                        trigger="loop"
                        delay="1500"
                        colors="primary:#f8fafc,secondary:#bfdbfe"
                        style={{ width: '34px', height: '34px' }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        itemProp="name"
                        className="text-lg font-semibold text-white sm:text-xl lg:text-[1.35rem]"
                      >
                        {t(`${skill.key}.title`)}
                      </h3>

                      <p
                        itemProp="description"
                        className="mt-2 text-sm leading-6 text-white/85 sm:text-[15px] sm:leading-7"
                      >
                        {t(`${skill.key}.description`)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-12 flex justify-center sm:mt-14 md:mt-16"
        >
          <Link
            href="/projects"
            aria-label={t('cta_aria')}
            className="
              group inline-flex items-center gap-2 rounded-full border border-white/70
              bg-white/[0.06] px-7 py-3 text-base font-medium text-white backdrop-blur-sm
              transition duration-300 hover:-translate-y-0.5 hover:bg-white/10
              active:scale-[0.99] focus:outline-none focus-visible:ring-2
              focus-visible:ring-[#cfe3ff] focus-visible:ring-offset-2
              focus-visible:ring-offset-[#007aff]
            "
          >
            {t('cta')}
            <FiArrowRight className="opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}