"use client";

import { useState } from "react";

type Tab = { id: string; label: string; badge?: number };

export default function Tabs({
  tabs,
  children,
}: {
  tabs: Tab[];
  children: Record<string, React.ReactNode>;
}) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 4,
          borderBottom: "1px solid var(--line, #e2e2e2)",
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                fontFamily: "var(--fd, sans-serif)",
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 18px",
                background: "none",
                border: "none",
                borderBottom: isActive ? "2px solid var(--brand, #1d4ed8)" : "2px solid transparent",
                color: isActive ? "var(--brand, #1d4ed8)" : "var(--muted, #555)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: -1,
              }}
            >
              {tab.label}
              {typeof tab.badge === "number" && tab.badge > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    background: isActive ? "var(--brand, #1d4ed8)" : "var(--line, #e2e2e2)",
                    color: isActive ? "#fff" : "var(--muted, #555)",
                    borderRadius: 999,
                    padding: "2px 7px",
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div>{children[active]}</div>
    </div>
  );
}