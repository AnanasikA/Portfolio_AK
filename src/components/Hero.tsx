'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'), {
  ssr: false,
});

const textReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero() {
  const t = useTranslations('hero');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const floatAnimation = useMemo(() => {
    if (prefersReducedMotion) return undefined;

    return {
      y: [0, -4, 0],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-[#007aff] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_40%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_24%)]" />

      <div className="absolute left-[-10%] top-[10%] h-40 w-40 rounded-full bg-white/8 blur-xl sm:h-56 sm:w-56" />
      <div className="absolute bottom-[-10%] right-[-10%] h-48 w-48 rounded-full bg-white/8 blur-xl sm:h-64 sm:w-64" />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid min-h-[calc(100svh-80px)] items-center gap-10 py-24 sm:py-28 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-12 xl:gap-16">
          <motion.div
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="order-1 mx-auto max-w-[640px] text-center lg:mx-0 lg:max-w-[560px] lg:text-left xl:max-w-[620px]"
          >
            <motion.div
              variants={itemReveal}
              className="mb-5 inline-flex max-w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] sm:text-sm"
            >
              <span className="truncate sm:whitespace-normal">{t('badge')}</span>
            </motion.div>

            <motion.h1
  variants={itemReveal}
  className="font-serif text-[1.9rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-[2.3rem] md:text-[2.6rem] lg:text-[2.9rem] xl:text-[3.2rem] 2xl:text-[3.6rem]"
>
  {t('title')}
</motion.h1>

            <motion.p
              variants={itemReveal}
              className="mt-5 text-[15px] leading-7 text-white/90 sm:mt-6 sm:text-[17px] sm:leading-8 md:text-lg lg:max-w-[52ch]"
            >
              {t('description')}
            </motion.p>

            <motion.div
              variants={itemReveal}
              className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#007aff] shadow-lg transition hover:-translate-y-0.5"
              >
                {t('primary_cta')}
                <FiArrowRight />
              </button>

              <Link
                href="/projects"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-medium transition hover:bg-white/10"
              >
                {t('secondary_cta')}
              </Link>
            </motion.div>

            <motion.p
              variants={itemReveal}
              className="mt-5 text-sm leading-6 text-white/75 sm:mt-6"
            >
              {t('highlights')}
            </motion.p>
          </motion.div>

          <div className="order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px] sm:max-w-[620px] md:max-w-[760px] lg:max-w-[700px] xl:max-w-[860px]">
              <div className="absolute left-1/2 top-1/2 h-[58%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-xl" />

              <motion.div
                animate={floatAnimation}
                className="will-change-transform"
              >
                <Image
                  src="/Hero (1).webp"
                  alt={t('image_alt')}
                  width={1600}
                  height={1100}
                  priority
                  fetchPriority="high"
                  quality={80}
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAwCdASoQAAoAAUAmJaQAA3AA/v89WAAAAA=="
                  sizes="(min-width: 1536px) 860px, (min-width: 1280px) 760px, (min-width: 1024px) 48vw, (min-width: 768px) 78vw, 92vw"
                  className="h-auto w-full object-contain drop-shadow-[0_18px_44px_rgba(0,0,0,0.16)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {isQuoteOpen && (
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      )}
    </section>
  );
}