'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const t = useTranslations('cookieConsent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let el = document.getElementById('cookie-consent-root') as HTMLElement | null;
    let created = false;
    if (!el) {
      el = document.createElement('div');
      el.id = 'cookie-consent-root';
      document.body.appendChild(el);
      created = true;
    }
    setRoot(el);

    const hasDecision = !!localStorage.getItem('cookie-consent');
    setVisible(!hasDecision);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') setVisible(!e.newValue);
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
      if (created && el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, []);

  const decide = (value: '1' | '0') => {
    try { localStorage.setItem('cookie-consent', value); } catch {}
    setVisible(false);
  };

  if (!root || !visible) return null;

  return createPortal(
    <div style={{
      position: 'fixed', inset: '0 0 0 0', bottom: 0, top: 'auto',
      zIndex: 9999, padding: '0 clamp(12px,3vw,24px) clamp(12px,2vw,20px)',
    }}>
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 'var(--r-l)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--sh)',
        padding: 'clamp(14px,2vw,20px) clamp(16px,3vw,28px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px 20px',
      }}>
        <p style={{
          fontFamily: 'var(--fb)',
          fontSize: 'clamp(.82rem,1.1vw,.9rem)',
          color: 'var(--muted)',
          lineHeight: 1.55,
          flex: '1 1 240px',
          margin: 0,
        }}>
          {t('text')}
        </p>

        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => decide('0')}
            style={{
              fontFamily: 'var(--fd)', fontWeight: 600,
              fontSize: '.85rem',
              padding: '.6em 1.2em',
              borderRadius: 99,
              border: '1.5px solid var(--line)',
              background: 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              transition: 'border-color .2s, color .2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--muted)';
              (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
              (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
            }}
          >
            {t('decline') ?? 'Odrzuć'}
          </button>

          <button
            type="button"
            onClick={() => decide('1')}
            style={{
              fontFamily: 'var(--fd)', fontWeight: 600,
              fontSize: '.85rem',
              padding: '.6em 1.2em',
              borderRadius: 99,
              border: 'none',
              background: 'var(--brand)',
              color: '#fff',
              cursor: 'pointer',
              transition: 'opacity .2s, transform .2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = '.88';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.transform = '';
            }}
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>,
    root
  );
}