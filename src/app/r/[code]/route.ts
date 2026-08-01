import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-clients";
import { hashIp, REFERRAL_COOKIE_NAME, REFERRAL_COOKIE_MAX_AGE_DAYS } from "@/lib/referrals";

// GET /r/[code] — publiczny link, który rozdajesz partnerom
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const referralCode = code.toUpperCase();
  const destination = new URL("/pl", req.url); // dokąd trafia gość po kliknięciu

  const supabase = createAdminClient();

  const { data: partner } = await supabase
    .from("partners")
    .select("id, status")
    .eq("referral_code", referralCode)
    .maybeSingle();

  // Nieznany kod — nie zdradzamy tego, po prostu wysyłamy na stronę główną
  if (!partner || partner.status !== "approved") {
    return NextResponse.redirect(destination);
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  await supabase.from("referral_clicks").insert({
    partner_id: partner.id,
    referral_code: referralCode,
    landing_path: "/pl",
    referrer: req.headers.get("referer"),
    user_agent: req.headers.get("user-agent"),
    ip_hash: hashIp(ip),
  });

  const response = NextResponse.redirect(destination);
  response.cookies.set(REFERRAL_COOKIE_NAME, referralCode, {
    maxAge: 60 * 60 * 24 * REFERRAL_COOKIE_MAX_AGE_DAYS,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  return response;
}