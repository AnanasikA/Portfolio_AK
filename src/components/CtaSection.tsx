'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'), {
  ssr: false,
});

export default function MidCtaSection() {
  const t = useTranslations('midCta');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="bg-[#f7fbff] px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            rounded-[32px] border border-slate-200
            bg-white
            px-6 py-10 sm:px-10
            shadow-sm
            hover:shadow-lg transition
          "
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            
            {/* text */}
            <div>
              <p className="text-sm text-[#007aff] font-medium">
                {t('badge')}
              </p>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-light tracking-[-0.03em] text-slate-900">
                {t('title')}
              </h2>

              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600 leading-7">
                {t('description')}
              </p>
            </div>

            {/* button */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="
                group inline-flex items-center gap-2
                rounded-full bg-[#007aff] px-6 py-3.5
                text-sm font-medium text-white
                transition hover:-translate-y-0.5
                shadow-md hover:shadow-lg
              "
            >
              {t('cta')}
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
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