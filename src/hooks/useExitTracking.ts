"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Śledzi z której sekcji użytkownik opuszcza stronę.
 * Dodaj do layout lub strony głównej: useExitTracking()
 */
export function useExitTracking() {
  useEffect(() => {
    const startTime = Date.now();

    const getCurrentSection = (): string => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      let current = "unknown";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Sekcja jest "aktywna" jeśli jej środek jest w górnej połowie ekranu
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
          current = section.getAttribute("data-section") ?? "unknown";
        }
      });

      return current;
    };

    const getScrollPercent = (): number => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return 100;
      return Math.round((scrolled / total) * 100);
    };

    const sendExitEvent = () => {
      const section = getCurrentSection();
      const scrollPercent = getScrollPercent();
      const timeOnPageSec = Math.round((Date.now() - startTime) / 1000);

      window.gtag?.("event", "page_exit", {
        exit_section: section,
        scroll_percent: scrollPercent,
        time_on_page_seconds: timeOnPageSec,
      });
    };

    // Zdarzenie zamknięcia/odświeżenia
    const handleBeforeUnload = () => {
      sendExitEvent();
    };

    // Zdarzenie przełączenia zakładki / minimalizacji
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendExitEvent();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}