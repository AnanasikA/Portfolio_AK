'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const skills = [
  {
    title: 'Projektowanie stron',
    description:
      'Tworzę estetyczne, funkcjonalne strony internetowe dopasowane do Twojej marki i celów biznesowych.',
    icon: '/web-icon.png',
  },
  {
    title: 'Design UX/UI',
    description:
      'Dbam o doświadczenie użytkownika – od intuicyjnych interfejsów po spójny styl wizualny.',
    icon: '/ux-icon.png',
  },
  {
    title: 'Front-end development',
    description:
      'Piszę lekki, responsywny i nowoczesny kod w Next.js oraz Tailwind CSS.',
    icon: '/code-icon.png',
  },
  {
    title: 'Optymalizacja i responsywność',
    description:
      'Strony działają płynnie i świetnie wyglądają na każdym ekranie – od telefonu po duży monitor.',
    icon: '/responsive-icon.png',
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full bg-[#007aff] text-white pt-20 pb-12 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl text-center font-light mb-14"
          style={{ fontFamily: 'Libre Baskerville, serif' }}
        >
          Co potrafię?
        </h2>

        <div className="grid gap-8 sm:gap-10 grid-cols-1 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="flex items-start gap-5 rounded-2xl p-6 sm:p-7
                         border border-white/20 bg-white/5
                         hover:bg-white/10 hover:border-white/30
                         transition will-change-transform"
            >
              <div className="w-12 h-12 min-w-[48px]">
                <Image src={skill.icon} alt={skill.title} width={48} height={48} />
              </div>

              <div>
                <h3
                  className="text-lg sm:text-xl font-light mb-1.5"
                  style={{ fontFamily: 'Libre Baskerville, serif' }}
                >
                  {skill.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA – spójny z Hero (outline + strzałka) */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <Link
            href="/projects"
            aria-label="Zobacz projekty"
            className="group inline-flex items-center gap-2 rounded-full
                       bg-transparent text-white border border-white/70
                       px-7 py-3 text-base font-light
                       hover:bg-white/10 active:scale-[0.99]
                       transition focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Zobacz projekty
            <FiArrowRight className="opacity-90 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
