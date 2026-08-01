export function toCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (val: unknown) => {
    const s = val === null || val === undefined ? "" : String(val);
    if (s.includes(";") || s.includes('"') || s.includes("\n")) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const lines = [
    headers.join(";"),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(";")),
  ];
  // BOM, żeby Excel poprawnie rozpoznał polskie znaki (UTF-8)
  return "\uFEFF" + lines.join("\n");
}

export function csvResponse(filename: string, csv: string) {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

export function checkAdminKey(req: Request): boolean {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  return !!key && key === process.env.ADMIN_PANEL_SECRET;
}