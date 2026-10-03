// Wspólne zabezpieczenia formularzy (kalkulator, popup wyceny, zgłoszenie
// partnera): czyszczenie i walidacja danych, escapowanie HTML do maili,
// prosty limit zgłoszeń i sprawdzenie pochodzenia żądania.
//
// Plik jest używany wyłącznie po stronie serwera (route handlers / server actions).

// ── Tekst ─────────────────────────────────────────────────────────────────────

/** Zamienia znaki specjalne HTML — dane od użytkownika trafiają do treści maila. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Normalizuje pole tekstowe: tylko string, bez znaków sterujących,
 * przycięte do `max` znaków. `multiline` zostawia znaki nowej linii.
 */
export function cleanText(value: unknown, max: number, multiline = false): string {
  if (typeof value !== 'string') return '';
  const withoutControl = multiline
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    : value.replace(/[\u0000-\u001F\u007F]/g, ' ');
  return withoutControl.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]{2,}$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

/** Telefon jest opcjonalny; jeśli podany — tylko cyfry, spacje i + ( ) - */
export function isValidPhone(value: string): boolean {
  return value === '' || /^[0-9+()\-\s.]{5,30}$/.test(value);
}

/** Liczba skończona w zadanym zakresie, w przeciwnym razie `null`. */
export function cleanNumber(value: unknown, min: number, max: number): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return Math.round(value);
}

// ── Limit zgłoszeń ────────────────────────────────────────────────────────────
//
// Licznik w pamięci procesu. Na Vercel każda instancja funkcji ma własną
// pamięć, więc to nie jest twardy limit — zatrzymuje proste skrypty wysyłające
// formularz w pętli. Twardy limit ustawia się w Vercel → Firewall.

const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter(t => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);

  // Sprzątanie, żeby mapa nie rosła bez końca.
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) {
      if (times.every(t => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return false;
}

// ── Żądanie ───────────────────────────────────────────────────────────────────

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Przeglądarka przy wysyłce formularza dodaje nagłówek Origin. Jeśli jest
 * obecny i wskazuje inną domenę niż nasza — żądanie nie pochodzi ze strony.
 */
export function isSameOrigin(headers: Headers): boolean {
  const origin = headers.get('origin');
  if (!origin) return true; // brak nagłówka (np. stare przeglądarki) — nie blokujemy
  const host = headers.get('x-forwarded-host') ?? headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
