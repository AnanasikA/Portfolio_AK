'use server';

import nodemailer from 'nodemailer';

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

export async function sendEmail(data: EmailData): Promise<{ ok: boolean; error?: string }> {
  const { name, email, phone, site_type, budget, has_logo, message, locale } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const isEn = locale === 'en';

  const html = `
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #f8faff; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #007aff 0%, #006bde 100%); padding: 32px 40px;">
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">
          ${isEn ? 'New quote request' : 'Nowe zapytanie o wycenę'}
        </h1>
        <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0; font-size: 14px;">
          ${isEn ? 'From your portfolio website' : 'Ze strony portfolio'}
        </p>
      </div>

      <div style="padding: 32px 40px; background: white;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; width: 140px;">
              ${isEn ? 'Name' : 'Imię i nazwisko'}
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 500;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">
              Email
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 500;">
              <a href="mailto:${email}" style="color: #007aff;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">
              ${isEn ? 'Phone' : 'Telefon'}
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 500;">
              ${phone}
            </td>
          </tr>
          ` : ''}
          ${site_type ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">
              ${isEn ? 'Type of website' : 'Rodzaj strony'}
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 500;">
              ${site_type}
            </td>
          </tr>
          ` : ''}
          ${budget ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">
              ${isEn ? 'Budget' : 'Budżet'}
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 500;">
              ${budget}
            </td>
          </tr>
          ` : ''}
          ${has_logo ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">
              ${isEn ? 'Logo' : 'Logo'}
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 500;">
              ${has_logo}
            </td>
          </tr>
          ` : ''}
        </table>

        <div style="margin-top: 24px; background: #f8faff; border-radius: 12px; padding: 20px;">
          <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">
            ${isEn ? 'Message' : 'Wiadomość'}
          </p>
          <p style="color: #0f172a; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">
            ${message}
          </p>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}" style="display: inline-block; background: #007aff; color: white; text-decoration: none; padding: 12px 28px; border-radius: 100px; font-size: 14px; font-weight: 500;">
            ${isEn ? 'Reply to' : 'Odpowiedz do'} ${name}
          </a>
        </div>
      </div>

      <div style="padding: 20px 40px; background: #f8faff; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          anastasiiakupriianets.pl
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfolio AK" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: isEn
        ? `New quote request from ${name}`
        : `Nowe zapytanie od ${name}`,
      html,
    });

    return { ok: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { ok: false, error: String(error) };
  }
}