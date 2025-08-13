// app/projects/Projects.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import type { ProjectItem } from '@/data/projects';
import { Libre_Baskerville } from 'next/font/google';

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function Projects() {
  // slug -> ratio (width/height) wykryte po załadowaniu obrazka
  const [ratios, setRatios] = useState<Record<string, number>>({});

  return (
    <section
      id="projects"
      aria-label="Projekty"
      className="w-full py-24 px-4 sm:px-6 bg-[#007aff] text-white"
    >
      <div className="max-w-7xl mx-auto mb-10">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${libre.className} text-5xl sm:text-4xl font-light mt-2`}
          >
            Moje projekty w sieci
          </motion.h2>
          <p className="mt-4 text-white text-base max-w-2xl mx-auto leading-relaxed">
            Poznaj strony, które stworzyłam od pierwszego szkicu po finalny kod – dopasowane do potrzeb klientów, nowoczesne w formie i przyjazne w użytkowaniu.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
            aria-label="Wróć na stronę główną"
          >
            <span>←</span> Strona główna
          </Link>
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
            aria-label="Przejdź do sekcji kontakt"
          >
            Napisz do mnie →
          </Link>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {projects.map((project: ProjectItem, index) => {
          const cardImg = project.cardImage || project.image;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="border border-white/40 rounded-xl p-5 flex flex-col gap-y-4 bg-transparent"
            >
              {/* Ramka dopasowana 1:1 do naturalnego ratio obrazka */}
              <div
                className="relative w-full rounded-md overflow-hidden border border-white/30"
                style={{ aspectRatio: ratios[project.slug] ?? 1.6 }} // fallback 16:10
              >
                <Image
                  src={cardImg}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 90vw"
                  priority={index < 3}
                  onLoadingComplete={(img) => {
                    const r = img.naturalWidth / img.naturalHeight;
                    if (Number.isFinite(r) && r > 0) {
                      setRatios((prev) =>
                        prev[project.slug] === r ? prev : { ...prev, [project.slug]: r },
                      );
                    }
                  }}
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement;
                    if (!t.src.endsWith('/images/placeholder-card.webp')) {
                      t.src = '/images/placeholder-card.webp';
                    }
                  }}
                />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className={`${libre.className} text-2xl font-light mb-2`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/90 mb-4">{project.description}</p>
                </div>

                <div className="mt-auto flex flex-wrap justify-between items-center gap-3">
                  <div className="flex flex-wrap gap-2 text-xs text-white">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/50 text-white px-2 py-1 rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-white border border-white hover:bg-white hover:text-[#007aff] transition px-3 py-1 rounded-full"
                    aria-label={`Zobacz szczegóły: ${project.title}`}
                  >
                    Zobacz projekt →
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto mt-14 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
          aria-label="Wróć na stronę główną"
        >
          ← Strona główna
        </Link>
        <Link
          href="/#kontakt"
          className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
          aria-label="Przejdź do sekcji kontakt"
        >
          Kontakt →
        </Link>
      </div>
    </section>
  );
}
