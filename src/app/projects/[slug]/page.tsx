// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, type ProjectItem } from '@/data/projects';
import ProjectView from './ProjectView';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const p: ProjectItem | undefined = projects.find((x) => x.slug === slug);
  if (!p) return {};

  const url = `/projects/${slug}`;
  const ogImg = p.cardImage ?? p.image;

  return {
    title: `${p.title} – projekt`,
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${p.title} – projekt`,
      description: p.description,
      images: ogImg ? [{ url: ogImg }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.title} – projekt`,
      description: p.description,
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
