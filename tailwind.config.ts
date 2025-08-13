// tailwind.config.ts
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.25rem', lg: '2rem', xl: '2.5rem', '2xl': '3rem' } },
    extend: {
      colors: {
        brand: { DEFAULT: '#007aff', light: '#339cff', dark: '#005fd6', foreground: '#ffffff' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-libre)', 'Georgia', 'serif'],
      },
      screens: { xs: '480px', xlCustom: '1050px', '3xl': '1600px' },
      borderRadius: { '2xl': '1rem' },
      boxShadow: { soft: '0 8px 24px rgba(0,0,0,0.08)' },
    },
  },
  plugins: [forms(), typography()],
} satisfies Config;


