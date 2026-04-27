'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useLocale } from 'next-intl';

type FaqItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = isEn
  ? [
      {
        question: 'How much does a website cost?',
        answer:
          'Prices start from €350 for a simple website. The final quote depends on the number of pages, content, features and whether you choose WordPress or Next.js.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A simple website usually takes 7–14 days. Larger websites or projects with more content may take longer, but I always give you a realistic timeline before we start.',
      },
      {
        question: 'Do you work remotely?',
        answer:
          'Yes. I work remotely with clients in Poland and abroad. We can handle everything by email, messages or a short call.',
      },
      {
        question: 'WordPress or Next.js?',
        answer:
          'I work with both. WordPress is great when you want easy content editing, while Next.js is a good choice for a fast, modern and more custom website.',
      },
      {
        question: 'What do you need from me to start?',
        answer:
          'A short brief is enough: what your business does, what type of website you need and what sections should be included. Inspirations, logo and brand colors are helpful, but not required.',
      },
    ]
  : [
      {
        question: 'Ile kosztuje strona internetowa?',
        answer:
          'Ceny zaczynają się od 1500 zł za prostą stronę. Ostateczna wycena zależy od liczby podstron, treści, funkcji oraz tego, czy strona będzie w WordPressie czy Next.js.',
      },
      {
        question: 'Ile trwa realizacja?',
        answer:
          'Prosta strona zwykle zajmuje 7–14 dni. Większe projekty z większą ilością treści mogą potrwać dłużej, ale zawsze podaję realny termin przed rozpoczęciem pracy.',
      },
      {
        question: 'Czy pracujesz zdalnie?',
        answer:
          'Tak. Pracuję zdalnie z klientami z całej Polski. Wszystko możemy ustalić mailowo, wiadomościami lub podczas krótkiej rozmowy.',
      },
      {
        question: 'WordPress czy Next.js?',
        answer:
          'Pracuję w obu technologiach. WordPress sprawdzi się, jeśli chcesz łatwo edytować treści, a Next.js będzie dobry dla szybkiej, nowoczesnej i bardziej indywidualnej strony.',
      },
      {
        question: 'Czego potrzebujesz na start?',
        answer:
          'Na początek wystarczy krótki brief: czym zajmuje się firma, jakiej strony potrzebujesz i jakie sekcje mają się pojawić. Logo, kolory marki i inspiracje są pomocne, ale nie są obowiązkowe.',
      },
    ];

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-[#007aff] text-white"
    >
      {/* background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_45%,#006bde_100%)]" />

      <div className="relative mx-auto max-w-[900px] px-5 py-14 sm:py-16">
        
        {/* HEADER */}
        <div className="text-center">
          <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-md">
            FAQ
          </span>

          <h2 className="font-serif text-[1.7rem] leading-[1.1] tracking-[-0.035em] sm:text-[2.1rem]">
            {isEn
              ? 'Before we start working together'
              : 'Zanim zaczniemy współpracę'}
          </h2>

          <p className="mt-3 text-sm text-white/75 sm:text-base">
            {isEn
              ? 'Short answers to common questions.'
              : 'Krótkie odpowiedzi na najczęstsze pytania.'}
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-10 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-[20px] border border-white/15 bg-white/[0.08] backdrop-blur-xl transition hover:bg-white/[0.12]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-medium leading-6 sm:text-base">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      isOpen
                        ? 'bg-white text-[#007aff]'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-5 pb-4 pt-2 text-sm leading-6 text-white/80">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}