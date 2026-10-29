'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .6, delay: d, ease: [.22,1,.36,1] as const } }),
};

const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconBolt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const cardsData = {
  pl: [
    { icon: <IconChat />,   title: 'Jedna osoba do kontaktu', text: 'Przez cały projekt masz jedną osobę kontaktową, która zna Twoją stronę od środka. Bez pośredników i przekazywania sprawy dalej.' },
    { icon: <IconShield />, title: 'Mówimy prostym językiem', text: 'Nie musisz znać się na stronach. Tłumaczymy, co robimy i dlaczego, bez technicznego żargonu.' },
    { icon: <IconClock />,  title: 'Jasne etapy i terminy',   text: 'Na starcie ustalamy zakres, cenę i termin. Na każdym etapie wiesz, co jest zrobione i co nas czeka.' },
    { icon: <IconBolt />,   title: 'Pomoc także po starcie',  text: 'Po uruchomieniu nie znikamy. Pomagamy w zmianach, aktualizacjach i wtedy, gdy coś przestaje działać.' },
    { icon: <IconGlobe />,  title: 'Lokalnie i zdalnie',      text: 'Działamy w Kątach Wrocławskich i Wrocławiu, gdzie chętnie spotkamy się na kawę. Z klientami z innych miast pracujemy zdalnie.' },
  ],
  en: [
    { icon: <IconChat />,   title: 'One point of contact',   text: 'You have one point of contact who knows your site inside out. No middlemen.' },
    { icon: <IconShield />, title: 'Plain language',         text: "You don't need to know anything about websites. We explain what we do and why, without jargon." },
    { icon: <IconClock />,  title: 'Clear stages and dates', text: 'We agree on scope, price and deadline at the start, and you always know what is done and what comes next.' },
    { icon: <IconBolt />,   title: 'Help after launch',      text: "We don't disappear after launch. We help with changes, updates and when something stops working." },
    { icon: <IconGlobe />,  title: 'Local and remote',       text: 'Based around Kąty Wrocławskie and Wrocław, where we are happy to meet for a coffee. Clients elsewhere we work with remotely.' },
  ],
};

const statsData = {
  pl: [
    { value: 'WordPress', label: 'i Next.js' },
    { value: 'PL / EN',   label: 'rozmawiamy po polsku i angielsku' },
    { value: '7–14 dni',  label: 'na prostą stronę' },
  ],
  en: [
    { value: 'WordPress', label: 'and Next.js' },
    { value: 'PL / EN',   label: 'we speak Polish and English' },
    { value: '7–14 days', label: 'for a simple site' },
  ],
};

export default function WhyUs() {
  const locale = useLocale();
  const isEn   = locale === 'en';
  const cards  = isEn ? cardsData.en : cardsData.pl;
  const stats  = isEn ? statsData.en : statsData.pl;

  return (
    <section id="why-us" style={{ background: 'var(--bg)', padding: 'clamp(48px,7vw,100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

        <style>{`
          .why-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
            align-items: start;
          }
          @media (min-width: 860px) {
            .why-inner { grid-template-columns: 5fr 7fr; gap: 72px; }
          }
          .why-cards {
            display: grid;
            grid-template-columns: 1fr;
            gap: 14px;
          }
          @media (min-width: 480px) {
            .why-cards { grid-template-columns: 1fr 1fr; }
          }
          .why-card-last { grid-column: 1; }
          @media (min-width: 480px) {
            .why-card-last { grid-column: 1 / -1; }
          }
          .why-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 20px 36px;
          }
          @media (max-width: 479px) {
            .why-stats { gap: 16px 28px; }
          }
        `}</style>

        <div className="why-inner">

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ display:'inline-flex', alignItems:'center', gap:'.6em', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--brand)', marginBottom:14 }}>
                <span style={{ width:26, height:1.5, background:'currentColor', display:'inline-block', opacity:.6 }} />
                {isEn ? 'Why AK Web & Design' : 'Dlaczego AK Web & Design'}
              </motion.span>

              <motion.h2 variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ fontFamily:'var(--fd)', fontWeight:600, letterSpacing:'-.035em', lineHeight:.97, color:'var(--ink)', fontSize:'clamp(1.7rem,3.5vw,2.8rem)', marginBottom:18 }}>
                {isEn
                  ? 'We look after your website as if it were our own.'
                  : 'Dbamy o Twoją stronę tak, jakby była nasza.'}
              </motion.h2>

              <motion.p variants={fade} custom={.12} initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ fontFamily:'var(--fb)', fontSize:'clamp(.95rem,1.3vw,1.1rem)', color:'var(--muted)', lineHeight:1.65 }}>
                {isEn
                  ? 'We are not a big agency, and that is a good thing. Projects are handled directly, without layers of managers, and you always know who to ask.'
                  : 'Nie jesteśmy dużą agencją i to dobrze. Projekty prowadzimy bezpośrednio, bez kolejnych szczebli, a Ty zawsze wiesz, do kogo napisać.'}
              </motion.p>
            </div>

            <motion.div
              variants={fade} custom={.18} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="why-stats"
              style={{ paddingTop: 22, borderTop: '1px solid var(--line)' }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <span style={{
                    fontFamily: 'var(--fd)', fontWeight: 700,
                    fontSize: 'clamp(1.7rem,3vw,2.6rem)',
                    color: 'var(--brand)', letterSpacing: '-.03em',
                    display: 'block', lineHeight: 1,
                  }}>
                    {s.value}
                  </span>
                  <small style={{ fontFamily:'var(--fb)', fontSize:'.82rem', color:'var(--muted)', marginTop:4, display:'block' }}>
                    {s.label}
                  </small>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="why-cards">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={fade} custom={i * .07}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }}
                className={i === cards.length - 1 ? 'why-card-last' : ''}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-l)',
                  padding: 'clamp(16px,2vw,24px)',
                  display: 'flex',
                  flexDirection: i === cards.length - 1 ? 'row' : 'column',
                  alignItems: i === cards.length - 1 ? 'flex-start' : undefined,
                  gap: i === cards.length - 1 ? 18 : 14,
                  transition: 'box-shadow .25s, transform .25s',
                }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.07)' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 11,
                  background: 'var(--brand-tint)',
                  color: 'var(--brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(.95rem,1.2vw,1.05rem)', color:'var(--ink)', marginBottom:6, lineHeight:1.2 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(.82rem,1vw,.88rem)', color:'var(--muted)', lineHeight:1.65, margin:0 }}>
                    {card.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}