'use client';

import { useEffect, useRef, useCallback } from 'react';

const PLANE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>`;

/* Ten SVG ma "nos" w prawym górnym rogu (M22,2) → naturalny kąt to -45°
   Żeby nos wskazywał w kierunku ruchu, odejmujemy 135° od kąta trajektorii */
const PLANE_BASE_ANGLE = 45;

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
}

function getAngle(
  t: number,
  x0: number, x1: number, x2: number, x3: number,
  y0: number, y1: number, y2: number, y3: number,
) {
  const dt = 0.02;
  const t2 = Math.min(t + dt, 1);
  const ax = cubicBezier(t,  x0, x1, x2, x3);
  const ay = cubicBezier(t,  y0, y1, y2, y3);
  const bx = cubicBezier(t2, x0, x1, x2, x3);
  const by = cubicBezier(t2, y0, y1, y2, y3);
  return Math.atan2(by - ay, bx - ax) * (180 / Math.PI) + PLANE_BASE_ANGLE;
}

function launchPlane() {
  const W  = window.innerWidth;
  const SY = window.scrollY;
  const VH = window.innerHeight;

  const startX = W * 0.65 + Math.random() * W * 0.25;
  const startY = SY + VH * 0.05 + Math.random() * 100;

  const edge = Math.floor(Math.random() * 4);
  let endX: number, endY: number;
  if      (edge === 0) { endX = -80;    endY = SY + Math.random() * VH; }
  else if (edge === 1) { endX = W + 80; endY = SY + Math.random() * VH; }
  else if (edge === 2) { endX = Math.random() * W; endY = SY - 80; }
  else                 { endX = Math.random() * W; endY = SY + VH + 80; }

  const cp1x = W * 0.1 + Math.random() * W * 0.8;
  const cp1y = SY + VH * 0.1 + Math.random() * VH * 0.8;
  const cp2x = W * 0.1 + Math.random() * W * 0.8;
  const cp2y = SY + VH * 0.1 + Math.random() * VH * 0.8;

  const el = document.createElement('div');
  el.innerHTML = PLANE_SVG;
  el.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 99999;
    will-change: transform;
    opacity: 0;
    filter: drop-shadow(0 2px 8px rgba(29,78,216,.3));
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.transition = 'opacity .2s';
    el.style.opacity = '1';
  });

  const duration  = 2400 + Math.random() * 1400;
  const startTime = performance.now();
  let   rafId     = 0;

  function tick(now: number) {
    const elapsed = now - startTime;
    const rawT    = Math.min(elapsed / duration, 1);
    const t = rawT < 0.5
      ? 2 * rawT * rawT
      : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

    const x = cubicBezier(t, startX, cp1x, cp2x, endX);
    const y = cubicBezier(t, startY, cp1y, cp2y, endY) - window.scrollY;
    const angle = getAngle(t, startX, cp1x, cp2x, endX, startY, cp1y, cp2y, endY);

    el.style.transform = `translate(${x - 26}px, ${y - 26}px) rotate(${angle}deg)`;

    if (rawT < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 250);
    }
  }

  rafId = requestAnimationFrame(tick);
  setTimeout(() => { cancelAnimationFrame(rafId); el.remove(); }, duration + 600);
}

export function usePaperPlane(ref: React.RefObject<HTMLElement | null>) {
  const launch = useCallback(() => {
    launchPlane();
    if (Math.random() > 0.7) setTimeout(launchPlane, 300 + Math.random() * 400);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mouseenter', launch);
    return () => el.removeEventListener('mouseenter', launch);
  }, [ref, launch]);
}

export default function PaperPlaneButton({
  children, onClick, style, className, onMouseEnter, onMouseLeave,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  usePaperPlane(btnRef as React.RefObject<HTMLElement | null>);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      style={style}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}