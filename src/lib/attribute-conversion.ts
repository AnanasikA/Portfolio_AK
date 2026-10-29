import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase-clients";
import { REFERRAL_COOKIE_NAME } from "@/lib/referrals";

export async function attributeReferralConversion(lead: {
  clientName?: string;
  clientEmail?: string;
  sourcePath?: string;
  projectValueEstimate?: number;
}) {
  const cookieStore = await cookies();
  const referralCode = cookieStore.get(REFERRAL_COOKIE_NAME)?.value;
  if (!referralCode) return;

  const supabase = createAdminClient();

  const { data: partner } = await supabase
    .from("partners")
    .select("id, status")
    .eq("referral_code", referralCode)
    .maybeSingle();

  if (!partner || partner.status !== "approved") return;

  await supabase.from("referral_conversions").insert({
    partner_id: partner.id,
    client_name: lead.clientName ?? null,
    client_email: lead.clientEmail ?? null,
    source_path: lead.sourcePath ?? null,

    project_value: lead.projectValueEstimate ?? null,
    status: "pending",
  });
}