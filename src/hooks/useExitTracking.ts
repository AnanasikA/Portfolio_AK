"use client";

import { useEffect } from "react";

/**
 * Śledzi z której sekcji użytkownik opuszcza stronę.
 * Dodaj do strony głównej: useExitTracking()
 */
export function useExitTracking() {
  useEffect(() => {
    const startTime = Date.now();

    const getCurrentSection = (): string => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      let current = "unknown";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
          current = section.getAttribute("data-section") ?? "unknown";
        }
      });
      return current;
    };

    const getScrollPercent = (): number => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return 100;
      return Math.round((window.scrollY / total) * 100);
    };

    const sendExitEvent = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag?.("event", "page_exit", {
        exit_section: getCurrentSection(),
        scroll_percent: getScrollPercent(),
        time_on_page_seconds: Math.round((Date.now() - startTime) / 1000),
      });
    };

    const handleBeforeUnload = () => sendExitEvent();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendExitEvent();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}