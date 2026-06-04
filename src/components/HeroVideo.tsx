'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rxRef    = useRef(0);
  const ryRef    = useRef(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const t = setTimeout(() => {
      video.src = '/hero-reel.mp4';
      video.load();
      video.play().catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrapRef.current!.getBoundingClientRect();
    rxRef.current = -((e.clientY - r.top)  / r.height - 0.5) * 10;
    ryRef.current =  ((e.clientX - r.left) / r.width  - 0.5) * 10;
    applyTilt();
  };

  const handleMouseLeave = () => {
    rxRef.current = 0;
    ryRef.current = 0;
    applyTilt(true);
  };

  const applyTilt = (smooth = false) => {
    if (!wrapRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!wrapRef.current) return;
      wrapRef.current.style.transition = smooth
        ? 'transform .6s cubic-bezier(.22,1,.36,1)'
        : 'transform .08s linear';
      wrapRef.current.style.transform =
        `perspective(900px) rotateX(${rxRef.current}deg) rotateY(${ryRef.current}deg) scale(1.02)`;
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%', borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.12)',
        willChange: 'transform', cursor: 'default',
        aspectRatio: '4/3', background: 'var(--surface)',
      }}
    >
      <video
  ref={videoRef}
  poster="/hero-reel-poster.webp"
  muted
  loop
  playsInline
  style={{
    display: 'block', width: '100%', height: '100%',
    objectFit: 'cover', aspectRatio: '4/3',
  }}
/>
    </div>
  );
}