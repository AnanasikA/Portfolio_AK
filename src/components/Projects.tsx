'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
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
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const tPage = useTranslations('projectsPage');
  const tProjects = useTranslations('projects');

  return (
    <section
      id="projects"
      aria-label={tPage('title')}
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
            {tPage('title')}
          </motion.h2>

          <p className="mt-4 text-white text-base max-w-2xl mx-auto leading-relaxed">
            {tPage('subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
            aria-label={tPage('homeAria')}
          >
            <span>←</span> {tPage('home')}
          </Link>

          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
            aria-label={tPage('contactAria')}
          >
            {tPage('contactTop')} →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch">
        {projects.map((project: ProjectItem, index) => {
          const cardImg = project.cardImage || project.image;
          const title = tProjects(`${project.slug}.title`);
          const description = tProjects(`${project.slug}.description`);

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="h-full border border-white/40 rounded-xl p-5 flex flex-col bg-transparent"
            >
              <div
                className="relative w-full rounded-md overflow-hidden border border-white/30"
                style={{ aspectRatio: ratios[project.slug] ?? 1.6 }}
              >
                <Image
                  src={cardImg}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 90vw"
                  priority={index < 3}
                  onLoadingComplete={(img) => {
                    const r = img.naturalWidth / img.naturalHeight;
                    if (Number.isFinite(r) && r > 0) {
                      setRatios((prev) =>
                        prev[project.slug] === r ? prev : { ...prev, [project.slug]: r }
                      );
                    }
                  }}
                />
              </div>

              <div className="flex flex-col flex-1 pt-4">
                <div>
                  <h3 className={`${libre.className} text-2xl font-light leading-tight min-h-[72px]`}>
                    {title}
                  </h3>

                  <p className="mt-3 text-sm text-white/90 leading-relaxed line-clamp-4 min-h-[96px]">
                    {description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/50 text-white px-2 py-1 rounded-md text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex text-sm text-white border border-white hover:bg-white hover:text-[#007aff] transition px-3 py-1 rounded-full"
                    aria-label={tPage('projectDetailsAria', { title })}
                  >
                    {tPage('projectButton')} →
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto mt-14 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
          aria-label={tPage('homeAria')}
        >
          ← {tPage('home')}
        </Link>

        <Link
          href="/#kontakt"
          className="inline-flex items-center gap-2 border border-white/80 px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#007aff] transition"
          aria-label={tPage('contactAria')}
        >
          {tPage('contactBottom')} →
        </Link>
      </div>
    </section>
  );
}