"use client";

import { useEffect, useRef } from "react";

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

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gtag?.("event", "section_view", {
            section_name: sectionName,
          });
        } else if (enterTime.current) {
          const timeSpentMs = Date.now() - enterTime.current;
          const timeSpentSec = Math.round(timeSpentMs / 1000);
          enterTime.current = null;

          if (timeSpentSec >= 2) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).gtag?.("event", "section_time_spent", {
              section_name: sectionName,
              time_seconds: timeSpentSec,
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}