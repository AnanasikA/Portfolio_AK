"use client";

import { useEffect, useRef } from "react";

/**
 * Śledzi czas spędzony w sekcji i wysyła eventy do GA4.
 * Użycie: const ref = useSectionTracking("hero");
 *         <section ref={ref}>...</section>
 */
export function useSectionTracking(sectionName: string) {
  const ref = useRef<HTMLElement>(null);
  const enterTime = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          enterTime.current = Date.now();

          // GA4: sekcja weszła w viewport
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gtag?.("event", "section_view", {
            section_name: sectionName,
          });
        } else if (enterTime.current) {
          const timeSpentMs = Date.now() - enterTime.current;
          const timeSpentSec = Math.round(timeSpentMs / 1000);
          enterTime.current = null;

          // GA4: czas spędzony w sekcji (tylko jeśli >= 2s żeby nie śmiecić)
          if (timeSpentSec >= 2) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).gtag?.("event", "section_time_spent", {
              section_name: sectionName,
              time_seconds: timeSpentSec,
            });
          }
        }
      },
      { threshold: 0.3 } // sekcja "widziana" gdy 30% widoczne
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}