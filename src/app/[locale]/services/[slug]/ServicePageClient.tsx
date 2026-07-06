'use client';

import { useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import QuoteModal from '@/components/QuoteModal';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import type { ServiceData } from '@/data/services';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const W = {
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 clamp(1.25rem,5vw,4rem)',
} as const;

const PY = 'clamp(4rem,7vw,6rem)' as const;

const TEXT = {
  pl: {
    start: 'Start',
    services: 'Usługi',
    startProject: 'Rozpocznij projekt →',
    seeProjects: 'Zobacz realizacje',
    whyLabel: 'Dlaczego AK Web & Design',
    included: 'W standardzie',
    includedText:
      '2 rundy poprawek i 30 dni wsparcia technicznego w cenie każdego projektu.',
    processLabel: 'Jak pracuję',
    processTitle: 'Jasna droga od pomysłu do gotowej strony.',
    processText:
      'Przejrzysty proces bez zbędnych komplikacji. Na każdym etapie wiesz, co robimy i czego możesz się spodziewać.',
    processPillars: [
      '2 rundy poprawek w cenie',
      '30 dni wsparcia technicznego',
      'Stały kontakt na każdym etapie',
      'Wycena przed startem projektu',
    ],
    projectsLabel: 'Wybrane projekty',
    projectsTitle: 'Strony, które pracują tak ciężko jak firmy, które za nimi stoją.',
    seeAllProjects: 'Zobacz wszystkie projekty →',
    project: 'Projekt',
    fallbackProject:
      'Indywidualny projekt strony internetowej — nowoczesny design, szybkie ładowanie i optymalizacja SEO.',
    seeCaseStudy: 'Zobacz case study →',
    pricing: 'Cennik',
    pricingTitle: 'Ile kosztuje Twoja strona?',
    pricingText:
      'Koszt projektu zależy od zakresu. Skonfiguruj swój projekt w kalkulatorze i otrzymaj szacunkową wycenę w kilka sekund — bez zobowiązań.',
    calculate: 'Oblicz wycenę →',
    talk: 'Porozmawiajmy',
    priceFrom: 'orientacyjnie od',
    currency: 'zł',
    net: 'netto',
    pricingFeatures: [
      'Indywidualny projekt graficzny',
      '2 rundy poprawek w cenie',
      '30 dni wsparcia technicznego',
      'Optymalizacja SEO w standardzie',
      'Certyfikat SSL i konfiguracja hostingu',
    ],
    pricingNote:
      'Dokładna wycena zależy od liczby podstron, funkcji i złożoności projektu. Skorzystaj z kalkulatora lub napisz — odpowiem w ciągu 24 godzin.',
    faqTitle: 'Dobre pytania,\njasne odpowiedzi.',
    faqText:
      'Nie znalazłeś odpowiedzi? Napisz krótką wiadomość — otrzymasz konkretną odpowiedź, bez presji sprzedaży.',
    askQuestion: 'Zadaj pytanie →',
    ctaLabel: '— Zbudujmy coś razem —',
    ctaTitle: 'Zbudujmy stronę, która pomoże rozwinąć Twój biznes.',
    ctaText:
      'Napisz krótko o swojej firmie i potrzebach. Otrzymasz przyjazną odpowiedź z kierunkiem i wyceną — zwykle w 1–2 dni robocze.',
    email: 'Napisz e-mail',
    quoteUrl: '/wycena',
    projectsUrl: '/projects',
  },
  en: {
    start: 'Home',
    services: 'Services',
    startProject: 'Start a project →',
    seeProjects: 'View projects',
    whyLabel: 'Why AK Web & Design',
    included: 'Included',
    includedText:
      'Two rounds of revisions and 30 days of technical support are included in every project.',
    processLabel: 'How I work',
    processTitle: 'A clear path from idea to launch.',
    processText:
      'A simple process without unnecessary complications. At every stage, you know what is happening and what to expect.',
    processPillars: [
      'Two rounds of revisions included',
      '30 days of technical support',
      'Clear communication at every stage',
      'Quote before the project starts',
    ],
    projectsLabel: 'Selected projects',
    projectsTitle: 'Websites that work as hard as the businesses behind them.',
    seeAllProjects: 'View all projects →',
    project: 'Project',
    fallbackProject:
      'Custom website project with clean design, fast performance, and technical SEO setup.',
    seeCaseStudy: 'View case study →',
    pricing: 'Pricing',
    pricingTitle: 'How much will your website cost?',
    pricingText:
      'The cost depends on the project scope. Use the calculator to get an estimated price in seconds — with no obligation.',
    calculate: 'Calculate price →',
    talk: 'Let’s talk',
    priceFrom: 'starting from',
    currency: 'PLN',
    net: 'net',
    pricingFeatures: [
      'Custom website design',
      'Two rounds of revisions included',
      '30 days of technical support',
      'SEO setup included',
      'SSL certificate and hosting configuration',
    ],
    pricingNote:
      'The final quote depends on the number of pages, features, and project complexity. Use the calculator or send a message — I usually reply within 24 hours.',
    faqTitle: 'Good questions,\nclear answers.',
    faqText:
      'Didn’t find your answer? Send a short message and you’ll receive a clear reply without sales pressure.',
    askQuestion: 'Ask a question →',
    ctaLabel: '— Let’s build something together —',
    ctaTitle: 'Let’s build a website that helps grow your business.',
    ctaText:
      'Tell me briefly about your business and needs. You’ll receive a friendly reply with direction and an estimate — usually within 1–2 business days.',
    email: 'Send an email',
    quoteUrl: '/wycena',
    projectsUrl: '/projects',
  },
} as const;

function getText(locale: string) {
  return TEXT[locale === 'en' ? 'en' : 'pl'];
}

const PROJECT_DESCS = {
  pl: {
    'marcin-kowal':
      'Strona dla trenera personalnego z bold typografią, animacjami przy scrollu i popup z formularzem wyboru planu.',
    'biuro-ksiegowe':
      'Profesjonalna strona biura rachunkowego z ofertą usług, formularzem kontaktowym i integracją Google Maps.',
    'crescent-development':
      'Strona dewelopera mieszkaniowego nastawiona na pozyskiwanie leadów z galerią inwestycji i formularzem zapytania.',
    'spiro-pilates-mobility':
      'Strona studia pilates z grafikiem zajęć, zapisami online i prezentacją oferty treningowej.',
    'lion-force-weld':
      'Strona firmy spawalniczej z portfolio realizacji, cennikiem usług i formularzem kontaktowym.',
    luisowka:
      'Strona domku wypoczynkowego w górach z systemem rezerwacji, galerią i opisem atrakcji okolicy.',
    'zdrowie-plus':
      'Strona przychodni zdrowia z listą specjalistów, systemem rejestracji i informacjami o usługach.',
    'quest-for-paws':
      'Platforma dla właścicieli zwierząt z bazą weterynarii, poradnikami i sklepem z akcesoriami.',
    realestate:
      'Strona agencji nieruchomości z wyszukiwarką ofert, mapą lokalizacji i panelem klienta.',
  },
  en: {
    'marcin-kowal':
      'Website for a personal trainer with bold typography, scroll animations, and a plan selection form.',
    'biuro-ksiegowe':
      'Professional accounting office website with services, contact form, and Google Maps integration.',
    'crescent-development':
      'Real estate developer website focused on lead generation, investment gallery, and inquiry forms.',
    'spiro-pilates-mobility':
      'Pilates studio website with class schedule, online sign-ups, and a clear service presentation.',
    'lion-force-weld':
      'Welding company website with portfolio, service pricing, and contact form.',
    luisowka:
      'Mountain holiday house website with booking system, gallery, and nearby attractions.',
    'zdrowie-plus':
      'Healthcare clinic website with specialists, registration system, and service information.',
    'quest-for-paws':
      'Pet owner platform with veterinary listings, guides, and accessory store.',
    realestate:
      'Real estate agency website with offer search, location map, and client panel.',
  },
} as const;

type IconProps = { width?: number; height?: number };

const IconShield = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const IconBolt = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
const IconClock = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
const IconChat = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const IconGlobe = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconStar = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const IconCheck = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const IconTarget = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const IconLock = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
const IconMobile = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>;
const IconCode = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const IconCart = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>;
const IconRefresh = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>;
const IconSave = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>;
const IconBug = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2l1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z" /><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M20 13h-4M14.45 19.11l3.23 3.23M9.55 19.11l-3.23 3.23" /></svg>;
const IconChart = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
const IconSearch = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const IconSpeed = ({ width = 22, height = 22 }: IconProps) => <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;

const ICON_MAP: Record<string, React.ReactNode> = {
  shield: <IconShield />,
  bolt: <IconBolt />,
  clock: <IconClock />,
  chat: <IconChat />,
  globe: <IconGlobe />,
  star: <IconStar />,
  check: <IconCheck />,
  target: <IconTarget />,
  lock: <IconLock />,
  mobile: <IconMobile />,
  code: <IconCode />,
  cart: <IconCart />,
  refresh: <IconRefresh />,
  save: <IconSave />,
  bug: <IconBug />,
  chart: <IconChart />,
  search: <IconSearch />,
  speed: <IconSpeed />,
};

function getIcon(key: string): React.ReactNode {
  return ICON_MAP[key] ?? <IconBolt />;
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Hero({ s, open, locale }: { s: ServiceData; open: () => void; locale: string }) {
  const t = getText(locale);

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 80px)',
        borderBottom: '1px solid var(--line-soft)',
        background: '#020617',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {s.heroVideo && (
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster={s.heroPoster}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
    }}
  >
    <source src={s.heroVideo} type="video/mp4" />
  </video>
)}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(90deg, rgba(2,6,23,.86) 0%, rgba(2,6,23,.68) 42%, rgba(2,6,23,.28) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'radial-gradient(ellipse 70% 90% at 20% 40%, color-mix(in srgb, var(--brand) 28%, transparent) 0%, transparent 65%)',
        }}
      />

      <div
        style={{
          ...W,
          paddingTop: PY,
          paddingBottom: PY,
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                background: '#fff',
                borderRadius: 99,
                opacity: 0.8,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--fd)',
                fontWeight: 700,
                fontSize: '.72rem',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.78)',
              }}
            >
              {s.heroLabel}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--fd)',
              fontWeight: 700,
              fontSize: 'clamp(2.6rem,6vw,4.8rem)',
              letterSpacing: '-.05em',
              color: '#fff',
              lineHeight: 1.02,
              marginBottom: '1.25rem',
            }}
          >
            {s.title}.
          </h1>

          <p
            style={{
              fontFamily: 'var(--fd)',
              fontSize: 'clamp(1rem,2vw,1.15rem)',
              color: 'rgba(255,255,255,.78)',
              lineHeight: 1.7,
              maxWidth: '56ch',
              marginBottom: '2.5rem',
            }}
          >
            {s.subtitle}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button
              onClick={open}
              style={{
                fontFamily: 'var(--fd)',
                fontWeight: 700,
                fontSize: '.95rem',
                padding: '.85em 1.9em',
                borderRadius: 99,
                border: 'none',
                background: '#fff',
                color: 'var(--brand)',
                cursor: 'pointer',
              }}
            >
              {t.startProject}
            </button>

            <Link
              href={t.projectsUrl}
              style={{
                fontFamily: 'var(--fd)',
                fontWeight: 600,
                fontSize: '.95rem',
                padding: '.85em 1.9em',
                borderRadius: 99,
                border: '1.5px solid rgba(255,255,255,.35)',
                background: 'rgba(255,255,255,.08)',
                color: '#fff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              {t.seeProjects}
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 'clamp(1.5rem,4vw,3rem)',
              flexWrap: 'wrap',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,.18)',
            }}
          >
            {s.heroStats.map(({ value, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: 'var(--fd)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.4rem,3vw,2rem)',
                    letterSpacing: '-.04em',
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--fd)',
                    fontSize: '.78rem',
                    color: 'rgba(255,255,255,.6)',
                    marginTop: 4,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Why({ s, locale }: { s: ServiceData; locale: string }) {
  const t = getText(locale);

  return (
    <section style={{ background: 'var(--bg)', padding: `${PY} 0`, overflow: 'hidden' }}>
      <div style={{ ...W }}>
        <div className="svc-two-col">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div>
              <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
                <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: 0.6 }} />
                {t.whyLabel}
              </motion.span>

              <motion.h2 variants={fade} custom={0.06} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.035em', lineHeight: 0.97, color: 'var(--ink)', fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', marginBottom: 18 }}>
                {s.whyTitle}
              </motion.h2>

              <motion.p variants={fade} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.95rem,1.3vw,1.05rem)', color: 'var(--muted)', lineHeight: 1.65 }}>
                {s.subtitle}
              </motion.p>
            </div>

            <motion.div variants={fade} custom={0.18} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 36px', paddingTop: 22, borderTop: '1px solid var(--line)' }}>
              {s.heroStats.map(({ value, label }) => (
                <div key={label}>
                  <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(1.7rem,3vw,2.6rem)', color: 'var(--brand)', letterSpacing: '-.03em', display: 'block', lineHeight: 1 }}>{value}</span>
                  <small style={{ fontFamily: 'var(--fb)', fontSize: '.82rem', color: 'var(--muted)', marginTop: 4, display: 'block' }}>{label}</small>
                </div>
              ))}
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {s.why.map((card, i) => {
              const span = i === s.why.length - 1 && s.why.length % 2 !== 0;

              return (
                <motion.div
                  key={card.title}
                  variants={fade}
                  custom={i * 0.07}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.07)' }}
                  style={{ gridColumn: span ? '1 / -1' : undefined, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-l)', padding: 'clamp(16px,2vw,24px)', display: 'flex', flexDirection: span ? 'row' : 'column', alignItems: span ? 'flex-start' : undefined, gap: span ? 18 : 14 }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 11, background: 'var(--brand-tint)', color: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {getIcon(card.icon)}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.95rem,1.2vw,1.05rem)', color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2 }}>{card.title}</h3>
                    <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.82rem,1vw,.88rem)', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function What({ s, locale }: { s: ServiceData; locale: string }) {
  const t = getText(locale);

  return (
    <section style={{ background: '#fff', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ ...W, paddingTop: PY, paddingBottom: PY }}>
        <div className="svc-what-grid">
          <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
              <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: 0.6 }} />
              {t.included}
            </motion.span>

            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.035em', lineHeight: 1.1, color: 'var(--ink)', fontSize: 'clamp(1.7rem,3.5vw,2.4rem)', marginBottom: '1rem' }}>
              {s.whatTitle}
            </h2>

            <p style={{ fontFamily: 'var(--fb)', fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              {t.includedText}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            {s.what.map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '1rem', borderBottom: i < s.what.length - 2 ? '1px solid var(--line-soft)' : 'none', borderRight: i % 2 === 0 ? '1px solid var(--line-soft)' : 'none' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="9" cy="9" r="9" fill="var(--brand)" opacity=".12" />
                  <path d="M5 9l3 3 5-5" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'var(--fd)', fontSize: '.88rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process({ s, locale }: { s: ServiceData; locale: string }) {
  const t = getText(locale);

  return (
    <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ ...W, paddingTop: PY, paddingBottom: PY }}>
        <div className="svc-process-layout">
          <div style={{ alignSelf: 'center' }}>
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
              <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: 0.6 }} />
              {t.processLabel}
            </motion.span>

            <motion.h2 variants={fade} custom={0.06} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.035em', lineHeight: 1.05, color: 'var(--ink)', fontSize: 'clamp(1.7rem,3.5vw,2.4rem)', marginBottom: '1rem' }}>
              {t.processTitle}
            </motion.h2>

            <motion.p variants={fade} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fb)', fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.65 }}>
              {t.processText}
            </motion.p>

            <motion.div variants={fade} custom={0.18} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
              {t.processPillars.map(text => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'color-mix(in srgb, var(--brand) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5L4 7.5L10 1.5" stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--fd)', fontSize: '.86rem', color: 'var(--ink-soft)' }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {s.process.map(({ step, title, desc }, i) => (
              <motion.div key={step} variants={fade} custom={i * 0.08} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem 0', borderBottom: i < s.process.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', border: '1.5px solid var(--brand)', background: 'color-mix(in srgb, var(--brand) 8%, #fff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.78rem', color: 'var(--brand)', letterSpacing: '.05em' }}>
                  {step}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '.4rem', lineHeight: 1.2 }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--fb)', fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ locale }: { locale: string }) {
  const t = getText(locale);
  const isEn = locale === 'en';
  const featured = projects.slice(0, 6);
  const [current, setCurrent] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const rxRef = useRef(0);
  const ryRef = useRef(0);
  const p = featured[current];

  const handleImgMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const r = imgRef.current.getBoundingClientRect();
    rxRef.current = -((e.clientY - r.top) / r.height - 0.5) * 7;
    ryRef.current = ((e.clientX - r.left) / r.width - 0.5) * 7;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!imgRef.current) return;

      imgRef.current.style.transition = 'transform .08s linear';
      imgRef.current.style.transform = `perspective(900px) rotateX(${rxRef.current}deg) rotateY(${ryRef.current}deg) scale(1.01)`;
    });
  };

  const handleImgLeave = () => {
    rxRef.current = 0;
    ryRef.current = 0;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!imgRef.current) return;

      imgRef.current.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
      imgRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  };

  const textV = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
    exit: { opacity: 0, y: -14, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] as const } },
  };

  const projectDesc =
    PROJECT_DESCS[isEn ? 'en' : 'pl'][p.slug as keyof typeof PROJECT_DESCS.pl] ??
    t.fallbackProject;

  return (
    <section style={{ background: '#fff', borderBottom: '1px solid var(--line-soft)', padding: `${PY} 0` }}>
      <div style={{ ...W }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 'clamp(32px,5vw,56px)' }}>
          <div>
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
              <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: 0.6 }} />
              {t.projectsLabel}
            </motion.span>

            <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.04, color: 'var(--ink)', fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', maxWidth: 680 }}>
              {t.projectsTitle}
            </h2>
          </div>

          <Link href={t.projectsUrl} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.9rem', color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: '.5em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {t.seeAllProjects}
          </Link>
        </div>

        <div className="fp-svc-inner">
          <div ref={imgRef} onMouseMove={handleImgMove} onMouseLeave={handleImgLeave} style={{ position: 'relative', borderRadius: 20, border: '1px solid var(--line)', boxShadow: '0 24px 80px rgba(15,23,42,.12)', overflow: 'hidden', willChange: 'transform', background: '#f8fafc' }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', borderBottom: '1px solid var(--line)', background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(12px)' }}>
              {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
              ))}
              <div style={{ marginLeft: 12, height: 20, flex: 1, borderRadius: 99, background: '#eef2f7' }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                <Image
  src={p.cardImage}
  alt={p.slug}
  fill
  sizes="(max-width: 860px) 100vw, 50vw"
  style={{
    objectFit: 'cover',
    objectPosition: 'top',
  }}
/>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={current} variants={textV} initial="enter" animate="center" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--brand)', margin: 0 }}>
                {String(current + 1).padStart(2, '0')} — {t.project}
              </p>

              <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-.03em', color: 'var(--ink)', lineHeight: 1.1, margin: 0, textTransform: 'capitalize' }}>
                {p.slug.replace(/-/g, ' ')}
              </h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.tech.slice(0, 4).map(t => (
                  <span key={t} style={{ fontFamily: 'var(--fd)', padding: '.3em .85em', borderRadius: 99, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--muted)', fontSize: '.78rem', fontWeight: 600 }}>{t}</span>
                ))}
              </div>

              <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.9rem,1.1vw,1rem)', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                {projectDesc}
              </p>

              <div style={{ paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                <Link href={`/projects/${p.slug}`} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem', color: 'var(--brand)', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                  {t.seeCaseStudy}
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {featured.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} aria-label={`${t.project} ${i + 1}`} style={{ height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', padding: 0, transition: 'all .3s', width: current === i ? 24 : 6, background: current === i ? 'var(--brand)' : 'var(--line)' }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="fp-svc-tabs" style={{ marginTop: 'clamp(24px,4vw,48px)', borderTop: '1px solid var(--line)' }}>
          {featured.map((proj, i) => (
            <button key={proj.slug} onClick={() => setCurrent(i)} className={`fp-svc-tab${current === i ? ' active' : ''}`}>
              <span style={{ display: 'block', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: current === i ? 'var(--brand)' : 'var(--muted)', marginBottom: 4 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.88rem', color: current === i ? 'var(--ink)' : 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'capitalize' }}>
                {proj.slug.replace(/-/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ s, open, locale }: { s: ServiceData; open: () => void; locale: string }) {
  const t = getText(locale);
  const isEn = locale === 'en';
  const from = s.plans[0]?.from ?? 1500;

  return (
    <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ ...W, paddingTop: PY, paddingBottom: PY }}>
        <div className="svc-pricing-layout">
          <div>
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
              <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: 0.6 }} />
              {t.pricing}
            </motion.span>

            <motion.h2 variants={fade} custom={0.06} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.035em', lineHeight: 1.05, color: 'var(--ink)', fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', marginBottom: '1rem' }}>
              {t.pricingTitle}
            </motion.h2>

            <motion.p variants={fade} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fb)', fontSize: '.95rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {t.pricingText}
            </motion.p>

            <motion.div variants={fade} custom={0.18} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={t.quoteUrl} style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', padding: '.8em 1.8em', borderRadius: 99, border: 'none', background: 'var(--brand)', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px color-mix(in srgb, var(--brand) 30%, transparent)', transition: 'opacity .2s' }}>
                <IconCode width={16} height={16} />
                {t.calculate}
              </Link>

              <button onClick={open} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem', padding: '.8em 1.8em', borderRadius: 99, border: '1.5px solid var(--line)', background: 'transparent', color: 'var(--ink)', cursor: 'pointer', transition: 'border-color .2s' }}>
                {t.talk}
              </button>
            </motion.div>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line-soft)', borderRadius: 'var(--r-l)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: '.5rem' }}>
                {s.title} — {t.priceFrom}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(2.2rem,4vw,3rem)', letterSpacing: '-.05em', color: 'var(--ink)', lineHeight: 1 }}>
                  {from.toLocaleString(isEn ? 'en-US' : 'pl-PL')} {t.currency}
                </span>
                <span style={{ fontFamily: 'var(--fd)', fontSize: '.82rem', color: 'var(--muted-2)' }}>{t.net}</span>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--line-soft)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              {t.pricingFeatures.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="var(--brand)" opacity=".1" />
                    <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'var(--fd)', fontSize: '.88rem', color: 'var(--ink-soft)' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: 'var(--line-soft)' }} />

            <p style={{ fontFamily: 'var(--fb)', fontSize: '.82rem', color: 'var(--muted-2)', lineHeight: 1.6, margin: 0 }}>
              {t.pricingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ s, open, locale }: { s: ServiceData; open: () => void; locale: string }) {
  const t = getText(locale);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ background: '#fff', borderBottom: '1px solid var(--line-soft)' }}>
      <div style={{ ...W, paddingTop: PY, paddingBottom: PY }}>
        <div className="faq-svc-inner">
          <div className="faq-svc-sticky">
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '.6em', fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 14 }}>
              <span style={{ width: 26, height: 1.5, background: 'currentColor', display: 'inline-block', opacity: 0.6 }} />
              FAQ
            </motion.span>

            <motion.h2 variants={fade} custom={0.06} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.04, color: 'var(--ink)', fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', marginBottom: 18, whiteSpace: 'pre-line' }}>
              {t.faqTitle}
            </motion.h2>

            <motion.p variants={fade} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.9rem,1.2vw,1.05rem)', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 28 }}>
              {t.faqText}
            </motion.p>

            <motion.button onClick={open} variants={fade} custom={0.18} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem', background: 'var(--brand)', color: '#fff', borderRadius: 99, padding: '.82em 1.7em', border: 'none', cursor: 'pointer' }}>
              {t.askQuestion}
            </motion.button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {s.faq.map(({ q, a }, i) => {
              const isOpen = openIdx === i;

              return (
                <motion.div key={q} variants={fade} custom={i * 0.06} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button className="faq-svc-btn" onClick={() => setOpenIdx(isOpen ? null : i)}>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.95rem,1.3vw,1.05rem)', color: isOpen ? 'var(--brand)' : 'var(--ink)', lineHeight: 1.3, transition: 'color .2s' }}>
                      {q}
                    </span>

                    <motion.span animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? 'var(--brand)' : 'transparent' }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${isOpen ? 'var(--brand)' : 'var(--line)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color .2s' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={isOpen ? '#fff' : 'currentColor'} strokeWidth="2" strokeLinecap="round">
                        <line x1="6" y1="1" x2="6" y2="11" />
                        <line x1="1" y1="6" x2="11" y2="6" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="answer" initial={{ height: 0, opacity: 0, y: -6 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                        <p style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.88rem,1.1vw,.97rem)', color: 'var(--muted)', lineHeight: 1.7, padding: '0 0 20px', margin: 0 }}>
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ open, locale }: { open: () => void; locale: string }) {
  const t = getText(locale);

  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(28px,4vw,48px) 0' }}>
      <div style={{ ...W }}>
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)', borderRadius: 'clamp(16px,3vw,28px)', padding: 'clamp(40px,7vw,80px) clamp(20px,6vw,72px)', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(30,64,175,.6) 100%)' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 860, margin: '0 auto' }}>
            <motion.span variants={fade} custom={0.04} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.76rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', display: 'block', marginBottom: 'clamp(16px,3vw,28px)' }}>
              {t.ctaLabel}
            </motion.span>

            <motion.h2 variants={fade} custom={0.08} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(1.8rem,5vw,4.2rem)', letterSpacing: '-.035em', lineHeight: 1, marginBottom: 'clamp(16px,3vw,26px)' }}>
              {t.ctaTitle}
            </motion.h2>

            <motion.p variants={fade} custom={0.12} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontFamily: 'var(--fb)', fontSize: 'clamp(.9rem,1.3vw,1.1rem)', color: 'rgba(255,255,255,.75)', lineHeight: 1.65, maxWidth: '52ch', margin: '0 auto clamp(28px,5vw,44px)' }}>
              {t.ctaText}
            </motion.p>

            <motion.div variants={fade} custom={0.16} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 12px', marginBottom: 'clamp(28px,5vw,44px)' }}>
              <motion.button onClick={open} whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(0,0,0,.28)' }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.9rem,1.2vw,1rem)', background: '#fff', color: '#1d4ed8', borderRadius: 99, padding: '.88em 2em', border: 'none', cursor: 'pointer' }}>
                {t.startProject}
              </motion.button>

              <motion.a href="mailto:kontakt@anastasiiakupriianets.pl" whileHover={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.7)' }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }} style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: 'clamp(.9rem,1.2vw,1rem)', color: '#fff', borderRadius: 99, padding: '.88em 2em', border: '1.5px solid rgba(255,255,255,.35)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                {t.email}
              </motion.a>
            </motion.div>

            <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ width: 40, height: 1, background: 'rgba(255,255,255,.2)', margin: '0 auto clamp(20px,3vw,32px)', transformOrigin: 'center' }} />

            <motion.div variants={fade} custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px clamp(16px,3vw,32px)' }}>
              {[
                { label: 'kontakt@anastasiiakupriianets.pl', href: 'mailto:kontakt@anastasiiakupriianets.pl' },
                { label: '+48 576 564 682', href: 'tel:+48576564682' },
                { label: 'anastasiiakupriianets.pl', href: 'https://anastasiiakupriianets.pl' },
              ].map(({ label, href }) => (
                <motion.a key={label} href={href} whileHover={{ color: 'rgba(255,255,255,.95)' }} transition={{ duration: 0.15 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--fd)', fontSize: 'clamp(.78rem,.9vw,.83rem)', color: 'rgba(255,255,255,.6)', textDecoration: 'none' }}>
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicePageClient({
  service,
  locale,
}: {
  service: ServiceData;
  locale: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const t = getText(locale);

  const breadcrumbs = [
    { label: t.start, href: '/' },
    { label: t.services, href: '/services' },
    { label: service.title },
  ];

  return (
    <>
      <style>{`
        .svc-two-col {
          display: grid;
          grid-template-columns: minmax(0,5fr) minmax(0,7fr);
          gap: clamp(2rem,5vw,4.5rem);
          align-items: start;
        }

        .svc-what-grid {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1.6fr);
          gap: clamp(2rem,6vw,6rem);
          align-items: start;
        }

        .svc-process-layout,
        .svc-pricing-layout {
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1.8fr);
          gap: clamp(2rem,5vw,5rem);
          align-items: center;
        }

        .svc-pricing-layout {
          grid-template-columns: minmax(0,1fr) minmax(0,1fr);
        }

        .faq-svc-inner {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 72px;
          align-items: start;
        }

        .faq-svc-sticky {
          position: sticky;
          top: 100px;
        }

        .faq-svc-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .fp-svc-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .fp-svc-tabs {
          display: flex;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .fp-svc-tabs::-webkit-scrollbar {
          display: none;
        }

        .fp-svc-tab {
          flex: 1;
          min-width: 0;
          padding: 16px 12px;
          border: none;
          cursor: pointer;
          background: transparent;
          text-align: left;
          border-bottom: 2px solid transparent;
          transition: border-color .25s;
        }

        .fp-svc-tab.active {
          border-bottom-color: var(--brand);
        }

        @media (max-width: 900px) {
          .svc-two-col,
          .svc-what-grid,
          .svc-process-layout,
          .svc-pricing-layout,
          .faq-svc-inner,
          .fp-svc-inner {
            grid-template-columns: 1fr !important;
          }

          .faq-svc-sticky {
            position: static;
          }
        }

        @media (max-width: 700px) {
          .svc-two-col > div:last-child,
          .svc-what-grid > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Header isOpen={menuOpen} toggleMenu={() => setMenuOpen(v => !v)} />

      <main style={{ paddingTop: 80 }}>
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line-soft)', padding: '.6rem clamp(1.25rem,5vw,4rem)' }}>
          <nav style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 6, alignItems: 'center' }}>
            {breadcrumbs.map(({ label, href }) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {href ? (
                  <>
                    <Link href={href} style={{ fontFamily: 'var(--fd)', fontSize: '.76rem', color: 'var(--muted-2)', textDecoration: 'none' }}>
                      {label}
                    </Link>
                    <span style={{ color: 'var(--muted-2)', fontSize: '.76rem' }}>›</span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'var(--fd)', fontSize: '.76rem', color: 'var(--ink)', fontWeight: 600 }}>
                    {label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        <Hero s={service} open={() => setModalOpen(true)} locale={locale} />
        <Why s={service} locale={locale} />
        <What s={service} locale={locale} />
        <Process s={service} locale={locale} />
        <Projects locale={locale} />
        <Pricing s={service} open={() => setModalOpen(true)} locale={locale} />
        <FAQ s={service} open={() => setModalOpen(true)} locale={locale} />
        <CTA open={() => setModalOpen(true)} locale={locale} />
      </main>

      <Footer />
      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
