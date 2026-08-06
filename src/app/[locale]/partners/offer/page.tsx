"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import PartnersShell from "@/components/PartnersShell";

const COMMISSION_RATE = 0.15;

function OfferContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")?.trim() || "";

  const applyHref = name
    ? { pathname: "/partners/apply", query: { name } }
    : { pathname: "/partners/apply" };

  return (
    <PartnersShell>
      <div style={{ fontFamily: "var(--fb)", color: "var(--ink, #111)" }}>
        <GlobalStyle />
        <Hero name={name} applyHref={applyHref} />
        <WhyWorth />
        <Timeline />
        <Calculator applyHref={applyHref} />
        <EarningsChart />
        <WhatYouGet />
        <FAQ />
        <FinalCTA applyHref={applyHref} />
      </div>
    </PartnersShell>
  );
}

export default function PartnerOfferPage() {
  return (
    <Suspense fallback={null}>
      <OfferContent />
    </Suspense>
  );
}

/* ============================================================
   Ikony — minimalistyczne, jednoliniowe (SVG, bez zależności)
   ============================================================ */

type IconProps = { size?: number; color?: string };
type ApplyHref = { pathname: string; query?: { name: string } };
const iconBase = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconPalette({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2c1.7 0 3-1.3 3-3 0-4.4-4-8.4-8-8.4Z" />
      <circle cx="7.5" cy="10.5" r="1" fill={color} />
      <circle cx="11" cy="7.5" r="1" fill={color} />
      <circle cx="15" cy="8.5" r="1" fill={color} />
    </svg>
  );
}

