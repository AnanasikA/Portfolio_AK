// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects, type ProjectItem } from '@/data/projects';
import ProjectView from './ProjectView';

type Params = { slug: string };

const SITE_URL = 'https://anastasiiakupriianets.pl';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const p: ProjectItem | undefined = projects.find((x) => x.slug === slug);

  if (!p) {
    return {
      title: 'Projekt nie znaleziony',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const t = await getTranslations('projects');

  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);
  const pathname = `/projects/${slug}`;
  const ogImg = p.cardImage ?? p.image;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} | Realizacja strony internetowej`,
    description,
    alternates: {
      canonical: pathname,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      url: pathname,
      title: `${title} | Realizacja strony internetowej`,
      description,
      siteName: 'AK Web & Design',
      images: ogImg
        ? [
            {
              url: ogImg,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Realizacja strony internetowej`,
      description,
      images: ogImg ? [ogImg] : undefined,
    },
  };
}

export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const p: ProjectItem | undefined = projects.find((x) => x.slug === slug);

  if (!p) notFound();

  return <ProjectView project={p} />;
}