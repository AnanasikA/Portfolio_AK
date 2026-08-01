import { createAdminClient } from "@/lib/supabase-clients";
import { toCsv, csvResponse, checkAdminKey } from "@/lib/csv-export";

export async function GET(req: Request) {
  if (!checkAdminKey(req)) {
    return new Response("Brak dostępu", { status: 403 });
  }

  const supabase = createAdminClient();
  const { data: payouts } = await supabase
    .from("referral_conversions")
    .select("*, partners(name, referral_code, payout_details)")
    .eq("status", "paid")
    .order("paid_at", { ascending: false });

  const rows = (payouts ?? []).map((c) => ({
    Partner: c.partners?.name ?? "",
    "Kod partnera": c.partners?.referral_code ?? "",
    Klient: c.client_name ?? "",
    Kwota: c.commission_amount ?? "",
    "Data wyplaty": c.paid_at ?? "",
    "Metoda wyplaty": c.payout_method ?? "",
    "Numer rozliczenia": c.payout_reference ?? "",
    "Dane do wyplaty partnera": c.partners?.payout_details ?? "",
    Notatka: c.notes ?? "",
  }));

  return csvResponse("wyplaty.csv", toCsv(rows));
}