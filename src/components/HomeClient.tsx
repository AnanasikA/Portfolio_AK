'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Header       from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });

export default function HomeClient({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const smoothScrollTo = (hash: string) => {
      const id = hash.replace(/^#/, '');
      const el = document.getElementById(id);
      if (!el) return false;
      const header = document.querySelector('header[role="banner"]') as HTMLElement | null;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight ?? 80) - 8,
        behavior: 'smooth',
      });
      return true;
    };
    const run = () => {
      const h = window.location.hash;
      if (!h) return;
      let tries = 0;
      const tryScroll = () => {
        if (smoothScrollTo(h)) return;
        if (tries++ < 40) setTimeout(tryScroll, 50);
      };
      tryScroll();
    };
    run();
    window.addEventListener('hashchange', run);
    return () => window.removeEventListener('hashchange', run);
  }, []);

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      <main className="scroll-smooth" aria-hidden={isOpen}>
        {children}
      </main>
      <WhatsAppButton />
    </>
  );
}