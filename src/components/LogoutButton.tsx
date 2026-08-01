"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    router.push(`/${locale}/partners/login`);
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        fontFamily: "var(--fd, sans-serif)",
        fontSize: 13,
        color: "var(--muted-2, #888)",
        background: "none",
        border: "1px solid var(--line, #e2e2e2)",
        borderRadius: 8,
        padding: "8px 16px",
        cursor: loading ? "default" : "pointer",
      }}
    >
      {loading ? "Wylogowywanie..." : "Wyloguj się"}
    </button>
  );
}