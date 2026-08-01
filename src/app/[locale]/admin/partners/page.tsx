import { createAdminClient } from "@/lib/supabase-clients";
import { redirect } from "next/navigation";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import AdminTabs from "@/components/admin/AdminTabs";
import ConversionsFilterPanel, { type ConversionMeta } from "@/components/admin/ConversionsFilterPanel";
import ActivityToggle from "@/components/admin/ActivityToggle";
import PartnersShell from "@/components/PartnersShell";
import ClicksChart from "@/components/ClicksChart";
import { generateReferralCode } from "@/lib/referrals";

type PartnerRecord = {
  id: string;
  name: string;
  email: string;
  referral_code: string;
  status: string;
  company?: string | null;
  website?: string | null;
  audience_note?: string | null;
  commission_rate?: number | null;
  admin_notes?: string | null;
  created_at: string;
};

type ConversionRecord = {
  id: string;
  partner_id: string;
  client_name?: string | null;
  client_email?: string | null;
  status: string;
  created_at: string;
  updated_at?: string | null;
  paid_at?: string | null;
  source_path?: string | null;
  project_value?: number | null;
  commission_amount?: number | null;
  payout_method?: string | null;
  payout_reference?: string | null;
  notes?: string | null;
  partners?: { name: string; referral_code: string } | null;
};

type ClickRecord = {
  id: string;
  partner_id: string;
  referral_code: string;
  created_at: string;
  referrer?: string | null;
  partners?: { name: string; referral_code: string } | null;
};

type HistoryRecord = {
  id: string;
  conversion_id: string;
  changed_at: string;
  change_type: string;
  description: string;
};

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function groupCountByDay(items: { at: string }[], days: number) {
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);
  const out: { date: string; count: number }[] = [];
  for (let i = 0; i < days; i++) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    const key = day.toISOString().slice(0, 10);
    out.push({ date: key, count: items.filter((it) => dayKey(it.at) === key).length });
  }
  return out;
}

function groupSumByDay(items: { at: string; value: number }[], days: number) {
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);
  const out: { date: string; count: number }[] = [];
  for (let i = 0; i < days; i++) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    const key = day.toISOString().slice(0, 10);
    const sum = items.filter((it) => dayKey(it.at) === key).reduce((s, it) => s + it.value, 0);
    out.push({ date: key, count: Math.round(sum) });
  }
  return out;
}

