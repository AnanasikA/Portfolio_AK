'use client';

import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGlobe } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';
import { usePaperPlane } from '@/components/PaperPlane';

const fade = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .6, delay: d, ease: [.22,1,.36,1] as const } }),
};

export default function Contact() {
  const t      = useTranslations('contact');
  const locale = useLocale();
  const isEn   = locale === 'en';
  const btnRef = useRef<HTMLButtonElement>(null);
  usePaperPlane(btnRef as React.RefObject<HTMLElement | null>);

  return (
    <section id="contact" style={{ background: 'var(--bg)', padding: 'clamp(28px,4vw,48px) 0' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,5vw,72px)' }}>

        <motion.div
          variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
            borderRadius: 'clamp(16px,3vw,28px)',
            padding: 'clamp(40px,7vw,80px) clamp(20px,6vw,72px)',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* grid texture */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* vignette */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(30,64,175,.6) 100%)',
          }} />

          {/* blobs */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.08, 1], opacity: [.05, .09, .05] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position:'absolute', top:-120, right:-100, width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,.05)', pointerEvents:'none', zIndex:1 }}
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.1, 1], opacity: [.04, .08, .04] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{ position:'absolute', bottom:-100, left:-80, width:320, height:320, borderRadius:'50%', background:'rgba(255,255,255,.04)', pointerEvents:'none', zIndex:1 }}
          />

          <div style={{ position:'relative', zIndex:2, maxWidth:860, margin:'0 auto' }}>

            {/* eyebrow */}
            <motion.span
              variants={fade} custom={.04} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'.76rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', display:'block', marginBottom:'clamp(16px,3vw,28px)' }}>
              — {isEn ? "Let's build something" : 'Zbudujmy coś razem'} —
            </motion.span>

            {/* big title */}
            <motion.h2
              variants={fade} custom={.08} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(1.8rem,5vw,4.2rem)', letterSpacing:'-.035em', lineHeight:1, marginBottom:'clamp(16px,3vw,26px)' }}>
              {isEn
                ? "Let's build a site that helps your business grow."
                : 'Zbudujmy stronę, która pomoże rozwinąć Twój biznes.'}
            </motion.h2>

            {/* subtitle */}
            <motion.p
              variants={fade} custom={.12} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ fontFamily:'var(--fb)', fontSize:'clamp(.9rem,1.3vw,1.1rem)', color:'rgba(255,255,255,.75)', lineHeight:1.65, maxWidth:'52ch', margin:'0 auto clamp(28px,5vw,44px)' }}>
              {isEn
                ? "Write briefly about your business and needs. You'll get a friendly reply with direction and a quote — usually within 1–2 business days."
                : 'Napisz krótko o swojej firmie i potrzebach. Otrzymasz przyjazną odpowiedź z kierunkiem i wyceną — zwykle w 1–2 dni robocze.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fade} custom={.16} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px 12px', marginBottom:'clamp(28px,5vw,44px)' }}>

              <motion.button
                ref={btnRef}
                onClick={() => window.dispatchEvent(new Event('open-brief'))}
                whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(0,0,0,.28)' }}
                whileTap={{ scale: .97 }}
                transition={{ duration: .2 }}
                style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(.9rem,1.2vw,1rem)', background:'#fff', color:'#1d4ed8', borderRadius:99, padding:'.88em 2em', border:'none', cursor:'pointer' }}>
                {isEn ? 'Start a project →' : 'Rozpocznij projekt →'}
              </motion.button>

              <motion.a
                href="mailto:kontakt@anastasiiakupriianets.pl"
                whileHover={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.7)' }}
                whileTap={{ scale: .97 }}
                transition={{ duration: .2 }}
                style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'clamp(.9rem,1.2vw,1rem)', color:'#fff', borderRadius:99, padding:'.88em 2em', border:'1.5px solid rgba(255,255,255,.35)', textDecoration:'none', display:'inline-flex', alignItems:'center' }}>
                {isEn ? 'Write an email' : 'Napisz e-mail'}
              </motion.a>
            </motion.div>

            {/* divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .7, delay: .2, ease: [.22,1,.36,1] }}
              style={{ width:40, height:1, background:'rgba(255,255,255,.2)', margin:'0 auto clamp(20px,3vw,32px)', transformOrigin:'center' }}
            />

            {/* contact links */}
            <motion.div
              variants={fade} custom={.2} initial="hidden" whileInView="visible" viewport={{ once:true }}
              style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'8px clamp(16px,3vw,32px)' }}>
              {[
                { icon: <FiMail size={13} />, label: 'kontakt@anastasiiakupriianets.pl', href: 'mailto:kontakt@anastasiiakupriianets.pl' },
                { icon: <FiPhone size={13} />, label: '+48 576 564 682', href: 'tel:+48576564682' },
                { icon: <FiGlobe size={13} />, label: 'anastasiiakuprianets.pl', href: 'https://anastasiiakuprianets.pl' },
              ].map(({ icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ color: 'rgba(255,255,255,.95)' }}
                  transition={{ duration: .15 }}
                  style={{ display:'inline-flex', alignItems:'center', gap:7, fontFamily:'var(--fd)', fontSize:'clamp(.78rem,.9vw,.83rem)', color:'rgba(255,255,255,.6)', textDecoration:'none' }}>
                  {icon} {label}
                </motion.a>
              ))}
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}