function IconTrendingUp({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

function IconClock({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function IconShield({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconFolder({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6Z" />
    </svg>
  );
}

function IconFileText({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <path d="M6 2h9l5 5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V3.5A1.5 1.5 0 0 1 6 2Z" />
      <path d="M14 2v5h5" />
      <path d="M8 13h8M8 16.5h8" />
    </svg>
  );
}

function IconTarget({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill={color} />
    </svg>
  );
}

function IconPhone({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} {...iconBase}>
      <path d="M4.5 3.5h4l1.5 4-2.3 1.7a13 13 0 0 0 6.1 6.1l1.7-2.3 4 1.5v4c0 1-.8 1.5-1.7 1.4C9.8 19 5 14.2 4.1 6.2 4 5.3 4.5 4.5 5.5 4.5Z" />
    </svg>
  );
}

/* ============================================================
   Globalne style — hover, gradienty, animacje
   ============================================================ */

function GlobalStyle() {
  return (
    <style>{`
      .po-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }
      .po-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(29, 78, 216, 0.1);
        border-color: var(--brand, #1d4ed8);
      }
      .po-btn-primary {
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        box-shadow: 0 8px 24px rgba(29, 78, 216, 0.28);
      }
      .po-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(29, 78, 216, 0.36);
      }
      .po-btn-secondary {
        transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      }
      .po-btn-secondary:hover {
        transform: translateY(-2px);
        background: var(--surface, #f5f7fc);
        border-color: var(--brand, #1d4ed8);
      }
      .po-faq-btn:hover {
        color: var(--brand, #1d4ed8);
      }
      input[type="range"].po-slider {
        -webkit-appearance: none;
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--brand, #1d4ed8), #7c9cf0);
      }
      input[type="range"].po-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid var(--brand, #1d4ed8);
        box-shadow: 0 2px 8px rgba(29, 78, 216, 0.4);
        cursor: pointer;
      }
      @media (max-width: 760px) {
        .po-calc-grid {
          grid-template-columns: 1fr !important;
        }
        .po-hero-grid {
          grid-template-columns: 1fr !important;
        }
      }
      @media (max-width: 520px) {
        .po-chart-yaxis {
          display: none !important;
        }
        .po-chart-card {
          padding: 20px 14px 16px !important;
          gap: 0 !important;
        }
        .po-chart-bars {
          gap: 10px !important;
          padding-left: 0 !important;
        }
        .po-chart-value {
          font-size: 10px !important;
        }
        .po-chart-labels {
          margin-left: 0 !important;
          gap: 10px !important;
          font-size: 11px !important;
        }
        .po-cta-card {
          padding: 32px 20px 40px !important;
        }
      }
    `}</style>
  );
}

/* ============================================================
   Wspólne
   ============================================================ */

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--fd, sans-serif)",
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--brand, #1d4ed8)",
};

function SectionWrap({
  children,
  style,
  tinted = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  tinted?: boolean;
}) {
  return (
    <section style={{ background: tinted ? "var(--surface, #f7f9fd)" : "transparent" }}>
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "96px 24px",
          ...style,
        }}
      >
        {children}
      </div>
    </section>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "var(--fd, sans-serif)",
  fontWeight: 600,
  fontSize: 15,
  padding: "15px 30px",
  background: "var(--brand, #1d4ed8)",
  color: "#fff",
  textDecoration: "none",
  border: "none",
  borderRadius: 999,
  cursor: "pointer",
};

const secondaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "var(--fd, sans-serif)",
  fontWeight: 600,
  fontSize: 15,
  padding: "15px 30px",
  background: "#fff",
  color: "var(--ink, #111)",
  border: "1.5px solid var(--line, #e2e2e2)",
  borderRadius: 999,
  textDecoration: "none",
};

function IconBadge({ children, size = 52 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #eef2ff, #e0e9ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--brand, #1d4ed8)",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */

function Hero({ name, applyHref }: { name: string; applyHref: ApplyHref }) {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.14), transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160,
          left: -160,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.08), transparent 70%)",
        }}
      />

      <SectionWrap style={{ paddingTop: 120, paddingBottom: 80, position: "relative" }}>
        <div
          className="po-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                ...eyebrowStyle,
                display: "inline-block",
                background: "linear-gradient(135deg, #eef2ff, #e0e9ff)",
                padding: "6px 16px",
                borderRadius: 999,
              }}
            >
              Program Partnerski AK Web &amp; Design
            </span>
            {name && (
              <p style={{ fontSize: 15, color: "var(--muted, #555)", marginTop: 16 }}>
                Cześć, {name}
              </p>
            )}
            <h1
              style={{
                fontFamily: "var(--fd, sans-serif)",
                fontWeight: 600,
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: "18px 0 20px",
              }}
            >
              Polecaj sprawdzone rozwiązania,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--brand, #1d4ed8), #6d8bf5)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                zarabiaj na każdym poleceniu.
              </span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--muted, #555)", maxWidth: 540 }}>
              Dołącz do programu partnerskiego AK Web &amp; Design, rozmawiaj
              ze swoimi kontaktami i przedstawiaj im profesjonalne strony
              internetowe oraz rozwiązania cyfrowe poparte jakością,
              terminowością i indywidualnym podejściem. Ja zajmuję się
              wyceną, ustaleniami i realizacją projektu — a Ty otrzymujesz
              prowizję za każdą zakończoną współpracę.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
              <Link
                href={applyHref}
                className="po-btn-primary"
                style={primaryBtnStyle}
              >
                Dołącz do programu <span aria-hidden>→</span>
              </Link>
              <a
                href={`mailto:kontakt@anastasiiakupriianets.pl?subject=${encodeURIComponent("Pytanie o program partnerski")}`}
                className="po-btn-secondary"
                style={secondaryBtnStyle}
              >
                Napisz do mnie
              </a>
            </div>

            <p style={{ fontSize: 14, color: "var(--muted, #555)", marginTop: 24 }}>
              Masz już konto partnera?{" "}
              <Link
                href="/partners/login"
                style={{
                  color: "var(--brand, #1d4ed8)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Zaloguj się do panelu →
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              position: "relative",
              height: 420,
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(29,78,216,0.18)",
            }}
          >
            <Image
              src="/partner-hero3.jpg"
              alt="Współpraca partnerska AK Web & Design"
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              style={{ objectFit: "cover" }}
              priority
            />
          </motion.div>
        </div>
      </SectionWrap>
    </div>
  );
}

