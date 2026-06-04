'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePaperPlane } from '@/components/PaperPlane';

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .6, delay: d, ease: [.22,1,.36,1] as const } }),
};

const faqData = {
  pl: [
    { q: 'Ile kosztuje strona internetowa?', a: 'Cena zależy od zakresu projektu — strony wizytówkowe zaczynają się od 2 500 zł, a bardziej rozbudowane rozwiązania wyceniam indywidualnie. Zawsze dostajesz wycenę przed rozpoczęciem pracy, bez niespodzianek.' },
    { q: 'Ile czasu zajmuje realizacja?', a: 'Standardowy projekt trwa 7–14 dni roboczych od dostarczenia materiałów. Termin ustalamy na starcie i się go trzymam.' },
    { q: 'Czy będę mógł sam edytować stronę?', a: 'Tak — strony WordPress dostajesz z panelem, który pozwala zmieniać treści bez wiedzy technicznej. Przeprowadzam krótkie szkolenie po wdrożeniu.' },
    { q: 'Czy pracujecie z firmami spoza Polski?', a: 'Oczywiście. Współpracuję zdalnie z klientami z całej Europy. Komunikacja odbywa się po polsku lub angielsku.' },
    { q: 'Czego potrzebujecie ode mnie na start?', a: 'Na początku wystarczy krótki brief — czym się zajmujesz, do kogo kierujesz ofertę i jakie masz cele. Resztą się zajmuję.' },
    { q: 'Czy przeprojektowujecie istniejące strony?', a: 'Tak, zajmuję się również redesignem. Analizuję obecną stronę, wskazuję co warto poprawić i przygotowuję nową wersję.' },
  ],
  en: [
    { q: 'How much does a website cost?', a: 'Pricing depends on the scope — business card websites start from €600, and more complex solutions are quoted individually. You always get a quote before work begins, no surprises.' },
    { q: 'How long does it take?', a: 'A standard project takes 7–14 business days from when you deliver the materials. We agree on the deadline upfront and I stick to it.' },
    { q: 'Can I edit the website myself?', a: 'Yes — WordPress sites come with a panel that lets you update content without any technical knowledge. I provide a short walkthrough after launch.' },
    { q: 'Do you work with companies outside Poland?', a: 'Absolutely. I collaborate remotely with clients across Europe. Communication can be in Polish or English.' },
    { q: 'What do you need from me to get started?', a: 'Just a short brief — what you do, who your audience is, and what goals you have. I take care of the rest.' },
    { q: 'Do you redesign existing websites?', a: 'Yes, I also handle redesigns. I analyse your current site, identify what should be improved, and build a new version.' },
  ],
};

export default function FAQ() {
  const locale  = useLocale();
  const isEn    = locale === 'en';
  const items   = isEn ? faqData.en : faqData.pl;
  const [open, setOpen] = useState<number | null>(null);
  const btnRef  = useRef<HTMLAnchorElement>(null);
  usePaperPlane(btnRef as React.RefObject<HTMLElement | null>);

  return (
    <section id="faq" style={{ background: 'var(--surface)', padding: 'clamp(48px,7vw,100px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

        <style>{`
          .faq-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
          }
          @media (min-width: 860px) {
            .faq-inner {
              grid-template-columns: 5fr 7fr;
              gap: 72px;
              align-items: start;
            }
          }
          .faq-sticky {
            position: static;
          }
          @media (min-width: 860px) {
            .faq-sticky {
              position: sticky;
              top: 100px;
            }
          }
          .faq-item-btn {
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
          @media (max-width: 479px) {
            .faq-item-btn { padding: 16px 0; gap: 12px; }
          }
        `}</style>

        <div className="faq-inner">

          {/* Left */}
          <div className="faq-sticky">
            <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display:'inline-flex', alignItems:'center', gap:'.6em', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--brand)', marginBottom:14 }}>
              <span style={{ width:26, height:1.5, background:'currentColor', display:'inline-block', opacity:.6 }} />
              FAQ
            </motion.span>

            <motion.h2 variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontFamily:'var(--fd)', fontWeight:600, letterSpacing:'-.03em', lineHeight:1.04, color:'var(--ink)', fontSize:'clamp(1.7rem,3.5vw,2.8rem)', marginBottom:18, whiteSpace:'pre-line' }}>
              {isEn ? 'Good questions,\nclear answers.' : 'Dobre pytania,\njasne odpowiedzi.'}
            </motion.h2>

            <motion.p variants={fade} custom={.12} initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ fontFamily:'var(--fb)', fontSize:'clamp(.9rem,1.2vw,1.05rem)', color:'var(--muted)', lineHeight:1.65, marginBottom:28 }}>
              {isEn
                ? "Don't see your question? Send a quick message — you'll get a concrete answer, no sales pressure."
                : 'Nie znalazłeś odpowiedzi? Napisz krótką wiadomość — otrzymasz konkretną odpowiedź, bez presji sprzedaży.'}
            </motion.p>

            <motion.a
              ref={btnRef}
              variants={fade} custom={.18} initial="hidden" whileInView="visible" viewport={{ once: true }}
              href="mailto:hello@akwebdesign.pl"
              style={{ display:'inline-flex', alignItems:'center', gap:8, fontFamily:'var(--fd)', fontWeight:600, fontSize:'.95rem', background:'var(--brand)', color:'#fff', borderRadius:99, padding:'.82em 1.7em', textDecoration:'none', transition:'transform .25s, box-shadow .25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 32px rgba(29,78,216,.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
              {isEn ? 'Ask a question →' : 'Zadaj pytanie →'}
            </motion.a>
          </div>

          {/* Right — accordion */}
          <div style={{ display:'flex', flexDirection:'column' }}>
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={i}
                  variants={fade} custom={i * .06}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-20px' }}
                  style={{ borderBottom: '1px solid var(--line)' }}
                >
                  <button
                    className="faq-item-btn"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span style={{
                      fontFamily: 'var(--fd)', fontWeight: 600,
                      fontSize: 'clamp(.95rem,1.3vw,1.05rem)',
                      color: isOpen ? 'var(--brand)' : 'var(--ink)',
                      lineHeight: 1.3,
                      transition: 'color .2s',
                    }}>
                      {item.q}
                    </span>

                    {/* +/× icon */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? 'var(--brand)' : 'transparent' }}
                      transition={{ duration: .28, ease: [.22,1,.36,1] }}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        border: `1.5px solid ${isOpen ? 'var(--brand)' : 'var(--line)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'border-color .2s',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        stroke={isOpen ? '#fff' : 'currentColor'}
                        strokeWidth="2" strokeLinecap="round">
                        <line x1="6" y1="1" x2="6" y2="11"/>
                        <line x1="1" y1="6" x2="11" y2="6"/>
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0, y: -6 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -6 }}
                        transition={{ duration: .35, ease: [.22,1,.36,1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{
                          fontFamily: 'var(--fb)', fontSize: 'clamp(.88rem,1.1vw,.97rem)',
                          color: 'var(--muted)', lineHeight: 1.7,
                          padding: '0 0 20px', margin: 0,
                        }}>
                          {item.a}
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