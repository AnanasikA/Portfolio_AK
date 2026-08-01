import { createAdminClient } from "@/lib/supabase-clients";
import { toCsv, csvResponse, checkAdminKey } from "@/lib/csv-export";

export async function GET(req: Request) {
  if (!checkAdminKey(req)) {
    return new Response("Brak dostępu", { status: 403 });
  }

  const supabase = createAdminClient();
  const { data: conversions } = await supabase
    .from("referral_conversions")
    .select("*, partners(name, referral_code)")
    .order("created_at", { ascending: false });

  const rows = (conversions ?? []).map((c) => ({
    Partner: c.partners?.name ?? "",
    "Kod partnera": c.partners?.referral_code ?? "",
    Klient: c.client_name ?? "",
    "Email klienta": c.client_email ?? "",
    Status: c.status,
    "Wartosc projektu": c.project_value ?? "",
    Prowizja: c.commission_amount ?? "",
    Zrodlo: c.source_path ?? "",
    "Data zgloszenia": c.created_at,
    "Ostatnia aktualizacja": c.updated_at ?? "",
    "Data wyplaty": c.paid_at ?? "",
    Notatka: c.notes ?? "",
  }));

  return csvResponse("zgloszenia.csv", toCsv(rows));
}