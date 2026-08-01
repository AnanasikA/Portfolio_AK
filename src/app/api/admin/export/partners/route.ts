import { createAdminClient } from "@/lib/supabase-clients";
import { toCsv, csvResponse, checkAdminKey } from "@/lib/csv-export";

export async function GET(req: Request) {
  if (!checkAdminKey(req)) {
    return new Response("Brak dostępu", { status: 403 });
  }

  const supabase = createAdminClient();
  const { data: partners } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (partners ?? []).map((p) => ({
    Imie: p.name,
    Email: p.email,
    Firma: p.company ?? "",
    Kod: p.referral_code,
    Status: p.status,
    "Prowizja %": p.commission_rate ?? 15,
    "Data rejestracji": p.created_at,
    "Dane do wyplaty": p.payout_details ?? "",
    "Notatka admina": p.admin_notes ?? "",
  }));

  return csvResponse("partnerzy.csv", toCsv(rows));
}