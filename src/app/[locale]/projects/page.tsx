import { Suspense } from 'react';
import ProjectsPageClient from './page.client';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page ?? '1', 10);
  return (
    <Suspense>
      <ProjectsPageClient currentPage={currentPage} />
    </Suspense>
  );
}