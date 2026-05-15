'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Marta Kowalska',
    company: 'Studio Pilates Marta',
    industry: 'Fitness & Wellness',
    avatar: 'MK',
    quote:
      'Anastasiia zrobiła nam stronę szybko i bez stresu. Od razu wiedziała, czego potrzebujemy — wynik przeszedł nasze oczekiwania. Klienci często wspominają, że strona wygląda bardzo profesjonalnie.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Tomasz Wiśniewski',
    company: 'Crescent Development',
    industry: 'Nieruchomości',
    avatar: 'TW',
    quote:
      'Współpraca przebiegła sprawnie i profesjonalnie. Strona jest przejrzysta, szybka i świetnie prezentuje nasze inwestycje. Polecam każdemu, kto szuka rzetelnego wykonawcy.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Karolina Nowak',
    company: 'Luisówka',
    industry: 'Turystyka & Noclegi',
    avatar: 'KN',
    quote:
      'Strona zrobiła ogromną różnicę — rezerwacje wzrosły od razu po uruchomieniu. Anastasiia zadbała o każdy detal, a galeria zdjęć wygląda rewelacyjnie. Bardzo polecam!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Piotr Jabłoński',
    company: 'Gabinet Stomatologiczny',
    industry: 'Medycyna',
    avatar: 'PJ',
    quote:
      'Potrzebowałem prostej, zaufanej strony dla gabinetu. Anastasiia dostarczyła dokładnie to — elegancki projekt, szybkie wdrożenie i zero problemów technicznych.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Agnieszka Zielińska',
    company: 'Kancelaria Prawna AZ',
    industry: 'Prawo',
    avatar: 'AZ',
    quote:
      'Zależało mi na stronie, która buduje zaufanie. Anastasiia świetnie to rozumiała — projekt jest poważny, elegancki i działa bez zarzutu. Klienci chwalą.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Michał Dąbrowski',
    company: 'MD Fotografia',
    industry: 'Fotografia',
    avatar: 'MD',
    quote:
      'Potrzebowałem portfolio, które pokaże moje zdjęcia w najlepszym świetle. Anastasiia stworzyła stronę, która naprawdę zachwyca. Szybka, estetyczna i prosta w obsłudze.',
    rating: 5,
  },
  {
    id: 7,
    name: 'Ewa Wojciechowska',
    company: 'Pracownia Wnętrz EW',
    industry: 'Architektura wnętrz',
    avatar: 'EW',
    quote:
      'Współpraca była przyjemna od pierwszego kontaktu. Anastasiia szybko zrozumiała styl mojej marki i przełożyła go na stronę. Efekt przerósł oczekiwania.',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena: ${count} na 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-white/90"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = testimonials.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setOffset((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go]);

  const visibleCards = Array.from({ length: 3 }, (_, i) =>
    testimonials[(offset + i) % total]
  );

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-[#007aff] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background — spójne z Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_40%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_24%)]" />
      <div className="absolute left-[-10%] top-[10%] h-40 w-40 rounded-full bg-white/8 blur-xl sm:h-56 sm:w-56" />
      <div className="absolute bottom-[-10%] right-[-10%] h-48 w-48 rounded-full bg-white/8 blur-xl sm:h-64 sm:w-64" />

      <div className="relative mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-12 lg:py-24 xl:px-16 xl:py-28 2xl:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/90 sm:text-sm">
            Opinie klientów
          </span>
          <h2
            id="testimonials-heading"
            className="font-serif text-[2rem] leading-[1.04] tracking-[-0.04em] text-white sm:text-[2.5rem] md:text-[2.9rem] lg:text-[3.15rem]"
          >
            Co mówią klienci
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={offset}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleCards.map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="flex flex-col rounded-[22px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-7"
                >
                  <StarRating count={t.rating} />

                  <blockquote className="relative mt-5 flex-1">
                    <span
                      className="absolute -left-1 -top-3 font-serif text-5xl leading-none text-white/20 select-none"
                      aria-hidden="true"
                    >
                      "
                    </span>
                    <p className="relative z-10 text-[15px] leading-7 text-white/90">
                      {t.quote}
                    </p>
                  </blockquote>

                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/60">
                        {t.company} · {t.industry}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Poprzednie opinie"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2" role="tablist" aria-label="Nawigacja opinii">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === offset}
                aria-label={`Opinia ${i + 1}`}
                onClick={() => {
                  setDirection(i > offset ? 1 : -1);
                  setOffset(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === offset
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Następne opinie"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}