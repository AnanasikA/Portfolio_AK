'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useLocale } from 'next-intl';

type FaqItem = {
  question: string;
  answer: string;
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
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

const itemVariant = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
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
            'The price depends on the scope, number of sections, content and overall complexity. On my website you can see example packages, but I also prepare custom quotes based on your business goals and website needs.',
        },
        {
          question: 'How long does it take to create a website?',
          answer:
            'A simple landing page can usually be completed faster, while a larger company website takes more time. The final timeline depends on the project scope, content readiness and revision process.',
        },
        {
          question: 'Do you work remotely?',
          answer:
            'Yes. I work remotely with clients from all over Poland and abroad. The process is simple and efficient — we can discuss everything by email, message or call.',
        },
        {
          question: 'Do you build websites in WordPress or Next.js?',
          answer:
            'I work with both WordPress and Next.js. The right solution depends on the project goals, flexibility needs, content management and future development plans.',
        },
        {
          question: 'Can I ask for changes after the first version?',
          answer:
            'Yes. The process includes revisions, so the website can be refined and adjusted before launch. I want the final result to be visually strong, clear and well matched to your brand.',
        },
        {
          question: 'What do you need from me to start?',
          answer:
            'At the beginning, a short brief is enough: what kind of website you need, what your company does, what pages or sections should be included and whether you have any inspirations or branding materials.',
        },
      ]
    : [
        {
          question: 'Ile kosztuje stworzenie strony internetowej?',
          answer:
            'Cena zależy od zakresu projektu, liczby sekcji, treści i poziomu rozbudowania strony. Na stronie pokazuję przykładowe pakiety, ale przygotowuję też indywidualne wyceny dopasowane do celów biznesowych i potrzeb projektu.',
        },
        {
          question: 'Ile trwa wykonanie strony?',
          answer:
            'Prosty landing page można zrealizować szybciej, a bardziej rozbudowana strona firmowa wymaga więcej czasu. Ostateczny termin zależy od zakresu projektu, gotowości treści i liczby poprawek.',
        },
        {
          question: 'Czy współpracujesz zdalnie?',
          answer:
            'Tak. Pracuję zdalnie z klientami z całej Polski i nie tylko. Cały proces jest prosty i wygodny — wszystko możemy ustalić mailowo, wiadomościami lub podczas rozmowy.',
        },
        {
          question: 'Czy tworzysz strony w WordPressie czy w Next.js?',
          answer:
            'Pracuję zarówno w WordPressie, jak i w Next.js. Dobór technologii zależy od celu projektu, potrzeb związanych z edycją treści, elastycznością i dalszym rozwojem strony.',
        },
        {
          question: 'Czy mogę zgłosić poprawki po pierwszej wersji?',
          answer:
            'Tak. W procesie przewidziane są poprawki, dzięki którym strona może zostać dopracowana przed wdrożeniem. Zależy mi na tym, żeby finalny efekt był estetyczny, czytelny i dobrze dopasowany do marki.',
        },
        {
          question: 'Czego potrzebujesz ode mnie na start?',
          answer:
            'Na początek wystarczy krótki brief: jakiej strony potrzebujesz, czym zajmuje się Twoja firma, jakie sekcje mają się znaleźć na stronie i czy masz inspiracje lub materiały marki.',
        },
      ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full overflow-hidden bg-[#007aff] text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_45%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.06),transparent_22%)]" />
      <div className="absolute left-[-10%] top-[8%] h-48 w-48 rounded-full bg-white/8 blur-3xl sm:h-60 sm:w-60" />
      <div className="absolute bottom-[-10%] right-[-10%] h-56 w-56 rounded-full bg-white/8 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative mx-auto max-w-[1100px] px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-12 lg:py-20 xl:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-md"
          >
            {isEn ? 'Frequently asked questions' : 'Najczęściej zadawane pytania'}
          </motion.span>

          <motion.h2
            id="faq-heading"
            variants={fadeUp}
            className="text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[2.35rem] md:text-[2.7rem] lg:text-[3rem]"
          >
            {isEn
              ? 'Everything you may want to know before we start'
              : 'Wszystko, co warto wiedzieć przed rozpoczęciem współpracy'}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-[14px] leading-6 text-white/88 sm:text-[16px] sm:leading-7"
          >
            {isEn
              ? 'Below you will find answers to the most common questions about pricing, process, timeline and remote collaboration.'
              : 'Poniżej znajdziesz odpowiedzi na najczęstsze pytania dotyczące wyceny, procesu współpracy, terminu realizacji i pracy zdalnej.'}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mx-auto mt-10 max-w-3xl space-y-3 sm:mt-12"
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <motion.article
                key={item.question}
                variants={itemVariant}
                className={`group overflow-hidden rounded-[20px] border backdrop-blur-lg transition-all duration-300 ${
                  isOpen
                    ? 'border-white/28 bg-white/[0.13]'
                    : 'border-white/14 bg-white/[0.08] hover:border-white/22 hover:bg-white/[0.1]'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-4.5"
                  >
                    <span className="pr-2 text-[15px] font-medium leading-6 text-white sm:text-[16px]">
                      {item.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex h-9 w-9 min-w-[36px] items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'border-white/25 bg-white text-[#007aff]'
                          : 'border-white/15 bg-white/10 text-white'
                      }`}
                    >
                      {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-4 pb-4 pt-3 text-[14px] leading-6 text-white/84 sm:px-5 sm:pb-5 sm:text-[15px] sm:leading-7">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}