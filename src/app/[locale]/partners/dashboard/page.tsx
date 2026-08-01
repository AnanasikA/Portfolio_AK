import { redirect } from "next/navigation";
import { createServerSupabase, createAdminClient } from "@/lib/supabase-clients";
import PartnersShell from "@/components/PartnersShell";
import LogoutButton from "@/components/LogoutButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import ClicksChart from "@/components/ClicksChart";
import ProfileSettingsForm from "@/components/ProfileSettingsForm";
import ManualConversionForm from "@/components/ManualConversionForm";
import CopyTextButton from "@/components/CopyTextButton";
import SalesKitFAQ from "@/components/SalesKitFAQ";
import Tabs from "@/components/Tabs";

/* ============================================================
   Ikony — minimalistyczne, jednoliniowe
   ============================================================ */

type IconProps = { size?: number; color?: string };
const iconBase = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconLink({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M10 14a4 4 0 0 0 5.7 0l2.5-2.5a4 4 0 0 0-5.7-5.7L11 7" />
      <path d="M14 10a4 4 0 0 0-5.7 0L5.8 12.5a4 4 0 0 0 5.7 5.7L13 17" />
    </svg>
  );
}

function IconCursorClick({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M9 4v2M4 9h2M4.5 4.5l1.4 1.4M13 5.5L5.5 13l3 .8.8 3 6.7-6.7-3-3Z" />
    </svg>
  );
}

