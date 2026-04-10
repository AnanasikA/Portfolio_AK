'use client';

import { Libre_Baskerville } from 'next/font/google';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiGlobe, FiFileText } from 'react-icons/fi';

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isEn = locale === 'en';

  const legalLinks = [
    { href: '/polityka-prywatnosci', label: t('privacy') },
    { href: '/regulamin', label: t('terms') },
    { href: '/cookies', label: t('cookies') },
  ];

  const companyName = 'AK Web & Design | Anastasiia Kupriianets';
  const email = 'kontakt@anastasiiakupriianets.pl';
  const website = 'anastasiiakupriianets.pl';
  const nip = '8961662887';
  const regon = '543952183';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    url: 'https://anastasiiakupriianets.pl',
    email: email,
    taxID: nip,
    identifier: regon,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: isEn ? 'customer support' : 'obsługa klienta',
        email: email,
        availableLanguage: ['Polish', 'English'],
      },
    ],
  };

  return (
    <footer className="relative overflow-hidden border-t border-blue-100 bg-[#f4faff] text-[#1a2e4f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,122,255,0.08),transparent_22%),radial-gradient(circle_at_85%_30%,rgba(0,122,255,0.06),transparent_22%)]" />
      <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#007aff]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#007aff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-14 lg:px-8">
        <div className="grid gap-10 border-b border-blue-100/80 pb-10 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-xl"
          >
            <h2
              className={`${libre.className} text-xl font-semibold sm:text-2xl`}
            >
              Anastasiia Kupriianets
            </h2>

            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#445b77] sm:text-sm">
              {t('description')}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                'WordPress',
                'Next.js',
                isEn ? 'Remote collaboration' : 'Współpraca zdalna',
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex rounded-full border border-[#007aff]/12 bg-white/70 px-3 py-1 text-[11px] text-[#355781] backdrop-blur-sm sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={0.08}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
          >
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#2b4d76]">
                {isEn ? 'Contact' : 'Kontakt'}
              </h3>

              <div className="space-y-3 text-sm text-[#385a84]">
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-2 transition hover:text-[#007aff]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#007aff]/10 bg-white/80 text-[#007aff] transition group-hover:scale-105">
                    <FiMail className="h-4 w-4" />
                  </span>
                  {email}
                </a>

                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 transition hover:text-[#007aff]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#007aff]/10 bg-white/80 text-[#007aff] transition group-hover:scale-105">
                    <FiGlobe className="h-4 w-4" />
                  </span>
                  {website}
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#2b4d76]">
                {isEn ? 'Company data' : 'Dane firmy'}
              </h3>

              <div className="space-y-2 text-sm text-[#385a84]">
                <p>{companyName}</p>
                <p>NIP: {nip}</p>
                <p>REGON: {regon}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-5 pt-6 md:flex-row md:items-center md:justify-between">
          <motion.nav
            custom={0.12}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex flex-wrap gap-3 sm:gap-4"
            aria-label={t('legal_aria')}
          >
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#385a84] transition hover:text-[#007aff]"
              >
                <FiFileText className="h-4 w-4 opacity-70" />
                {label}
              </Link>
            ))}
          </motion.nav>

          <motion.p
            custom={0.16}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-xs leading-6 text-[#5f7693] sm:text-sm"
          >
            © {new Date().getFullYear()} AK Web & Design | Anastasiia Kupriianets
          </motion.p>
        </div>
      </div>
    </footer>
  );
}