// Ochrona: prosty sekret w URL, np. /pl/admin/partners?key=TWOJ_SEKRET
export default async function AdminPartnersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { locale } = await params;
  const { key } = await searchParams;
  if (!key || key !== process.env.ADMIN_PANEL_SECRET) {
    redirect(`/${locale}`);
  }

  const supabase = createAdminClient();

  const [{ data: partnersData }, { data: conversionsData }, { data: clicksData }, { data: historyData }, { data: settingsData }] =
    await Promise.all([
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase
        .from("referral_conversions")
        .select("*, partners(name, referral_code)")
        .order("created_at", { ascending: false }),
      supabase
        .from("referral_clicks")
        .select("*, partners(name, referral_code)")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase.from("referral_conversion_history").select("*").order("changed_at", { ascending: false }),
      supabase.from("program_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

  const partners: PartnerRecord[] = partnersData ?? [];
  const conversions: ConversionRecord[] = conversionsData ?? [];
  const clicks: ClickRecord[] = clicksData ?? [];
  const history: HistoryRecord[] = historyData ?? [];
  const settings = settingsData ?? { default_commission_rate: 15, auto_approve_partners: false, minimum_project_value: 0 };

  const pending = partners.filter((p) => p.status === "pending");
  const approved = partners.filter((p) => p.status === "approved");
  const other = partners.filter((p) => p.status !== "pending" && p.status !== "approved");
  const activeConversions = conversions.filter((c) => c.status === "pending" || c.status === "confirmed");
  const pendingConversionsCount = conversions.filter((c) => c.status === "pending").length;

  // --- Kliknięcia: dokładna liczba + ostatnia aktywność na partnera ---
  const clickStats = await Promise.all(
    partners.map(async (p) => {
      const { data } = await supabase.from("referral_clicks").select("created_at").eq("partner_id", p.id);
      const arr = data ?? [];
      const lastClickAt = arr.length
        ? arr.reduce((max, c) => (c.created_at > max ? c.created_at : max), arr[0].created_at)
        : null;
      return { partnerId: p.id, count: arr.length, lastClickAt };
    })
  );
  const clickCountByPartner: Record<string, number> = {};
  const lastClickByPartner: Record<string, string | null> = {};
  clickStats.forEach(({ partnerId, count, lastClickAt }) => {
    clickCountByPartner[partnerId] = count;
    lastClickByPartner[partnerId] = lastClickAt;
  });

  const { count: totalClicksCount } = await supabase
    .from("referral_clicks")
    .select("*", { count: "exact", head: true });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const { count: clicks30Count } = await supabase
    .from("referral_clicks")
    .select("*", { count: "exact", head: true })
    .gte("created_at", thirtyDaysAgo.toISOString());

  const { data: recentClicksAll30 } = await supabase
    .from("referral_clicks")
    .select("created_at")
    .gte("created_at", thirtyDaysAgo.toISOString());

  // --- Grupowanie po partnerze ---
  const conversionsByPartner: Record<string, ConversionRecord[]> = {};
  conversions.forEach((c) => {
    (conversionsByPartner[c.partner_id] ??= []).push(c);
  });

  const partnerRateById: Record<string, number> = {};
  partners.forEach((p) => {
    partnerRateById[p.id] = Number(p.commission_rate ?? settings.default_commission_rate ?? 15);
  });

  function estimateCommission(c: ConversionRecord): number {
    if (c.commission_amount) return Number(c.commission_amount);
    if (c.project_value) return Number(c.project_value) * ((partnerRateById[c.partner_id] ?? 15) / 100);
    return 0;
  }

  const completedCountByPartner: Record<string, number> = {};
  const pendingCommissionByPartner: Record<string, number> = {};
  const paidCommissionByPartner: Record<string, number> = {};
  const lastActivityByPartner: Record<string, string> = {};

  partners.forEach((p) => {
    const list = conversionsByPartner[p.id] ?? [];
    completedCountByPartner[p.id] = list.filter((c) => c.status === "paid").length;
    pendingCommissionByPartner[p.id] = list
      .filter((c) => c.status === "pending" || c.status === "confirmed")
      .reduce((s, c) => s + estimateCommission(c), 0);
    paidCommissionByPartner[p.id] = list
      .filter((c) => c.status === "paid")
      .reduce((s, c) => s + Number(c.commission_amount ?? 0), 0);

    const dates = [lastClickByPartner[p.id], ...list.map((c) => c.created_at), p.created_at].filter(Boolean) as string[];
    lastActivityByPartner[p.id] = dates.reduce((max, d) => (d > max ? d : max), p.created_at);
  });

  // --- Historia per zgłoszenie ---
  const historyByConversion: Record<string, HistoryRecord[]> = {};
  history.forEach((h) => {
    (historyByConversion[h.conversion_id] ??= []).push(h);
  });

  // --- KPI ---
  const totalCommissionToPay = conversions
    .filter((c) => c.status === "confirmed")
    .reduce((s, c) => s + estimateCommission(c), 0);
  const totalPaidCommission = conversions
    .filter((c) => c.status === "paid")
    .reduce((s, c) => s + Number(c.commission_amount ?? 0), 0);
  const overallConversionRate =
    totalClicksCount && totalClicksCount > 0 ? ((conversions.length / totalClicksCount) * 100).toFixed(1) : "—";

  // --- Wykresy: 14 dni (przegląd) i 30 dni (aktywność, przełączalne) ---
  const clicksByDay30 = groupCountByDay((recentClicksAll30 ?? []).map((c) => ({ at: c.created_at })), 30);
  const clicksByDay14 = clicksByDay30.slice(-14);

  const conversionsByDay30 = groupCountByDay(
    conversions.filter((c) => new Date(c.created_at) >= thirtyDaysAgo).map((c) => ({ at: c.created_at })),
    30
  );
  const completedByDay30 = groupCountByDay(
    conversions
      .filter((c) => c.status === "paid" && c.paid_at && new Date(c.paid_at) >= thirtyDaysAgo)
      .map((c) => ({ at: c.paid_at as string })),
    30
  );
  const payoutsByDay30 = groupSumByDay(
    conversions
      .filter((c) => c.status === "paid" && c.paid_at && new Date(c.paid_at) >= thirtyDaysAgo)
      .map((c) => ({ at: c.paid_at as string, value: Number(c.commission_amount ?? 0) })),
    30
  );

  // --- Ranking (kliknięcia) ---
  const leaderboard = partners
    .map((p) => ({ name: p.name, code: p.referral_code, count: clickCountByPartner[p.id] ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const maxLeaderboardCount = Math.max(...leaderboard.map((l) => l.count), 1);

  // --- Statystyki / rekordziści ---
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const paidThisMonthByPartner: Record<string, number> = {};
  conversions
    .filter((c) => c.status === "paid" && c.paid_at && new Date(c.paid_at) >= monthStart)
    .forEach((c) => {
      paidThisMonthByPartner[c.partner_id] = (paidThisMonthByPartner[c.partner_id] ?? 0) + Number(c.commission_amount ?? 0);
    });
  const bestPartnerOfMonth = Object.entries(paidThisMonthByPartner).sort((a, b) => b[1] - a[1])[0];
  const bestPartnerOfMonthName = bestPartnerOfMonth ? partners.find((p) => p.id === bestPartnerOfMonth[0])?.name : null;

  const mostClicksEntry = Object.entries(clickCountByPartner).sort((a, b) => b[1] - a[1])[0];
  const mostClicksName = mostClicksEntry ? partners.find((p) => p.id === mostClicksEntry[0])?.name : null;

  const conversionRateByPartner = partners
    .filter((p) => (clickCountByPartner[p.id] ?? 0) > 0)
    .map((p) => ({
      name: p.name,
      rate: ((conversionsByPartner[p.id]?.length ?? 0) / clickCountByPartner[p.id]) * 100,
    }))
    .sort((a, b) => b.rate - a.rate)[0];

  const highestSinglePayout = conversions
    .filter((c) => c.status === "paid")
    .sort((a, b) => Number(b.commission_amount ?? 0) - Number(a.commission_amount ?? 0))[0];
  const highestSinglePayoutPartner = highestSinglePayout
    ? partners.find((p) => p.id === highestSinglePayout.partner_id)?.name
    : null;

  // --- Powiadomienia ---
  type Notification = { at: string; text: string };
  const notifications: Notification[] = [
    ...pending.slice(0, 5).map((p) => ({ at: p.created_at, text: `Nowy partner oczekuje na akceptację: ${p.name}` })),
    ...conversions
      .filter((c) => c.status === "pending")
      .slice(0, 5)
      .map((c) => ({
        at: c.created_at,
        text: `Nowe zgłoszenie: ${c.client_name ?? "bez nazwy"} (partner: ${c.partners?.name ?? "?"})`,
      })),
    ...conversions
      .filter((c) => c.status === "paid" && c.paid_at && new Date(c.paid_at) >= thirtyDaysAgo)
      .slice(0, 5)
      .map((c) => ({
        at: c.paid_at as string,
        text: `Zakończony projekt: ${c.client_name ?? "bez nazwy"} — wypłacono ${Number(c.commission_amount ?? 0).toFixed(0)} zł`,
      })),
    ...conversions
      .filter((c) => c.status === "confirmed")
      .slice(0, 5)
      .map((c) => ({
        at: c.updated_at ?? c.created_at,
        text: `Prowizja oczekuje na wypłatę: ${c.partners?.name ?? "?"} — ${estimateCommission(c).toFixed(0)} zł`,
      })),
  ]
    .sort((a, b) => (a.at < b.at ? 1 : -1))
    .slice(0, 10);

  // --- Przygotowanie listy zgłoszeń dla filtra (meta + gotowy JSX) ---
  const conversionItems = conversions.map((c) => ({
    meta: {
      id: c.id,
      status: c.status,
      partnerName: c.partners?.name ?? "",
      clientName: c.client_name ?? "",
      clientEmail: c.client_email ?? "",
      createdAt: c.created_at,
      needsPayout: c.status === "confirmed",
    } satisfies ConversionMeta,
    node: <ConversionRow key={c.id} conversion={c} adminKey={key} history={historyByConversion[c.id] ?? []} />,
  }));
  const partnerNamesForFilter = Array.from(new Set(partners.map((p) => p.name))).sort();

  const pendingPayouts = conversions.filter((c) => c.status === "confirmed");
  const paidPayouts = conversions
    .filter((c) => c.status === "paid")
    .sort((a, b) => new Date(b.paid_at ?? b.created_at).getTime() - new Date(a.paid_at ?? a.created_at).getTime());

  return (
    <PartnersShell>
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "60px 24px 120px",
          fontFamily: "var(--fb, sans-serif)",
          color: "var(--ink, #111)",
        }}
      >
        <h1 style={{ fontFamily: "var(--fd, sans-serif)", fontSize: 26, marginBottom: 4 }}>
          Program partnerski — admin
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted-2, #888)", marginBottom: 32 }}>
          {partners.length} partnerów · {conversions.length} zgłoszeń
        </p>

        <AdminTabs
          tabs={[
            { id: "overview", label: "Przegląd" },
            { id: "partners", label: "Partnerzy", badge: pending.length },
            { id: "conversions", label: "Zgłoszenia", badge: pendingConversionsCount },
            { id: "payouts", label: "Wypłaty", badge: pendingPayouts.length },
            { id: "activity", label: "Aktywność" },
            { id: "settings", label: "Ustawienia" },
          ]}
        >
          {{
            overview: (
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: 12,
                    marginBottom: 36,
                  }}
                >
                  <KpiCard label="Partnerzy" value={String(partners.length)} />
                  <KpiCard
                    label="Oczekujący na akceptację"
                    value={String(pending.length)}
                    tone={pending.length > 0 ? "warning" : "default"}
                  />
                  <KpiCard label="Aktywne zgłoszenia" value={String(activeConversions.length)} />
                  <KpiCard label="Prowizje do wypłaty" value={`${totalCommissionToPay.toFixed(0)} zł`} tone="warning" />
                  <KpiCard label="Wypłacone łącznie" value={`${totalPaidCommission.toFixed(0)} zł`} tone="brand" />
                  <KpiCard label="Kliknięcia (30 dni)" value={String(clicks30Count ?? 0)} />
                  <KpiCard
                    label="Konwersja (kliknięcia → zgłoszenia)"
                    value={overallConversionRate === "—" ? "—" : `${overallConversionRate}%`}
                  />
                </div>

                {notifications.length > 0 && (
                  <Section title="Powiadomienia">
                    <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, overflow: "hidden" }}>
                      {notifications.map((n, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "12px 16px",
                            borderBottom: i === notifications.length - 1 ? "none" : "1px solid var(--line, #e2e2e2)",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                            flexWrap: "wrap",
                            fontSize: 13,
                          }}
                        >
                          <span>{n.text}</span>
                          <span style={{ color: "var(--muted-2, #888)", whiteSpace: "nowrap" }}>
                            {new Date(n.at).toLocaleDateString("pl-PL")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                <Section title="Rekordziści">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                    <KpiCard label="Najlepszy partner miesiąca" value={bestPartnerOfMonthName ?? "—"} small />
                    <KpiCard label="Najwięcej kliknięć" value={mostClicksName ?? "—"} small />
                    <KpiCard
                      label="Najwyższa konwersja"
                      value={
                        conversionRateByPartner
                          ? `${conversionRateByPartner.name} (${conversionRateByPartner.rate.toFixed(0)}%)`
                          : "—"
                      }
                      small
                    />
                    <KpiCard
                      label="Największa pojedyncza wypłata"
                      value={
                        highestSinglePayout
                          ? `${highestSinglePayoutPartner} — ${Number(highestSinglePayout.commission_amount ?? 0).toFixed(0)} zł`
                          : "—"
                      }
                      small
                    />
                  </div>
                </Section>

                <Section title="Aktywność — wszyscy partnerzy (14 dni)">
                  <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, padding: "24px 20px" }}>
                    <ClicksChart data={clicksByDay14} />
                  </div>
                </Section>

                {leaderboard.some((l) => l.count > 0) && (
                  <Section title="Ranking partnerów wg kliknięć">
                    <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, padding: "20px 20px", display: "grid", gap: 10 }}>
                      {leaderboard.map((l) => (
                        <div key={l.code} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 13, width: 140, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {l.name}
                          </span>
                          <div style={{ flex: 1, background: "var(--surface, #f5f5f5)", borderRadius: 4, height: 18, position: "relative" }}>
                            <div
                              style={{
                                width: `${(l.count / maxLeaderboardCount) * 100}%`,
                                background: "var(--brand, #1d4ed8)",
                                height: "100%",
                                borderRadius: 4,
                                minWidth: l.count > 0 ? 6 : 0,
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 13, width: 28, textAlign: "right", color: "var(--muted-2, #888)" }}>
                            {l.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                <Section title="Eksport danych">
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <ExportLink href={`/api/admin/export/partners?key=${key}`} label="Partnerzy (CSV)" />
                    <ExportLink href={`/api/admin/export/conversions?key=${key}`} label="Zgłoszenia (CSV)" />
                    <ExportLink href={`/api/admin/export/payouts?key=${key}`} label="Wypłaty (CSV)" />
                  </div>
                </Section>
              </div>
            ),

            partners: (
              <div>
                <Section title="Dodaj partnera ręcznie">
                  <AddPartnerForm adminKey={key} />
                </Section>

                {pending.length > 0 && (
                  <Section title={`Do zatwierdzenia (${pending.length})`}>
                    {pending.map((p) => (
                      <PartnerRow
                        key={p.id}
                        partner={p}
                        adminKey={key}
                        clickCount={clickCountByPartner[p.id] ?? 0}
                        conversionCount={conversionsByPartner[p.id]?.length ?? 0}
                        completedCount={completedCountByPartner[p.id] ?? 0}
                        pendingCommission={pendingCommissionByPartner[p.id] ?? 0}
                        paidCommission={paidCommissionByPartner[p.id] ?? 0}
                        lastActivity={lastActivityByPartner[p.id]}
                        conversionsForPartner={conversionsByPartner[p.id] ?? []}
                        highlight
                      />
                    ))}
                  </Section>
                )}

                <Section title={`Aktywni partnerzy (${approved.length})`}>
                  {approved.length === 0 ? (
                    <EmptyState text="Jeszcze żadnych zatwierdzonych partnerów." />
                  ) : (
                    approved.map((p) => (
                      <PartnerRow
                        key={p.id}
                        partner={p}
                        adminKey={key}
                        clickCount={clickCountByPartner[p.id] ?? 0}
                        conversionCount={conversionsByPartner[p.id]?.length ?? 0}
                        completedCount={completedCountByPartner[p.id] ?? 0}
                        pendingCommission={pendingCommissionByPartner[p.id] ?? 0}
                        paidCommission={paidCommissionByPartner[p.id] ?? 0}
                        lastActivity={lastActivityByPartner[p.id]}
                        conversionsForPartner={conversionsByPartner[p.id] ?? []}
                      />
                    ))
                  )}
                </Section>

                {other.length > 0 && (
                  <Section title="Odrzuceni / nieaktywni">
                    {other.map((p) => (
                      <PartnerRow
                        key={p.id}
                        partner={p}
                        adminKey={key}
                        clickCount={clickCountByPartner[p.id] ?? 0}
                        conversionCount={conversionsByPartner[p.id]?.length ?? 0}
                        completedCount={completedCountByPartner[p.id] ?? 0}
                        pendingCommission={pendingCommissionByPartner[p.id] ?? 0}
                        paidCommission={paidCommissionByPartner[p.id] ?? 0}
                        lastActivity={lastActivityByPartner[p.id]}
                        conversionsForPartner={conversionsByPartner[p.id] ?? []}
                      />
                    ))}
                  </Section>
                )}
              </div>
            ),

            conversions: (
              <Section title={`Zgłoszenia / konwersje (${conversions.length})`}>
                {conversions.length === 0 ? (
                  <EmptyState text="Jeszcze żadnych zgłoszeń od partnerów." />
                ) : (
                  <ConversionsFilterPanel items={conversionItems} partnerNames={partnerNamesForFilter} />
                )}
              </Section>
            ),

            payouts: (
              <div>
                <Section title="Eksport">
                  <ExportLink href={`/api/admin/export/payouts?key=${key}`} label="Eksportuj wypłaty (CSV)" />
                </Section>

                <Section title={`Oczekujące na wypłatę (${pendingPayouts.length})`}>
                  {pendingPayouts.length === 0 ? (
                    <EmptyState text="Brak potwierdzonych zgłoszeń czekających na wypłatę." />
                  ) : (
                    pendingPayouts.map((c) => (
                      <PendingPayoutRow key={c.id} conversion={c} adminKey={key} estimatedCommission={estimateCommission(c)} />
                    ))
                  )}
                </Section>

                <Section title={`Historia wypłat (${paidPayouts.length})`}>
                  {paidPayouts.length === 0 ? (
                    <EmptyState text="Jeszcze żadnych wypłat." />
                  ) : (
                    paidPayouts.map((c) => <PaidPayoutRow key={c.id} conversion={c} />)
                  )}
                </Section>
              </div>
            ),

            activity: (
              <div>
                <Section title="Aktywność w czasie (ostatnie 30 dni)">
                  <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, padding: "24px 20px" }}>
                    <ActivityToggle
                      clicks={clicksByDay30}
                      conversions={conversionsByDay30}
                      completed={completedByDay30}
                      payouts={payoutsByDay30}
                    />
                  </div>
                </Section>

                <Section title={`Ostatnie kliknięcia (${clicks.length})`}>
                  {clicks.length === 0 ? (
                    <EmptyState text="Jeszcze żadnych kliknięć w linki partnerskie." />
                  ) : (
                    <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, overflow: "hidden" }}>
                      {clicks.map((c, i) => (
                        <ClickRow key={c.id} click={c} isLast={i === clicks.length - 1} />
                      ))}
                    </div>
                  )}
                </Section>
              </div>
            ),

            settings: (
              <Section title="Ustawienia programu partnerskiego">
                <form
                  action={updateProgramSettingsAction}
                  style={{
                    border: "1px solid var(--line, #e2e2e2)",
                    borderRadius: 8,
                    padding: 24,
                    display: "grid",
                    gap: 18,
                    maxWidth: 420,
                  }}
                >
                  <input type="hidden" name="key" value={key} />

                  <div>
                    <label style={{ fontSize: 13, color: "var(--muted-2, #888)", display: "block", marginBottom: 6 }}>
                      Domyślna stawka prowizji (%)
                    </label>
                    <input
                      name="defaultCommissionRate"
                      type="number"
                      step="0.5"
                      defaultValue={settings.default_commission_rate ?? 15}
                      style={{ padding: "8px 10px", border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, width: "100%" }}
                    />
                    <p style={{ fontSize: 11, color: "var(--muted-2, #888)", marginTop: 4 }}>
                      Stosowana dla nowych partnerów, jeśli nie ustawisz im indywidualnej stawki.
                    </p>
                  </div>

                  <div>
                    <label style={{ fontSize: 13, color: "var(--muted-2, #888)", display: "block", marginBottom: 6 }}>
                      Minimalna wartość projektu (zł)
                    </label>
                    <input
                      name="minimumProjectValue"
                      type="number"
                      step="1"
                      defaultValue={settings.minimum_project_value ?? 0}
                      style={{ padding: "8px 10px", border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, width: "100%" }}
                    />
                    <p style={{ fontSize: 11, color: "var(--muted-2, #888)", marginTop: 4 }}>
                      Wartość informacyjna — do wykorzystania przy wycenie zgłoszeń.
                    </p>
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                    <input type="checkbox" name="autoApprove" defaultChecked={settings.auto_approve_partners ?? false} />
                    Automatycznie zatwierdzaj nowych partnerów (bez ręcznej akceptacji)
                  </label>

                  <AdminSubmitButton label="Zapisz ustawienia" pendingLabel="Zapisywanie..." tone="brand" />
                </form>
              </Section>
            ),
          }}
        </AdminTabs>
      </div>
    </PartnersShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <p
        style={{
          fontFamily: "var(--fd, sans-serif)",
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--muted-2, #888)",
          marginBottom: 16,
        }}
      >
        {title}
      </p>
      <div style={{ display: "grid", gap: 10 }}>{children}</div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: 14,
        color: "var(--muted-2, #888)",
        border: "1px dashed var(--line, #e2e2e2)",
        borderRadius: 8,
        padding: "20px 16px",
      }}
    >
      {text}
    </p>
  );
}

