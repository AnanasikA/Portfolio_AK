// Prosty wrapper na window.gtag — zakłada, że gtag.js jest już załadowany
// (np. przez <Script> w layout.tsx z Twoim ID pomiaru G-XXXXXXX).
//
// Celowo NIE deklarujemy tu globalnego typu Window.gtag — w projekcie może
// już istnieć taka deklaracja (np. przy Analytics.tsx), a dwie różne
// deklaracje tego samego globalnego typu z różnymi modyfikatorami wywalają
// błąd TS2687. Rzutowanie lokalne omija ten problem całkowicie.

type AnalyticsEvent =
  | "generate_lead"
  | "prosba_o_wycene"
  | "form_submit"
  | "phone_click"
  | "whatsapp_click"
  | "email_click";

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (!w.gtag) return;
  w.gtag("event", event, {
    ...params,
    transport_type: "beacon",
  });
}

// Kliknięcia w linki kontaktowe (tel: / mailto:) — jedno miejsce dla stopki,
// sekcji kontaktu i podstron usług. Inne linki (np. https://) są pomijane.
export function trackContactClick(href: string, location: string) {
  if (href.startsWith("tel:")) trackEvent("phone_click", { location });
  else if (href.startsWith("mailto:")) trackEvent("email_click", { location });
}