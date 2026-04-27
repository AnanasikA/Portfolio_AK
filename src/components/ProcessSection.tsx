'use client';

import { useEffect, useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

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
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(10px)' },
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

type ProcessStep = {
  step: string;
  title: string;
  text: string;
};

export default function ProcessSection() {
  const t = useTranslations('process');
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const steps = t.raw('steps') as ProcessStep[];
  const tags = t.raw('tags') as string[];

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

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#f7fbff] py-16 text-slate-900 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#007aff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1120px] px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex rounded-full bg-[#007aff]/10 px-4 py-2 text-xs font-medium text-[#007aff] sm:text-sm"
          >
            {t('badge')}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mx-auto max-w-[16ch] font-serif text-[1.8rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem]"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7"
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap justify-center gap-2.5"
          >
            {tags.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm sm:text-sm"
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
          className="relative mt-12 grid gap-5 md:grid-cols-3"
        >
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-[#007aff]/25 to-transparent md:block" />

          {steps.map((item, index) => (
            <motion.article
              key={item.step}
              variants={cardReveal}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -6,
                      rotateX: 1.5,
                      rotateY: index === 0 ? -1.5 : index === 2 ? 1.5 : 0,
                    }
              }
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#007aff]/10 blur-2xl" />
              </div>

              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007aff] text-sm font-semibold text-white shadow-lg shadow-[#007aff]/20">
                    {item.step}
                  </span>

                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                    Step
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium leading-tight tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-brief'))}
            className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#007aff]/20 transition hover:-translate-y-0.5 hover:bg-[#006ee6]"
          >
            {t('primary_cta')}
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </button>

          <a
            href="#projects"
            className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            {t('secondary_cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}