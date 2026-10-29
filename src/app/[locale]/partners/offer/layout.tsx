import type { Metadata } from 'next';
import { url } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: 'Program partnerski | AK Web & Design' },
    description: 'Polecaj strony internetowe AK Web & Design i zarabiaj prowizję od każdego zrealizowanego projektu. Sprawdź zasady programu partnerskiego.',
    alternates: { canonical: url(locale, '/partners/offer') },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
