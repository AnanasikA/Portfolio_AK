"use client";

import { useActionState, useRef, useEffect } from "react";
import { submitManualConversionAction } from "@/app/[locale]/partners/dashboard/actions";
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

export default function ManualConversionForm() {
  const [state, formAction] = useActionState(submitManualConversionAction, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  // Wyczyść formularz po udanym zgłoszeniu
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      style={{
        border: "1px solid var(--line)",
        borderRadius: 20,
        padding: 24,
        background: "#fff",
        display: "grid",
        gap: 14,
        marginBottom: 32,
      }}
    >
      <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 15 }}>
        Zgłoś klienta ręcznie
      </p>
      <p style={{ fontSize: 13, color: "var(--muted-2)", marginTop: -8 }}>
        Jeśli poleciłaś/eś kogoś telefonicznie albo w inny sposób, bez klikania w Twój link — dodaj to zgłoszenie tutaj.
      </p>

      <div className="pd-manual-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Klient — imię/nazwa firmy</label>
          <input name="clientName" required className="pd-input" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>E-mail klienta (opcjonalnie)</label>
          <input name="clientEmail" type="email" className="pd-input" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Notatka (opcjonalnie)</label>
        <textarea name="note" rows={2} className="pd-input" style={inputStyle} />
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

      <DashboardSubmitButton label="Dodaj zgłoszenie" pendingLabel="Dodawanie..." />

      <style>{`
        @media (max-width: 480px) {
          .pd-manual-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}