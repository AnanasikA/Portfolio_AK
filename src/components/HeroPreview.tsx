'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

type Industry = 'cafe' | 'studio' | 'services' | 'shop';
type Mode = 'desktop' | 'phone';
type FontId = 'elegant' | 'modern' | 'simple';

const U = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const PHOTOS: Record<string, string> = {
  'kawiarnia-hero': U('photo-1741265805852-32186a6d0dd3', 900),
  'kawiarnia-1': U('photo-1660229496744-1c772fabc06a', 500),
  'kawiarnia-2': U('photo-1661349008075-62f1479f311d', 500),
  'kawiarnia-3': U('photo-1642689690565-bf0afb7eb41e', 500),
  'studio-hero': U('photo-1677741447985-da1d90c00742', 1100),
  'uslugi-hero': U('photo-1705579610383-4f9b36e2a920', 800),
  'sklep-hero': U('photo-1629078691977-dc51747c0263', 1000),
  'sklep-1': U('photo-1613940512699-fc9150817bb2', 500),
  'sklep-2': U('photo-1523471826770-c437b4636fe6', 500),
  'sklep-3': U('photo-1527986654082-0b5b3fef2632', 500),
  'sklep-4': U('photo-1613977257442-f5e6957f0d84', 500),
};

const FONTS: { id: FontId; pl: string; en: string; family: string }[] = [
  { id: 'elegant', pl: 'Elegancka', en: 'Elegant', family: 'var(--font-pf), Georgia, "Times New Roman", serif' },
  { id: 'modern', pl: 'Nowoczesna', en: 'Modern', family: 'var(--font-sg), system-ui, sans-serif' },
  { id: 'simple', pl: 'Prosta', en: 'Simple', family: 'var(--font-mn), system-ui, sans-serif' },
];

const DEFAULT_FONT: Record<'cafe' | 'studio' | 'services' | 'shop', FontId> = {
  cafe: 'elegant',
  studio: 'modern',
  services: 'simple',
  shop: 'modern',
};

const SWATCHES = [
  { id: 'green', value: '#2f6b4f', pl: 'Zieleń', en: 'Green' },
  { id: 'navy', value: '#1e3a8a', pl: 'Granat', en: 'Navy' },
  { id: 'terracotta', value: '#b4532a', pl: 'Terakota', en: 'Terracotta' },
  { id: 'plum', value: '#7a3b69', pl: 'Śliwka', en: 'Plum' },
];

const DEFAULT_SWATCH: Record<Industry, string> = {
  cafe: 'green',
  studio: 'plum',
  services: 'navy',
  shop: 'terracotta',
};

const INDUSTRIES: { id: Industry; pl: string; en: string; url: string }[] = [
  { id: 'cafe', pl: 'Kawiarnia', en: 'Café', url: 'kawiarnia-ziarenko.pl' },
  { id: 'studio', pl: 'Studio', en: 'Studio', url: 'studio-oddech.pl' },
  { id: 'services', pl: 'Usługi', en: 'Services', url: 'voltpro-instalacje.pl' },
  { id: 'shop', pl: 'Sklep', en: 'Shop', url: 'pracownia-len.pl' },
];

