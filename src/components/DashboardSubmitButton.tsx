"use client";

import { useFormStatus } from "react-dom";

export default function DashboardSubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="pd-btn"
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontWeight: 600,
        fontSize: 14,
        padding: "12px 24px",
        background: "var(--brand, #1d4ed8)",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        cursor: pending ? "default" : "pointer",
        opacity: pending ? 0.7 : 1,
        boxShadow: "0 8px 24px rgba(29,78,216,0.28)",
        width: "fit-content",
      }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}