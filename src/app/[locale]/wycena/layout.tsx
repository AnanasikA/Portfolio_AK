import type { Metadata } from 'next';
import { alternates } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: { absolute: isEn ? 'Website price calculator | AK Web & Design' : 'Ile kosztuje strona internetowa? Kalkulator wyceny | AK Web & Design' },
    description: isEn
      ? 'Pick what you need and see an estimated price for your website or online store straight away.'
      : 'Wybierz, czego potrzebujesz, i od razu zobacz orientacyjną cenę strony lub sklepu internetowego. Strony od 1 500 zł, sklepy od 2 800 zł.',
    alternates: alternates(locale, '/wycena'),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
