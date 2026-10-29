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

export function trackContactClick(href: string, location: string) {
  if (href.startsWith("tel:")) trackEvent("phone_click", { location });
  else if (href.startsWith("mailto:")) trackEvent("email_click", { location });
}