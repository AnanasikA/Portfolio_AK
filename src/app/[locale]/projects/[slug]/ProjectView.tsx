'use client';

import Script from 'next/script';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import { FiChevronLeft } from 'react-icons/fi';

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

const SITE_URL = 'https://anastasiiakupriianets.pl';
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

  const overview = t.has(`${p.slug}.overview`) ? t(`${p.slug}.overview`) : '';

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

  const projectPath = `/projects/${p.slug}`;
  const absoluteProjectUrl = `${SITE_URL}${projectPath}`;
  const absoluteImageUrl = `${SITE_URL}${p.cardImage ?? p.image}`;

  const structuredData = useMemo(() => {
    const creativeWork = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      description,
      url: absoluteProjectUrl,
      image: absoluteImageUrl,
      author: {
        '@type': 'Person',
        name: 'Anastasiia Kupriianets',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'AK Web & Design',
        url: SITE_URL,
      },
      inLanguage: locale === 'en' ? 'en' : 'pl',
      keywords: p.tech.join(', '),
    };

    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'en' ? 'Home' : 'Strona główna',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: locale === 'en' ? 'Projects' : 'Projekty',
          item: `${SITE_URL}/projects`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: absoluteProjectUrl,
        },
      ],
    };

    return [creativeWork, breadcrumbList];
  }, [absoluteImageUrl, absoluteProjectUrl, description, locale, p.tech, title]);

  return (
    <div className="bg-[#007aff] text-white">
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="afterInteractive"
      />

      <Script
        id={`project-schema-${p.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <main id="main-content">
        <section className="w-full bg-[#007aff] px-6 pb-20 pt-28 text-white sm:px-10 sm:pt-36">
          <article
            className="mx-auto max-w-6xl"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="url" content={absoluteProjectUrl} />
            <meta itemProp="image" content={absoluteImageUrl} />
            <meta itemProp="inLanguage" content={locale === 'en' ? 'en' : 'pl'} />

            <nav
              aria-label={locale === 'en' ? 'Breadcrumb' : 'Okruszki'}
              className="mb-6 text-sm"
            >
              <Link
                href="/projects"
                locale={locale}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-3 py-1 transition hover:bg-white hover:text-[#007aff] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label={tPage('backToProjectsAria')}
              >
                <FiChevronLeft size={ICON_SIZE} className={ICON_CLASS} />
                {tPage('backToProjects')}
              </Link>
            </nav>

            <header className="mb-6">
              <h1
                className="font-serif text-3xl font-light sm:text-4xl"
                itemProp="headline"
              >
                {title}
              </h1>

              <p
                className="mt-3 max-w-2xl leading-relaxed text-white/90"
                itemProp="abstract"
              >
                {description}
              </p>

              <ul
                aria-label={
                  locale === 'en'
                    ? `Technologies used in ${title}`
                    : `Technologie użyte w projekcie ${title}`
                }
                className="mt-5 flex flex-wrap gap-2"
              >
                {p.tech.map((tech) => (
                  <li key={tech} className="list-none">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs text-white/90">
                      <lord-icon
                        src="https://cdn.lordicon.com/ubpgwkmy.json"
                        trigger="loop"
                        colors="primary:#e4e4e4,secondary:#93c5fd"
                        style={{ width: '30px', height: '30px' }}
                      />
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </header>

            <section
              aria-labelledby="preview-heading"
              className="rounded-2xl overflow-hidden border border-white/25"
            >
              <h2 id="preview-heading" className="sr-only">
                {tDetail('imagePreviewAria', { title })}
              </h2>

              <div className="flex items-center gap-3 border-b border-white/15 bg-white/5 px-4 py-3">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div
                  className="ml-3 h-6 flex-1 rounded-md border border-white/20 bg-white/10"
                  aria-hidden="true"
                />
              </div>

              <div
                className="relative h-[72svh] max-h-[780px] w-full overflow-auto overscroll-contain bg-[#007aff]"
                tabIndex={0}
                role="region"
                aria-label={tDetail('imagePreviewAria', { title })}
                style={{ scrollbarGutter: 'stable' }}
              >
                <Image
                  src={p.image}
                  alt={tDetail('imageAlt', { title })}
                  priority
                  draggable={false}
                  sizes="(min-width: 1024px) 75vw, 95vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  width={2000}
                  height={1000}
                />
              </div>
            </section>

            <div className="mt-10 grid gap-8 md:grid-cols-5">
              <div className="space-y-10 md:col-span-3">
                {overview && (
                  <section aria-labelledby="overview-heading">
                    <h2
                      id="overview-heading"
                      className="mb-4 font-serif text-2xl font-light"
                    >
                      {tDetail('overviewTitle')}
                    </h2>
                    <p className="leading-relaxed text-white/90">{overview}</p>
                  </section>
                )}

                {timeframe && (
                  <section aria-labelledby="timeframe-heading">
                    <h2 id="timeframe-heading" className="sr-only">
                      {tDetail('timeframeLabel')}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-3 py-1.5 text-xs">
                        <lord-icon
                          src="https://cdn.lordicon.com/warimioc.json"
                          trigger="loop"
                          colors="primary:#e4e4e4,secondary:#93c5fd"
                          style={{ width: '24px', height: '24px' }}
                        />
                        {tDetail('timeframeLabel')}:{' '}
                        <b className="font-medium">{timeframe}</b>
                      </span>
                    </div>
                  </section>
                )}

                {work.length > 0 && (
                  <section id="work" aria-labelledby="work-heading">
                    <h2
                      id="work-heading"
                      className="mb-4 font-serif text-2xl font-light"
                    >
                      {tDetail('workTitle')}
                    </h2>

                    <ul className="grid gap-3 sm:grid-cols-2">
                      {work.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 px-4 py-3"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/vbmtnozn.json"
                            trigger="hover"
                            colors="primary:#e4e4e4,secondary:#93c5fd"
                            style={{ width: '30px', height: '30px' }}
                          />
                          <span className="text-sm leading-relaxed text-white/90">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {highlights.length > 0 && (
                  <section id="results" aria-labelledby="results-heading">
                    <h2
                      id="results-heading"
                      className="mb-4 font-serif text-2xl font-light"
                    >
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
                            style={{
                              width: '24px',
                              height: '24px',
                              marginTop: '2px',
                            }}
                          />
                          <span className="text-sm leading-relaxed text-white/90">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {challenges.length > 0 && (
                  <section id="challenges" aria-labelledby="challenges-heading">
                    <h2
                      id="challenges-heading"
                      className="mb-4 font-serif text-2xl font-light"
                    >
                      {tDetail('challengesTitle')}
                    </h2>

                    <div className="space-y-4">
                      {challenges.map((c, i) => (
                        <article
                          key={`${c.problem}-${i}`}
                          className="overflow-hidden rounded-2xl border border-white/20 bg-white/5"
                        >
                          <div className="grid sm:grid-cols-2">
                            <div className="border-b border-white/10 p-4 sm:border-b-0 sm:border-r">
                              <div className="flex items-start gap-3">
                                <lord-icon
                                  src="https://cdn.lordicon.com/exymduqj.json"
                                  trigger="hover"
                                  colors="primary:#e4e4e4,secondary:#93c5fd"
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                    marginTop: '5px',
                                  }}
                                />
                                <div>
                                  <p className="text-xs uppercase tracking-wide text-white/80">
                                    {tDetail('challengeLabel')}
                                  </p>
                                  <p className="mt-1 text-sm text-white/90">
                                    {c.problem}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white/[0.06] p-4">
                              <div className="flex items-start gap-3">
                                <lord-icon
                                  src="https://cdn.lordicon.com/ubpgwkmy.json"
                                  trigger="hover"
                                  colors="primary:#e4e4e4,secondary:#93c5fd"
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    marginTop: '2px',
                                  }}
                                />
                                <div>
                                  <p className="text-xs uppercase tracking-wide text-white/80">
                                    {tDetail('solutionLabel')}
                                  </p>
                                  <p className="mt-1 text-sm text-white/90">
                                    {c.solution}
                                  </p>
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
                    <h2
                      id="decisions-heading"
                      className="mb-4 font-serif text-2xl font-light"
                    >
                      {tDetail('decisionsTitle')}
                    </h2>

                    <ul className="grid gap-3 sm:grid-cols-2">
                      {decisions.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/fwkrbvja.json"
                            trigger="loop"
                            colors="primary:#e4e4e4,secondary:#93c5fd"
                            style={{
                              width: '34px',
                              height: '34px',
                              marginTop: '2px',
                            }}
                          />
                          <span className="text-sm leading-relaxed text-white/90">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {integrations.length > 0 && (
                  <section
                    id="integrations"
                    aria-labelledby="integrations-heading"
                  >
                    <h2
                      id="integrations-heading"
                      className="mb-3 font-serif text-xl font-light"
                    >
                      {tDetail('integrationsTitle')}
                    </h2>

                    <ul className="flex flex-wrap gap-2">
                      {integrations.map((name) => (
                        <li key={name} className="list-none">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs">
                            <lord-icon
                              src="https://cdn.lordicon.com/gsjfryhc.json"
                              trigger="loop"
                              colors="primary:#e4e4e4,secondary:#93c5fd"
                              style={{ width: '24px', height: '24px' }}
                            />
                            {name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="md:col-span-2 md:pl-2" aria-labelledby="project-sidebar-heading">
                <div className="md:sticky md:top-24">
                  <div className="space-y-3 rounded-2xl border border-white/20 bg-white/5 p-4">
                    <h2 id="project-sidebar-heading" className="sr-only">
                      {locale === 'en' ? 'Project actions' : 'Akcje projektu'}
                    </h2>

                    <p className="text-sm leading-relaxed text-white/80">
                      {tDetail('sidebarText')}
                    </p>

                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#007aff] transition hover:opacity-90 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        aria-label={`${tDetail('viewOnline')} - ${title}`}
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
                      href="/#contact"
                      locale={locale}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#007aff] transition hover:opacity-90 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    >
                      {tDetail('contact')}
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}