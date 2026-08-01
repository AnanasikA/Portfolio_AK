"use client";

import { useMemo, useState } from "react";

export type ConversionMeta = {
  id: string;
  status: string;
  partnerName: string;
  clientName: string;
  clientEmail: string;
  createdAt: string;
  needsPayout: boolean;
};

const inputStyle: React.CSSProperties = {
  padding: "8px 10px",
  border: "1px solid var(--line, #e2e2e2)",
  borderRadius: 8,
  fontSize: 13,
  fontFamily: "var(--fb, sans-serif)",
};

export default function ConversionsFilterPanel({
  items,
  partnerNames,
}: {
  items: { meta: ConversionMeta; node: React.ReactNode }[];
  partnerNames: string[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [partner, setPartner] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [onlyPayout, setOnlyPayout] = useState(false);

  const filtered = useMemo(() => {
    return items.filter(({ meta }) => {
      if (status !== "all" && meta.status !== status) return false;
      if (partner !== "all" && meta.partnerName !== partner) return false;
      if (onlyPayout && !meta.needsPayout) return false;
      if (dateFrom && meta.createdAt.slice(0, 10) < dateFrom) return false;
      if (dateTo && meta.createdAt.slice(0, 10) > dateTo) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${meta.clientName} ${meta.clientEmail} ${meta.partnerName}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, search, status, partner, dateFrom, dateTo, onlyPayout]);

  const hasActiveFilters = search || status !== "all" || partner !== "all" || dateFrom || dateTo || onlyPayout;

  return (
    <div>
      <div
        style={{
          border: "1px solid var(--line, #e2e2e2)",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Szukaj — klient, e-mail, partner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: 200 }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
          <option value="all">Wszystkie statusy</option>
          <option value="pending">Oczekuje</option>
          <option value="confirmed">Potwierdzone</option>
          <option value="paid">Wypłacone</option>
          <option value="lost">Nieudane</option>
        </select>
        <select value={partner} onChange={(e) => setPartner(e.target.value)} style={inputStyle}>
          <option value="all">Wszyscy partnerzy</option>
          {partnerNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          od
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          do
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, whiteSpace: "nowrap" }}>
          <input type="checkbox" checked={onlyPayout} onChange={(e) => setOnlyPayout(e.target.checked)} />
          tylko do wypłaty
        </label>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSearch("");
              setStatus("all");
              setPartner("all");
              setDateFrom("");
              setDateTo("");
              setOnlyPayout(false);
            }}
            style={{
              fontSize: 12,
              color: "var(--brand, #1d4ed8)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      <p style={{ fontSize: 12.5, color: "var(--muted-2, #888)", marginBottom: 12 }}>
        {filtered.length} z {items.length} zgłoszeń
      </p>

      {filtered.length === 0 ? (
        <p
          style={{
            fontSize: 14,
            color: "var(--muted-2, #888)",
            border: "1px dashed var(--line, #e2e2e2)",
            borderRadius: 8,
            padding: "20px 16px",
          }}
        >
          Brak zgłoszeń spełniających te kryteria.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map(({ meta, node }) => (
            <div key={meta.id}>{node}</div>
          ))}
        </div>
      )}
    </div>
  );
}