/* ============================================================
   3. DLACZEGO WARTO?
   ============================================================ */

const BENEFITS = [
  {
    Icon: IconTrendingUp,
    title: "Realne źródło dodatkowego dochodu",
    body: "Poleć klienta raz i otrzymuj prowizję za każdą zakończoną realizację. Bez sprzedaży, bez obsługi projektu i bez zbędnych formalności.",
  },
  {
    Icon: IconFileText,
    title: "Przejrzyste warunki współpracy",
    body: "Dołączasz w kilka minut. Od początku dokładnie wiesz, jak działa program i ile zarabiasz.",
  },
  {
    Icon: IconClock,
    title: "Szybka realizacja zgłoszeń",
    body: "Gdy przedstawisz klientowi ofertę, ja od razu przejmuję temat — przygotowuję wycenę i prowadzę cały proces aż do zakończenia projektu.",
  },
  {
    Icon: IconPhone,
    title: "Ty rozmawiasz, ja domykam",
    body: "Przedstawiasz klientowi naszą ofertę, a ja przejmuję wycenę, ustalenia i realizację projektu. Twój czas kończy się na rozmowie.",
  },
  {
    Icon: IconShield,
    title: "Twoje relacje są bezpieczne",
    body: "Dbamy o długofalową współpracę. Każdy polecony klient pozostaje przypisany do Twojego konta, również przy kolejnych projektach.",
  },
  {
    Icon: IconPalette,
    title: "Indywidualne rozwiązania zamiast gotowych szablonów",
    body: "Każdy projekt powstaje od podstaw z myślą o celach biznesowych klienta, jego marce i planach rozwoju.",
  },
];

