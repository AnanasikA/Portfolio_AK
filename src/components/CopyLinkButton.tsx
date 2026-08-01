"use client";

import { useState } from "react";

export default function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API niedostępne (bardzo stara przeglądarka) — cichy fallback
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontSize: 13,
        padding: "8px 16px",
        background: copied ? "#2e7d32" : "var(--brand, #1d4ed8)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.15s",
      }}
    >
      {copied ? "Skopiowano ✓" : "Kopiuj link"}
    </button>
  );
}