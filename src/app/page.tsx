'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
// import Projects from '@/components/Projects'; // <- zostaw zakomentowane
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Skills from '@/components/Skills';
import Header from '@/components/Header';
import DropdownMenu from '@/components/DropdownMenu';
import Footer from '@/components/Footer';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  // blokada przewijania tła przy otwartym menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <DropdownMenu isOpen={isOpen} toggleMenu={toggleMenu} />

     <main
  className="scroll-smooth"
  aria-hidden={isOpen}
>
  <section id="hero">
    <Hero />
  </section>

  <section id="about">
    <About />
  </section>

  <section id="skills">
    <Skills />
  </section>

  {/* <section id="projects"><Projects /></section> */}

  <section id="pricing">
    <Pricing />
  </section>

  <section id="contact">
    <Contact />
  </section>

  <Footer />
</main>

    </>
  );
}
