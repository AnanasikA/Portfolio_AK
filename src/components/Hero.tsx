'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useCallback } from 'react';

const HERO_SRC = '/laptop-scene-hero.webp';
const HERO_FALLBACK = '/images/placeholder-hero.webp'; // wrzuć do public/images/

export default function Hero() {
  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const t = e.currentTarget;
    if (!t.src.endsWith(HERO_FALLBACK)) t.src = HERO_FALLBACK;
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[100svh] bg-[#007aff] overflow-hidden flex flex-col lg:flex-row items-center justify-between"
    >
      {/* Tekst */}
      <div className="w-full lg:w-1/2 xl:w-[42%] 2xl:w-[40%] flex items-center justify-center px-6 sm:px-10 pt-24 sm:pt-28 lg:pt-0 pb-12 text-white">
        <div className="max-w-xl text-center lg:text-left">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl font-light mb-6 font-serif">
            Projektuję strony internetowe, które robią wrażenie.
          </h1>

          <p className="mb-6 text-base sm:text-lg text-white/90 font-sans">
            Nowoczesne witryny w&nbsp;Next.js i&nbsp;Tailwind CSS — jasne zasady,
            szybka realizacja i&nbsp;efekt, który wyróżnia Twoją markę w&nbsp;sieci.
          </p>

          <Link
            href="/projects"
            aria-label="Zobacz projekty — portfolio stron internetowych"
            className="inline-flex items-center gap-2 rounded-full
                       bg-transparent text-white border border-white/70
                       px-7 py-3 text-base font-light
                       hover:bg-white/10 active:scale-[0.99]
                       transition focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]"
          >
            Zobacz moje projekty
            <FiArrowRight className="opacity-90" />
          </Link>
        </div>
      </div>

      {/* Ilustracja */}
      <div className="relative w-full lg:w-1/2 xl:w-[58%] 2xl:w-[60%] flex items-center justify-center p-6 lg:p-8 xl:p-10">
        <div className="relative w-full h-[40vh] sm:h-[48vh] lg:h-[60vh] xl:h-[72vh] 2xl:h-[80vh]">
          <Image
            src={HERO_SRC}
            alt="Ilustracja projektowania stron — laptop z kodem i elementami UI"
            fill
            className="object-contain rounded-lg"
            priority
            sizes="(min-width:1536px) 60vw, (min-width:1280px) 58vw, (min-width:1024px) 50vw, 90vw"
            onError={handleImgError}
          />
        </div>
      </div>
    </section>
  );
}
