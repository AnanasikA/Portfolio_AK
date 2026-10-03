'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/gtag';

const PHONE_HREF = 'tel:+48576564682';
const WHATSAPP_NUMBER = '48576564682';

// Strony, na których pasek nie ma sensu: kalkulator (ma własny przycisk
// wysyłki), podziękowanie, program partnerski, panel admina, oferty.
const HIDDEN_ON = /\/(wycena|thank-you|partners|admin|offer-[^/]+)(\/|$)/;

/**
 * Pływające przyciski kontaktu w prawym dolnym rogu — tylko telefony
 * i tablety (< 1024px). Ułożone jeden nad drugim, bez tła: telefon,
 * WhatsApp i na samym dole (najbliżej kciuka) przycisk wyceny.
 *
 * Przycisk wyceny pojawia się dopiero po przewinięciu pierwszego ekranu —
 * na samej górze każda strona ma własny przycisk w sekcji powitalnej,
 * więc drugi tylko by go zasłaniał.
 *
 * Przycisk wyceny otwiera ten sam formularz co „Zapytaj o wycenę” w nagłówku
 * (zdarzenie `open-brief`, którego nasłuchuje Header).
 */
export default function MobileCtaBar() {
  const locale = useLocale();
  const pathname = usePathname() ?? '';
  const isEn = locale === 'en';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDDEN_ON.test(pathname)) return null;

  // Gotowa wiadomość, którą odwiedzający zobaczy w polu tekstowym WhatsAppa.
  const whatsappText = isEn
    ? 'Hello, I am interested in a quote for a website.'
    : 'Dzień dobry, interesuje mnie wycena strony internetowej.';
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <>
      <style>{`
        .mcta { display: none; }
        @media (max-width: 1023px) {
          .mcta {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
            position: fixed;
            right: 14px;
            bottom: calc(14px + env(safe-area-inset-bottom));
            z-index: 80;
            /* Sam kontener nie przechwytuje dotyku — klikalne są tylko przyciski. */
            pointer-events: none;
          }
          .mcta > * { pointer-events: auto; }
        }
        .mcta-icon {
          width: 52px; height: 52px;
          border-radius: 99px;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
        }
        .mcta-phone {
          background: #fff; color: var(--brand);
          border: 1px solid var(--line);
          box-shadow: 0 6px 20px rgba(11,18,32,.14);
        }
        .mcta-wa {
          background: #25D366; color: #fff;
          box-shadow: 0 6px 20px rgba(37,211,102,.4);
        }
        .mcta-quote {
          height: 52px;
          padding: 0 22px;
          border: none; border-radius: 99px;
          background: var(--brand); color: #fff;
          font-family: var(--fd); font-weight: 700; font-size: .92rem;
          white-space: nowrap;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(29,78,216,.35);
          overflow: hidden;
          transition: opacity .25s ease, height .25s ease, margin-top .25s ease;
        }
        /* Ukryty przycisk nie zajmuje miejsca — ikony zjeżdżają na sam dół. */
        .mcta-quote[data-hidden="true"] {
          opacity: 0;
          height: 0;
          margin-top: -10px;
          pointer-events: none;
        }
      `}</style>

      <div className="mcta" role="region" aria-label={isEn ? 'Quick contact' : 'Szybki kontakt'}>
        <a
          className="mcta-icon mcta-phone"
          href={PHONE_HREF}
          aria-label={isEn ? 'Call' : 'Zadzwoń'}
          onClick={() => trackEvent('phone_click', { location: 'mobile_bar' })}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>

        <a
          className="mcta-icon mcta-wa"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isEn ? 'Message on WhatsApp' : 'Napisz na WhatsApp'}
          onClick={() => trackEvent('whatsapp_click', { location: 'mobile_bar' })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        <button
          type="button"
          className="mcta-quote"
          data-hidden={!scrolled}
          aria-hidden={!scrolled}
          tabIndex={scrolled ? 0 : -1}
          onClick={() => window.dispatchEvent(new Event('open-brief'))}
        >
          {isEn ? 'Free quote →' : 'Bezpłatna wycena →'}
        </button>
      </div>
    </>
  );
}