function WhyWorth() {
  return (
    <SectionWrap>
      <p style={eyebrowStyle}>Dlaczego warto?</p>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 30, margin: "12px 0 44px" }}>
        Polecaj klientów i zarabiaj na każdej zrealizowanej współpracy
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            className="po-card"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            style={{
              border: "1px solid var(--line, #e2e2e2)",
              borderRadius: 20,
              padding: "26px 24px",
              background: "#fff",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
                color: "var(--brand, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <b.Icon size={22} />
            </div>
            <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
              {b.title}
            </p>
            <p style={{ fontSize: 13.5, color: "var(--muted, #555)", lineHeight: 1.55 }}>{b.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ============================================================
   4. JAK WYGLĄDA WSPÓŁPRACA? — timeline
   ============================================================ */

const STEPS = [
  { n: "1", title: "Rozmawiasz z klientem", body: "Przedstawiasz klientowi naszą ofertę i wstępnie ustalasz, czego potrzebuje, a potem przekazujesz mi kontakt." },
  { n: "2", title: "Ja domykam szczegóły i wycenę", body: "Kontaktuję się z klientem, potwierdzam zakres i przygotowuję dokładną wycenę projektu." },
  { n: "3", title: "Realizuję projekt", body: "Projektuję i wdrażam stronę od podstaw — Ty nie angażujesz w to swojego czasu." },
  { n: "4", title: "Ty otrzymujesz prowizję", body: "Po zakończeniu i rozliczeniu projektu od razu wypłacam Twoją prowizję." },
];

function Timeline() {
  return (
    <SectionWrap tinted>
      <p style={eyebrowStyle}>Jak wygląda współpraca?</p>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 30, margin: "12px 0 52px" }}>
        Współpraca w czterech krokach
      </h2>
      <div style={{ display: "grid", gap: 0 }}>
        {STEPS.map((s, i) => (
          <div key={s.n}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ display: "flex", gap: 24, alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--brand, #1d4ed8), #6d8bf5)",
                  color: "#fff",
                  fontFamily: "var(--fd)",
                  fontWeight: 700,
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(29,78,216,0.28)",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  paddingBottom: i === STEPS.length - 1 ? 0 : 36,
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid var(--line, #e2e2e2)",
                  padding: "18px 22px",
                  flex: 1,
                  marginBottom: i === STEPS.length - 1 ? 0 : 4,
                }}
              >
                <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{s.title}</p>
                <p style={{ fontSize: 14, color: "var(--muted, #555)", maxWidth: 460 }}>{s.body}</p>
              </div>
            </motion.div>
            {i < STEPS.length - 1 && (
              <div style={{ marginLeft: 23, width: 2, height: 28, background: "linear-gradient(var(--brand, #1d4ed8), transparent)" }} />
            )}
          </div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ============================================================
   5. KALKULATOR PROWIZJI — zakres do realnej ceny max (3600 zł)
   ============================================================ */

function Calculator({ applyHref }: { applyHref: ApplyHref }) {
  const [value, setValue] = useState(2000);
  const commission = Math.round(value * COMMISSION_RATE);
  const percent = ((value - 800) / (3600 - 800)) * 100;

  return (
    <SectionWrap style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 40,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.1), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <p style={eyebrowStyle}>Kalkulator prowizji</p>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 30, margin: "12px 0 44px" }}>
        Sprawdź, ile możesz zarobić na jednym poleceniu
      </h2>

      <div
        className="po-calc-grid"
        style={{
          position: "relative",
          border: "1px solid var(--line, #e2e2e2)",
          borderRadius: 28,
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          background: "#fff",
          boxShadow: "0 24px 60px rgba(29,78,216,0.1)",
        }}
      >
        <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #eef2ff, #dce6ff)",
              color: "var(--brand, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconTrendingUp size={22} />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 14 }}>
              <span style={{ color: "var(--muted, #555)" }}>Cena projektu</span>
              <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 18 }}>
                {value.toLocaleString("pl-PL")} zł
              </span>
            </div>
            <input
              type="range"
              className="po-slider"
              min={800}
              max={3600}
              step={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "var(--muted-2, #888)" }}>
              <span>800 zł</span>
              <span>3600 zł</span>
            </div>
          </div>

          <p style={{ fontSize: 13, color: "var(--muted, #555)", lineHeight: 1.5 }}>
            Przesuń suwak i sprawdź wysokość prowizji dla różnych wielkości
            projektu. Każda zrealizowana współpraca to 15% wartości netto dla Ciebie.
          </p>
        </div>

        <div
          style={{
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 20,
            background: "linear-gradient(150deg, var(--brand, #1d4ed8), #4a6cf0)",
            color: "#fff",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            Twoja prowizja (15%)
          </span>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={commission}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 56, lineHeight: 1 }}
            >
              {commission.toLocaleString("pl-PL")} zł
            </motion.p>
          </AnimatePresence>

          <div style={{ width: "70%", height: 4, background: "rgba(255,255,255,0.25)", borderRadius: 999, overflow: "hidden" }}>
            <motion.div
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.2 }}
              style={{ height: "100%", background: "#fff", borderRadius: 999 }}
            />
          </div>

          <Link
            href={applyHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--fd, sans-serif)",
              fontWeight: 600,
              fontSize: 14,
              padding: "12px 24px",
              background: "#fff",
              color: "var(--brand, #1d4ed8)",
              borderRadius: 999,
              textDecoration: "none",
              marginTop: 8,
            }}
          >
            Zostań partnerem <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </SectionWrap>
  );
}

/* ============================================================
   6. WYKRES — przykładowe miesięczne zarobki
   (przy średniej wartości projektu ok. 2000 zł, w granicach realnych cen)
   ============================================================ */

const EARNINGS_DATA = [
  { label: "1 klient", value: 200 },
  { label: "2 klientów", value: 400 },
  { label: "3 klientów", value: 600 },
  { label: "5 klientów", value: 1000 },
];

