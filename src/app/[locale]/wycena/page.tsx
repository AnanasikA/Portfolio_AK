'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackEvent } from '@/lib/gtag';

// ─── Dane statyczne (ceny / ID) ───────────────────────────────────────────────

const SITE_TYPES = [
  { id: 'landing',   base: 1500, pages: 1,  pricePerPage: 0,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { id: 'business',  base: 2500, pages: 5,  pricePerPage: 400,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg> },
  { id: 'wordpress', base: 2600, pages: 5,  pricePerPage: 350,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h4m12 0h4M12 2v4m0 12v4"/></svg> },
  { id: 'redesign',  base: 1800, pages: 5,  pricePerPage: 300,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
  { id: 'premium',   base: 4500, pages: 10, pricePerPage: 500,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
];

const PAGE_VALUES = [1, 3, 5, 10, 15];

const EXTRA_IDS = ['seo','copy','booking','shop','lang','blog','branding','care'] as const;
type ExtraId = typeof EXTRA_IDS[number];
const EXTRA_PRICES: Record<ExtraId, number> = {
  seo: 500, copy: 600, booking: 800, shop: 2200,
  lang: 800, blog: 500, branding: 1000, care: 120,
};
const CARE_ID: ExtraId = 'care';

function fmt(n: number) { return n.toLocaleString('pl-PL'); }

// Wolniejsza, delikatniejsza animacja
function useAnimatedNumber(target: number) {
  const [v, setV] = useState(target);
  const prev = useRef(target);
  const raf  = useRef<number>(0);
  useEffect(() => {
    const from = prev.current;
    if (from === target) return;
    cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const duration = 600; // ms — dłużej = delikatniej
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // ease-out cubic — łagodne wyhamowanie
      const e = 1 - Math.pow(1 - p, 2.5);
      setV(Math.round(from + (target - from) * e));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else { prev.current = target; setV(target); }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return v;
}

// ─── Komponent ────────────────────────────────────────────────────────────────

export default function WycenaPage() {
  const c = useTranslations('calculator');

  const [menuOpen,  setMenuOpen]  = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [siteType,  setSiteType]  = useState('business');
  const [pages,     setPages]     = useState(5);
  const [extras,    setExtras]    = useState<Set<ExtraId>>(new Set());
  const [speed,     setSpeed]     = useState<'standard'|'priority'>('standard');
  const [sidebarBottom, setSidebarBottom] = useState('0px');
  const [hasInteracted, setHasInteracted] = useState(false);

  // form
  const [formName,    setFormName]    = useState('');
  const [formEmail,   setFormEmail]   = useState('');
  const [formPhone,   setFormPhone]   = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus,  setFormStatus]  = useState<'idle'|'sending'|'ok'|'error'>('idle');

  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!footerRef.current) return;
      const footerTop = footerRef.current.getBoundingClientRect().top;
      const vh = window.innerHeight;
      setSidebarBottom(footerTop < vh ? `${vh - footerTop}px` : '0px');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fn = () => setBriefOpen(true);
    window.addEventListener('open-brief', fn);
    return () => window.removeEventListener('open-brief', fn);
  }, []);

  useEffect(() => {
    const t = SITE_TYPES.find(t => t.id === siteType)!;
    const closest = PAGE_VALUES.reduce((a, b) =>
      Math.abs(b - t.pages) < Math.abs(a - t.pages) ? b : a
    );
    setPages(closest);
  }, [siteType]);

  function toggleExtra(id: ExtraId) {
    setHasInteracted(true);
    setExtras(prev => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });
  }

  function interact() { setHasInteracted(true); }

  const t           = SITE_TYPES.find(t => t.id === siteType)!;
  const extraPages  = Math.max(0, pages - t.pages);
  const baseTotal   = t.base + extraPages * t.pricePerPage;
  const extrasTotal = EXTRA_IDS.filter(id => extras.has(id) && id !== CARE_ID).reduce((s, id) => s + EXTRA_PRICES[id], 0);
  const careTotal   = extras.has(CARE_ID) ? EXTRA_PRICES[CARE_ID] : 0;
  const subtotal    = baseTotal + extrasTotal;
  const total       = speed === 'priority' ? Math.round(subtotal * 1.25) : subtotal;

  // Na starcie: "od X zł". Po interakcji: "X – Y zł"
  const showRange   = hasInteracted && total > t.base;
  const animLow     = useAnimatedNumber(t.base);
  const animHigh    = useAnimatedNumber(total);

  const breakdown: { label: string; price: number }[] = [
    { label: c(`siteTypes.${t.id}.label`), price: t.base },
    ...(extraPages > 0 ? [{ label: c('breakdown_pages', { count: extraPages }), price: extraPages * t.pricePerPage }] : []),
    ...EXTRA_IDS.filter(id => extras.has(id) && id !== CARE_ID).map(id => ({ label: c(`extras.${id}.label`), price: EXTRA_PRICES[id] })),
    ...(speed === 'priority' ? [{ label: c('breakdown_priority'), price: total - subtotal }] : []),
  ];

  async function sendQuote() {
    if (!formName || !formEmail) return;
    setFormStatus('sending');
    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName, email: formEmail,
          phone: formPhone, company: formCompany, message: formMessage,
          quote: { low: t.base, high: total, care: careTotal, breakdown },
        }),
      });
      const data = await res.json();
      if (data.ok) {
        trackEvent('form_submit', { form_name: 'calculator_brief', site_type: siteType });
      }
      setFormStatus(data.ok ? 'ok' : 'error');
    } catch { setFormStatus('error'); }
  }

  const line  = 'var(--line-soft)';
  const brand = 'var(--brand)';
  const ink   = 'var(--ink)';
  const muted = 'var(--muted-2)';

  const cardBase: React.CSSProperties = {
    background: '#fff', border: `1.5px solid ${line}`, borderRadius: 14,
    padding: '1rem 1.1rem', cursor: 'pointer', textAlign: 'left',
    transition: 'border-color .2s, box-shadow .2s, background .2s',
    width: '100%', fontFamily: 'var(--fd)',
  };

  const stepHeader: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 12,
    marginBottom: '1.25rem', paddingBottom: '0.9rem',
    borderBottom: `1px solid ${line}`,
  };

  const checkCircle = (on: boolean) => (
    <span style={{
      width: 18, height: 18, borderRadius: '50%',
      border: `1.5px solid ${on ? brand : line}`,
      background: on ? brand : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'all .2s',
    }}>
      {on && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.2 6L8 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </span>
  );

  return (
    <>
      <style>{`
        .qw-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .qw-grid2 > *:last-child:nth-child(odd) { grid-column: 1 / -1; }
        .qw-pages { display: flex; flex-wrap: wrap; gap: 8px; }
        .qw-sidebar::-webkit-scrollbar { display: none; }
        .qw-extra-desc { font-size: .72rem; line-height: 1.45; margin-top: .3rem; color: var(--muted-2); max-height: 0; overflow: hidden; transition: max-height .25s ease, opacity .25s ease; opacity: 0; }
        .qw-extra-btn:hover .qw-extra-desc,
        .qw-extra-btn:focus-within .qw-extra-desc { max-height: 60px; opacity: 1; }
        @media (max-width: 600px) {
          .qw-grid2 { grid-template-columns: 1fr; }
          .qw-grid2 > *:last-child:nth-child(odd) { grid-column: auto; }
        }
        @media (max-width: 960px) {
          .qw-two-col { flex-direction: column !important; }
          .qw-sidebar { position: static !important; height: auto !important; width: 100% !important; }
        }
      `}</style>

      <Header isOpen={menuOpen} toggleMenu={() => setMenuOpen(v => !v)} />

      {/* Modal */}
      {briefOpen && (
        <div onClick={e => { if (e.target === e.currentTarget) { setBriefOpen(false); setFormStatus('idle'); } }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,15,26,.55)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => { setBriefOpen(false); setFormStatus('idle'); }}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: muted, fontSize: '1.1rem', lineHeight: 1 }}>✕</button>

            {formStatus === 'ok' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#eef3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.1rem', color: ink, marginBottom: '.5rem' }}>{c('successTitle')}</p>
                <p style={{ fontFamily: 'var(--fd)', fontSize: '.88rem', color: muted, lineHeight: 1.6 }}>{c('successDesc')}</p>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', color: brand, marginBottom: '.5rem' }}>{c('modalTitle')}</p>
                <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.45rem', letterSpacing: '-.03em', color: ink, marginBottom: '.3rem' }}>
                  {showRange ? `${fmt(animLow)} – ${fmt(animHigh)} zł` : `${c('sidebarFrom', { price: fmt(animLow) })}`}
                </h2>
                <p style={{ fontFamily: 'var(--fd)', fontSize: '.83rem', color: muted, marginBottom: '1.5rem', lineHeight: 1.55 }}>{c('modalSubtitle')}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {([
                    { label: c('fieldName'),    value: formName,    setter: setFormName,    type: 'text',  ph: c('fieldNamePlaceholder') },
                    { label: c('fieldEmail'),   value: formEmail,   setter: setFormEmail,   type: 'email', ph: c('fieldEmailPlaceholder') },
                    { label: c('fieldPhone'),   value: formPhone,   setter: setFormPhone,   type: 'tel',   ph: c('fieldPhonePlaceholder') },
                    { label: c('fieldCompany'), value: formCompany, setter: setFormCompany, type: 'text',  ph: c('fieldCompanyPlaceholder') },
                  ] as const).map(f => (
                    <div key={f.label}>
                      <label style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', fontWeight: 600, color: ink, display: 'block', marginBottom: 4 }}>{f.label}</label>
                      <input type={f.type} value={f.value} onChange={e => (f.setter as (v: string) => void)(e.target.value)} placeholder={f.ph}
                        style={{ width: '100%', fontFamily: 'var(--fd)', fontSize: '.88rem', padding: '.65em .9em', border: `1.5px solid ${line}`, borderRadius: 10, outline: 'none', color: ink, transition: 'border-color .2s' }}
                        onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--line-soft)')} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', fontWeight: 600, color: ink, display: 'block', marginBottom: 4 }}>{c('fieldMessage')}</label>
                    <textarea value={formMessage} onChange={e => setFormMessage(e.target.value)} placeholder={c('fieldMessagePlaceholder')} rows={3}
                      style={{ width: '100%', fontFamily: 'var(--fd)', fontSize: '.88rem', padding: '.65em .9em', border: `1.5px solid ${line}`, borderRadius: 10, outline: 'none', color: ink, resize: 'vertical', transition: 'border-color .2s' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--brand)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--line-soft)')} />
                  </div>
                </div>

                {formStatus === 'error' && (
                  <p style={{ fontFamily: 'var(--fd)', fontSize: '.82rem', color: '#dc2626', marginTop: '.75rem' }}>{c('errorMsg')}</p>
                )}

                <button onClick={sendQuote} disabled={formStatus === 'sending' || !formName || !formEmail}
                  style={{ marginTop: '1.25rem', width: '100%', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.9rem', padding: '.85em 1.5em', borderRadius: 99, border: 'none', background: (!formName || !formEmail || formStatus === 'sending') ? '#e5e7eb' : 'var(--brand)', color: (!formName || !formEmail || formStatus === 'sending') ? '#9ca3af' : '#fff', cursor: (!formName || !formEmail || formStatus === 'sending') ? 'not-allowed' : 'pointer', transition: 'opacity .2s, background .2s' }}>
                  {formStatus === 'sending' ? c('submitting') : c('submit')}
                </button>
                <p style={{ fontFamily: 'var(--fd)', fontSize: '.73rem', color: muted, textAlign: 'center', marginTop: '.75rem' }}>{c('submitNote')}</p>
              </>
            )}
          </div>
        </div>
      )}

      <main style={{ paddingTop: 80, overflow: 'visible' }}>

        {/* Hero */}
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '3rem clamp(1.25rem,5vw,4.5rem) 2.5rem' }}>
          <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: brand, marginBottom: '.75rem' }}>
            {c('badge')}
          </p>
          <h1 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '-.04em', color: ink, lineHeight: 1.08, marginBottom: '1rem', maxWidth: '22ch' }}>
            {c('title')}
          </h1>
          <p style={{ fontFamily: 'var(--fd)', fontSize: '1rem', color: muted, maxWidth: '52ch', lineHeight: 1.65 }}>
            {c('subtitle')}
          </p>
        </div>

        {/* Two-col */}
        <div className="qw-two-col" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(1.25rem,5vw,4.5rem)', display: 'flex', alignItems: 'flex-start', gap: 0 }}>

          {/* LEFT */}
          <div style={{ flex: '1 1 0', minWidth: 0, paddingRight: '2.5rem', paddingBottom: '6rem' }}>

            {/* Krok 1 */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={stepHeader}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2.5rem', color: ink, opacity: .1, lineHeight: 1, marginRight: '1rem' }}>1</span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.3rem', color: ink, letterSpacing: '-.02em' }}>{c('step1')}</span>
              </div>
              <div className="qw-grid2">
                {SITE_TYPES.map(st => {
                  const on = siteType === st.id;
                  return (
                    <button key={st.id} onClick={() => { setSiteType(st.id); interact(); }} style={{
                      ...cardBase,
                      borderColor: on ? brand : line,
                      background: on ? 'color-mix(in srgb, var(--brand) 5%, #fff)' : '#fff',
                      boxShadow: on ? '0 0 0 1px var(--brand)' : 'none',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.55rem' }}>
                        <span style={{ color: brand }}>{st.icon}</span>
                        {checkCircle(on)}
                      </div>
                      <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.88rem', color: ink, marginBottom: '.2rem' }}>{c(`siteTypes.${st.id}.label`)}</p>
                      <p style={{ fontFamily: 'var(--fd)', fontSize: '.73rem', color: brand, fontWeight: 600, marginBottom: '.3rem' }}>od {fmt(st.base)} zł</p>
                      <p style={{ fontFamily: 'var(--fd)', fontSize: '.72rem', color: muted, lineHeight: 1.45, marginBottom: '.15rem' }}>{c(`siteTypes.${st.id}.desc`)}</p>
                      <p style={{ fontFamily: 'var(--fd)', fontSize: '.69rem', color: muted, lineHeight: 1.4, opacity: .65 }}>{c(`siteTypes.${st.id}.subdesc`)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Krok 2 */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={stepHeader}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2.5rem', color: ink, opacity: .1, lineHeight: 1, marginRight: '1rem' }}>2</span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.3rem', color: ink, letterSpacing: '-.02em' }}>{c('step2')}</span>
              </div>
              <div className="qw-pages">
                {PAGE_VALUES.map(val => {
                  const on = pages === val;
                  const isExtra = val > t.pages;
                  const extraCost = isExtra ? (val - t.pages) * t.pricePerPage : 0;
                  return (
                    <button key={val} onClick={() => { setPages(val); interact(); }} style={{
                      fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.84rem',
                      padding: '.6em 1.05em', borderRadius: 10,
                      border: `1.5px solid ${on ? brand : line}`,
                      background: on ? 'color-mix(in srgb, var(--brand) 6%, #fff)' : '#fff',
                      color: on ? brand : ink,
                      cursor: 'pointer',
                      transition: 'border-color .2s, background .2s, color .2s',
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
                    }}>
                      <span>{c(`pageOptions.${val}.label`)}</span>
                      <span style={{ fontSize: '.67rem', fontWeight: 400, color: isExtra ? brand : muted, opacity: isExtra ? 1 : .75 }}>
                        {isExtra ? `+${fmt(extraCost)} zł` : c(`pageOptions.${val}.hint`)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {extraPages > 0 && (
                <p style={{ fontFamily: 'var(--fd)', fontSize: '.77rem', color: brand, marginTop: '.6rem' }}>
                  {c('extraPages', { count: extraPages, price: fmt(extraPages * t.pricePerPage) })}
                </p>
              )}
            </div>

            {/* Krok 3 */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={stepHeader}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2.5rem', color: ink, opacity: .1, lineHeight: 1, marginRight: '1rem' }}>3</span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.3rem', color: ink, letterSpacing: '-.02em' }}>{c('step3')}</span>
                <span style={{ fontFamily: 'var(--fd)', fontSize: '.8rem', color: muted, marginLeft: 'auto' }}>{c('step3hint')}</span>
              </div>
              <div className="qw-grid2">
                {EXTRA_IDS.map(id => {
                  const on = extras.has(id);
                  const price = EXTRA_PRICES[id];
                  const isMonthly = id === CARE_ID;
                  return (
                    <button key={id} className="qw-extra-btn" onClick={() => toggleExtra(id)} style={{
                      ...cardBase,
                      borderColor: on ? brand : line,
                      background: on ? 'color-mix(in srgb, var(--brand) 5%, #fff)' : '#fff',
                      padding: '.9rem 1rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.87rem', color: ink, marginBottom: '.18rem' }}>{c(`extras.${id}.label`)}</p>
                          <p style={{ fontFamily: 'var(--fd)', fontSize: '.72rem', color: on ? brand : muted, fontWeight: on ? 600 : 400 }}>
                            +{fmt(price)} zł{isMonthly ? ` ${c('careSuffix')}` : ''}
                          </p>
                          <p className="qw-extra-desc">{c(`extras.${id}.desc`)}</p>
                        </div>
                        {checkCircle(on)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Krok 4 */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={stepHeader}>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2.5rem', color: ink, opacity: .1, lineHeight: 1, marginRight: '1rem' }}>4</span>
                <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.3rem', color: ink, letterSpacing: '-.02em' }}>{c('step4')}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {(['standard', 'priority'] as const).map(val => {
                  const on = speed === val;
                  return (
                    <button key={val} onClick={() => { setSpeed(val); interact(); }} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                      gap: 2, padding: '.7em 1.25em', borderRadius: 12,
                      border: `1.5px solid ${on ? brand : line}`,
                      background: on ? 'color-mix(in srgb, var(--brand) 6%, #fff)' : '#fff',
                      cursor: 'pointer', fontFamily: 'var(--fd)',
                      transition: 'border-color .2s, background .2s',
                    }}>
                      <span style={{ fontWeight: 600, fontSize: '.87rem', color: on ? brand : ink, display: 'flex', alignItems: 'center', gap: 6, transition: 'color .2s' }}>
                        {c(`speed_${val}_label`)}
                        {val === 'priority' && (
                          <span style={{ fontSize: '.69rem', fontWeight: 700, color: brand, background: 'color-mix(in srgb, var(--brand) 11%, transparent)', padding: '2px 6px', borderRadius: 99 }}>
                            {c('speed_priority_badge')}
                          </span>
                        )}
                      </span>
                      <span style={{ fontSize: '.72rem', color: muted }}>{c(`speed_${val}_sub`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Placeholder */}
          <div style={{ width: 320, flexShrink: 0 }} />

          {/* Sidebar fixed */}
          <div className="qw-sidebar" style={{
            position: 'fixed',
            top: 80,
            right: 'max(0px, calc((100vw - 1240px) / 2))',
            width: 320,
            height: `calc(100vh - 80px - ${sidebarBottom})`,
            overflowY: 'auto',
            zIndex: 10,
          }}>
            <div style={{ background: '#0f1117', padding: '2rem 1.75rem', minHeight: '100%' }}>

              <p style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', marginBottom: '1rem' }}>
                {c('sidebarTitle')}
              </p>

              {/* Cena: "od X" lub "X – Y" */}
              <div style={{ marginBottom: '.3rem', transition: 'opacity .3s' }}>
                {showRange ? (
                  <>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2.3rem', letterSpacing: '-.05em', color: '#fff', lineHeight: 1 }}>
                      {fmt(animLow)} – {fmt(animHigh)}
                    </span>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', color: 'rgba(255,255,255,.42)', marginLeft: 5 }}>zł</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 500, fontSize: '1rem', color: 'rgba(255,255,255,.5)', lineHeight: 1 }}>od </span>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '2.3rem', letterSpacing: '-.05em', color: '#fff', lineHeight: 1 }}>
                      {fmt(animLow)}
                    </span>
                    <span style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.95rem', color: 'rgba(255,255,255,.42)', marginLeft: 5 }}>zł</span>
                  </>
                )}
              </div>
              <p style={{ fontFamily: 'var(--fd)', fontSize: '.74rem', color: 'rgba(255,255,255,.35)', marginBottom: '1.4rem' }}>
                {c('sidebarNote')}
              </p>

              {/* Breakdown */}
              <div style={{ marginBottom: '1.4rem' }}>
                {breakdown.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                    <span style={{ fontFamily: 'var(--fd)', fontSize: '.79rem', color: 'rgba(255,255,255,.52)', flex: 1 }}>{r.label}</span>
                    <span style={{ fontFamily: 'var(--fd)', fontSize: '.79rem', color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(r.price)} zł</span>
                  </div>
                ))}
                {careTotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                    <span style={{ fontFamily: 'var(--fd)', fontSize: '.79rem', color: 'rgba(255,255,255,.52)' }}>{c('careLabel')}</span>
                    <span style={{ fontFamily: 'var(--fd)', fontSize: '.79rem', color: '#fff', fontWeight: 600 }}>+{fmt(careTotal)} zł {c('careSuffix')}</span>
                  </div>
                )}
              </div>

              {/* Główny CTA */}
              <button onClick={() => setBriefOpen(true)} style={{
                width: '100%', fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '.86rem',
                padding: '.82em 1.4em', borderRadius: 99, border: 'none',
                background: 'var(--brand)', color: '#fff', cursor: 'pointer',
                marginBottom: 10, transition: 'opacity .25s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '.87')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                {c('cta')}
              </button>

              {/* Drugorzędny */}
              <p style={{ fontFamily: 'var(--fd)', fontSize: '.78rem', color: 'rgba(255,255,255,.4)', textAlign: 'center', marginBottom: '1.3rem' }}>
                {c('ctaEmailPre')}{' '}
                <a
                  href="mailto:kontakt@anastasiiakupriianets.pl"
                  onClick={() => trackEvent('email_click', { location: 'wycena_sidebar' })}
                  style={{ color: 'rgba(255,255,255,.65)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  {c('ctaEmailLink')}
                </a>
              </p>

              {/* Gwarancje */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                {(['guarantee1','guarantee2','guarantee3'] as const).map(key => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L4.5 8.5L10 3" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontFamily: 'var(--fd)', fontSize: '.74rem', color: 'rgba(255,255,255,.45)' }}>{c(key)}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </main>

      <div ref={footerRef}><Footer /></div>
    </>
  );
}