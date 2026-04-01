'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';

import {
  FiExternalLink,
  FiChevronLeft,
} from 'react-icons/fi';

type Project = {
  slug: string;
  image: string;
  cardImage: string;
  ratio?: number;
  tech: string[];
  link?: string;
};

type Challenge = {
  problem: string;
  solution: string;
};

const ICON_SIZE = 16;
const ICON_CLASS = 'shrink-0 align-middle';

export default function ProjectView({ project: p }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const locale = useLocale();
  const t = useTranslations('projects');
  const tPage = useTranslations('projectsPage');
  const tDetail = useTranslations('projectDetail');

  const title = t(`${p.slug}.title`);
  const description = t(`${p.slug}.description`);

  const overview = t.has(`${p.slug}.overview`)
    ? t(`${p.slug}.overview`)
    : '';

  const work = t.has(`${p.slug}.work`)
    ? (t.raw(`${p.slug}.work`) as string[])
    : [];

  const timeframe = t.has(`${p.slug}.timeframe`)
    ? t(`${p.slug}.timeframe`)
    : '';

  const highlights = t.has(`${p.slug}.highlights`)
    ? (t.raw(`${p.slug}.highlights`) as string[])
    : [];

  const challenges = t.has(`${p.slug}.challenges`)
    ? (t.raw(`${p.slug}.challenges`) as Challenge[])
    : [];

  const decisions = t.has(`${p.slug}.decisions`)
    ? (t.raw(`${p.slug}.decisions`) as string[])
    : [];

  const integrations = t.has(`${p.slug}.integrations`)
    ? (t.raw(`${p.slug}.integrations`) as string[])
    : [];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div>
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <section className="w-full bg-[#007aff] text-white px-6 sm:px-10 pt-28 sm:pt-36 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-sm">
            <Link
              href="/projects"
              locale={locale}
              className="inline-flex items-center gap-2 border border-white/60 rounded-full px-3 py-1 hover:bg-white hover:text-[#007aff] transition"
              aria-label={tPage('backToProjectsAria')}
            >
              <FiChevronLeft size={ICON_SIZE} className={ICON_CLASS} />
              {tPage('backToProjects')}
            </Link>
          </div>

          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-light font-serif">{title}</h1>
            <p className="mt-3 text-white/90 max-w-2xl leading-relaxed">{description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/90"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/ubpgwkmy.json"
                    trigger="loop"
                    colors="primary:#e4e4e4,secondary:#93c5fd"
                    style={{ width: '30px', height: '30px' }}
                  />
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div className="rounded-2xl overflow-hidden border border-white/25">
            <div className="px-4 py-3 flex items-center gap-3 border-b border-white/15 bg-white/5">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-3 flex-1 h-6 rounded-md border border-white/20 bg-white/10" />
            </div>

            <div
              className="relative w-full h-[72svh] max-h-[780px] overflow-auto bg-[#007aff] overscroll-contain"
              tabIndex={0}
              role="region"
              aria-label={tDetail('imagePreviewAria', { title })}
              style={{ scrollbarGutter: 'stable' }}
            >
              <Image
                src={p.image}
                alt={tDetail('imageAlt', { title })}
                unoptimized
                priority
                draggable={false}
                sizes="(min-width:1024px) 75vw, 95vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                width={2000}
                height={1000}
              />
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-10">
              {overview && (
                <section aria-labelledby="overview-heading">
                  <h2 id="overview-heading" className="text-2xl font-serif font-light mb-4">
                    {tDetail('overviewTitle')}
                  </h2>
                  <p className="text-white/90 leading-relaxed">{overview}</p>
                </section>
              )}

              {timeframe && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs">
                    <lord-icon
                      src="https://cdn.lordicon.com/warimioc.json"
                      trigger="loop"
                      colors="primary:#e4e4e4,secondary:#93c5fd"
                      style={{ width: '24px', height: '24px' }}
                    />
                    {tDetail('timeframeLabel')}: <b className="font-medium">{timeframe}</b>
                  </span>
                </div>
              )}

              {work.length > 0 && (
                <section id="work" aria-labelledby="work-heading">
                  <h2 id="work-heading" className="text-2xl font-serif font-light mb-4">
                    {tDetail('workTitle')}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {work.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3  px-4 py-3"
                      >
                          <lord-icon
                            src="https://cdn.lordicon.com/vbmtnozn.json"
                            trigger="hover"
                            colors="primary:#e4e4e4,secondary:#93c5fd"
                            style={{ width: '30px', height: '30px' }}
                          />
                        <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {highlights.length > 0 && (
                <section id="results" aria-labelledby="results-heading">
                  <h2 id="results-heading" className="text-2xl font-serif font-light mb-4">
                    {tDetail('resultsTitle')}
                  </h2>
                  <ul className="grid gap-3">
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/qbnpjakp.json"
                          trigger="loop"
                          colors="primary:#e4e4e4"
                          style={{ width: '24px', height: '24px', marginTop: '2px' }}
                        />
                    
                        <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {challenges.length > 0 && (
                <section id="challenges" aria-labelledby="challenges-heading">
                  <h2 id="challenges-heading" className="text-2xl font-serif font-light mb-4">
                    {tDetail('challengesTitle')}
                  </h2>

                  <div className="space-y-4">
                    {challenges.map((c, i) => (
                      <article
                        key={i}
                        className="rounded-2xl overflow-hidden border border-white/20 bg-white/5"
                      >
                        <div className="grid sm:grid-cols-2">
                          <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/10">
                            <div className="flex items-start gap-3">
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                colors="primary:#e4e4e4,secondary:#93c5fd"
                                style={{ width: '36px', height: '36px', marginTop: '5px' }}
                              />
                              <div>
                                <p className="text-xs uppercase tracking-wide text-white/80">
                                  {tDetail('challengeLabel')}
                                </p>
                                <p className="text-sm mt-1 text-white/90">{c.problem}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white/[0.06]">
                            <div className="flex items-start gap-3">
                              <lord-icon
                                src="https://cdn.lordicon.com/ubpgwkmy.json"
                                trigger="hover"
                                colors="primary:#e4e4e4,secondary:#93c5fd"
                                style={{ width: '40px', height: '40px', marginTop: '2px' }}
                              />
                              <div>
                                <p className="text-xs uppercase tracking-wide text-white/80">
                                  {tDetail('solutionLabel')}
                                </p>
                                <p className="text-sm mt-1 text-white/90">{c.solution}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {decisions.length > 0 && (
                <section id="decisions" aria-labelledby="decisions-heading">
                  <h2 id="decisions-heading" className="text-2xl font-serif font-light mb-4">
                    {tDetail('decisionsTitle')}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {decisions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/fwkrbvja.json"
                          trigger="loop"
                          colors="primary:#e4e4e4,secondary:#93c5fd"
                          style={{ width: '34px', height: '34px', marginTop: '2px' }}
                        />
                        <span className="text-white/90 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {integrations.length > 0 && (
                <section id="integrations" aria-labelledby="integrations-heading">
                  <h3 id="integrations-heading" className="text-xl font-serif font-light mb-3">
                    {tDetail('integrationsTitle')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {integrations.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs"
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gsjfryhc.json"
                          trigger="loop"
                          colors="primary:#e4e4e4,secondary:#93c5fd"
                          style={{ width: '24px', height: '24px' }}
                        />
                        {name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="md:col-span-2 md:pl-2">
              <div className="md:sticky md:top-24">
                <div className="rounded-2xl border border-white/20 bg-white/5 p-4 space-y-3">
                  <p className="text-sm text-white/80 leading-relaxed">
                    {tDetail('sidebarText')}
                  </p>

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#007aff] px-6 py-2.5 text-sm font-medium hover:opacity-90 active:scale-[0.99] transition"
                    >
                      {tDetail('viewOnline')}
                      <lord-icon
                        src="https://cdn.lordicon.com/rpviwvwn.json"
                        trigger="loop"
                        delay="2000"
                        colors="primary:#007aff,secondary:#60a5fa"
                        style={{ width: '18px', height: '18px' }}
                      />
                    </a>
                  )}

                  <Link
                    href="/#kontakt"
                    locale={locale}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#007aff] px-6 py-2.5 text-sm font-medium hover:opacity-90 active:scale-[0.99] transition"
                  >
                    {tDetail('contact')}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}