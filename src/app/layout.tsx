import { Space_Grotesk, Manrope } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sg',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-mn',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${spaceGrotesk.variable} ${manrope.variable}`}
      style={{ '--fd': 'var(--font-sg), system-ui, sans-serif', '--fb': 'var(--font-mn), system-ui, sans-serif' } as React.CSSProperties}>
      <body>{children}</body>
    </html>
  );
}
