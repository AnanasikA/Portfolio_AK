'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  FiTool,
  FiBriefcase,
  FiHome,
  FiUsers,
  FiSettings,
} from 'react-icons/fi';
import { useTranslations } from 'next-intl';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ForWhoSection() {
  const t = useTranslations('forWho');
  const prefersReducedMotion = useReducedMotion();

  const items = [
    { icon: FiTool, key: '0' },
    { icon: FiBriefcase, key: '1' },
    { icon: FiHome, key: '2' },
    { icon: FiUsers, key: '3' },
    { icon: FiSettings, key: '4' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7fbff] px-5 py-16 text-slate-900 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="pointer-events-none absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-[#007aff]/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] h-80 w-80 rounded-full bg-[#007aff]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1180px]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex rounded-full bg-[#007aff]/10 px-4 py-2 text-xs font-medium text-[#007aff] sm:text-sm"
          >
            {t('badge')}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mx-auto max-w-[20ch] font-serif text-[1.8rem] font-medium leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem]"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[620px] text-sm leading-6 text-slate-600 sm:text-base sm:leading-7"
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.key}
                variants={cardReveal}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -6,
                        rotateX: 1.2,
                        rotateY: index < 2 ? -1.2 : index > 2 ? 1.2 : 0,
                      }
                }
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#007aff]/10 blur-2xl" />
                  <div className="absolute -bottom-16 left-0 h-28 w-28 rounded-full bg-[#007aff]/8 blur-2xl" />
                </div>

                <div className="relative">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#007aff]/10 text-[#007aff] transition duration-300 group-hover:bg-[#007aff] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#007aff]/20">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-serif text-[1.15rem] font-medium leading-tight tracking-[-0.025em] text-slate-950">
                    {t(`items.${item.key}.title`)}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {t(`items.${item.key}.text`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}