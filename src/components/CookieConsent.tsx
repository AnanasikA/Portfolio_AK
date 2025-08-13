// components/CookieConsent.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function CookieConsent() {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Utwórz/znajdź kontener portalu w <body>
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

    // Pokaż tylko, gdy brak decyzji
    const hasDecision = !!localStorage.getItem('cookie-consent');
    setVisible(!hasDecision);

    // Reaguj na zmianę w innej karcie
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') setVisible(!e.newValue);
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
      // Sprzątanie tylko gdy to my stworzyliśmy kontener i on jeszcze jest w DOM
      if (created && el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, []);

  const decide = (value: '1' | '0') => {
    try {
      localStorage.setItem('cookie-consent', value);
    } catch {
      // ignorujemy, np. tryb prywatny
    }
    // Po decyzji po prostu chowamy baner; kontener usunie cleanup efektu przy unmount
    setVisible(false);
  };

  if (!root || !visible) return null;

  return createPortal(
    <div className="fixed inset-x-0 bottom-0 z-[9999]">
      <div className="mx-auto max-w-5xl m-4 rounded-2xl bg-white/95 text-black p-4 shadow-lg flex flex-wrap items-center gap-3">
        <p className="text-sm">
          Używamy plików cookie do analityki i poprawy działania serwisu.
        </p>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => decide('0')}
            className="px-4 py-2 rounded-full border border-black/15 hover:bg-black/5 transition text-sm"
          >
            Odrzuć
          </button>
          <button
            type="button"
            onClick={() => decide('1')}
            className="px-4 py-2 rounded-full bg-[#007aff] text-white hover:opacity-90 transition text-sm"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>,
    root
  );
}
