import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-clients";
import { generateReferralCode } from "@/lib/referrals";
import {
  cleanText,
  getClientIp,
  isRateLimited,
  isSameOrigin,
  isValidEmail,
} from "@/lib/form-guard";

export async function POST(req: NextRequest) {
  // ── Ochrona: pochodzenie żądania i limit zgłoszeń ─────────────────────────
  if (!isSameOrigin(req.headers)) {
    return NextResponse.json({ error: "Niedozwolone żądanie." }, { status: 403 });
  }
  if (isRateLimited(`partner:${getClientIp(req.headers)}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Zbyt wiele zgłoszeń. Spróbuj ponownie później." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  // ── Walidacja: tylko tekst, bez znaków sterujących, z limitem długości ────
  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const company = cleanText(body.company, 120) || null;
  const audienceNote = cleanText(body.audienceNote, 1500, true) || null;

  // Strona / profil: dopuszczamy tylko adresy http(s) — nigdy np. javascript:
  let website: string | null = cleanText(body.website, 200) || null;
  if (website) {
    try {
      const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
      website = url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
    } catch {
      website = null;
    }
  }

  if (name.length < 2 || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Podaj imię i poprawny adres e-mail." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("partners")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "Ten adres e-mail już zgłosił się do programu." },
      { status: 409 }
    );
  }

  // Generuj unikalny kod (rzadkie kolizje obsłużone retry)
  let referralCode = generateReferralCode(name);
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data: collision } = await supabase
      .from("partners")
      .select("id")
      .eq("referral_code", referralCode)
      .maybeSingle();
    if (!collision) break;
    referralCode = generateReferralCode(name);
  }

  // Sprawdź ustawienia programu — jeśli włączona jest automatyczna
  // akceptacja, partner trafia od razu jako zatwierdzony zamiast pending.
  const { data: settings } = await supabase
    .from("program_settings")
    .select("auto_approve_partners, default_commission_rate")
    .eq("id", 1)
    .maybeSingle();

  const autoApprove = settings?.auto_approve_partners ?? false;

  const { error } = await supabase.from("partners").insert({
    name,
    email,
    company,
    website,
    audience_note: audienceNote,
    referral_code: referralCode,
    status: autoApprove ? "approved" : "pending",
    approved_at: autoApprove ? new Date().toISOString() : null,
    commission_rate: settings?.default_commission_rate ?? 15,
  });

  if (error) {
    return NextResponse.json(
      { error: "Nie udało się zapisać zgłoszenia. Spróbuj ponownie." },
      { status: 500 }
    );
  }

  // Opcjonalnie: wyślij tu powiadomienie mailem do siebie (Nodemailer),
  // tak jak w istniejącym formularzu kontaktowym.

  return NextResponse.json({ success: true });
}