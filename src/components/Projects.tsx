'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import type { ProjectItem } from '@/data/projects';

const PER_PAGE = 6;

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

type ProjectsProps = {
  currentPage?: number;
};

export default function Projects({ currentPage = 1 }: ProjectsProps) {
  const tPage = useTranslations('projectsPage');
  const tProjects = useTranslations('projects');
  const locale = useLocale();
  const isEn = locale === 'en';

  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / PER_PAGE);
  const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startIndex = (safePage - 1) * PER_PAGE;
  const visibleProjects = projects.slice(startIndex, startIndex + PER_PAGE);

  const itemListSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: isEn
        ? 'Selected web design projects'
        : 'Wybrane realizacje stron internetowych',
      numberOfItems: visibleProjects.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: visibleProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: startIndex + index + 1,
        url: `/projects/${project.slug}`,
        name: tProjects(`${project.slug}.title`),
      })),
    }),
    [visibleProjects, startIndex, isEn, tProjects]
  );

  const getPageHref = (page: number) => {
    if (page <= 1) return '/projects';
    return `/projects?page=${page}`;
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative w-full overflow-hidden bg-[#007aff] text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,#007aff_0%,#0a72ea_45%,#006bde_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.10),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.08),transparent_24%)]" />
      <div className="absolute left-[-10%] top-[8%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-12%] right-[-10%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:px-12 lg:py-28 xl:px-16 2xl:px-20">
        <header className="mx-auto max-w-3xl text-center">
          <motion.span
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm backdrop-blur-md"
          >
            {isEn ? 'Selected projects' : 'Wybrane realizacje'}
          </motion.span>

          <motion.h2
            id="projects-heading"
            itemProp="name"
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]"
          >
            {tPage('title')}
          </motion.h2>

          <motion.p
            itemProp="description"
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/90 sm:text-lg sm:leading-8"
          >
            {tPage('subtitle')}
          </motion.p>
        </header>

        <motion.div
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={tPage('homeAria')}
          >
            <span aria-hidden="true">←</span> {tPage('home')}
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={tPage('contactAria')}
          >
            {tPage('contactTop')} <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6"
        >
          {visibleProjects.map((project: ProjectItem, index) => {
            const cardImg = project.cardImage || project.image;
            const title = tProjects(`${project.slug}.title`);
            const description = tProjects(`${project.slug}.description`);
            const detailHref = `/projects/${project.slug}`;

            return (
              <motion.li
                key={project.slug}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                custom={0.18 + index * 0.06}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={fadeUp}
                className="list-none"
              >
                <meta itemProp="position" content={String(startIndex + index + 1)} />

                <article
                  className="group flex h-full flex-col rounded-[14px] border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] sm:p-6"
                >
                  <div
                    itemProp="item"
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                    className="flex h-full flex-col"
                  >
                    <Link
                      href={detailHref}
                      aria-label={tPage('projectDetailsAria', { title })}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      itemProp="url"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] border border-white/15 bg-white/5">
                        <Image
                          src={cardImg}
                          alt={title}
                          fill
                          className="object-cover object-top transition duration-500"
                          sizes="(min-width:1280px) 30vw, (min-width:768px) 46vw, 92vw"
                          loading={index < 3 ? 'eager' : 'lazy'}
                          priority={safePage === 1 && index === 0}
                        />
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col pt-5">
                      <div>
                        <h3
                          itemProp="name"
                          className="min-h-[64px] text-2xl font-semibold leading-tight tracking-[-0.03em] text-white"
                        >
                          {title}
                        </h3>

                        <p
                          itemProp="description"
                          className="mt-3 min-h-[96px] text-sm leading-6 text-white/88 sm:text-[15px]"
                        >
                          {description}
                        </p>
                      </div>

                      <ul
                        aria-label={
                          isEn
                            ? `Technologies used in ${title}`
                            : `Technologie użyte w projekcie ${title}`
                        }
                        className="mt-5 flex flex-wrap gap-2"
                      >
                        {project.tech.map((tech) => (
                          <li key={tech} className="list-none">
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                              {tech}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6">
                        <Link
                          href={detailHref}
                          className="inline-flex items-center gap-2 rounded-full border border-white/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                          aria-label={tPage('projectDetailsAria', { title })}
                        >
                          {tPage('projectButton')} <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ol>

        {totalPages > 1 && (
          <nav
            aria-label={isEn ? 'Projects pagination' : 'Paginacja projektów'}
            className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {safePage > 1 && (
              <Link
                href={getPageHref(safePage - 1)}
                rel="prev"
                className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <span aria-hidden="true">←</span>
                {isEn ? 'Previous' : 'Poprzednia'}
              </Link>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = page === safePage;

                return (
                  <Link
                    key={page}
                    href={getPageHref(page)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                      isActive
                        ? 'border-white bg-white text-[#007aff]'
                        : 'border-white/70 text-white hover:bg-white hover:text-[#007aff]'
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}
            </div>

            {safePage < totalPages && (
              <Link
                href={getPageHref(safePage + 1)}
                rel="next"
                className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                {isEn ? 'Next' : 'Następna'}
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </nav>
        )}

        <motion.div
          custom={0.45}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={tPage('homeAria')}
          >
            <span aria-hidden="true">←</span> {tPage('home')}
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/80 px-4 py-2 text-sm transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            aria-label={tPage('contactAria')}
          >
            {tPage('contactBottom')} <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}