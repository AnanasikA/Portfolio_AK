import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-clients";
import { generateReferralCode } from "@/lib/referrals";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, website, audienceNote } = body ?? {};

  if (!name || !email) {
    return NextResponse.json(
      { error: "Imię i e-mail są wymagane." },
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
    company: company ?? null,
    website: website ?? null,
    audience_note: audienceNote ?? null,
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