"use client";

import { useState } from "react";

type QA = { q: string; a: string };

export default function SalesKitFAQ({ items }: { items: QA[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            style={{
              border: `1px solid ${isOpen ? "var(--brand)" : "var(--line)"}`,
              borderRadius: 14,
              padding: "4px 18px",
              transition: "border-color 0.2s",
              background: "#fff",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                padding: "14px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
                color: "inherit",
              }}
            >
              <span style={{ fontSize: 14.5, fontFamily: "var(--fd)", fontWeight: 600 }}>{item.q}</span>
              <span
                style={{
                  fontSize: 16,
                  color: "#fff",
                  background: "var(--brand)",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6, paddingBottom: 16 }}>
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}