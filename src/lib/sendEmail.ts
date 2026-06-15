'use server';

import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// ── Supabase client (server-side only, service role) ──────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Types ─────────────────────────────────────────────────────────────────────
export type EmailData = {
  name: string;
  email: string;
  phone?: string;
  site_type?: string;
  budget?: string;
  has_logo?: string;
  message: string;
  locale?: string;
};

type SubmissionLog = {
  status: 'success' | 'error';
  name: string;
  email: string;
  phone?: string;
  site_type?: string;
  budget?: string;
  has_logo?: string;
  message: string;
  locale?: string;
  smtp_message_id?: string;
  smtp_response?: string;
  error_message?: string;
  error_stack?: string;
};

// ── Helper: save to Supabase ──────────────────────────────────────────────────
async function logToDatabase(entry: SubmissionLog) {
  const { error } = await supabase.from('form_submissions').insert([entry]);
  if (error) {
    // Nie przerywamy flow — logujemy tylko do konsoli
    console.error('[Supabase] Błąd zapisu logu:', error.message);
  }
}

// ── Helper: build main HTML email ─────────────────────────────────────────────
function buildEmailHtml(data: EmailData): string {
  const { name, email, phone, site_type, budget, has_logo, message, locale } = data;
  const isEn = locale === 'en';

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:140px;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:500;">${value}</td>
    </tr>`;

  const emailRow = `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:140px;">Email</td>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:500;">
        <a href="mailto:${email}" style="color:#007aff;">${email}</a>
      </td>
    </tr>`;

  return `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8faff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#007aff 0%,#006bde 100%);padding:32px 40px;">
        <h1 style="color:white;margin:0;font-size:22px;font-weight:600;">
          ${isEn ? 'New quote request' : 'Nowe zapytanie o wycenę'}
        </h1>
        <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:14px;">
          ${isEn ? 'From your portfolio website' : 'Ze strony portfolio'}
        </p>
      </div>

      <div style="padding:32px 40px;background:white;">
        <table style="width:100%;border-collapse:collapse;">
          ${row(isEn ? 'Name' : 'Imię i nazwisko', name)}
          ${emailRow}
          ${phone   ? row(isEn ? 'Phone'           : 'Telefon',       phone)    : ''}
          ${site_type ? row(isEn ? 'Type of website' : 'Rodzaj strony', site_type) : ''}
          ${budget  ? row(isEn ? 'Budget'          : 'Budżet',        budget)   : ''}
          ${has_logo ? row(isEn ? 'Logo'            : 'Logo',          has_logo) : ''}
        </table>

        <div style="margin-top:24px;background:#f8faff;border-radius:12px;padding:20px;">
          <p style="color:#64748b;font-size:13px;margin:0 0 8px;">${isEn ? 'Message' : 'Wiadomość'}</p>
          <p style="color:#0f172a;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${email}"
             style="display:inline-block;background:#007aff;color:white;text-decoration:none;padding:12px 28px;border-radius:100px;font-size:14px;font-weight:500;">
            ${isEn ? 'Reply to' : 'Odpowiedz do'} ${name}
          </a>
        </div>
      </div>

      <div style="padding:20px 40px;background:#f8faff;text-align:center;">
        <p style="color:#94a3b8;font-size:12px;margin:0;">anastasiiakupriianets.pl</p>
      </div>
    </div>`;
}

// ── Helper: build error alert email ───────────────────────────────────────────
function buildErrorAlertHtml(data: EmailData, error: unknown): string {
  const err = error instanceof Error ? error : new Error(String(error));
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;max-width:600px;margin:0 auto;">
      <div style="background:#ef4444;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h2 style="color:white;margin:0;font-size:18px;">⚠️ Błąd wysyłki formularza</h2>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">${new Date().toLocaleString('pl-PL')}</p>
      </div>

      <div style="background:white;padding:24px 32px;border:1px solid #fee2e2;border-top:none;">
        <h3 style="color:#0f172a;font-size:14px;margin:0 0 12px;">Dane nadawcy</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="color:#64748b;padding:6px 0;width:120px;">Imię</td><td style="color:#0f172a;">${data.name}</td></tr>
          <tr><td style="color:#64748b;padding:6px 0;">Email</td><td><a href="mailto:${data.email}" style="color:#007aff;">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="color:#64748b;padding:6px 0;">Telefon</td><td style="color:#0f172a;">${data.phone}</td></tr>` : ''}
        </table>

        <h3 style="color:#0f172a;font-size:14px;margin:20px 0 8px;">Wiadomość</h3>
        <p style="background:#f8faff;padding:12px 16px;border-radius:8px;font-size:13px;color:#0f172a;white-space:pre-wrap;margin:0;">${data.message}</p>

        <h3 style="color:#ef4444;font-size:14px;margin:20px 0 8px;">Błąd</h3>
        <pre style="background:#fef2f2;border:1px solid #fecaca;padding:12px 16px;border-radius:8px;font-size:12px;color:#b91c1c;overflow-x:auto;white-space:pre-wrap;">${err.message}</pre>

        ${err.stack ? `
        <h3 style="color:#64748b;font-size:13px;margin:16px 0 8px;">Stack trace</h3>
        <pre style="background:#f8faff;border:1px solid #e2e8f0;padding:12px 16px;border-radius:8px;font-size:11px;color:#475569;overflow-x:auto;white-space:pre-wrap;">${err.stack}</pre>
        ` : ''}
      </div>

      <div style="background:#fef2f2;padding:16px 32px;border-radius:0 0 12px 12px;text-align:center;">
        <p style="color:#94a3b8;font-size:12px;margin:0;">anastasiiakupriianets.pl — alert systemowy</p>
      </div>
    </div>`;
}

// ── Main function ─────────────────────────────────────────────────────────────
export async function sendEmail(data: EmailData): Promise<{ ok: boolean; error?: string }> {
  const { name, email, locale } = data;
  const isEn = locale === 'en';

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

  // ── Próba wysyłki głównego maila ──────────────────────────────────────────
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio AK" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: isEn ? `New quote request from ${name}` : `Nowe zapytanie od ${name}`,
      html: buildEmailHtml(data),
    });

    console.log('[Email] Wysłano pomyślnie:', {
      messageId: info.messageId,
      response: info.response,
      to: process.env.SMTP_TO,
      name,
      date: new Date().toISOString(),
    });

    // ── Zapis sukcesu do Supabase ─────────────────────────────────────────
    await logToDatabase({
      status: 'success',
      ...data,
      smtp_message_id: info.messageId,
      smtp_response: info.response,
    });

    return { ok: true };

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));

    console.error('[Email] Błąd wysyłki:', err);

    // ── Zapis błędu do Supabase ───────────────────────────────────────────
    await logToDatabase({
      status: 'error',
      ...data,
      error_message: err.message,
      error_stack: err.stack,
    });

    // ── Alert mailowy o błędzie ───────────────────────────────────────────
    try {
      await transporter.sendMail({
        from: `"Portfolio AK Alerty" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO,
        subject: `🚨 BŁĄD formularza — wiadomość od ${name} nie dotarła`,
        html: buildErrorAlertHtml(data, err),
      });
    } catch (alertError) {
      // Alert też padł — zostaje tylko Supabase i konsola
      console.error('[Email] Nie udało się wysłać alertu:', alertError);
    }

    return { ok: false, error: err.message };
  }
}