function IconClipboard({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

function IconPercent({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M5 19L19 5" />
      <circle cx="7" cy="7" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
    </svg>
  );
}

function IconTrendingUp({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

function IconWallet({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="16" cy="13.5" r="1.4" fill={color} />
    </svg>
  );
}

function IconSettings({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
    </svg>
  );
}

function IconFolder({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Z" />
    </svg>
  );
}

function IconFileText({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M6 2h9l5 5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V3.5A1.5 1.5 0 0 1 6 2Z" />
      <path d="M14 2v5h5" />
      <path d="M8 13h8M8 16.5h8" />
    </svg>
  );
}

function IconTarget({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  );
}

function IconMessageCircle({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.9 8.9 0 0 1-3.5-.7L3 21l1.8-5.6a8.4 8.4 0 0 1-.8-3.6A8.5 8.5 0 0 1 12.5 3a8.4 8.4 0 0 1 8.5 8.5Z" />
    </svg>
  );
}

function IconSearch({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  );
}

function IconHandoff({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M3 12h13" />
      <path d="M12 6l6 6-6 6" />
    </svg>
  );
}

function IconAlertCircle({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="0.8" fill={color} />
    </svg>
  );
}

function IconStar({ size = 22, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M12 3l2.6 5.7 6.2.6-4.7 4.2 1.4 6.2-5.5-3.3-5.5 3.3 1.4-6.2-4.7-4.2 6.2-.6L12 3Z" />
    </svg>
  );
}

/* ============================================================
   Opisy statusów — jedno źródło prawdy dla całego dashboardu
   ============================================================ */

const STATUS_INFO: Record<string, { label: string; color: string; description: string }> = {
  pending: {
    label: "Oczekuje",
    color: "#b8860b",
    description: "Zgłoszenie czeka na kontakt z klientem i wycenę.",
  },
  confirmed: {
    label: "Potwierdzone",
    color: "var(--brand)",
    description: "Klient potwierdził projekt — realizacja w toku.",
  },
  paid: {
    label: "Wypłacone",
    color: "#2e7d32",
    description: "Prowizja została rozliczona i wypłacona.",
  },
  lost: {
    label: "Nieudane",
    color: "var(--muted-2)",
    description: "Projekt nie doszedł do skutku — bez prowizji.",
  },
};

function statusInfo(status: string) {
  return STATUS_INFO[status] ?? { label: status, color: "var(--muted-2)", description: "" };
}

export default async function PartnerDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect(`/${locale}/partners/login`);
  }

  const admin = createAdminClient();

  const { data: partner, error: partnerError } = await admin
    .from("partners")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (partnerError) {
    return (
      <StatusScreen
        title="Coś poszło nie tak"
        message="Nie udało się wczytać Twojego konta. Spróbuj odświeżyć stronę za chwilę."
      />
    );
  }

  if (!partner) {
    return (
      <StatusScreen
        title="Nie znaleziono zgłoszenia"
        message="Ten adres e-mail nie jest zarejestrowany w programie partnerskim. Zgłoś się na /partners/apply."
      />
    );
  }

  if (!partner.auth_user_id) {
    await admin.from("partners").update({ auth_user_id: user.id }).eq("id", partner.id);
  }

  if (partner.status === "pending") {
    return (
      <StatusScreen
        title="Zgłoszenie w toku"
        message="Twoje zgłoszenie czeka na akceptację. Dam znać mailowo, gdy tylko je zatwierdzę."
      />
    );
  }

  if (partner.status !== "approved") {
    return (
      <StatusScreen
        title="Konto nieaktywne"
        message="Twoje konto partnerskie nie jest obecnie aktywne. Napisz do mnie, jeśli sądzisz, że to pomyłka."
      />
    );
  }

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 13);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const [{ count: clickCount }, { data: conversionsRaw }, { data: recentClicks }] = await Promise.all([
    admin
      .from("referral_clicks")
      .select("*", { count: "exact", head: true })
      .eq("partner_id", partner.id),
    admin
      .from("referral_conversions")
      .select("*")
      .eq("partner_id", partner.id)
      .order("created_at", { ascending: false }),
    admin
      .from("referral_clicks")
      .select("created_at")
      .eq("partner_id", partner.id)
      .gte("created_at", fourteenDaysAgo.toISOString()),
  ]);

  // Zabezpieczenie: jeśli zapytanie o zgłoszenia zawiedzie, pokaż pusty
  // stan zamiast wywalać całą stronę — reszta dashboardu wciąż działa.
  const conversions = conversionsRaw ?? [];

  const totalEarned = conversions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + Number(c.commission_amount ?? 0), 0);

  // "Aktywne zgłoszenia" = jeszcze nierozstrzygnięte (nie wypłacone i nie nieudane)
  const activeConversions = conversions.filter((c) => c.status === "pending" || c.status === "confirmed");
  const activeCount = activeConversions.length;

  const commissionRatePercent = Number(partner.commission_rate ?? 15);
  const estimatedPendingCommission = activeConversions.reduce((sum, c) => {
    if (c.commission_amount) return sum + Number(c.commission_amount);
    if (c.project_value) return sum + Number(c.project_value) * (commissionRatePercent / 100);
    return sum;
  }, 0);

  // Konwersja liczona jako zgłoszenia / kliknięcia. Uwaga: zgłoszenia dodane
  // ręcznie (bez kliknięcia w link) mogą sprawić, że wynik przekroczy 100% —
  // to oczekiwane, nie błąd, dlatego pokazujemy dodatkową wskazówkę.
  const hasManualConversions = conversions.some((c) => c.source_path === "manual");
  const conversionRate =
    clickCount && clickCount > 0 ? ((conversions.length / clickCount) * 100).toFixed(1) : "—";

  const paidConversions = conversions
    .filter((c) => c.status === "paid")
    .sort((a, b) => new Date(b.paid_at ?? b.created_at).getTime() - new Date(a.paid_at ?? a.created_at).getTime());

  const clicksByDay: { date: string; count: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const day = new Date(fourteenDaysAgo);
    day.setDate(day.getDate() + i);
    const dayKey = day.toISOString().slice(0, 10);
    const count = (recentClicks ?? []).filter((c) => c.created_at.slice(0, 10) === dayKey).length;
    clicksByDay.push({ date: dayKey, count });
  }

  const referralLink = `https://anastasiiakupriianets.pl/r/${partner.referral_code}`;
  const shareMessage = `Cześć! Polecam AK Web & Design — tworzą świetne strony internetowe. Zerknij: ${referralLink}`;

  return (
    <PartnersShell>
      <style>{`
        .pd-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .pd-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(29,78,216,0.1); }
        .pd-input { transition: border-color 0.15s ease, box-shadow 0.15s ease; }
        .pd-input:focus { outline: none; border-color: var(--brand, #1d4ed8) !important; box-shadow: 0 0 0 4px rgba(29,78,216,0.1); }
        .pd-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(29,78,216,0.36); }
        .pd-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; }
        .pd-conv-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
        .pd-msg-text::-webkit-scrollbar { width: 5px; }
        .pd-msg-text::-webkit-scrollbar-thumb { background: var(--line, #e2e2e2); border-radius: 999px; }
        .pd-msg-text { scrollbar-width: thin; }
        @media (max-width: 560px) {
          .pd-conv-row { flex-direction: column; }
        }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,78,216,0.1), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "88px 24px 120px",
            fontFamily: "var(--fb)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <span
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--brand)",
                  display: "inline-block",
                  background: "linear-gradient(135deg, #eef2ff, #e0e9ff)",
                  padding: "6px 16px",
                  borderRadius: 999,
                  marginBottom: 16,
                }}
              >
                Panel partnera
              </span>
              <h1
                style={{
                  fontFamily: "var(--fd)",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 4vw, 38px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Cześć,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, var(--brand), #6d8bf5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {partner.name.split(" ")[0]}
                </span>
              </h1>
            </div>
            <LogoutButton />
          </div>

          <Tabs
            tabs={[
              { id: "overview", label: "Przegląd" },
              { id: "conversions", label: "Zgłoszenia", badge: activeCount },
              { id: "payouts", label: "Wypłaty" },
              { id: "materials", label: "Materiały" },
              { id: "settings", label: "Ustawienia" },
            ]}
          >
            {{
              /* ============================================================
                 PRZEGLĄD
                 ============================================================ */
              overview: (
                <>
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 20,
                      padding: 28,
                      background: "#fff",
                      boxShadow: "0 16px 40px rgba(29,78,216,0.08)",
                      marginBottom: 24,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
                          color: "var(--brand)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconLink size={17} />
                      </div>
                      <p style={{ fontSize: 13, color: "var(--muted)" }}>Twój link partnerski</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
                      <p style={{ fontFamily: "monospace", fontSize: 16, wordBreak: "break-all", flex: 1, minWidth: 200 }}>
                        {referralLink}
                      </p>
                      <CopyLinkButton link={referralLink} />
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                      <a href={`mailto:?subject=${encodeURIComponent("Polecam AK Web & Design")}&body=${encodeURIComponent(shareMessage)}`} style={shareLinkStyle}>
                        ✉ Mailem
                      </a>
                      <a href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" style={shareLinkStyle}>
                        WhatsApp
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer" style={shareLinkStyle}>
                        LinkedIn
                      </a>
                    </div>

                    <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>Aktywność — ostatnie 14 dni</p>
                    <ClicksChart data={clicksByDay} />
                  </div>

                  <div className="pd-stat-grid" style={{ marginBottom: 14 }}>
                    <StatCard icon={<IconCursorClick size={17} />} label="Kliknięcia" value={String(clickCount ?? 0)} />
                    <StatCard icon={<IconClipboard size={17} />} label="Aktywne zgłoszenia" value={String(activeCount)} />
                    <StatCard
                      icon={<IconTrendingUp size={17} />}
                      label="Zgłoszenia / kliknięcia"
                      value={conversionRate === "—" ? "—" : `${conversionRate}%`}
                      hint={hasManualConversions ? "Zawiera zgłoszenia dodane ręcznie, spoza linku." : undefined}
                    />
                  </div>
                  <div className="pd-stat-grid" style={{ marginBottom: 40 }}>
                    <StatCard icon={<IconPercent size={17} />} label="Twoja stawka prowizji" value={`${commissionRatePercent}%`} />
                    <StatCard
                      icon={<IconWallet size={17} />}
                      label="Prowizja w toku"
                      value={`${estimatedPendingCommission.toFixed(0)} zł`}
                      hint="Szacunek — ostateczna kwota może się zmienić."
                    />
                    <StatCard icon={<IconWallet size={17} />} label="Wypłacona prowizja" value={`${totalEarned.toFixed(0)} zł`} accent />
                  </div>
                </>
              ),

              /* ============================================================
                 ZGŁOSZENIA
                 ============================================================ */
              conversions: (
                <>
                  <ManualConversionForm />

                  <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 20, marginBottom: 16 }}>
                    Historia zgłoszeń
                  </h2>

                  {conversions.length === 0 ? (
                    <p style={{ color: "var(--muted)", marginBottom: 56 }}>
                      Jeszcze żadnych zgłoszeń — udostępnij swój link albo dodaj pierwsze ręcznie powyżej.
                    </p>
                  ) : (
                    <div style={{ display: "grid", gap: 10, marginBottom: 56 }}>
                      {conversions.map((c) => {
                        const info = statusInfo(c.status);
                        const commission =
                          c.commission_amount ??
                          (c.project_value ? Number(c.project_value) * (commissionRatePercent / 100) : null);
                        return (
                          <div
                            key={c.id}
                            className="pd-card"
                            style={{
                              border: "1px solid var(--line)",
                              borderRadius: 14,
                              padding: "18px 20px",
                              background: "#fff",
                            }}
                          >
                            <div className="pd-conv-row">
                              <div>
                                <p style={{ fontSize: 15, fontWeight: 600 }}>
                                  {c.client_name ?? "Zgłoszenie bez nazwy"}
                                </p>
                                {c.client_email && (
                                  <p style={{ fontSize: 12.5, color: "var(--muted-2)" }}>{c.client_email}</p>
                                )}
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <StatusBadgeEl status={c.status} />
                                <p style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 4, maxWidth: 200 }}>
                                  {info.description}
                                </p>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                gap: 20,
                                flexWrap: "wrap",
                                marginTop: 14,
                                paddingTop: 14,
                                borderTop: "1px solid var(--line)",
                                fontSize: 12.5,
                                color: "var(--muted-2)",
                              }}
                            >
                              <span>
                                <strong style={{ color: "var(--ink)" }}>Wartość projektu:</strong>{" "}
                                {c.project_value ? `${Number(c.project_value).toFixed(0)} zł` : "jeszcze nieznana"}
                              </span>
                              <span>
                                <strong style={{ color: "var(--ink)" }}>Prowizja:</strong>{" "}
                                {commission ? `${commission.toFixed(0)} zł` : "do ustalenia"}
                              </span>
                              <span>
                                <strong style={{ color: "var(--ink)" }}>Zgłoszono:</strong>{" "}
                                {new Date(c.created_at).toLocaleDateString("pl-PL")}
                              </span>
                              {c.updated_at && c.updated_at !== c.created_at && (
                                <span>
                                  <strong style={{ color: "var(--ink)" }}>Aktualizacja:</strong>{" "}
                                  {new Date(c.updated_at).toLocaleDateString("pl-PL")}
                                </span>
                              )}
                              {c.paid_at && (
                                <span>
                                  <strong style={{ color: "var(--ink)" }}>Wypłacono:</strong>{" "}
                                  {new Date(c.paid_at).toLocaleDateString("pl-PL")}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ),

              /* ============================================================
                 WYPŁATY
                 ============================================================ */
              payouts: (
                <>
                  <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 20, marginBottom: 6 }}>
                    Historia wypłat
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 24 }}>
                    Wszystkie zgłoszenia, za które prowizja została już rozliczona.
                  </p>

                  <div
                    style={{
                      border: "1px solid var(--brand)",
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 24,
                      background: "linear-gradient(135deg, #eef2ff, #e0e9ff)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>Łącznie wypłacono</span>
                    <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 26, color: "var(--brand)" }}>
                      {totalEarned.toFixed(0)} zł
                    </span>
                  </div>

                  {paidConversions.length === 0 ? (
                    <p style={{ color: "var(--muted)" }}>
                      Jeszcze żadnych wypłat — pojawią się tutaj, gdy pierwsze zgłoszenie zostanie rozliczone.
                    </p>
                  ) : (
                    <div style={{ display: "grid", gap: 10 }}>
                      {paidConversions.map((c) => (
                        <div
                          key={c.id}
                          className="pd-card"
                          style={{
                            border: "1px solid var(--line)",
                            borderRadius: 14,
                            padding: "16px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 16,
                            flexWrap: "wrap",
                            background: "#fff",
                          }}
                        >
                          <div>
                            <p style={{ fontSize: 15, fontWeight: 600 }}>{c.client_name ?? "Zgłoszenie bez nazwy"}</p>
                            <p style={{ fontSize: 12.5, color: "var(--muted-2)" }}>
                              Wypłacono{" "}
                              {c.paid_at
                                ? new Date(c.paid_at).toLocaleDateString("pl-PL")
                                : new Date(c.created_at).toLocaleDateString("pl-PL")}
                            </p>
                          </div>
                          <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18, color: "#2e7d32" }}>
                            {Number(c.commission_amount ?? 0).toFixed(0)} zł
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ),

              /* ============================================================
                 MATERIAŁY
                 ============================================================ */
              materials: (
                <>
                  <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 20, marginBottom: 6 }}>
                    Materiały dla partnerów
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 24 }}>
                    Gotowe materiały, którymi możesz posłużyć się w rozmowie z klientem.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40 }}>
                    <MaterialCard
                      icon={<IconFolder size={22} />}
                      title="Portfolio"
                      body="Zrealizowane projekty, którymi możesz pochwalić się przed klientem."
                      href="https://anastasiiakupriianets.pl/projects"
                    />
                    <MaterialCard
                      icon={<IconFileText size={22} />}
                      title="Oferta PDF"
                      body="Gotowa oferta do przesłania klientowi z Twoim poleceniem."
                      href="/materials/oferta-ak-web-design.pdf"
                    />
                    <MaterialCard
                      icon={<IconTarget size={22} />}
                      title="Sales Kit"
                      body="Gotowe wiadomości, FAQ i wskazówki — zobacz poniżej."
                      href="#sales-kit"
                    />
                  </div>

                  {/* SALES KIT */}
                  <div id="sales-kit" style={{ scrollMarginTop: 100 }}>
                    <h3 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 22, marginBottom: 6 }}>
                      Sales Kit partnera
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 32, maxWidth: 580 }}>
                      Nie musisz być specjalistą od stron internetowych ani prowadzić rozmów
                      handlowych. Wystarczy, że polecisz osobę lub firmę zainteresowaną nową
                      stroną internetową. Cały proces — od pierwszego kontaktu, przez
                      przygotowanie oferty, aż po realizację projektu — przejmujemy po naszej
                      stronie.
                    </p>

                    {/* 1. GOTOWE WIADOMOŚCI */}
                    <SalesKitBlock icon={<IconMessageCircle size={19} />} title="Gotowe wiadomości">
                      <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 18 }}>
                        Skorzystaj z gotowych wiadomości, które możesz wysłać klientowi przez SMS,
                        Messenger, e-mail lub LinkedIn. Wystarczy je skopiować i dopasować do
                        sytuacji.
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
                        <MessageCard
                          label="SMS"
                          text="Cześć! Wiesz, że dobra strona internetowa realnie zwiększa liczbę klientów? Znam kogoś, kto robi świetne strony — AK Web & Design. Dać Ci kontakt?"
                        />
                        <MessageCard
                          label="Messenger"
                          text="Hej! Miałam/-em taką myśl — Twoja firma mogłaby skorzystać na nowej stronie albo odświeżeniu obecnej. Znam AK Web & Design — robią naprawdę dobre, nowoczesne strony i podchodzą indywidualnie do każdego projektu. Chcesz, żebym Was skontaktował/-a? Konsultacja jest darmowa, nic nie tracisz."
                        />
                        <MessageCard
                          label="E-mail"
                          text={`Temat: Polecenie — profesjonalna strona internetowa\n\nDzień dobry,\n\nPiszę, bo pomyślałem/-am, że mogę być pomocny/-a. Współpracuję z AK Web & Design — studiem, które projektuje nowoczesne strony internetowe dla małych firm i marek osobistych.\n\nPomyślałem/-am, że warto się skontaktować — konsultacja i wycena są bezpłatne, bez zobowiązań.\n\nJeśli jesteś zainteresowany/-a, chętnie przekażę kontakt albo połączę Was mailowo.\n\nPozdrawiam,\n[Twoje imię]`}
                        />
                        <MessageCard
                          label="LinkedIn"
                          text="Cześć! Od jakiegoś czasu współpracuję z AK Web & Design — studiem, które projektuje nowoczesne strony internetowe dla firm. Pomyślałem/-am, że to może być dla Ciebie interesujące, zwłaszcza jeśli myślicie o nowej stronie albo odświeżeniu obecnej. Chętnie przekażę kontakt — konsultacja jest bezpłatna."
                        />
                      </div>
                    </SalesKitBlock>

                    {/* 2. FAQ */}
                    <SalesKitBlock icon={<IconMessageCircle size={19} />} title="Najczęstsze pytania klientów">
                      <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 18 }}>
                        Odpowiedzi na pytania, które najczęściej pojawiają się podczas pierwszej
                        rozmowy z klientem. Dzięki nim łatwiej rozwiejesz wątpliwości i zachęcisz
                        do kontaktu.
                      </p>
                      <SalesKitFAQ
                        items={[
                          {
                            q: "Ile kosztuje strona?",
                            a: "Cena zależy od zakresu projektu — prostsze strony zaczynają się od niższych kwot, bardziej rozbudowane wyceniane są indywidualnie. Zawsze przygotowujemy bezpłatną, niezobowiązującą wycenę dopasowaną do potrzeb klienta.",
                          },
                          {
                            q: "Ile trwa realizacja?",
                            a: "Standardowy projekt trwa zwykle 7–14 dni od ustalenia zakresu, choć czas może się różnić w zależności od złożoności strony.",
                          },
                          {
                            q: "Czy pomagacie z hostingiem i domeną?",
                            a: "Tak — doradzamy i pomagamy skonfigurować hosting oraz domenę, jeśli klient tego potrzebuje.",
                          },
                          {
                            q: "Czy mogę sam edytować stronę?",
                            a: "Tak, strony budujemy tak, żeby klient mógł samodzielnie zarządzać treścią — a dodatkowo oferujemy wsparcie i opiekę po wdrożeniu.",
                          },
                          {
                            q: "Jak wygląda współpraca?",
                            a: "Współpracę zaczynamy od bezpłatnej konsultacji i wyceny, potem ustalamy zakres projektu, a na każdym etapie realizacji klient ma wgląd i możliwość konsultacji zmian.",
                          },
                        ]}
                      />
                    </SalesKitBlock>

                    {/* 3. JAK ROZPOZNAĆ POTENCJALNEGO KLIENTA */}
                    <SalesKitBlock icon={<IconSearch size={19} />} title="Jak rozpoznać potencjalnego klienta">
                      <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 18 }}>
                        Nie każdy przedsiębiorca sam zgłasza potrzebę stworzenia strony
                        internetowej. Poniższe sygnały mogą wskazywać, że warto zaproponować
                        kontakt z AK Web & Design.
                      </p>
                      <BulletList
                        items={[
                          "Firma w ogóle nie ma strony internetowej.",
                          "Strona wygląda na przestarzałą — stary design albo brak wersji mobilnej.",
                          "Firma działa głównie przez social media, bez własnej strony.",
                          "Właściciel wspomina o planach rozwoju, nowej ofercie albo rebrandingu.",
                          "Firma niedawno powstała i dopiero buduje obecność online.",
                          "Klient narzeka na małą liczbę zapytań z internetu.",
                          "Konkurencja ma zauważalnie lepszą stronę.",
                        ]}
                      />
                    </SalesKitBlock>

                    {/* 4. JAK PRZEKAZAĆ KLIENTA */}
                    <SalesKitBlock icon={<IconHandoff size={19} />} title="Jak przekazać klienta">
                      <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6, marginBottom: 18 }}>
                        Rolą partnera jest polecenie zainteresowanego klienta. Nie musisz
                        przygotowywać oferty, negocjować warunków ani odpowiadać na pytania
                        techniczne. Po przekazaniu kontaktu przejmujemy dalszą komunikację oraz
                        przygotowanie indywidualnej wyceny.
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                        <div>
                          <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 13.5, marginBottom: 8 }}>
                            Co warto zebrać
                          </p>
                          <BulletList
                            items={[
                              "Imię i nazwisko / nazwa firmy",
                              "Kontakt — telefon albo e-mail",
                              "Czym zajmuje się firma",
                              "Czy ma już stronę (opcjonalnie)",
                            ]}
                          />
                        </div>
                        <div>
                          <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 13.5, marginBottom: 8 }}>
                            Jak zgłosić
                          </p>
                          <BulletList
                            items={[
                              "Przekaż kontakt bezpośrednio, podając namiary klientowi",
                              "Albo dodaj zgłoszenie w zakładce „Zgłoszenia” — odezwiemy się do klienta",
                              "Wystarczy zainteresowanie, resztą zajmujemy się my",
                            ]}
                          />
                        </div>
                      </div>
                    </SalesKitBlock>

                    {/* 5. CZEGO NIE OBIECYWAĆ */}
                    <SalesKitBlock icon={<IconAlertCircle size={19} />} title="Czego nie obiecywać klientowi" tone="warning">
                      <p style={{ fontSize: 13, color: "var(--muted-2)", marginBottom: 18 }}>
                        Aby uniknąć nieporozumień, nie składaj deklaracji dotyczących ceny,
                        terminu ani zakresu projektu. Każda realizacja jest wyceniana i planowana
                        indywidualnie.
                      </p>
                      <BulletList
                        tone="warning"
                        items={[
                          "Nie podawaj konkretnej, ostatecznej ceny — każdy projekt wyceniamy indywidualnie.",
                          "Nie deklaruj konkretnych terminów realizacji — zależą od zakresu i obłożenia.",
                          "Nie obiecuj konkretnego zakresu funkcji (np. sklepu, integracji) bez konsultacji z nami.",
                          "Nie gwarantuj efektów biznesowych (np. „X nowych klientów miesięcznie”).",
                          "Nie podpisuj żadnych umów w naszym imieniu.",
                        ]}
                      />
                    </SalesKitBlock>

                    {/* 6. DLACZEGO WARTO POLECAĆ */}
                    <SalesKitBlock icon={<IconStar size={19} />} title="Dlaczego warto polecać AK Web & Design" isLast>
                      <BulletList
                        tone="positive"
                        items={[
                          "Indywidualne projekty dopasowane do potrzeb klienta.",
                          "Nowoczesne, szybkie i responsywne strony internetowe.",
                          "Przejrzysty proces współpracy i indywidualna wycena.",
                          "Stały kontakt oraz wsparcie na każdym etapie realizacji.",
                          "Portfolio zrealizowanych projektów z różnych branż.",
                          "Opieka po wdrożeniu i możliwość dalszego rozwoju strony.",
                        ]}
                      />
                    </SalesKitBlock>

                    <div
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: 20,
                        padding: "24px 28px",
                        background: "var(--surface, #f7f9fd)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 16,
                      }}
                    >
                      <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 420 }}>
                        Masz klienta z niestandardowymi wymaganiami lub potrzebujesz pomocy przed
                        pierwszym kontaktem? Skontaktuj się z nami — chętnie doradzimy i pomożemy
                        przygotować najlepsze rozwiązanie.
                      </p>
                      <a
                        href="mailto:kontakt@anastasiiakupriianets.pl?subject=Pomoc%20sprzeda%C5%BCowa%20-%20program%20partnerski"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "var(--fd)",
                          fontWeight: 600,
                          fontSize: 14,
                          padding: "12px 22px",
                          background: "var(--brand)",
                          color: "#fff",
                          borderRadius: 999,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Skontaktuj się z nami
                      </a>
                    </div>
                  </div>
                </>
              ),

              /* ============================================================
                 USTAWIENIA
                 ============================================================ */
              settings: (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
                        color: "var(--brand)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconSettings size={17} />
                    </div>
                    <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 20 }}>
                      Ustawienia profilu
                    </h2>
                  </div>

                  <ProfileSettingsForm partner={partner} />
                </>
              ),
            }}
          </Tabs>
        </div>
      </div>
    </PartnersShell>
  );
}

const shareLinkStyle: React.CSSProperties = {
  fontFamily: "var(--fd, sans-serif)",
  fontSize: 13,
  color: "var(--ink, #111)",
  border: "1px solid var(--line, #e2e2e2)",
  borderRadius: 999,
  padding: "8px 16px",
  textDecoration: "none",
};

function StatCard({
  icon,
  label,
  value,
  hint,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="pd-card"
      style={{
        border: accent ? "1px solid var(--brand)" : "1px solid var(--line)",
        borderRadius: 16,
        padding: 18,
        background: "#fff",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
          color: "var(--brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        {icon}
      </div>
      <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 22 }}>{value}</p>
      <p style={{ fontSize: 12.5, color: "var(--muted-2)" }}>{label}</p>
      {hint && <p style={{ fontSize: 10.5, color: "var(--muted-2)", marginTop: 4, lineHeight: 1.4 }}>{hint}</p>}
    </div>
  );
}

function StatusBadgeEl({ status }: { status: string }) {
  const info = statusInfo(status);
  return (
    <span
      style={{
        fontSize: 12,
        fontFamily: "var(--fd)",
        color: info.color,
        border: `1px solid ${info.color}`,
        borderRadius: 999,
        padding: "4px 12px",
        whiteSpace: "nowrap",
      }}
    >
      {info.label}
    </span>
  );
}

function SalesKitBlock({
  icon,
  title,
  children,
  tone = "default",
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "warning";
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        border: `1px solid ${tone === "warning" ? "#f0c36d" : "var(--line)"}`,
        borderRadius: 20,
        padding: "26px 28px",
        background: "#fff",
        marginBottom: isLast ? 24 : 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background:
              tone === "warning" ? "linear-gradient(135deg, #fff6e0, #fde9c2)" : "linear-gradient(135deg, #eef2ff, #dce6ff)",
            color: tone === "warning" ? "#b8860b" : "var(--brand)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 16 }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function BulletList({
  items,
  tone = "default",
}: {
  items: string[];
  tone?: "default" | "warning" | "positive";
}) {
  const markColor = tone === "warning" ? "#b8860b" : tone === "positive" ? "#2e7d32" : "var(--brand)";
  const mark = tone === "warning" ? "!" : tone === "positive" ? "✓" : "—";
  return (
    <ul style={{ display: "grid", gap: 9, paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            gap: 10,
            fontSize: 13.5,
            color: "var(--muted)",
            lineHeight: 1.55,
          }}
        >
          <span style={{ color: markColor, flexShrink: 0, fontWeight: 700, width: 14 }}>{mark}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MessageCard({ label, text }: { label: string; text: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: "16px 18px",
        background: "var(--surface, #f7f9fd)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 13 }}>{label}</span>
        <CopyTextButton text={text} />
      </div>
      <p
        className="pd-msg-text"
        style={{
          fontSize: 12.5,
          color: "var(--muted)",
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          margin: 0,
          maxHeight: 132,
          overflowY: "auto",
          paddingRight: 4,
        }}
      >
        {text}
      </p>
    </div>
  );
}

function MaterialCard({
  icon,
  title,
  body,
  href,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
  note?: string;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="pd-card"
      style={{
        border: "1px solid var(--line)",
        borderRadius: 18,
        padding: "24px 20px",
        background: "#fff",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
          color: "var(--brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        {icon}
      </div>
      <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, marginBottom: note ? 10 : 0 }}>{body}</p>
      {note && <p style={{ fontSize: 11, color: "var(--muted-2)", fontStyle: "italic" }}>{note}</p>}
    </a>
  );
}

function StatusScreen({ title, message }: { title: string; message: string }) {
  return (
    <PartnersShell>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "120px 24px", textAlign: "center", fontFamily: "var(--fb)" }}>
        <h1 style={{ fontFamily: "var(--fd)", fontSize: 24, marginBottom: 12 }}>{title}</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{message}</p>
      </div>
    </PartnersShell>
  );
}