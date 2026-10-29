import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects, type ProjectItem } from '@/data/projects';
import { SITE_URL, alternates } from '@/lib/site';
import ProjectView from './ProjectView';

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale, slug } = await params;
  const isEn = locale === 'en';
  const p: ProjectItem | undefined = projects.find((x) => x.slug === slug);

  if (!p) {
    return {
      title: isEn ? 'Project not found' : 'Projekt nie znaleziony',
      robots: { index: false, follow: false },
    };
  }

  const t = await getTranslations({ locale, namespace: 'projects' });

  const name = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const suffix = p.concept
    ? (isEn ? 'Concept project' : 'Projekt koncepcyjny')
    : (isEn ? 'Website project' : 'Realizacja strony internetowej');
  const title = `${name} | ${suffix}`;
  const alt = alternates(locale, `/projects/${slug}`);
  const ogImg = p.cardImage ?? p.image;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: `${title} | AK Web & Design` },
    description,
    alternates: alt,
    openGraph: {
      type: 'website',
      url: alt.canonical,
      title,
      description,
      siteName: 'AK Web & Design',
      locale: isEn ? 'en_US' : 'pl_PL',
      images: ogImg ? [{ url: ogImg, alt: name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImg ? [ogImg] : undefined,
    },
  };
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { slug, locale } = await params;
  const p: ProjectItem | undefined = projects.find((x) => x.slug === slug);

  if (!p) notFound();

  const t = await getTranslations({ locale, namespace: 'projects' });
  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const projectUrl = `${SITE_URL}/${locale}/projects/${slug}`;
  const projectsUrl = `${SITE_URL}/${locale}/projects`;
  const imageUrl = `${SITE_URL}${p.cardImage ?? p.image}`;

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url: projectUrl,
    image: imageUrl,
    author: { '@type': 'Person', name: 'Anastasiia Kupriianets', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'AK Web & Design', url: SITE_URL },
    inLanguage: locale === 'en' ? 'en' : 'pl',
    keywords: p.tech.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'en' ? 'Home' : 'Strona główna', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'Projects' : 'Projekty', item: projectsUrl },
      { '@type': 'ListItem', position: 3, name: title, item: projectUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectView project={p} />
    </>
  );
}