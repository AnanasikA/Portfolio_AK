"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import PartnersShell from "@/components/PartnersShell";

/* ============================================================
   Ikony — minimalistyczne, jednoliniowe
   ============================================================ */

type IconProps = { size?: number; color?: string };
const iconBase = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconUser({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  );
}

function IconMail({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

function IconBriefcase({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M2.5 12.5h19" />
    </svg>
  );
}

function IconGlobe({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9s1.3-6.5 3.8-9Z" />
    </svg>
  );
}

function IconMessage({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} {...iconBase}>
      <path d="M4 4h16v12H8l-4 4V4Z" />
    </svg>
  );
}

function IconCheck({ size = 18, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={2} {...iconBase}>
      <path d="M4 12.5l5.5 5.5L20 7" />
    </svg>
  );
}

/* ============================================================
   Globalne style — focus, hover
   ============================================================ */

function GlobalStyle() {
  return (
    <style>{`
      .pa-input {
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .pa-input:focus {
        outline: none;
        border-color: var(--brand, #1d4ed8) !important;
        box-shadow: 0 0 0 4px rgba(29,78,216,0.1);
      }
      .pa-btn {
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .pa-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(29,78,216,0.36);
      }
    `}</style>
  );
}

/* ============================================================
   Formularz
   ============================================================ */

const STEPS = [
  {
    n: "1",
    title: "Wypełniasz formularz",
    body: "Przekazujesz podstawowe informacje potrzebne do dołączenia do programu.",
  },
  {
    n: "2",
    title: "Weryfikujemy zgłoszenie",
    body: "Kontaktujemy się z Tobą i potwierdzamy udział w programie partnerskim.",
  },
  {
    n: "3",
    title: "Otrzymujesz dostęp",
    body: "Aktywujemy konto, panel partnera oraz materiały, które pomogą Ci rozmawiać z klientami i przedstawiać ofertę.",
  },
];

function PartnerApplyForm() {
  const searchParams = useSearchParams();
  const prefillName = searchParams.get("name") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      audienceNote: (form.elements.namedItem("audienceNote") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Coś poszło nie tak.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Coś poszło nie tak.");
    }
  }

  return (
    <PartnersShell>
      <GlobalStyle />
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,78,216,0.12), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            padding: "112px 24px 120px",
            fontFamily: "var(--fb)",
            color: "var(--ink)",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <SuccessState key="success" />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="pa-hero-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    gap: 40,
                    alignItems: "center",
                    marginBottom: 56,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--brand)",
                        display: "inline-block",
                        background: "linear-gradient(135deg, #eef2ff, #e0e9ff)",
                        padding: "6px 16px",
                        borderRadius: 999,
                        marginBottom: 20,
                      }}
                    >
                      Program partnerski
                    </span>
                    <h1
                      style={{
                        fontFamily: "var(--fd)",
                        fontWeight: 600,
                        fontSize: "clamp(30px, 4.5vw, 44px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        marginBottom: 16,
                      }}
                    >
                      Dołącz do programu partnerskiego{" "}
                      <span
                        style={{
                          background: "linear-gradient(135deg, var(--brand), #6d8bf5)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        AK Web &amp; Design
                      </span>
                    </h1>
                    <p
                      style={{
                        fontSize: 18,
                        lineHeight: 1.65,
                        color: "var(--muted, #555)",
                      }}
                    >
                      Dołączenie do programu zajmuje tylko kilka minut. Po akceptacji zgłoszenia
                      otrzymasz dostęp do panelu partnera, materiały sprzedażowe oraz wsparcie,
                      które pomoże Ci pewnie rozmawiać z klientami i przedstawiać ofertę.
                    </p>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      height: 280,
                      borderRadius: 24,
                      overflow: "hidden",
                      boxShadow: "0 24px 50px rgba(29,78,216,0.14)",
                    }}
                  >
                    <Image
                      src="/partner-hero3.jpg"
                      alt="Program partnerski AK Web & Design"
                      fill
                      sizes="(max-width: 900px) 100vw, 380px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>

                <div
                  className="pa-grid"
                  style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, alignItems: "start" }}
                >
                  {/* FORMULARZ */}
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 24,
                      padding: "40px 36px",
                      background: "#fff",
                      boxShadow: "0 20px 50px rgba(29,78,216,0.08)",
                    }}
                  >
                    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
                      <Field
                        icon={<IconUser size={16} />}
                        label="Imię i nazwisko / nazwa firmy"
                        name="name"
                        required
                        defaultValue={prefillName}
                      />
                      <Field icon={<IconMail size={16} />} label="E-mail" name="email" type="email" required />
                      <Field icon={<IconBriefcase size={16} />} label="Firma (opcjonalnie)" name="company" />
                      <Field icon={<IconGlobe size={16} />} label="Strona / profil (opcjonalnie)" name="website" />

                      <div>
                        <label style={labelStyle}>
                          <IconMessage size={16} />
                          Jak będziesz docierać do klientów?
                        </label>
                        <textarea
                          name="audienceNote"
                          rows={4}
                          placeholder="Np. prowadzę społeczność właścicieli małych firm na LinkedIn..."
                          className="pa-input"
                          style={inputStyle}
                        />
                      </div>

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                              color: "#b3261e",
                              fontSize: 14,
                              background: "#fdecea",
                              padding: "10px 14px",
                              borderRadius: 8,
                            }}
                          >
                            {errorMsg}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="pa-btn"
                        style={{
                          fontFamily: "var(--fd)",
                          fontWeight: 600,
                          fontSize: 15,
                          padding: "15px 30px",
                          background: "var(--brand)",
                          color: "#fff",
                          border: "none",
                          borderRadius: 999,
                          cursor: status === "loading" ? "default" : "pointer",
                          opacity: status === "loading" ? 0.7 : 1,
                          width: "fit-content",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          boxShadow: "0 8px 24px rgba(29,78,216,0.28)",
                        }}
                      >
                        {status === "loading" ? "Wysyłanie..." : "Wyślij zgłoszenie"}
                        {status !== "loading" && <span aria-hidden>→</span>}
                      </button>
                    </form>
                  </div>

                  {/* CO DALEJ */}
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 24,
                      padding: "32px 28px",
                      background: "var(--surface, #f7f9fd)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--fd)",
                        fontWeight: 600,
                        fontSize: 13,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--muted-2, #888)",
                        marginBottom: 24,
                      }}
                    >
                      Co dalej?
                    </p>
                    <div style={{ display: "grid", gap: 0 }}>
                      {STEPS.map((s, i) => (
                        <div key={s.n}>
                          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                            <div
                              style={{
                                width: 34,
                                height: 34,
                                flexShrink: 0,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, var(--brand), #6d8bf5)",
                                color: "#fff",
                                fontFamily: "var(--fd)",
                                fontWeight: 700,
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {s.n}
                            </div>
                            <div style={{ paddingBottom: i === STEPS.length - 1 ? 0 : 24 }}>
                              <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 14.5, marginBottom: 3 }}>
                                {s.title}
                              </p>
                              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{s.body}</p>
                            </div>
                          </div>
                          {i < STEPS.length - 1 && (
                            <div style={{ marginLeft: 16, width: 2, height: 14, background: "var(--line)" }} />
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: "1px solid var(--line)", marginTop: 24, paddingTop: 20 }}>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                        Masz już konto?{" "}
                        <Link
                          href="/partners/login"
                          style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "underline" }}
                        >
                          Zaloguj się
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

                <style>{`
                  @media (max-width: 800px) {
                    .pa-grid { grid-template-columns: 1fr !important; }
                    .pa-hero-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PartnersShell>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        maxWidth: 560,
        margin: "60px auto",
        textAlign: "center",
        border: "1px solid var(--line)",
        borderRadius: 28,
        padding: "56px 40px",
        background: "#fff",
        boxShadow: "0 24px 60px rgba(29,78,216,0.1)",
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--brand), #6d8bf5)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: "0 12px 28px rgba(29,78,216,0.32)",
        }}
      >
        <IconCheck size={32} />
      </motion.div>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 26, marginBottom: 12 }}>
        Zgłoszenie wysłane
      </h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: 32 }}>
        Dziękuję! Sprawdzę Twoje zgłoszenie i odezwę się mailowo w ciągu
        kilku dni z decyzją oraz dostępem do panelu partnera.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--fd)",
          fontWeight: 600,
          fontSize: 14,
          padding: "12px 26px",
          background: "var(--surface, #f7f9fd)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          borderRadius: 999,
          textDecoration: "none",
        }}
      >
        Wróć na stronę główną
      </Link>
    </motion.div>
  );
}

export default function PartnerApplyPage() {
  return (
    <Suspense fallback={null}>
      <PartnerApplyForm />
    </Suspense>
  );
}

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  fontWeight: 500,
  color: "var(--muted)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--line)",
  borderRadius: 10,
  fontFamily: "var(--fb)",
  fontSize: 15,
  background: "#fff",
};

function Field({
  icon,
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>
        {icon}
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="pa-input"
        style={inputStyle}
      />
    </div>
  );
}