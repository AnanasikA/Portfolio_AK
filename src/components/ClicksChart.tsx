type DayCount = { date: string; count: number };

export default function ClicksChart({ data }: { data: DayCount[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 4,
          height: 80,
          borderBottom: "1px solid var(--line, #e2e2e2)",
          paddingBottom: 4,
        }}
      >
        {data.map((d) => (
          <div
            key={d.date}
            title={`${d.date}: ${d.count} kliknięć`}
            style={{
              flex: 1,
              height: `${Math.max((d.count / max) * 100, d.count > 0 ? 6 : 2)}%`,
              background: d.count > 0 ? "var(--brand, #1d4ed8)" : "var(--line, #e2e2e2)",
              borderRadius: "2px 2px 0 0",
              minHeight: 2,
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 11,
          color: "var(--muted-2, #888)",
        }}
      >
        <span>{formatShort(data[0]?.date)}</span>
        <span>{formatShort(data[data.length - 1]?.date)}</span>
      </div>
    </div>
  );
}

function formatShort(isoDate?: string) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  return d.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
}