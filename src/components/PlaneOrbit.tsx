'use client';

import { useEffect, useRef, useCallback } from 'react';

/* Airplane SVG — nos skierowany w górę (0°), obrót zgodnie z ruchem */
const PLANE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`;

function orbitCard(cardEl: HTMLElement, color = '#1f5eff') {
  const rect = cardEl.getBoundingClientRect();

  /* centre of card in page coords */
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2 + window.scrollY;

  /* orbit radii — roomy margin around card */
  const rx = rect.width  / 2 + 40;
  const ry = rect.height / 2 + 40;

  const LAPS     = 2;
  const MS_PER_LAP = 3800;          // slower — 3.8s per lap
  const TOTAL    = MS_PER_LAP * LAPS;

  /* wobble seeds — give each orbit a slightly irregular path */
  const wobbleA  = (Math.random() - 0.5) * 18;   // ellipse tilt ±9°
  const wobbleRx = 1 + (Math.random() - 0.5) * 0.14; // rx scale ±7%
  const wobbleRy = 1 + (Math.random() - 0.5) * 0.14; // ry scale ±7%
  const wobblePhase = Math.random() * Math.PI * 2;    // undulation phase

  const el = document.createElement('div');
  el.innerHTML = PLANE_SVG;
  el.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 99999;
    will-change: transform;
    opacity: 0;
    color: ${color};
    filter: drop-shadow(0 2px 8px ${color}55);
    transition: opacity .25s;
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '1'; });

  const startTime = performance.now();
  let rafId = 0;

 function getPos(t: number) {
  const angle = t * Math.PI * 2 * LAPS - Math.PI / 2;

  const chaos1 = Math.sin(angle * 2.7 + wobblePhase) * 28;
  const chaos2 = Math.cos(angle * 4.1 + wobblePhase * 1.7) * 18;
  const chaos3 = Math.sin(t * Math.PI * 14 + wobblePhase) * 14;

  const aRad = wobbleA * Math.PI / 180;

  const localX =
    Math.cos(angle) * rx * wobbleRx +
    chaos1 +
    chaos3;

  const localY =
    Math.sin(angle) * ry * wobbleRy +
    chaos2 -
    chaos3 * 0.6;

  const x = cx + localX * Math.cos(aRad) - localY * Math.sin(aRad);
  const y = cy + localX * Math.sin(aRad) + localY * Math.cos(aRad);

  return { x, y };
}

  function tick(now: number) {
    const elapsed = now - startTime;
    const rawT = Math.min(elapsed / TOTAL, 1);

    /* ease in first 6%, ease out last 6%, linear middle */
    let t: number;
    if      (rawT < 0.06) t = rawT / 0.06 * 0.06;
    else if (rawT > 0.94) t = 0.94 + (rawT - 0.94) / 0.06 * 0.06;
    else                  t = rawT;

    const pos  = getPos(t);
    const pos2 = getPos(Math.min(t + 0.003, 1));   // lookahead for angle

    const screenY = pos.y - window.scrollY;
    const screenY2 = pos2.y - window.scrollY;

    /* tangent → facing direction
       This SVG plane has nose pointing UP in its natural state (0°).
       atan2 gives angle of velocity vector from +X axis.
       We subtract 90° so nose (which is +Y in SVG) aligns with velocity. */
    const angle =
  Math.atan2(screenY2 - screenY, pos2.x - pos.x) * (180 / Math.PI) + 90;

    el.style.transform = `translate(${pos.x - 18}px, ${screenY - 18}px) rotate(${angle}deg)`;

    if (rawT < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }
  }

  rafId = requestAnimationFrame(tick);
  setTimeout(() => { cancelAnimationFrame(rafId); el.remove(); }, TOTAL + 600);
}

/* ── Hook ── */
export function usePlaneOrbit(
  btnRef:  React.RefObject<HTMLElement | null>,
  cardRef: React.RefObject<HTMLElement | null>,
  color = '#1f5eff',
) {
  const launch = useCallback(() => {
    if (cardRef.current) orbitCard(cardRef.current, color);
  }, [cardRef, color]);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    el.addEventListener('mouseenter', launch);
    return () => el.removeEventListener('mouseenter', launch);
  }, [btnRef, launch]);
}

/* ── Wrapper component ── */
export default function PlaneOrbitButton({
  children, cardRef, onClick, style, className, color,
}: {
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLElement | null>;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  color?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  usePlaneOrbit(btnRef as React.RefObject<HTMLElement | null>, cardRef, color);

  return (
    <button ref={btnRef} onClick={onClick} style={style} className={className}>
      {children}
    </button>
  );
}

