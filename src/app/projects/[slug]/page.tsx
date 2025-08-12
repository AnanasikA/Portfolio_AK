// app/projects/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectView from './ProjectView';

// 1) pre-render slugi
export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((p) => ({ slug: p.slug }));
}

// 2) metadata (może być async)
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} – projekt`,
    description: p.description,
  };
}

// 3) strona (server component)
export default function Page(
  { params }: { params: { slug: string } }
) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();
  return <ProjectView project={p} />;
}