function KpiCard({
  label,
  value,
  tone = "default",
  small = false,
}: {
  label: string;
  value: string;
  tone?: "default" | "warning" | "brand";
  small?: boolean;
}) {
  const color = tone === "warning" ? "#b8860b" : tone === "brand" ? "var(--brand, #1d4ed8)" : "var(--ink, #111)";
  return (
    <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 10, padding: 16 }}>
      <p style={{ fontFamily: "var(--fd, sans-serif)", fontSize: small ? 15 : 22, fontWeight: 700, color, wordBreak: "break-word" }}>
        {value}
      </p>
      <p style={{ fontSize: 12, color: "var(--muted-2, #888)", marginTop: 4 }}>{label}</p>
    </div>
  );
}

function ExportLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontSize: 13,
        padding: "8px 16px",
        border: "1px solid var(--line, #e2e2e2)",
        borderRadius: 999,
        textDecoration: "none",
        color: "var(--ink, #111)",
      }}
    >
      ⬇ {label}
    </a>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: "Oczekuje", color: "#b8860b" },
    approved: { label: "Aktywny", color: "#2e7d32" },
    rejected: { label: "Odrzucony", color: "var(--muted-2, #888)" },
    paused: { label: "Zablokowany", color: "var(--muted-2, #888)" },
    confirmed: { label: "Potwierdzone", color: "var(--brand, #1d4ed8)" },
    paid: { label: "Wypłacone", color: "#2e7d32" },
    lost: { label: "Nieudane", color: "var(--muted-2, #888)" },
  };
  const info = map[status] ?? { label: status, color: "var(--muted-2, #888)" };
  return (
    <span
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontSize: 11,
        color: info.color,
        border: `1px solid ${info.color}`,
        borderRadius: 999,
        padding: "3px 10px",
        whiteSpace: "nowrap",
      }}
    >
      {info.label}
    </span>
  );
}

