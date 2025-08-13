// app/projects/page.tsx
import type { Metadata } from 'next';
import ProjectsPage from './page.client';

export const metadata: Metadata = {
  title: 'Projekty | Anastasiia – Front-End Developer',
  description:
    'Przegląd projektów stron internetowych: Next.js, Tailwind CSS, UX/UI. Lekki kod, wydajność i dostępność.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title: 'Projekty | Anastasiia – Front-End Developer',
    description:
      'Przegląd projektów stron internetowych: Next.js, Tailwind CSS, UX/UI. Lekki kod, wydajność i dostępność.',
    locale: 'pl_PL',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Portfolio – projekty' }],
    siteName: 'Anastasiia Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projekty | Anastasiia – Front-End Developer',
    description:
      'Przegląd projektów stron internetowych: Next.js, Tailwind CSS, UX/UI.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ProjectsPage />;
}
