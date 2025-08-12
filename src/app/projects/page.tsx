'use client';

import { useState } from 'react';
import Projects from '@/components/Projects';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';

export default function ProjectsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <main className="scroll-smooth" aria-hidden={isOpen}>
        <Projects />
      </main>
    </>
  );
}
