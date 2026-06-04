'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .6, delay: d, ease: [.22,1,.36,1] as const } }),
};

type Step = { step: string; title: string; text: string };

export default function ProcessSection() {
  const t     = useTranslations('process');
  const steps = t.raw('steps') as Step[];
  const lineRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(lineRef, { once: true, margin: '-80px' });

  return (
    <section id="process" style={{ background: 'var(--surface)', padding: 'clamp(48px,7vw,100px) 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

        {/* ── Head ── */}
        <div style={{ marginBottom: 'clamp(32px,5vw,64px)' }}>
          <motion.span variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display:'inline-flex', alignItems:'center', gap:'.6em', fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--brand)', marginBottom:14 }}>
            <span style={{ width:26, height:1.5, background:'currentColor', display:'inline-block', opacity:.6 }} />
            {t('badge')}
          </motion.span>
          <motion.h2 variants={fade} custom={.06} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily:'var(--fd)', fontWeight:600, letterSpacing:'-.03em', lineHeight:1.04, color:'var(--ink)', fontSize:'clamp(1.7rem,3.5vw,2.8rem)', maxWidth:680, marginBottom:16 }}>
            {t('title')}
          </motion.h2>
          <motion.p variants={fade} custom={.12} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ fontFamily:'var(--fb)', fontSize:'clamp(.95rem,1.3vw,1.1rem)', color:'var(--muted)', lineHeight:1.6, maxWidth:'52ch' }}>
            {t('description')}
          </motion.p>
        </div>

        {/* ── Timeline + steps ── */}
        <style>{`
          .proc-cols {
            display: grid;
            grid-template-columns: repeat(${steps.length}, 1fr);
            gap: 0;
          }
          .proc-step-article {
            padding: 0 clamp(10px,1.8vw,28px);
          }
          .proc-step-article:first-child { padding-left: 0; }
          .proc-step-article:last-child  { padding-right: 0; }

          @media (max-width: 699px) {
            .proc-cols {
              grid-template-columns: 1fr;
              gap: 32px;
            }
            .proc-line-row { display: none !important; }
            .proc-step-article {
              padding: 0 !important;
              border-left: none !important;
              border-top: 1px solid var(--line);
              padding-top: 24px !important;
            }
            .proc-step-article:first-child {
              border-top: none;
              padding-top: 0 !important;
            }
          }
        `}</style>

        {/* LINE ROW */}
        <div ref={lineRef} className="proc-line-row" style={{ position:'relative', height:20, marginBottom:24 }}>
          <div style={{
            position:'absolute', top:'50%', transform:'translateY(-50%)',
            left:0, right:0, height:2,
            background:'var(--line)',
          }} />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [.22,1,.36,1], delay: .15 }}
            style={{
              position:'absolute', top:'50%', transform:'translateY(-50%)',
              left:0, right:0, height:2,
              background:'var(--brand)',
              transformOrigin:'left center',
              zIndex:1,
            }}
          />
          {steps.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
              transition={{ duration: .35, delay: .15 + (i / (steps.length - 1)) * 1.6, ease: [.22,1,.36,1] }}
              style={{
                position:'absolute',
                top:'50%',
                left:`${(i + 0.5) / steps.length * 100}%`,
                transform:'translate(-50%,-50%)',
                width:12, height:12, borderRadius:'50%',
                background:'var(--brand)',
                boxShadow:`0 0 0 3px var(--surface), 0 0 0 5px var(--brand)`,
                zIndex:2,
              }}
            />
          ))}
        </div>

        {/* STEP COLUMNS */}
        <div className="proc-cols">
          {steps.map((item, i) => (
            <motion.article
              key={item.step}
              className="proc-step-article"
              variants={fade}
              custom={i * .1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin:'-40px' }}
              style={{
                borderLeft: i > 0 ? '1px solid var(--line)' : 'none',
              }}
            >
              <p style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.72rem', letterSpacing:'.14em', textTransform:'uppercase', color:'var(--brand)', margin:'0 0 16px' }}>
                {item.step}
              </p>
              <h3 style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(1rem,1.6vw,1.25rem)', letterSpacing:'-.02em', color:'var(--ink)', margin:'0 0 10px', lineHeight:1.2 }}>
                {item.title}
              </h3>
              <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(.85rem,1.1vw,.92rem)', color:'var(--muted)', lineHeight:1.65, margin:0 }}>
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div variants={fade} custom={.2} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ marginTop:'clamp(32px,5vw,56px)', display:'flex', flexWrap:'wrap', gap:12 }}>
          <button
            onClick={() => window.dispatchEvent(new Event('open-brief'))}
            style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.97rem', background:'var(--brand)', color:'#fff', borderRadius:99, padding:'.85em 1.8em', border:'none', cursor:'pointer', transition:'transform .25s, box-shadow .25s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 32px rgba(29,78,216,.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow=''; }}>
            {t('primary_cta')}
          </button>
          <a href="#projekty"
            style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.97rem', color:'var(--ink)', borderRadius:99, padding:'.85em 1.8em', border:'1.5px solid var(--line)', textDecoration:'none', transition:'border-color .2s, color .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--brand)'; (e.currentTarget as HTMLElement).style.color='var(--brand)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--line)'; (e.currentTarget as HTMLElement).style.color='var(--ink)'; }}>
            {t('secondary_cta')}
          </a>
        </motion.div>

      </div>
    </section>
  );
}