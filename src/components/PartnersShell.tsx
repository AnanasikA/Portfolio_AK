'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';

export default function PartnersShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <main id="content" className="scroll-smooth" aria-hidden={isOpen}>
        {children}
        <Footer />
      </main>
    </>
  );
}