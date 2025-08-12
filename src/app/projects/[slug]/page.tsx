// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectView from './ProjectView';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} – projekt`,
    description: p.description,
  };
}

export default function Page({ params }: Params) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();
  return <ProjectView project={p} />;
}