function AddPartnerForm({ adminKey }: { adminKey: string }) {
  return (
    <form
      action={addPartnerAction}
      style={{
        border: "1px solid var(--line, #e2e2e2)",
        borderRadius: 8,
        padding: "20px",
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <input type="hidden" name="key" value={adminKey} />
      <input
        name="name"
        placeholder="Imię i nazwisko"
        required
        style={{ padding: "8px 10px", border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, flex: 1, minWidth: 160 }}
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        required
        style={{ padding: "8px 10px", border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, flex: 1, minWidth: 200 }}
      />
      <input
        name="commissionRate"
        type="number"
        placeholder="Prowizja %"
        defaultValue={15}
        step="0.5"
        style={{ padding: "8px 10px", border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, width: 110 }}
      />
      <AdminSubmitButton label="Dodaj i zatwierdź" pendingLabel="Dodawanie..." tone="brand" />
      <p style={{ fontSize: 12, color: "var(--muted-2, #888)", width: "100%", marginTop: 4 }}>
        Dodaje partnera od razu jako zatwierdzonego, z automatycznie wygenerowanym kodem.
      </p>
    </form>
  );
}

const smallInputStyle: React.CSSProperties = {
  padding: "7px 10px",
  border: "1px solid var(--line, #e2e2e2)",
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "var(--fb, sans-serif)",
};

function PartnerRow({
  partner: p,
  adminKey,
  clickCount = 0,
  conversionCount = 0,
  completedCount = 0,
  pendingCommission = 0,
  paidCommission = 0,
  lastActivity,
  conversionsForPartner = [],
  highlight = false,
}: {
  partner: PartnerRecord;
  adminKey: string;
  clickCount?: number;
  conversionCount?: number;
  completedCount?: number;
  pendingCommission?: number;
  paidCommission?: number;
  lastActivity?: string;
  conversionsForPartner?: ConversionRecord[];
  highlight?: boolean;
}) {
  const referralLink = `https://anastasiiakupriianets.pl/r/${p.referral_code}`;
  const paidHistory = conversionsForPartner.filter((c) => c.status === "paid");

  return (
    <div
      style={{
        border: highlight ? "1px solid var(--brand, #1d4ed8)" : "1px solid var(--line, #e2e2e2)",
        borderRadius: 8,
        padding: "16px 20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
            <strong style={{ fontSize: 15 }}>{p.name}</strong>
            <StatusPill status={p.status} />
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12.5, color: "var(--muted-2, #888)" }}>
            <span>{p.email}</span>
            <span>kod: {p.referral_code}</span>
            <span>{clickCount} kliknięć</span>
            <span>{conversionCount} zgłoszeń</span>
            <span>{completedCount} zakończonych</span>
            <span>oczekuje: {pendingCommission.toFixed(0)} zł</span>
            <span>wypłacono: {paidCommission.toFixed(0)} zł</span>
            <span>dołączył: {new Date(p.created_at).toLocaleDateString("pl-PL")}</span>
            {lastActivity && <span>ostatnia aktywność: {new Date(lastActivity).toLocaleDateString("pl-PL")}</span>}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.status === "pending" && (
            <>
              <form action={updatePartnerStatusAction}>
                <input type="hidden" name="key" value={adminKey} />
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="status" value="approved" />
                <AdminSubmitButton label="Zatwierdź" pendingLabel="..." tone="brand" />
              </form>
              <form action={updatePartnerStatusAction}>
                <input type="hidden" name="key" value={adminKey} />
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="status" value="rejected" />
                <AdminSubmitButton label="Odrzuć" pendingLabel="..." tone="muted" />
              </form>
            </>
          )}
          {p.status === "approved" && (
            <form action={updatePartnerStatusAction}>
              <input type="hidden" name="key" value={adminKey} />
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="status" value="paused" />
              <AdminSubmitButton label="Zablokuj" pendingLabel="..." tone="muted" />
            </form>
          )}
          {(p.status === "paused" || p.status === "rejected") && (
            <form action={updatePartnerStatusAction}>
              <input type="hidden" name="key" value={adminKey} />
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="status" value="approved" />
              <AdminSubmitButton label="Wznów" pendingLabel="..." tone="brand" />
            </form>
          )}
        </div>
      </div>

      <details style={{ marginTop: 12 }}>
        <summary style={{ fontSize: 12.5, color: "var(--brand, #1d4ed8)", cursor: "pointer" }}>
          Szczegóły partnera
        </summary>

        <div style={{ marginTop: 14, display: "grid", gap: 16 }}>
          <div style={{ fontSize: 12.5, color: "var(--muted-2, #888)" }}>
            <p>
              Link partnerski: <span style={{ fontFamily: "monospace" }}>{referralLink}</span>
            </p>
            {p.website && <p>Strona: {p.website}</p>}
            {p.company && <p>Firma: {p.company}</p>}
            {p.audience_note && <p>Notatka ze zgłoszenia: {p.audience_note}</p>}
          </div>

          <form
            action={updatePartnerDetailsAction}
            style={{ display: "grid", gap: 8, border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, padding: 14 }}
          >
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={p.id} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input name="name" defaultValue={p.name} placeholder="Imię i nazwisko" style={smallInputStyle} />
              <input name="company" defaultValue={p.company ?? ""} placeholder="Firma" style={smallInputStyle} />
              <input name="website" defaultValue={p.website ?? ""} placeholder="Strona" style={smallInputStyle} />
              <input
                name="commissionRate"
                type="number"
                step="0.5"
                defaultValue={p.commission_rate ?? 15}
                placeholder="Prowizja %"
                style={{ ...smallInputStyle, width: 90 }}
              />
            </div>
            <textarea
              name="adminNotes"
              defaultValue={p.admin_notes ?? ""}
              placeholder="Notatka administratora (widoczna tylko dla Ciebie)"
              rows={2}
              style={{ ...smallInputStyle, width: "100%" }}
            />
            <AdminSubmitButton label="Zapisz dane" pendingLabel="Zapisywanie..." tone="muted" />
          </form>

          <div>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
              Historia zgłoszeń ({conversionsForPartner.length})
            </p>
            {conversionsForPartner.length === 0 ? (
              <p style={{ fontSize: 12, color: "var(--muted-2, #888)" }}>Brak zgłoszeń.</p>
            ) : (
              <div style={{ display: "grid", gap: 6 }}>
                {conversionsForPartner.map((c) => (
                  <div key={c.id} style={{ fontSize: 12, display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span>
                      {c.client_name ?? "bez nazwy"} · {new Date(c.created_at).toLocaleDateString("pl-PL")}
                    </span>
                    <StatusPill status={c.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Historia wypłat ({paidHistory.length})</p>
            {paidHistory.length === 0 ? (
              <p style={{ fontSize: 12, color: "var(--muted-2, #888)" }}>Brak wypłat.</p>
            ) : (
              <div style={{ display: "grid", gap: 6 }}>
                {paidHistory.map((c) => (
                  <div key={c.id} style={{ fontSize: 12, display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <span>
                      {c.client_name ?? "bez nazwy"} · {c.paid_at ? new Date(c.paid_at).toLocaleDateString("pl-PL") : "—"}
                    </span>
                    <span>{Number(c.commission_amount ?? 0).toFixed(0)} zł</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </details>
    </div>
  );
}

function ConversionRow({
  conversion: c,
  adminKey,
  history,
}: {
  conversion: ConversionRecord;
  adminKey: string;
  history: HistoryRecord[];
}) {
  return (
    <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
        <strong style={{ fontSize: 15 }}>{c.client_name ?? "bez nazwy"}</strong>
        <span style={{ fontSize: 13, color: "var(--muted-2, #888)" }}>({c.client_email ?? "brak e-maila"})</span>
        <StatusPill status={c.status} />
      </div>
      <p style={{ fontSize: 13, color: "var(--muted-2, #888)", marginBottom: 12 }}>
        polecił <strong>{c.partners?.name}</strong> [{c.partners?.referral_code}]
        {" · "}
        {new Date(c.created_at).toLocaleString("pl-PL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
        {c.source_path ? ` · źródło: ${c.source_path}` : ""}
        {c.project_value ? ` · wartość: ${Number(c.project_value).toFixed(0)} zł` : ""}
        {c.commission_amount ? ` · prowizja: ${Number(c.commission_amount).toFixed(0)} zł` : ""}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {c.status !== "confirmed" && (
          <form action={quickUpdateConversionStatusAction}>
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={c.id} />
            <input type="hidden" name="status" value="confirmed" />
            <AdminSubmitButton label="Potwierdź / w realizacji" pendingLabel="..." tone="brand" />
          </form>
        )}
        {c.status !== "lost" && c.status !== "paid" && (
          <form action={quickUpdateConversionStatusAction}>
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={c.id} />
            <input type="hidden" name="status" value="lost" />
            <AdminSubmitButton label="Odrzuć" pendingLabel="..." tone="muted" />
          </form>
        )}
        {c.status === "confirmed" && (
          <form action={quickUpdateConversionStatusAction}>
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={c.id} />
            <input type="hidden" name="status" value="paid" />
            <AdminSubmitButton label="Oznacz jako wypłacone" pendingLabel="..." tone="brand" />
          </form>
        )}
      </div>

      <details>
        <summary style={{ fontSize: 12.5, color: "var(--brand, #1d4ed8)", cursor: "pointer" }}>
          Szczegóły, notatka i historia zmian
        </summary>

        <div style={{ marginTop: 14 }}>
          <form
            action={updateConversionAction}
            style={{ display: "flex", gap: 8, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 14 }}
          >
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="id" value={c.id} />
            <input
              type="number"
              name="projectValue"
              placeholder="Wartość projektu (zł)"
              defaultValue={c.project_value ?? ""}
              style={{ ...smallInputStyle, width: 160 }}
            />
            <input
              type="number"
              name="commissionAmount"
              placeholder="Prowizja (zł)"
              defaultValue={c.commission_amount ?? ""}
              style={{ ...smallInputStyle, width: 130 }}
            />
            <select name="status" defaultValue={c.status} style={smallInputStyle}>
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="paid">paid</option>
              <option value="lost">lost</option>
            </select>
            <textarea
              name="notes"
              defaultValue={c.notes ?? ""}
              placeholder="Notatka administratora"
              rows={2}
              style={{ ...smallInputStyle, width: "100%" }}
            />
            <AdminSubmitButton label="Zapisz" pendingLabel="Zapisywanie..." tone="brand" />
          </form>

          <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Historia zmian ({history.length})</p>
          {history.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--muted-2, #888)" }}>Brak zarejestrowanych zmian.</p>
          ) : (
            <div style={{ display: "grid", gap: 4 }}>
              {history.map((h) => (
                <p key={h.id} style={{ fontSize: 12, color: "var(--muted-2, #888)" }}>
                  {new Date(h.changed_at).toLocaleString("pl-PL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  {" — "}
                  {h.description}
                </p>
              ))}
            </div>
          )}
        </div>
      </details>
    </div>
  );
}

function PendingPayoutRow({
  conversion: c,
  adminKey,
  estimatedCommission,
}: {
  conversion: ConversionRecord;
  adminKey: string;
  estimatedCommission: number;
}) {
  return (
    <div style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 8, padding: "16px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        <div>
          <strong style={{ fontSize: 15 }}>{c.client_name ?? "bez nazwy"}</strong>
          <p style={{ fontSize: 12.5, color: "var(--muted-2, #888)" }}>
            partner: {c.partners?.name} · szacowana prowizja: {estimatedCommission.toFixed(0)} zł
          </p>
        </div>
      </div>
      <form action={markPayoutAction} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <input type="hidden" name="key" value={adminKey} />
        <input type="hidden" name="id" value={c.id} />
        <input
          type="number"
          name="commissionAmount"
          placeholder="Kwota (zł)"
          defaultValue={c.commission_amount ?? Math.round(estimatedCommission)}
          style={{ ...smallInputStyle, width: 120 }}
        />
        <select name="payoutMethod" defaultValue="przelew" style={smallInputStyle}>
          <option value="przelew">Przelew</option>
          <option value="paypal">PayPal</option>
          <option value="inne">Inne</option>
        </select>
        <input name="payoutReference" placeholder="Numer rozliczenia" style={{ ...smallInputStyle, width: 160 }} />
        <input name="note" placeholder="Notatka (opcjonalnie)" style={{ ...smallInputStyle, width: 180 }} />
        <AdminSubmitButton label="Oznacz jako wypłacone" pendingLabel="Zapisywanie..." tone="brand" />
      </form>
    </div>
  );
}

function PaidPayoutRow({ conversion: c }: { conversion: ConversionRecord }) {
  return (
    <div
      style={{
        border: "1px solid var(--line, #e2e2e2)",
        borderRadius: 8,
        padding: "14px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div>
        <strong style={{ fontSize: 14 }}>{c.partners?.name}</strong>
        <p style={{ fontSize: 12.5, color: "var(--muted-2, #888)" }}>
          {c.client_name ?? "bez nazwy"} · {c.paid_at ? new Date(c.paid_at).toLocaleDateString("pl-PL") : "—"}
          {c.payout_method ? ` · ${c.payout_method}` : ""}
          {c.payout_reference ? ` · nr ${c.payout_reference}` : ""}
        </p>
      </div>
      <span style={{ fontFamily: "var(--fd, sans-serif)", fontWeight: 700, color: "#2e7d32" }}>
        {Number(c.commission_amount ?? 0).toFixed(0)} zł
      </span>
    </div>
  );
}

function ClickRow({ click: c, isLast }: { click: ClickRecord; isLast: boolean }) {
  let referrerHost = "bezpośrednio / nieznane";
  if (c.referrer) {
    try {
      referrerHost = new URL(c.referrer).hostname;
    } catch {
      referrerHost = c.referrer;
    }
  }

  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: isLast ? "none" : "1px solid var(--line, #e2e2e2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        fontSize: 13,
      }}
    >
      <div>
        <strong>{c.partners?.name ?? "nieznany partner"}</strong>
        <span style={{ color: "var(--muted-2, #888)" }}> [{c.partners?.referral_code}]</span>
        <span style={{ color: "var(--muted-2, #888)" }}> · skąd: {referrerHost}</span>
      </div>
      <span style={{ color: "var(--muted-2, #888)", whiteSpace: "nowrap" }}>
        {new Date(c.created_at).toLocaleString("pl-PL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
}

async function logConversionHistory(
  supabase: ReturnType<typeof createAdminClient>,
  conversionId: string,
  changeType: string,
  description: string
) {
  await supabase.from("referral_conversion_history").insert({
    conversion_id: conversionId,
    change_type: changeType,
    description,
  });
}

async function addPartnerAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const commissionRate = formData.get("commissionRate") as string;
  if (!name || !email) return;

  const supabase = createAdminClient();

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

  await supabase.from("partners").insert({
    name,
    email,
    referral_code: referralCode,
    status: "approved",
    approved_at: new Date().toISOString(),
    commission_rate: commissionRate ? Number(commissionRate) : 15,
  });
}

async function updatePartnerStatusAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const supabase = createAdminClient();
  await supabase
    .from("partners")
    .update({ status, approved_at: status === "approved" ? new Date().toISOString() : null })
    .eq("id", id);
}

async function updatePartnerDetailsAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const website = formData.get("website") as string;
  const commissionRate = formData.get("commissionRate") as string;
  const adminNotes = formData.get("adminNotes") as string;

  const supabase = createAdminClient();
  await supabase
    .from("partners")
    .update({
      name: name || undefined,
      company: company || null,
      website: website || null,
      commission_rate: commissionRate ? Number(commissionRate) : 15,
      admin_notes: adminNotes || null,
    })
    .eq("id", id);
}

async function updateConversionAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const projectValue = formData.get("projectValue") as string;
  const commissionAmount = formData.get("commissionAmount") as string;
  const notes = formData.get("notes") as string;

  const supabase = createAdminClient();

  const { data: before } = await supabase.from("referral_conversions").select("status, notes").eq("id", id).maybeSingle();

  await supabase
    .from("referral_conversions")
    .update({
      status,
      project_value: projectValue ? Number(projectValue) : null,
      commission_amount: commissionAmount ? Number(commissionAmount) : null,
      notes: notes || null,
      paid_at: status === "paid" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (before?.status && before.status !== status) {
    await logConversionHistory(supabase, id, "status", `Status zmieniony z „${before.status}” na „${status}”`);
  }
  if (before?.notes !== notes && notes) {
    await logConversionHistory(supabase, id, "note", "Zaktualizowano notatkę administratora");
  }
}

async function quickUpdateConversionStatusAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const supabase = createAdminClient();
  const { data: before } = await supabase.from("referral_conversions").select("status").eq("id", id).maybeSingle();

  await supabase
    .from("referral_conversions")
    .update({ status, paid_at: status === "paid" ? new Date().toISOString() : null })
    .eq("id", id);

  if (before?.status && before.status !== status) {
    await logConversionHistory(supabase, id, "status", `Status zmieniony z „${before.status}” na „${status}” (szybka akcja)`);
  }
}

async function markPayoutAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const id = formData.get("id") as string;
  const commissionAmount = formData.get("commissionAmount") as string;
  const payoutMethod = formData.get("payoutMethod") as string;
  const payoutReference = formData.get("payoutReference") as string;
  const note = formData.get("note") as string;

  const supabase = createAdminClient();
  await supabase
    .from("referral_conversions")
    .update({
      status: "paid",
      commission_amount: commissionAmount ? Number(commissionAmount) : null,
      payout_method: payoutMethod || null,
      payout_reference: payoutReference || null,
      notes: note || null,
      paid_at: new Date().toISOString(),
    })
    .eq("id", id);

  await logConversionHistory(
    supabase,
    id,
    "payout",
    `Oznaczono jako wypłacone — ${commissionAmount ?? "?"} zł, ${payoutMethod ?? "brak metody"}${payoutReference ? `, nr ${payoutReference}` : ""}`
  );
}

async function updateProgramSettingsAction(formData: FormData) {
  "use server";
  const key = formData.get("key") as string;
  if (key !== process.env.ADMIN_PANEL_SECRET) return;

  const defaultCommissionRate = formData.get("defaultCommissionRate") as string;
  const minimumProjectValue = formData.get("minimumProjectValue") as string;
  const autoApprove = formData.get("autoApprove") === "on";

  const supabase = createAdminClient();
  await supabase
    .from("program_settings")
    .update({
      default_commission_rate: defaultCommissionRate ? Number(defaultCommissionRate) : 15,
      minimum_project_value: minimumProjectValue ? Number(minimumProjectValue) : 0,
      auto_approve_partners: autoApprove,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
}