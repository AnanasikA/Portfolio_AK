"use client";

import { useState } from "react";
import ClicksChart from "@/components/ClicksChart";

type Dataset = { date: string; count: number }[];

export default function ActivityToggle({
  clicks,
  conversions,
  completed,
  payouts,
}: {
  clicks: Dataset;
  conversions: Dataset;
  completed: Dataset;
  payouts: Dataset;
}) {
  const [metric, setMetric] = useState<"clicks" | "conversions" | "completed" | "payouts">("clicks");

  const options: { id: typeof metric; label: string; data: Dataset }[] = [
    { id: "clicks", label: "Kliknięcia", data: clicks },
    { id: "conversions", label: "Zgłoszenia", data: conversions },
    { id: "completed", label: "Zakończone projekty", data: completed },
    { id: "payouts", label: "Wypłaty", data: payouts },
  ];

  const active = options.find((o) => o.id === metric)!;

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setMetric(o.id)}
            style={{
              fontFamily: "var(--fd, sans-serif)",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "7px 14px",
              borderRadius: 999,
              border: `1px solid ${metric === o.id ? "var(--brand, #1d4ed8)" : "var(--line, #e2e2e2)"}`,
              background: metric === o.id ? "var(--brand, #1d4ed8)" : "#fff",
              color: metric === o.id ? "#fff" : "var(--muted, #555)",
              cursor: "pointer",
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      <ClicksChart data={active.data} />
    </div>
  );
}