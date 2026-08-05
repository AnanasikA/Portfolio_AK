// Prosty wrapper na window.gtag — zakłada, że gtag.js jest już załadowany
// (np. przez <Script> w layout.tsx z Twoim ID pomiaru G-XXXXXXX).
//
// Celowo NIE deklarujemy tu globalnego typu Window.gtag — w projekcie może
// już istnieć taka deklaracja (np. przy Analytics.tsx), a dwie różne
// deklaracje tego samego globalnego typu z różnymi modyfikatorami wywalają
// błąd TS2687. Rzutowanie lokalne omija ten problem całkowicie.

type AnalyticsEvent =
  | "generate_lead"
  | "form_submit"
  | "phone_click"
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