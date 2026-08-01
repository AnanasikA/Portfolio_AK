"use client";

import { useState } from "react";

export default function CopyTextButton({ text, label = "Kopiuj" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // cichy fallback — bardzo stara przeglądarka bez Clipboard API
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontSize: 12.5,
        fontWeight: 600,
        padding: "7px 14px",
        background: copied ? "#2e7d32" : "var(--brand, #1d4ed8)",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.15s",
      }}
    >
      {copied ? "Skopiowano ✓" : label}
    </button>
  );
}