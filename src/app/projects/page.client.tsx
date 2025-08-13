// app/projects/page.client.tsx
'use client';

import { useEffect, useState } from 'react';
import Projects from '@/components/Projects';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';

export default function ProjectsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // spójna blokada przewijania tła przy otwartym menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      {/* id="content" dla skip-linka z layoutu */}
      <main id="content" className="scroll-smooth" aria-hidden={isOpen}>
        <Projects />
      </main>
    </>
  );
}
