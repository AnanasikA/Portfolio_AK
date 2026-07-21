// src/app/[locale]/offer/page.tsx
import type { Metadata } from 'next';
import { offerData }  from './offer.data';
import OfferPage      from './components/OfferPage';

export const metadata: Metadata = {
  title: `Oferta — ${offerData.clientName} | AK Web & Design`,
  description: 'Indywidualna oferta współpracy przy tworzeniu strony internetowej.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OfferPage />;
}