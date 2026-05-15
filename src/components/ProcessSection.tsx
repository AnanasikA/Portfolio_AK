'use client';

import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

type ProcessStep = {
  step: string;
  title: string;
  text: string;
};

export default function ProcessSection() {
  const t = useTranslations('process');

  const steps = t.raw('steps') as ProcessStep[];
  const tags = t.raw('tags') as string[];

  return (
    <section
      id="process"
      className="bg-[#f7fbff] px-5 py-20 text-slate-900 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex rounded-full bg-[#007aff]/10 px-4 py-2 text-xs font-medium text-[#007aff]"
          >
            {t('badge')}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="max-w-[760px] font-serif text-[2.3rem] font-medium leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-[2.8rem] lg:text-[3.6rem]"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-base leading-7 text-slate-600"
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-2.5"
          >
            {tags.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600"
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
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-10 md:grid-cols-3"
        >
          {steps.map((item) => (
            <motion.article
              key={item.step}
              variants={fadeUp}
              className="border-t border-slate-200 pt-7"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="text-sm font-semibold text-[#007aff]">
                  {item.step}
                </span>

                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <h3 className="font-serif text-[1.55rem] font-medium leading-tight tracking-[-0.035em] text-slate-950">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-brief'))}
            className="group inline-flex min-h-[50px] w-fit items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#006ee6]"
          >
            {t('primary_cta')}
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </button>

          <a
            href="#projekty"
            className="inline-flex min-h-[50px] w-fit items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-[#007aff] hover:text-[#007aff]"
          >
            {t('secondary_cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}