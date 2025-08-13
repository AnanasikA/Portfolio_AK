'use client';

import Link from 'next/link';
import { Libre_Baskerville } from 'next/font/google';

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400','700'],
  display: 'swap',
});

export default function Footer() {
  return (
    <footer className="bg-[#f4faff] border-t border-blue-100 text-[#1a2e4f] text-sm tracking-tight">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
        {/* Lewa kolumna */}
        <div>
          <h2 className={`${libre.className} text-xl sm:text-2xl font-semibold mb-3`}>
            Anastasiia Kupriianets
          </h2>
          <p className="text-[13px] text-[#445b77] leading-relaxed max-w-md">
            Projektuję i koduję nowoczesne strony internetowe — funkcjonalne, estetyczne i gotowe do działania.
            Skupiam się na UX/UI, dostępności i dobrym kodzie.
          </p>
        </div>

        {/* Prawa kolumna */}
        <div className="flex flex-col gap-3 md:items-end text-sm text-[#385a84]">
          <nav className="flex gap-4 flex-wrap justify-start md:justify-end font-medium" aria-label="Linki prawne">
            {[
              { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
              { href: '/regulamin', label: 'Regulamin' },
              { href: '/cookies', label: 'Cookies' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-[#007aff] transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <address className="not-italic">
            <a
              href="mailto:kontakt@anastasiiakupriianets.pl"
              className="text-[#007aff] font-medium hover:opacity-90"
            >
              kontakt@anastasiiakupriianets.pl
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
}
