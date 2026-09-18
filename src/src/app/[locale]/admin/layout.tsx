import type { Metadata } from 'next';
import '@/app/globals.css';

// Panel administracyjny nie powinien nigdy trafić do indeksu Google.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}