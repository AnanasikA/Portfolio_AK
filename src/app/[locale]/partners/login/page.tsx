"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import PartnersShell from "@/components/PartnersShell";

function IconMail({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

type Step = "email" | "code";

export default function PartnerLoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const codeInputRef = useRef<HTMLInputElement>(null);

  async function requestCode() {
    setStatus("loading");
    setErrorMsg("");
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setStatus("error");
      setErrorMsg("Nie udało się wysłać kodu. Spróbuj ponownie.");
      return;
    }
    setStatus("idle");
    setStep("code");
    setTimeout(() => codeInputRef.current?.focus(), 100);
  }

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    await requestCode();
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const supabase = createBrowserSupabase();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });
    if (error) {
      setStatus("error");
      setErrorMsg("Nieprawidłowy albo wygasły kod. Sprawdź, czy przepisałaś/eś go poprawnie.");
      return;
    }
    router.push(`/${locale}/partners/dashboard`);
  }

  return (
    <PartnersShell>
      <style>{`
        .pl-input {
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .pl-input:focus {
          outline: none;
          border-color: var(--brand, #1d4ed8) !important;
          box-shadow: 0 0 0 4px rgba(29,78,216,0.1);
        }
        .pl-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .pl-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(29,78,216,0.36);
        }
        .pl-code-input {
          letter-spacing: 0.5em;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: -160,
            left: "50%",
            transform: "translateX(-50%)",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(29,78,216,0.12), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 460,
            margin: "0 auto",
            padding: "120px 24px 140px",
            fontFamily: "var(--fb)",
            color: "var(--ink)",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            {step === "code" ? (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
                    color: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <IconMail />
                </div>

                <h1
                  style={{
                    fontFamily: "var(--fd)",
                    fontWeight: 600,
                    fontSize: "clamp(24px, 4vw, 28px)",
                    letterSpacing: "-0.01em",
                    marginBottom: 12,
                  }}
                >
                  Podaj kod z maila
                </h1>
                <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: 32, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
                  Wysłałam 8-cyfrowy kod na <strong>{email}</strong>. Przepisz
                  go poniżej — to szybsze i pewniejsze niż klikanie w link.
                </p>

                <form onSubmit={handleVerifyCode} style={{ display: "grid", gap: 14 }}>
                  <input
                    ref={codeInputRef}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={8}
                    required
                    placeholder="00000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    className="pl-input pl-code-input"
                    style={{
                      padding: "16px 16px",
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      fontSize: 22,
                      fontFamily: "var(--fd)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || code.length < 8}
                    className="pl-btn"
                    style={{
                      fontFamily: "var(--fd)",
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "14px 24px",
                      background: "var(--brand)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      cursor: status === "loading" ? "default" : "pointer",
                      opacity: status === "loading" || code.length < 8 ? 0.6 : 1,
                      boxShadow: "0 8px 24px rgba(29,78,216,0.28)",
                    }}
                  >
                    {status === "loading" ? "Sprawdzanie..." : "Zaloguj się"}
                  </button>

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
                </form>

                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
                  <button
                    onClick={() => {
                      setStep("email");
                      setCode("");
                      setStatus("idle");
                    }}
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: 13,
                      color: "var(--muted)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Zmień e-mail
                  </button>
                  <button
                    onClick={() => requestCode()}
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: 13,
                      color: "var(--brand)",
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Wyślij kod ponownie
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center" }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
                    color: "var(--brand)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <IconMail />
                </div>

                <h1
                  style={{
                    fontFamily: "var(--fd)",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 4vw, 32px)",
                    letterSpacing: "-0.01em",
                    marginBottom: 12,
                  }}
                >
                  Panel partnera
                </h1>
                <p style={{ color: "var(--muted)", lineHeight: 1.6, marginBottom: 32, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
                  Logowanie działa bez hasła — wpisz e-mail, którym się
                  zgłaszałaś/zgłaszałeś, a wyślę Ci 8-cyfrowy kod do zalogowania.
                </p>

                <form onSubmit={handleRequestCode} style={{ display: "grid", gap: 14, textAlign: "left" }}>
                  <input
                    type="email"
                    required
                    placeholder="twoj@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-input"
                    style={{
                      padding: "14px 16px",
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      fontSize: 15,
                      fontFamily: "var(--fb)",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="pl-btn"
                    style={{
                      fontFamily: "var(--fd)",
                      fontWeight: 600,
                      fontSize: 15,
                      padding: "14px 24px",
                      background: "var(--brand)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 999,
                      cursor: status === "loading" ? "default" : "pointer",
                      opacity: status === "loading" ? 0.7 : 1,
                      boxShadow: "0 8px 24px rgba(29,78,216,0.28)",
                    }}
                  >
                    {status === "loading" ? "Wysyłanie..." : "Wyślij kod logowania"}
                  </button>

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
                          textAlign: "center",
                        }}
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>

                <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 32 }}>
                  Nie masz jeszcze konta?{" "}
                  <a
                    href="https://www.anastasiiakupriianets.pl/pl/partners/apply"
                    style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "underline" }}
                  >
                    Dołącz do programu
                  </a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PartnersShell>
  );
}