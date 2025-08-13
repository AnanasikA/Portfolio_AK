'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
// import Projects from '@/components/Projects'; // zostaw zakomentowane
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Skills from '@/components/Skills';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';

function HashScroller() {
  useEffect(() => {
    const smoothScrollTo = (hash: string) => {
      const id = hash.replace(/^#/, '');
      const el = document.getElementById(id);
      if (!el) return false;

      const header = document.querySelector('header[role="banner"]') as HTMLElement | null;
      const extra = 8; // drobny margines
      const offset = (header?.offsetHeight ?? 80) + extra;

      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return true;
    };

    const run = () => {
      const h = (typeof window !== 'undefined' && window.location.hash) || '';
      if (!h) return;
      let tries = 0;
      const tryScroll = () => {
        if (smoothScrollTo(h)) return;
        if (tries++ < 40) setTimeout(tryScroll, 50);
      };
      tryScroll();
    };

    run(); // initial load (np. /#contact)
    window.addEventListener('hashchange', run);
    return () => window.removeEventListener('hashchange', run);
  }, []);

  return null;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // blokada przewijania tła przy otwartym menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <HashScroller />

      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

      <main className="scroll-smooth" aria-hidden={isOpen}>
        <Hero />
        <About />
        <Skills />
        {/* <Projects /> */}

        <Pricing />
        <Contact />

        <Footer />
      </main>
    </>
  );
}