function Photo({ src, alt, style, eager }: { src: string; alt: string; style?: React.CSSProperties; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, color-mix(in srgb, var(--acc) 35%, #f4efe8), color-mix(in srgb, var(--acc) 70%, #1a1a1a))', ...style }}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

const btn = (filled: boolean, extra?: React.CSSProperties): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: '12px 22px', borderRadius: 999, fontWeight: 600, fontSize: 15,
  background: filled ? 'var(--acc)' : 'transparent',
  color: filled ? '#fff' : 'inherit',
  border: filled ? '1.5px solid var(--acc)' : '1.5px solid currentColor',
  whiteSpace: 'nowrap',
  ...extra,
});

function Cafe({ m }: { m: Mode }) {
  const d = m === 'desktop';
  const serif = 'var(--hf)';
  return (
    <div style={{ background: '#f7f2ea', color: '#2b241d', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: d ? '22px 56px' : '16px 20px' }}>
        <span style={{ fontFamily: serif, fontSize: d ? 26 : 22, fontWeight: 700 }}>Ziarenko</span>
        {d && (
          <span style={{ display: 'flex', gap: 30, fontSize: 15, opacity: .8 }}>
            <span>Menu</span><span>Śniadania</span><span>O nas</span><span>Kontakt</span>
          </span>
        )}
        <span style={btn(true, { padding: d ? '11px 20px' : '9px 14px', fontSize: d ? 14 : 13 })}>{d ? 'Zarezerwuj stolik' : 'Zadzwoń'}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: d ? '1fr 1fr' : '1fr', gap: d ? 48 : 20, alignItems: 'center', padding: d ? '28px 56px 40px' : '8px 20px 24px' }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--acc)', fontWeight: 700, marginBottom: 14 }}>Kawiarnia · Wrocław</p>
          <h3 style={{ fontFamily: serif, fontSize: d ? 54 : 34, lineHeight: 1.05, fontWeight: 700, marginBottom: 16 }}>Kawa palona na miejscu, codziennie.</h3>
          <p style={{ fontSize: d ? 17 : 15, lineHeight: 1.6, opacity: .75, marginBottom: 24, maxWidth: 440 }}>Śniadania do 13:00, domowe ciasta i kawa z małej, lokalnej palarni.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={btn(true)}>Zobacz menu</span>
            <span style={btn(false)}>Jak dojechać</span>
          </div>
        </div>
        <Photo src={PHOTOS['kawiarnia-hero']} alt="Wnętrze kawiarni" eager style={{ height: d ? 380 : 220, borderRadius: 18 }} />
      </div>

      <div style={{ margin: d ? '0 56px' : '0 20px', padding: d ? '16px 24px' : '14px 16px', borderRadius: 14, background: '#fff', display: 'flex', flexWrap: 'wrap', gap: d ? 32 : 8, fontSize: 14 }}>
        <span><b>Pon–pt</b> 7:30–18:00</span>
        <span><b>Sob–nd</b> 9:00–17:00</span>
        <span style={{ opacity: .7 }}>ul. Kościuszki 12, Wrocław</span>
      </div>

      <div style={{ padding: d ? '40px 56px 48px' : '24px 20px 32px' }}>
        <h4 style={{ fontFamily: serif, fontSize: d ? 30 : 24, fontWeight: 700, marginBottom: 18 }}>Polecamy dziś</h4>
        <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(3, 1fr)' : '1fr 1fr', gap: d ? 20 : 12 }}>
          {[
            { img: 'kawiarnia-1', name: 'Flat white', price: '14 zł' },
            { img: 'kawiarnia-2', name: 'Sernik baskijski', price: '16 zł' },
            { img: 'kawiarnia-3', name: 'Śniadanie dnia', price: '29 zł' },
          ].slice(0, d ? 3 : 2).map(p => (
            <div key={p.name} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
              <Photo src={PHOTOS[p.img]} alt={p.name} style={{ height: d ? 170 : 110 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', fontSize: 15, fontWeight: 600 }}>
                <span>{p.name}</span><span style={{ color: 'var(--acc)' }}>{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Studio({ m }: { m: Mode }) {
  const d = m === 'desktop';
  return (
    <div style={{ background: '#fbf8f6', color: '#231c22', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', minHeight: '100%' }}>
      <div style={{ position: 'relative', height: d ? 520 : 470, color: '#fff' }}>
        <Photo src={PHOTOS['studio-hero']} alt="Zajęcia jogi" eager style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.15) 40%, rgba(0,0,0,.6))' }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: d ? '24px 56px' : '16px 20px' }}>
          <span style={{ fontFamily: 'var(--hf)', fontSize: d ? 22 : 19, fontWeight: 700, letterSpacing: '.02em' }}>oddech<span style={{ opacity: .7, fontWeight: 400 }}> studio ruchu</span></span>
          {d && <span style={{ display: 'flex', gap: 28, fontSize: 15 }}><span>Grafik</span><span>Cennik</span><span>Instruktorzy</span><span>Kontakt</span></span>}
          <span style={btn(true, { padding: d ? '11px 20px' : '9px 14px', fontSize: d ? 14 : 13 })}>Zapisz się</span>
        </div>
        <div style={{ position: 'absolute', left: d ? 56 : 20, right: d ? 56 : 20, bottom: d ? 56 : 28 }}>
          <h3 style={{ fontFamily: 'var(--hf)', fontSize: d ? 58 : 34, lineHeight: 1.05, fontWeight: 700, maxWidth: 620, marginBottom: 14 }}>Joga i pilates dla każdego poziomu.</h3>
          <p style={{ fontSize: d ? 18 : 15, opacity: .9, marginBottom: 22, maxWidth: 480 }}>Małe grupy do 10 osób. Pierwsze zajęcia za 25 zł.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={btn(true)}>Grafik zajęć</span>
            <span style={btn(false, { color: '#fff' })}>Cennik</span>
          </div>
        </div>
      </div>

      <div style={{ padding: d ? '40px 56px 48px' : '24px 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <h4 style={{ fontFamily: 'var(--hf)', fontSize: d ? 28 : 22, fontWeight: 700 }}>Ten tydzień</h4>
          <span style={{ fontSize: 14, color: 'var(--acc)', fontWeight: 600 }}>Pełny grafik →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(4, 1fr)' : '1fr', gap: 12 }}>
          {[
            ['Pon', '18:00', 'Joga dla początkujących'],
            ['Wt', '19:00', 'Pilates'],
            ['Czw', '7:00', 'Joga poranna'],
            ['Sob', '10:00', 'Stretching'],
          ].slice(0, d ? 4 : 3).map(([day, hour, name]) => (
            <div key={day} style={{ background: '#fff', borderRadius: 14, padding: '16px 18px', borderLeft: '4px solid var(--acc)' }}>
              <p style={{ fontSize: 13, opacity: .6, marginBottom: 4 }}>{day} · {hour}</p>
              <p style={{ fontSize: 16, fontWeight: 600 }}>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services({ m }: { m: Mode }) {
  const d = m === 'desktop';
  return (
    <div style={{ background: '#fff', color: '#14181f', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: d ? '18px 56px' : '14px 20px', borderBottom: '1px solid #e8ebf0' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--hf)', fontWeight: 800, fontSize: d ? 20 : 18 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--acc)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 16 }}>⚡</span>
          VoltPro
        </span>
        {d && <span style={{ display: 'flex', gap: 28, fontSize: 15, opacity: .75 }}><span>Usługi</span><span>Cennik</span><span>Realizacje</span><span>Kontakt</span></span>}
        <span style={btn(true, { padding: d ? '11px 20px' : '9px 14px', fontSize: d ? 14 : 13 })}>{d ? 'Zadzwoń: 600 000 000' : 'Zadzwoń'}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: d ? '1.1fr .9fr' : '1fr', background: 'var(--acc)', color: '#fff' }}>
        <div style={{ padding: d ? '56px 56px' : '28px 20px' }}>
          <p style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 700, opacity: .75, marginBottom: 14 }}>Elektryk · Wrocław i okolice</p>
          <h3 style={{ fontFamily: 'var(--hf)', fontSize: d ? 50 : 32, lineHeight: 1.08, fontWeight: 800, marginBottom: 16 }}>Instalacje elektryczne bez bałaganu i opóźnień.</h3>
          <p style={{ fontSize: d ? 17 : 15, opacity: .85, marginBottom: 24, maxWidth: 460 }}>Pomiary, nowe instalacje i usuwanie awarii. Wycena w ciągu 24 godzin.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={btn(false, { background: '#fff', color: 'var(--acc)', border: '1.5px solid #fff' })}>Bezpłatna wycena</span>
            <span style={btn(false, { color: '#fff' })}>Cennik</span>
          </div>
        </div>
        <Photo src={PHOTOS['uslugi-hero']} alt="Elektryk przy pracy" eager style={{ minHeight: d ? 380 : 200 }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: d ? 36 : 10, padding: d ? '18px 56px' : '14px 20px', background: '#f3f5f8', fontSize: 14, fontWeight: 600 }}>
        <span>✓ Faktura VAT</span><span>✓ Gwarancja na prace</span><span>✓ Dojazd we Wrocławiu</span>
      </div>

      <div style={{ padding: d ? '40px 56px 48px' : '24px 20px 32px' }}>
        <h4 style={{ fontFamily: 'var(--hf)', fontSize: d ? 28 : 22, fontWeight: 800, marginBottom: 18 }}>Najczęstsze zlecenia</h4>
        <div style={{ display: 'grid', gridTemplateColumns: d ? '1fr 1fr' : '1fr', gap: 12 }}>
          {[
            ['Pomiary instalacji', 'od 250 zł'],
            ['Wymiana rozdzielnicy', 'od 900 zł'],
            ['Instalacja w mieszkaniu', 'od 120 zł / punkt'],
            ['Usuwanie awarii', 'od 150 zł'],
          ].slice(0, d ? 4 : 3).map(([name, price]) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px', border: '1px solid #e8ebf0', borderRadius: 12, fontSize: 16 }}>
              <span style={{ fontWeight: 600 }}>{name}</span>
              <span style={{ color: 'var(--acc)', fontWeight: 700, fontSize: 15 }}>{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Shop({ m }: { m: Mode }) {
  const d = m === 'desktop';
  const products = [
    { img: 'sklep-1', name: 'Pościel lniana 160×200', price: '389 zł' },
    { img: 'sklep-2', name: 'Ręczniki lniane, komplet', price: '129 zł' },
    { img: 'sklep-3', name: 'Ręcznik kąpielowy', price: '79 zł' },
    { img: 'sklep-4', name: 'Poszewki lniane, 2 szt.', price: '99 zł' },
  ];
  return (
    <div style={{ background: '#fff', color: '#1f1b18', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', minHeight: '100%' }}>
      <div style={{ background: 'var(--acc)', color: '#fff', textAlign: 'center', fontSize: 13, fontWeight: 600, padding: '8px 12px' }}>Darmowa dostawa od 200 zł · Wysyłka w 24 h</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: d ? 28 : 12, padding: d ? '18px 56px' : '14px 20px', borderBottom: '1px solid #eee' }}>
        <span style={{ fontFamily: 'var(--hf)', fontWeight: 800, fontSize: d ? 22 : 19, letterSpacing: '.04em' }}>LEN<span style={{ fontWeight: 400, opacity: .6 }}> pracownia</span></span>
        {d && <span style={{ flex: 1, height: 40, borderRadius: 999, background: '#f4f2ef', display: 'flex', alignItems: 'center', padding: '0 18px', fontSize: 14, opacity: .6 }}>Szukaj produktów…</span>}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 16, fontSize: 14, fontWeight: 600 }}>
          {d && <span>Konto</span>}
          <span>Koszyk <span style={{ display: 'inline-grid', placeItems: 'center', width: 20, height: 20, borderRadius: 99, background: 'var(--acc)', color: '#fff', fontSize: 11 }}>2</span></span>
        </span>
      </div>
      {d && (
        <div style={{ display: 'flex', gap: 28, padding: '12px 56px', fontSize: 14, borderBottom: '1px solid #eee', opacity: .8 }}>
          <span>Pościel</span><span>Ręczniki</span><span>Poszewki</span><span>Łazienka</span><span style={{ color: 'var(--acc)', fontWeight: 600 }}>Nowości</span>
        </div>
      )}
      <div style={{ position: 'relative', margin: d ? '24px 56px' : '16px 20px', height: d ? 280 : 220, borderRadius: 18, overflow: 'hidden', color: '#fff' }}>
        <Photo src={PHOTOS['sklep-hero']} alt="Lniana pościel" eager style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,.55), rgba(0,0,0,0) 70%)' }} />
        <div style={{ position: 'absolute', left: d ? 40 : 20, bottom: d ? 40 : 22, maxWidth: 420 }}>
          <h3 style={{ fontFamily: 'var(--hf)', fontSize: d ? 40 : 28, lineHeight: 1.08, fontWeight: 800, marginBottom: 16 }}>Lniana pościel prosto z pracowni.</h3>
          <span style={btn(false, { background: '#fff', color: '#1f1b18', border: '1.5px solid #fff' })}>Zobacz kolekcję</span>
        </div>
      </div>
      <div style={{ padding: d ? '8px 56px 48px' : '4px 20px 32px' }}>
        <h4 style={{ fontFamily: 'var(--hf)', fontSize: d ? 24 : 20, fontWeight: 800, marginBottom: 16 }}>Bestsellery</h4>
        <div style={{ display: 'grid', gridTemplateColumns: d ? 'repeat(4, 1fr)' : '1fr 1fr', gap: d ? 18 : 12 }}>
          {products.slice(0, d ? 4 : 2).map(p => (
            <div key={p.name}>
              <Photo src={PHOTOS[p.img]} alt={p.name} style={{ height: d ? 190 : 140, borderRadius: 12, marginBottom: 10 }} />
              <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.name}</p>
              <p style={{ fontSize: 15, color: 'var(--acc)', fontWeight: 700, marginBottom: 10 }}>{p.price}</p>
              <span style={btn(true, { padding: '9px 14px', fontSize: 13, width: '100%' })}>Do koszyka</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SITES: Record<Industry, (p: { m: Mode }) => React.ReactElement> = { cafe: Cafe, studio: Studio, services: Services, shop: Shop };

function ScaledSite({ industry, mode, accent, font }: { industry: Industry; mode: Mode; accent: string; font: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(mode === 'desktop' ? 0.45 : 0.62);
  const baseWidth = mode === 'desktop' ? 1240 : 390;
  const Site = SITES[industry];

  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  useIso(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / baseWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div ref={boxRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div
        key={industry}
        className="hp-site"
        style={{ width: baseWidth, transform: `scale(${scale})`, transformOrigin: 'top left', ['--acc' as string]: accent, ['--hf' as string]: font } as React.CSSProperties}
      >
        <Site m={mode} />
      </div>
    </div>
  );
}

export default function HeroPreview() {
  const isEn = useLocale() === 'en';
  const [industry, setIndustry] = useState<Industry>('cafe');
  const [swatch, setSwatch] = useState<string>(DEFAULT_SWATCH.cafe);
  const [mode, setMode] = useState<Mode>('desktop');
  const [fontId, setFontId] = useState<FontId>(DEFAULT_FONT.cafe);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 599px)');
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const effectiveMode: Mode = isSmall ? 'phone' : mode;
  const accent = SWATCHES.find(s => s.id === swatch)?.value ?? SWATCHES[0].value;
  const current = INDUSTRIES.find(i => i.id === industry)!;
  const font = FONTS.find(f => f.id === fontId)?.family ?? FONTS[0].family;

  const pickIndustry = (id: Industry) => {
    setIndustry(id);
    setSwatch(DEFAULT_SWATCH[id]);
    setFontId(DEFAULT_FONT[id]);
  };

  const openBrief = () => {
    window.dispatchEvent(new CustomEvent('open-brief', { detail: { type: industry === 'shop' ? 'Sklep internetowy' : 'Strona firmowa' } }));
  };

  return (
    <div className="hp">
      <style>{`
        .hp { display: flex; flex-direction: column; gap: 14px; padding: clamp(16px, 2vw, 24px); border-radius: 24px; background: rgba(255,255,255,.72); border: 1px solid var(--line); box-shadow: 0 30px 70px -40px rgba(20,40,110,.35); backdrop-filter: blur(6px); }
        .hp-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .hp-title { font-family: var(--fd); font-weight: 600; font-size: 1.05rem; color: var(--ink); letter-spacing: -.01em; }
        .hp-seg { display: inline-flex; padding: 3px; border-radius: 99px; background: var(--surface); border: 1px solid var(--line); }
        .hp-seg button { font-family: var(--fd); font-weight: 600; font-size: .8rem; padding: 6px 14px; border-radius: 99px; border: none; background: transparent; color: var(--muted); cursor: pointer; }
        .hp-seg button[aria-pressed="true"] { background: #fff; color: var(--brand); box-shadow: var(--sh-s); }
        .hp-stage { position: relative; display: flex; justify-content: center; }
        .hp-browser { width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid var(--line); box-shadow: var(--sh); background: #fff; }
        .hp-bar { height: 34px; display: flex; align-items: center; gap: 6px; padding: 0 12px; border-bottom: 1px solid var(--line); background: #f8f9fb; }
        .hp-dot { width: 9px; height: 9px; border-radius: 50%; }
        .hp-url { margin-left: 10px; flex: 1; max-width: 260px; height: 20px; border-radius: 6px; background: #eef1f5; font-size: 11px; color: var(--muted); display: flex; align-items: center; padding: 0 10px; font-family: var(--fb); }
        .hp-view-d { position: relative; aspect-ratio: 16 / 10.4; }
        .hp-phone { width: min(250px, 72%); border-radius: 34px; padding: 10px; background: #111827; box-shadow: var(--sh); }
        .hp-phone-in { position: relative; aspect-ratio: 9 / 18.5; border-radius: 26px; overflow: hidden; background: #fff; }
        .hp-notch { position: absolute; top: 6px; left: 50%; transform: translateX(-50%); width: 34%; height: 5px; border-radius: 9px; background: #111827; z-index: 2; }
        .hp-tag { margin-left: auto; font-family: var(--fd); font-weight: 600; font-size: .68rem; padding: 3px 9px; border-radius: 99px; background: var(--brand-tint); color: var(--brand); white-space: nowrap; }
        .hp-badge { position: absolute; left: 50%; transform: translateX(-50%); bottom: 10px; z-index: 3; white-space: nowrap; font-family: var(--fd); font-weight: 600; font-size: .7rem; padding: 4px 10px; border-radius: 99px; background: rgba(17,24,39,.82); color: #fff; }
        .hp-site { animation: hpIn .35s ease; }
        @keyframes hpIn { from { opacity: 0; } to { opacity: 1; } }
        .hp-ind { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .hp-ind button { font-family: var(--fd); font-weight: 600; font-size: .88rem; padding: 10px 6px; border-radius: 99px; border: 1.5px solid var(--line); background: #fff; color: var(--ink); cursor: pointer; transition: border-color .2s, background .2s, color .2s; }
        .hp-ind button[aria-pressed="true"] { border-color: var(--brand); background: var(--brand-tint); color: var(--brand); }
        .hp-bottom { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .hp-sw { display: flex; align-items: center; gap: 10px; }
        .hp-label { font-family: var(--fd); font-weight: 600; font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-right: 2px; }
        .hp-fonts { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .hp-fonts button { font-size: .95rem; font-weight: 700; padding: 6px 14px; border-radius: 10px; border: 1.5px solid var(--line); background: #fff; color: var(--ink); cursor: pointer; transition: border-color .2s, color .2s, background .2s; }
        .hp-fonts button[aria-pressed="true"] { border-color: var(--brand); color: var(--brand); background: var(--brand-tint); }
        .hp-sw .hp-label, .hp-sw span { font-family: var(--fd); font-weight: 600; font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
        .hp-sw button { width: 26px; height: 26px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 0 1.5px var(--line); cursor: pointer; padding: 0; }
        .hp-sw button[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--ink); }
        .hp-cta { font-family: var(--fd); font-weight: 600; font-size: .92rem; background: var(--brand); color: #fff; border: none; border-radius: 99px; padding: .8em 1.5em; cursor: pointer; }
        @media (max-width: 599px) {
          .hp-ind { grid-template-columns: repeat(2, 1fr); }
          .hp-cta { width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) { .hp-site { animation: none; } }
      `}</style>

      <div className="hp-top">
        <p className="hp-title">{isEn ? 'See what your website could look like' : 'Zobacz, jak może wyglądać Twoja strona'}</p>
        {!isSmall && (
          <div className="hp-seg" role="group" aria-label={isEn ? 'Device' : 'Urządzenie'}>
            <button type="button" aria-pressed={mode === 'desktop'} onClick={() => setMode('desktop')}>{isEn ? 'Desktop' : 'Komputer'}</button>
            <button type="button" aria-pressed={mode === 'phone'} onClick={() => setMode('phone')}>{isEn ? 'Phone' : 'Telefon'}</button>
          </div>
        )}
      </div>

      <div className="hp-stage" aria-label={isEn ? 'Sample website preview' : 'Podgląd przykładowej strony'}>
        {effectiveMode === 'desktop' ? (
          <div className="hp-browser">
            <div className="hp-bar">
              <span className="hp-dot" style={{ background: '#ef4444' }} />
              <span className="hp-dot" style={{ background: '#f59e0b' }} />
              <span className="hp-dot" style={{ background: '#22c55e' }} />
              <span className="hp-url">{current.url}</span>
              <span className="hp-tag">{isEn ? 'Sample project' : 'Przykładowy projekt'}</span>
            </div>
            <div className="hp-view-d">
              <ScaledSite industry={industry} mode="desktop" accent={accent} font={font} />
            </div>
          </div>
        ) : (
          <div className="hp-phone">
            <div className="hp-phone-in">
              <span className="hp-notch" />
              <ScaledSite industry={industry} mode="phone" accent={accent} font={font} />
              <span className="hp-badge">{isEn ? 'Sample project' : 'Przykładowy projekt'}</span>
            </div>
          </div>
        )}
      </div>

      <div className="hp-ind" role="group" aria-label={isEn ? 'Industry' : 'Branża'}>
        {INDUSTRIES.map(i => (
          <button key={i.id} type="button" aria-pressed={industry === i.id} onClick={() => pickIndustry(i.id)}>
            {isEn ? i.en : i.pl}
          </button>
        ))}
      </div>

      <div className="hp-opts">
        <div className="hp-fonts" role="group" aria-label={isEn ? 'Font' : 'Czcionka'}>
          <span className="hp-label">{isEn ? 'Font' : 'Czcionka'}</span>
          {FONTS.map(f => (
            <button key={f.id} type="button" aria-pressed={fontId === f.id} onClick={() => setFontId(f.id)} style={{ fontFamily: f.family }}>
              {isEn ? f.en : f.pl}
            </button>
          ))}
        </div>
      </div>

      <div className="hp-bottom">
        <div className="hp-sw" role="group" aria-label={isEn ? 'Colour' : 'Kolor'}>
          <span>{isEn ? 'Colour' : 'Kolor'}</span>
          {SWATCHES.map(s => (
            <button
              key={s.id}
              type="button"
              aria-pressed={swatch === s.id}
              aria-label={isEn ? s.en : s.pl}
              onClick={() => setSwatch(s.id)}
              style={{ background: s.value }}
            />
          ))}
        </div>
        <button type="button" className="hp-cta" onClick={openBrief}>
          {isEn ? 'I want a site like this →' : 'Chcę taką stronę →'}
        </button>
      </div>
    </div>
  );
}
