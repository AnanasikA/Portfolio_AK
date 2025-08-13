// app/projects/[slug]/ProjectView.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';

import {
  FiCheck,
  FiExternalLink,
  FiChevronLeft,
  FiClock,
  FiAlertCircle,
  FiZap,
  FiTool,
  FiLink,
} from 'react-icons/fi';

type Challenge = { problem: string; solution: string };

type Project = {
  title: string;
  slug: string;
  description: string;
  image: string; // długi zrzut strony (scrollowany w ramce)
  ratio?: number;
  tech: string[];
  link?: string;

  work?: string[];
  results?: { timeframe?: string };

  challenges?: Challenge[];
  decisions?: string[];
  integrations?: string[];
  handoff?: Record<string, string>;
  gallery?: string[];
};

// Ikony – jeden rozmiar
const ICON_SIZE = 16;
const ICON_CLASS = 'shrink-0 align-middle';

export default function ProjectView({ project: p }: { project: Project }) {
  const work = p.work ?? [];
  const timeframe = p.results?.timeframe;

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // blokada przewijania tła przy otwartym menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <section className="w-full bg-[#007aff] text-white px-6 sm:px-10 pt-28 sm:pt-36 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* breadcrumb */}
          <div className="mb-6 text-sm">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-white/60 rounded-full px-3 py-1 hover:bg-white hover:text-[#007aff] transition"
              aria-label="Wróć do listy projektów"
            >
              <FiChevronLeft size={ICON_SIZE} className={ICON_CLASS} /> Projekty
            </Link>
          </div>

          {/* header strony projektu */}
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-light font-serif">{p.title}</h1>
            <p className="mt-3 text-white/90 max-w-2xl leading-relaxed">{p.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/90"
                >
                  <FiTool size={ICON_SIZE} className={`${ICON_CLASS} opacity-80`} />
                  {t}
                </span>
              ))}
            </div>
          </header>

          {/* cover – przeglądarka + scrollowana zawartość */}
          <div className="rounded-2xl overflow-hidden border border-white/25">
            {/* pasek „przeglądarki” */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-white/15 bg-white/5">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="ml-3 flex-1 h-6 rounded-md border border-white/20 bg-white/10" />
            </div>

            {/* przewijana ramka z długim zrzutem */}
            <div
              className="relative w-full h-[72svh] max-h-[780px] overflow-auto bg-[#007aff] overscroll-contain"
              tabIndex={0}
              role="region"
              aria-label="Podgląd pełnej strony — przewijaj w ramce, aby zobaczyć całość"
              style={{ scrollbarGutter: 'stable'}}
            >
              <Image
                src={p.image}
                alt={`${p.title} — długi zrzut strony (przewijany w ramce)`}
                // przy bardzo wysokich obrazach często najlepiej działa wyłączenie optymalizera
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

          {/* main */}
          <div className="mt-10 grid md:grid-cols-5 gap-8">
            {/* left */}
            <div className="md:col-span-3 space-y-10">
              {/* pasek info – tylko czas realizacji */}
              {timeframe && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs">
                    <FiClock size={ICON_SIZE} className={`${ICON_CLASS} opacity-90`} />
                    Czas realizacji: <b className="font-medium">{timeframe}</b>
                  </span>
                </div>
              )}

              {/* co zrobiłam */}
              {work.length > 0 && (
                <section id="work" aria-labelledby="work-heading">
                  <h2 id="work-heading" className="text-2xl font-serif font-light mb-4">
                    Co zrobiłam w projekcie
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {work.map((w, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40 leading-none">
                          <FiCheck size={ICON_SIZE} className={`${ICON_CLASS} text-white/90`} />
                        </span>
                        <span className="text-white/90 text-sm leading-relaxed">{w}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* WYZWANIA → ROZWIĄZANIA */}
              {p.challenges && p.challenges.length > 0 && (
                <section id="challenges" aria-labelledby="challenges-heading">
                  <h2 id="challenges-heading" className="text-2xl font-serif font-light mb-4">
                    Wyzwania i rozwiązania
                  </h2>

                  <div className="space-y-4">
                    {p.challenges.map((c, i) => (
                      <article
                        key={i}
                        className="rounded-2xl overflow-hidden border border-white/20 bg-white/5"
                      >
                        <div className="grid sm:grid-cols-2">
                          <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/10">
                            <div className="flex items-start gap-3">
                              <FiAlertCircle
                                size={ICON_SIZE}
                                className={`${ICON_CLASS} opacity-90 mt-0.5`}
                              />
                              <div>
                                <p className="text-xs uppercase tracking-wide text-white/80">
                                  Wyzwanie
                                </p>
                                <p className="text-sm mt-1 text-white/90">{c.problem}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white/[0.06]">
                            <div className="flex items-start gap-3">
                              <FiZap
                                size={ICON_SIZE}
                                className={`${ICON_CLASS} opacity-90 mt-0.5`}
                              />
                              <div>
                                <p className="text-xs uppercase tracking-wide text-white/80">
                                  Rozwiązanie
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

              {/* KLUCZOWE DECYZJE */}
              {p.decisions && p.decisions.length > 0 && (
                <section id="decisions" aria-labelledby="decisions-heading" className="mt-2">
                  <h2 id="decisions-heading" className="text-2xl font-serif font-light mb-4">
                    Kluczowe decyzje projektowe
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {p.decisions.map((d, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                      >
                        <FiTool size={ICON_SIZE} className={`${ICON_CLASS} opacity-90 mt-0.5`} />
                        <span className="text-white/90 text-sm leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* INTEGRACJE */}
              {p.integrations && p.integrations.length > 0 && (
                <section id="integrations" aria-labelledby="integrations-heading" className="mt-2">
                  <h3 id="integrations-heading" className="text-xl font-serif font-light mb-3">
                    Integracje i połączenia
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {p.integrations.map((name) => (
                      <span
                        key={name}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs"
                      >
                        <FiLink size={ICON_SIZE} className={`${ICON_CLASS} opacity-80`} />
                        {name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* sidebar */}
            <aside className="md:col-span-2 md:pl-2">
              <div className="md:sticky md:top-24">
                <div className="rounded-2xl border border-white/20 bg-white/5 p-4 space-y-3">
                  <p className="text-sm text-white/80 leading-relaxed">
                    Masz pytania lub chcesz podobny efekt? Po prostu napisz — odezwę się z propozycją.
                  </p>

                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full
                                 bg-white text-[#007aff]
                                 px-6 py-2.5 text-sm font-medium
                                 hover:opacity-90 active:scale-[0.99] transition"
                    >
                      Zobacz online <FiExternalLink size={ICON_SIZE} className={ICON_CLASS} />
                    </a>
                  )}

                  <Link
                    href="/#kontakt"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full
                               bg-white text-[#007aff]
                               px-6 py-2.5 text-sm font-medium
                               hover:opacity-90 active:scale-[0.99] transition"
                  >
                    Skontaktuj się
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