function EarningsChart() {
  const max = 1000;
  const gridLines = [0, 200, 400, 600, 800, 1000];

  return (
    <SectionWrap tinted>
      <p style={eyebrowStyle}>Przykładowe zarobki</p>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 30, margin: "12px 0 8px" }}>
        Ile możesz zarobić miesięcznie
      </h2>
      <p style={{ fontSize: 14, color: "var(--muted, #555)", marginBottom: 44 }}>
        Przykładowa symulacja przy prowizji 10% od wartości projektu i
        średniej cenie realizacji na poziomie ok. 2000 zł.
      </p>

      <div
        className="po-chart-card"
        style={{
          background: "#fff",
          border: "1px solid var(--line, #e2e2e2)",
          borderRadius: 20,
          padding: "32px 32px 24px",
          display: "flex",
          gap: 32,
        }}
      >
        <div className="po-chart-yaxis" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: 11, color: "var(--muted-2, #888)", height: 220, paddingBottom: 24 }}>
          {[...gridLines].reverse().map((g) => (
            <span key={g}>{g.toLocaleString("pl-PL")} zł</span>
          ))}
        </div>

        <div className="po-chart-bars" style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 24, height: 220, borderLeft: "1px solid var(--line, #e2e2e2)", borderBottom: "1px solid var(--line, #e2e2e2)", paddingLeft: 16 }}>
          {EARNINGS_DATA.map((d, i) => (
            <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                style={{
                  width: "60%",
                  background: "linear-gradient(180deg, #6d8bf5, var(--brand, #1d4ed8))",
                  borderRadius: "10px 10px 0 0",
                  position: "relative",
                }}
              >
                <span
                  className="po-chart-value"
                  style={{
                    position: "absolute",
                    top: -22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 12,
                    fontFamily: "var(--fd)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.value.toLocaleString("pl-PL")} zł
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="po-chart-labels" style={{ display: "flex", gap: 24, marginLeft: 56, marginTop: 12 }}>
        {EARNINGS_DATA.map((d) => (
          <span key={d.label} style={{ flex: 1, textAlign: "center", fontSize: 13, color: "var(--muted, #555)", fontWeight: 500 }}>
            {d.label}
          </span>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ============================================================
   7. CO OTRZYMUJE PARTNER?
   ============================================================ */

const PERKS = [
  { Icon: IconFolder, title: "Portfolio realizacji", body: "Otrzymujesz profesjonalne materiały i portfolio, które ułatwią przedstawienie naszej oferty." },
  { Icon: IconFileText, title: "Gotowa oferta", body: "Dostajesz gotowe materiały sprzedażowe, które możesz od razu przekazać klientowi." },
  { Icon: IconTarget, title: "Wsparcie sprzedażowe", body: "Otrzymasz materiały i wskazówki, które pomogą Ci pewnie przedstawić ofertę i rozpoznać potrzeby klienta." },
  { Icon: IconPhone, title: "Priorytetowy kontakt", body: "Masz bezpośredni kontakt i priorytetową komunikację na każdym etapie współpracy." },
];

function WhatYouGet() {
  return (
    <SectionWrap>
      <p style={eyebrowStyle}>Co otrzymuje partner?</p>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 30, margin: "12px 0 44px" }}>
        Realne wsparcie, nie tylko prowizja
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {PERKS.map((p, i) => (
          <motion.div
            key={p.title}
            className="po-card"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            style={{ border: "1px solid var(--line, #e2e2e2)", borderRadius: 18, padding: "26px 20px", background: "#fff" }}
          >
            <IconBadge>
              <p.Icon size={24} />
            </IconBadge>
            <p style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{p.title}</p>
            <p style={{ fontSize: 13, color: "var(--muted, #555)", lineHeight: 1.5 }}>{p.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* ============================================================
   8. FAQ
   ============================================================ */

const FAQ_ITEMS = [
  {
    q: "Jak liczona jest prowizja?",
    a: "Prowizja wynosi 15% wartości netto każdego zakończonego projektu. Wszystkie zgłoszenia i należne prowizje możesz na bieżąco śledzić w panelu partnera.",
  },
  {
    q: "Kiedy otrzymuję wypłatę?",
    a: "Prowizja jest wypłacana po zakończeniu projektu oraz opłaceniu faktury przez klienta. Status każdego polecenia jest widoczny w Twoim panelu.",
  },
  {
    q: "Czy podpisujemy umowę?",
    a: "Bazowo działamy bez długich umów — wystarczy krótkie ustalenie zasad. Jeśli reprezentujesz naszą ofertę wobec klientów i potrzebujesz pisemnego potwierdzenia warunków współpracy, przygotuję je dla Ciebie bez problemu.",
  },
  {
    q: "Czy mogę polecić więcej niż jednego klienta?",
    a: "Tak. Liczba poleceń jest nieograniczona, a każde zgłoszenie rozliczane jest indywidualnie.",
  },
  {
    q: "Czy mogę polecać firmy spoza Polski?",
    a: "Tak. Współpracujemy z klientami z całego świata. Wystarczy możliwość komunikacji w języku polskim lub angielskim.",
  },
  {
    q: "Czy odbieracie moich klientów?",
    a: "Nie. Polecony klient pozostaje przypisany do Twojego konta partnerskiego. Jeżeli wróci z kolejnym projektem, prowizja nadal przysługuje Tobie.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrap tinted>
      <p style={eyebrowStyle}>FAQ</p>
      <h2 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 30, margin: "12px 0 44px" }}>
        Najczęstsze pytania
      </h2>
      <div style={{ display: "grid", gap: 12 }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.q}
              style={{
                background: "#fff",
                border: `1px solid ${isOpen ? "var(--brand, #1d4ed8)" : "var(--line, #e2e2e2)"}`,
                borderRadius: 16,
                padding: "4px 22px",
                transition: "border-color 0.2s",
              }}
            >
              <button
                className="po-faq-btn"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: 16, fontFamily: "var(--fd)", fontWeight: 600 }}>{item.q}</span>
                <span
                  style={{
                    fontSize: 18,
                    color: "#fff",
                    background: "var(--brand, #1d4ed8)",
                    width: 26,
                    height: 26,
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
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ fontSize: 14, color: "var(--muted, #555)", lineHeight: 1.6, paddingBottom: 22, maxWidth: 620 }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionWrap>
  );
}

/* ============================================================
   9. CTA
   ============================================================ */

function FinalCTA({ applyHref }: { applyHref: ApplyHref }) {
  return (
    <SectionWrap style={{ paddingBottom: 130 }}>
      <div
        className="po-cta-card"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 28,
          padding: "56px 40px 64px",
          background: "linear-gradient(135deg, var(--brand, #1d4ed8), #4a6cf0)",
          color: "#fff",
          boxShadow: "0 30px 70px rgba(29,78,216,0.28)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Ikonki — pozioma listwa na górze */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {[
            { Icon: IconShield, label: "Sprawdzona marka" },
            { Icon: IconClock, label: "Proste zasady współpracy" },
            { Icon: IconTrendingUp, label: "15% prowizji" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 999,
                padding: "9px 16px",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <item.Icon size={13} color="#fff" />
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Nagłówek, tekst, przyciski — pełna szerokość */}
        <div style={{ position: "relative", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--fd)",
              fontWeight: 600,
              fontSize: "clamp(24px, 3.4vw, 36px)",
              letterSpacing: "-0.01em",
              marginBottom: 16,
            }}
          >
            Buduj dochód razem ze sprawdzoną marką
          </h2>
          <p
            style={{
              fontSize: 16,
              opacity: 0.85,
              marginBottom: 32,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Dołącz do programu partnerskiego AK Web &amp; Design i polecaj
            usługi poparte jakością, doświadczeniem i realnymi efektami dla
            Twoich klientów.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={applyHref}
              className="po-btn-secondary"
              style={{ ...primaryBtnStyle, background: "#fff", color: "var(--brand, #1d4ed8)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            >
              Dołącz do programu <span aria-hidden>→</span>
            </Link>
            <Link
              href="/partners/login"
              style={{ ...secondaryBtnStyle, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)" }}
            >
              Panel partnera
            </Link>
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}