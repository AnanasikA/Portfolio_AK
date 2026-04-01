'use client';

import { Libre_Baskerville } from 'next/font/google';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function Footer() {
  const t = useTranslations('footer');

  const legalLinks = [
    { href: '/polityka-prywatnosci', label: t('privacy') },
    { href: '/regulamin', label: t('terms') },
    { href: '/cookies', label: t('cookies') },
  ];

  return (
    <footer className="bg-[#f4faff] border-t border-blue-100 text-[#1a2e4f] text-sm tracking-tight">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className={`${libre.className} text-xl sm:text-2xl font-semibold mb-3`}>
            Anastasiia Kupriianets
          </h2>
          <p className="text-[13px] text-[#445b77] leading-relaxed max-w-md">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end text-sm text-[#385a84]">
          <nav
            className="flex gap-4 flex-wrap justify-start md:justify-end font-medium"
            aria-label={t('legal_aria')}
          >
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-[#007aff] transition-colors"
              >
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