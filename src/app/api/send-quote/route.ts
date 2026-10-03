import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { attributeReferralConversion } from '@/lib/attribute-conversion';
import {
  cleanNumber,
  cleanText,
  escapeHtml,
  getClientIp,
  isRateLimited,
  isSameOrigin,
  isValidEmail,
  isValidPhone,
} from '@/lib/form-guard';

type QuoteRow = { label: string; price: number };

export async function POST(req: Request) {
  // ── Ochrona: pochodzenie żądania i limit zgłoszeń ─────────────────────────
  if (!isSameOrigin(req.headers)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }
  if (isRateLimited(`quote:${getClientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Pole-pułapka: człowiek go nie widzi, bot je wypełnia. Odpowiadamy „ok”,
  // żeby bot nie wiedział, że został odrzucony — ale nic nie wysyłamy.
  if (cleanText(body.hp, 200) !== '') {
    return NextResponse.json({ ok: true });
  }

  // ── Walidacja ─────────────────────────────────────────────────────────────
  const rawName    = cleanText(body.name, 100);
  const rawEmail   = cleanText(body.email, 254);
  const rawPhone   = cleanText(body.phone, 30);
  const rawCompany = cleanText(body.company, 120);
  const rawMessage = cleanText(body.message, 3000, true);

  const q = (body.quote ?? {}) as Record<string, unknown>;
  const low  = cleanNumber(q.low, 0, 1_000_000);
  const high = cleanNumber(q.high, 0, 1_000_000);
  const care = cleanNumber(q.care, 0, 100_000) ?? 0;
  const rows: QuoteRow[] = Array.isArray(q.breakdown)
    ? q.breakdown.slice(0, 30).flatMap((r: unknown) => {
        const row = (r ?? {}) as Record<string, unknown>;
        const label = cleanText(row.label, 120);
        const price = cleanNumber(row.price, 0, 1_000_000);
        return label && price !== null ? [{ label, price }] : [];
      })
    : [];

  if (
    rawName.length < 2 ||
    !isValidEmail(rawEmail) ||
    !isValidPhone(rawPhone) ||
    low === null ||
    high === null
  ) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Wartości wstawiane do HTML maila — zawsze po escapowaniu.
  const name    = escapeHtml(rawName);
  const email   = escapeHtml(rawEmail);
  const phone   = escapeHtml(rawPhone);
  const company = escapeHtml(rawCompany);
  const message = escapeHtml(rawMessage).replace(/\n/g, '<br>');
  const quote = {
    low,
    high,
    care,
    breakdown: rows.map(r => ({ label: escapeHtml(r.label), price: r.price })),
  };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const quoteRows = quote.breakdown
    .map((r: { label: string; price: number }) =>
      `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">${r.label}</td><td style="padding:6px 0;text-align:right;font-weight:600;font-size:14px;">${r.price.toLocaleString('pl-PL')} zł</td></tr>`
    )
    .join('');

  const html = `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#0a0f1a;">
      <div style="background:#0f1117;padding:32px;border-radius:12px 12px 0 0;">
        <p style="color:rgba(255,255,255,.5);font-size:12px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px;">Nowa wycena z kalkulatora</p>
        <p style="color:#fff;font-size:36px;font-weight:700;letter-spacing:-.03em;margin:0;">
          ${quote.low.toLocaleString('pl-PL')} – ${quote.high.toLocaleString('pl-PL')} zł
        </p>
        <p style="color:rgba(255,255,255,.4);font-size:13px;margin:8px 0 0;">szacowany zakres · netto</p>
      </div>

      <div style="background:#fff;border:1px solid #eef0f6;border-top:none;padding:32px;border-radius:0 0 12px 12px;">

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          ${quoteRows}
          ${quote.care > 0 ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Plan opieki</td><td style="padding:6px 0;text-align:right;font-weight:600;font-size:14px;">+${quote.care.toLocaleString('pl-PL')} zł / mies.</td></tr>` : ''}
          <tr><td colspan="2" style="border-top:2px solid #0a0f1a;padding-top:12px;"></td></tr>
          <tr>
            <td style="padding:4px 0;font-weight:700;font-size:16px;">Łącznie (netto)</td>
            <td style="padding:4px 0;text-align:right;font-weight:700;font-size:22px;">${quote.high.toLocaleString('pl-PL')} zł</td>
          </tr>
        </table>

        <hr style="border:none;border-top:1px solid #eef0f6;margin:24px 0;" />

        <h3 style="font-size:14px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a92a3;margin:0 0 16px;">Dane kontaktowe</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:5px 0;color:#8a92a3;font-size:14px;width:120px;">Imię i nazwisko</td><td style="padding:5px 0;font-size:14px;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:5px 0;color:#8a92a3;font-size:14px;">E-mail</td><td style="padding:5px 0;font-size:14px;"><a href="mailto:${email}" style="color:#1d4ed8;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:5px 0;color:#8a92a3;font-size:14px;">Telefon</td><td style="padding:5px 0;font-size:14px;font-weight:600;">${phone}</td></tr>` : ''}
          ${company ? `<tr><td style="padding:5px 0;color:#8a92a3;font-size:14px;">Firma</td><td style="padding:5px 0;font-size:14px;font-weight:600;">${company}</td></tr>` : ''}
        </table>

        ${message ? `
        <hr style="border:none;border-top:1px solid #eef0f6;margin:20px 0;" />
        <h3 style="font-size:14px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8a92a3;margin:0 0 12px;">Wiadomość</h3>
        <p style="font-size:14px;line-height:1.6;color:#0a0f1a;">${message}</p>
        ` : ''}

      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Kalkulator AK Web" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: rawEmail,
      subject: `Wycena z kalkulatora: ${quote.low.toLocaleString('pl-PL')}–${quote.high.toLocaleString('pl-PL')} zł — ${rawName}`,
      html,
    });

    // Jeśli gość przyszedł z linku partnerskiego (cookie ak_ref) —
    // utwórz powiązane zgłoszenie w programie partnerskim.
    await attributeReferralConversion({
      clientName: rawName,
      clientEmail: rawEmail,
      sourcePath: '/wycena',
      projectValueEstimate: quote.high,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}