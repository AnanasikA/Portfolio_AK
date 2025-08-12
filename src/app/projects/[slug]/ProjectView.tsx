// app/projects/[slug]/ProjectView.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiCheck,
  FiExternalLink,
  FiChevronLeft,
  FiCamera,
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
  image: string;
  ratio?: number;
  tech: string[];
  link?: string;

  // dotychczasowe
  work?: string[];
  results?: { timeframe?: string }; // używamy tylko timeframe w pasku info

  // NOWE sekcje (opcjonalne – renderują się tylko, gdy są dane)
  challenges?: Challenge[];
  decisions?: string[];
  integrations?: string[];
  handoff?: Record<string, string>;
  gallery?: string[];
};

export default function ProjectView({ project: p }: { project: Project }) {
  const work = p.work ?? [];
  const timeframe = p.results?.timeframe;
  const gallery = p.gallery ?? [];

  // dopasowanie ratio okładki do faktycznych wymiarów obrazu
  const [ratio, setRatio] = useState<number>(p.ratio ?? 1.6);

  return (
    <section className="w-full bg-[#007aff] text-white px-6 sm:px-10 py-20">
      <div className="max-w-6xl mx-auto">
        {/* breadcrumb */}
        <div className="mb-6 text-sm">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-white/60 rounded-full px-3 py-1 hover:bg-white hover:text-[#007aff] transition"
            aria-label="Wróć do listy projektów"
          >
            <FiChevronLeft /> Projekty
          </Link>
        </div>

        {/* header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light font-serif">{p.title}</h1>
          <p className="mt-3 text-white/90 max-w-2xl">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* cover – browser frame + idealne dopasowanie ratio obrazka */}
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

          {/* kontener z aspect-ratio = naturalWidth/naturalHeight → zero „szczelinek” */}
          <div className="relative w-full max-h-[760px]" style={{ aspectRatio: ratio }}>
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-contain object-center bg-[#007aff]"
              sizes="(min-width:1024px) 75vw, 95vw"
              priority
              onLoadingComplete={(img) => {
                const r = img.naturalWidth / img.naturalHeight;
                if (Number.isFinite(r) && r > 0) setRatio(r);
              }}
            />
          </div>
        </div>

        {/* main */}
        <div className="mt-10 grid md:grid-cols-5 gap-8">
          {/* left */}
          <div className="md:col-span-3 space-y-10">
            {/* pasek info (czas + link) */}
            {(timeframe || p.link) && (
              <div className="flex flex-wrap items-center gap-3">
                {timeframe && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs">
                    <FiClock className="opacity-90" />
                    Czas realizacji: <b className="font-medium">{timeframe}</b>
                  </span>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 px-3 py-1.5 text-xs hover:bg-white/10 transition"
                  >
                    Zobacz online <FiExternalLink className="opacity-90" />
                  </a>
                )}
              </div>
            )}

            {/* co zrobiłam */}
            {work.length > 0 && (
              <section aria-labelledby="work-heading">
                <h2 id="work-heading" className="text-2xl font-serif font-light mb-4">
                  Co zrobiłam w projekcie
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {work.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40">
                        <FiCheck className="text-white/90" />
                      </span>
                      <span className="text-white/90 text-sm leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* WYZWANIA → ROZWIĄZANIA */}
            {p.challenges && p.challenges.length > 0 && (
              <section aria-labelledby="challenges-heading">
                <h2 id="challenges-heading" className="text-2xl font-serif font-light mb-4">
                  Wyzwania i rozwiązania
                </h2>
                <div className="space-y-3">
                  {p.challenges.map((c, i) => (
                    <div key={i} className="rounded-xl border border-white/20 bg-white/5 p-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <FiAlertCircle className="mt-1 opacity-90" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-white/80">Wyzwanie</p>
                            <p className="text-sm mt-1 text-white/90">{c.problem}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FiZap className="mt-1 opacity-90" />
                          <div>
                            <p className="text-xs uppercase tracking-wide text-white/80">Rozwiązanie</p>
                            <p className="text-sm mt-1 text-white/90">{c.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* KLUCZOWE DECYZJE */}
            {p.decisions && p.decisions.length > 0 && (
              <section aria-labelledby="decisions-heading" className="mt-2">
                <h2 id="decisions-heading" className="text-2xl font-serif font-light mb-4">
                  Kluczowe decyzje projektowe
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {p.decisions.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                    >
                      <FiTool className="mt-0.5 opacity-90" />
                      <span className="text-white/90 text-sm leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* INTEGRACJE */}
            {p.integrations && p.integrations.length > 0 && (
              <section aria-labelledby="integrations-heading" className="mt-2">
                <h3 id="integrations-heading" className="text-xl font-serif font-light mb-3">
                  Integracje i połączenia
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.integrations.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs"
                    >
                      <FiLink className="opacity-80" />
                      {name}
                    </span>
                  ))}
                </div>
              </section>
            )}


            {/* GALERIA */}
            {gallery.length > 0 && (
              <section aria-labelledby="gallery-heading">
                <div className="mb-3 flex items-center gap-2">
                  <FiCamera className="opacity-80" />
                  <h3 id="gallery-heading" className="text-xl font-serif font-light">
                    Zrzuty ekranu
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {gallery.map((src, i) => (
                    <div
                      key={i}
                      className="group rounded-xl overflow-hidden border border-white/20 bg-white/5"
                    >
                      <div className="relative w-full" style={{ height: 'clamp(200px, 34vh, 420px)' }}>
                        <Image src={src} alt={`${p.title} – zrzut ${i + 1}`} fill className="object-contain" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* sidebar */}
          <aside className="md:col-span-2 md:pl-2">
            <div className="md:sticky md:top-8 space-y-4">
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full
                             bg-transparent text-white border border-white/70
                             px-6 py-2.5 text-sm font-light
                             hover:bg-white/10 active:scale-[0.99]
                             transition focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]"
                >
                  Zobacz online <FiExternalLink className="opacity-90" />
                </a>
              )}

              <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  Masz pytania lub chcesz podobny efekt?{' '}
                  <Link href="/#kontakt" className="underline hover:no-underline">
                    Napisz do mnie
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
