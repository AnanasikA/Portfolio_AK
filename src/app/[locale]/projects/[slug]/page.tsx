// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { projects, type ProjectItem } from '@/data/projects';
import ProjectView from './ProjectView';

type Params = { slug: string };

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

  if (!p) return {};

  const t = await getTranslations('projects');

  const title = t(`${slug}.title`);
  const description = t(`${slug}.description`);

  const url = `/projects/${slug}`;
  const ogImg = p.cardImage ?? p.image;

  return {
    title: `${title} – projekt`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title} – projekt`,
      description,
      images: ogImg ? [{ url: ogImg }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} – projekt`,
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