'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function FeaturedProjects() {
  const t = useTranslations('featuredProjects');

 const projects = [
  {
    title: t('projects.spiro.title'),
    category: t('projects.spiro.category'),
    description: t('projects.spiro.description'),
    image: '/spiropilates.png',
    href: '/projects/spiro-pilates-mobility',
  },
  {
    title: t('projects.crescent.title'),
    category: t('projects.crescent.category'),
    description: t('projects.crescent.description'),
    image: '/crescent.png',
    href: '/projects/crescent-development',
  },
  {
    title: t('projects.luisowka.title'),
    category: t('projects.luisowka.category'),
    description: t('projects.luisowka.description'),
    image: '/Luisowka.png',
    href: '/projects/luisowka',
  },
];

  return (
    <section
      id="projekty"
      className="bg-[#f7fbff] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">
<div className="mb-14">
  <span className="mb-4 inline-flex rounded-full bg-[#007aff]/10 px-4 py-2 text-xs font-medium text-[#007aff]">
    {t('badge')}
  </span>

  <h2 className="max-w-[720px] font-serif text-[2.3rem] font-medium leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-[2.8rem] lg:text-[4rem]">
    {t('title')}
  </h2>
</div>

        <div className="grid gap-14 md:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group block"
            >
              <div className="flex min-h-[360px] items-start justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-contain scale-[1.08]"
                />
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#007aff]">
                  {project.category}
                </p>

                <h3 className="mt-3 font-serif text-[1.8rem] font-medium tracking-[-0.035em] text-slate-950">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {project.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-medium text-[#007aff] transition rounded-full border border-slate-300 px-6 py-3 duration-300 group-hover:translate-x-1">
                  {t('cta')} →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center">
  <p className="max-w-md text-sm leading-6 text-slate-600">
    {t('ctaText')}
  </p>

  <div className="flex flex-col gap-3 sm:flex-row">
    <Link
      href="/projects"
      className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-[#007aff] hover:text-[#007aff]"
    >
      {t('allProjects')}
    </Link>

    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-brief'))}
      className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#007aff] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#006ee6]"
    >
      {t('askQuote')}
    </button>
  </div>
</div>
      </div>
    </section>
  );
}