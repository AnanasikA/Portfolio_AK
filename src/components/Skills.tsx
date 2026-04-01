'use client';

import Script from 'next/script';
import { FiArrowRight } from 'react-icons/fi';
import { Libre_Baskerville } from 'next/font/google';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function SkillsSection() {
  const t = useTranslations('skills');

  const skills = [
    {
      key: 'web',
      type: 'lordicon',
      src: 'https://cdn.lordicon.com/ogjpwrxe.json',
    },
    {
      key: 'ux',
      type: 'lordicon',
      src: 'https://cdn.lordicon.com/sobzmbzh.json',
    },
    {
      key: 'frontend',
      type: 'lordicon',
      src: 'https://cdn.lordicon.com/ailnzwyn.json',
    },
    {
      key: 'responsive',
      type: 'lordicon',
      src: 'https://cdn.lordicon.com/ggnoyhfp.json',
    },
  ];

  return (
    <section id="skills" className="w-full bg-[#007aff] text-white pt-20 pb-12 px-6 sm:px-10">
      {/* ✅ Script tylko raz */}
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      <div className="max-w-6xl mx-auto">
        <h2 className={`${libre.className} text-4xl sm:text-5xl text-center font-light mb-14`}>
          {t('title')}
        </h2>

        <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.key}
              className="group flex items-start gap-5 rounded-2xl p-6 sm:p-7
                         border border-white/20 bg-white/5
                         hover:bg-white/10 hover:border-white/30
                         transition"
            >
              {/* IKONA */}
              <div className="w-12 h-12 min-w-[48px] flex items-center justify-center">
                <lord-icon
                  src={skill.src}
                  trigger="loop"
                  colors="primary:#e4e4e4,secondary:#93c5fd"
                  style={{ width: '36px', height: '36px' }}
                />
              </div>

              {/* TEKST */}
              <div>
                <h3 className={`${libre.className} text-lg sm:text-xl font-light mb-1.5`}>
                  {t(`${skill.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  {t(`${skill.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <Link
            href="/projects"
            aria-label={t('cta_aria')}
            className="group inline-flex items-center gap-2 rounded-full
                       bg-transparent text-white border border-white/70
                       px-7 py-3 text-base font-light
                       hover:bg-white/10 active:scale-[0.99]
                       transition focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]"
          >
            {t('cta')}
            <FiArrowRight className="opacity-90 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}