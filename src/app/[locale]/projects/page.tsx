// app/projects/page.tsx
import type { Metadata } from 'next';
import ProjectsPageClient from './page.client';

const SITE_URL = 'https://anastasiiakupriianets.pl';

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Projekty | Anastasiia Kupriianets – Front-End Developer',
  description:
    'Przegląd projektów stron internetowych tworzonych w Next.js, Tailwind CSS i WordPressie. Nowoczesny design, responsywność i wydajność.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projekty | Anastasiia Kupriianets – Front-End Developer',
    description:
      'Przegląd projektów stron internetowych tworzonych w Next.js, Tailwind CSS i WordPressie. Nowoczesny design, responsywność i wydajność.',
    siteName: 'AK Web & Design',
    locale: 'pl_PL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio projektów Anastasiia Kupriianets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projekty | Anastasiia Kupriianets – Front-End Developer',
    description:
      'Przegląd projektów stron internetowych tworzonych w Next.js, Tailwind CSS i WordPressie.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const parsedPage = Number(params.page ?? '1');

  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return <ProjectsPageClient currentPage={currentPage} />;
}