'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiHome } from 'react-icons/fi';

export default function ThankYouPage() {
  const t = useTranslations('thankYou');

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] px-6 py-24 text-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#007aff26,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f3f8ff_45%,#eef5ff_100%)]" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#007aff]/15 blur-[90px]" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-sky-300/20 blur-[100px]" />

      <section className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden rounded-[36px] border border-white/70 bg-white/75 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-10 md:p-12"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#007aff]/45 to-transparent" />
          <div className="absolute right-8 top-8 hidden rounded-full border border-[#007aff]/15 bg-[#007aff]/5 px-4 py-2 text-xs font-medium text-[#007aff] sm:block">
  {t('label')}
</div>

          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#007aff] shadow-[0_18px_40px_rgba(0,122,255,0.28)]"
            >
              <FiCheck className="text-4xl text-white" />
            </motion.div>

            <p className="mb-4 inline-flex rounded-full border border-[#007aff]/15 bg-[#eef5ff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#007aff]">
              {t('badge')}
            </p>

            <h1 className="mx-auto max-w-[12ch] text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl">
              {t('title')}
            </h1>

            <p className="mx-auto mt-6 max-w-[48ch] text-base leading-7 text-slate-600 sm:text-lg">
              {t('desc')}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#007aff] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#006ae0] sm:w-auto"
              >
                <FiHome />
                {t('home')}
              </Link>

              <Link
                href="/projects"
                className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#007aff]/30 hover:bg-white sm:w-auto"
              >
                {t('projects')}
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mx-auto mt-10 grid max-w-xl gap-3 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4">
                <p className="text-xs font-semibold text-slate-950">01</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{t('step1')}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4">
                <p className="text-xs font-semibold text-slate-950">02</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{t('step2')}</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4">
                <p className="text-xs font-semibold text-slate-950">03</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{t('step3')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}