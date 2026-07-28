'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: [string, string, Record<string, unknown>?]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-CLP2ME6EWT', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}