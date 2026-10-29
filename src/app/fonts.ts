import { Space_Grotesk, Manrope, Playfair_Display } from 'next/font/google';

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sg',
  weight: ['400', '500', '600', '700'],
});

export const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-mn',
  weight: ['400', '500', '600', '700'],
});

export const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-pf',
  weight: ['700'],
});
