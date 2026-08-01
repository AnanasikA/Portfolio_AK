"use client";

import { useFormStatus } from "react-dom";

export function AdminSubmitButton({
  label,
  pendingLabel,
  tone = "brand",
}: {
  label: string;
  pendingLabel: string;
  tone?: "brand" | "muted" | "danger";
}) {
  const { pending } = useFormStatus();

  const bg =
    tone === "danger"
      ? "#b3261e"
      : tone === "muted"
      ? "var(--muted-2, #888)"
      : "var(--brand, #1d4ed8)";

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontSize: 13,
        padding: "8px 16px",
        background: bg,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: pending ? "default" : "pointer",
        opacity: pending ? 0.6 : 1,
        minWidth: 92,
      }}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}