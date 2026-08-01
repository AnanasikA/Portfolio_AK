"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/app/[locale]/partners/dashboard/actions";
import { initialActionState } from "@/app/[locale]/partners/dashboard/action-types";
import DashboardSubmitButton from "@/components/DashboardSubmitButton";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--muted)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--line)",
  borderRadius: 10,
  fontFamily: "var(--fb)",
  fontSize: 15,
  background: "#fff",
};

export default function ProfileSettingsForm({
  partner,
}: {
  partner: {
    id: string;
    company?: string | null;
    website?: string | null;
    audience_note?: string | null;
    payout_details?: string | null;
  };
}) {
  const [state, formAction] = useActionState(updateProfileAction, initialActionState);

  return (
    <form
      action={formAction}
      style={{
        border: "1px solid var(--line)",
        borderRadius: 20,
        padding: 28,
        background: "var(--surface, #f7f9fd)",
        display: "grid",
        gap: 18,
      }}
    >
      <input type="hidden" name="partnerId" value={partner.id} />

      <div>
        <label style={labelStyle}>Firma (opcjonalnie)</label>
        <input name="company" defaultValue={partner.company ?? ""} className="pd-input" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Strona / profil (opcjonalnie)</label>
        <input name="website" defaultValue={partner.website ?? ""} className="pd-input" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Skąd polecasz klientów?</label>
        <textarea
          name="audienceNote"
          rows={3}
          defaultValue={partner.audience_note ?? ""}
          className="pd-input"
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Dane do wypłaty prowizji</label>
        <textarea
          name="payoutDetails"
          rows={2}
          placeholder="Np. numer konta bankowego albo e-mail PayPal"
          defaultValue={partner.payout_details ?? ""}
          className="pd-input"
          style={inputStyle}
        />
        <p style={{ fontSize: 12, color: "var(--muted-2)", marginTop: 6 }}>
          Widoczne tylko dla Ciebie i dla Anastasii — potrzebne, żeby wiedziała, gdzie przelać prowizję.
        </p>
      </div>

      {state.status !== "idle" && (
        <p
          style={{
            fontSize: 14,
            padding: "10px 14px",
            borderRadius: 8,
            color: state.status === "success" ? "#1a7f37" : "#b3261e",
            background: state.status === "success" ? "#eaf7ee" : "#fdecea",
          }}
        >
          {state.message}
        </p>
      )}

      <DashboardSubmitButton label="Zapisz zmiany" pendingLabel="Zapisywanie..." />
    </form>
  );
}