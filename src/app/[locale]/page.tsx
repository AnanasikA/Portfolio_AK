'use client';

import dynamic from 'next/dynamic';
import Hero       from '@/components/Hero';
import HomeClient from '@/components/HomeClient';
import Footer     from '@/components/Footer';
import { useSectionTracking } from '@/hooks/useSectionTracking';
import { useExitTracking }    from '@/hooks/useExitTracking';

const ClientMarquee    = dynamic(() => import('@/components/ClientMarquee'));
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'));
const PricingBanner    = dynamic(() => import('@/components/PricingBanner'));
const ProcessSection   = dynamic(() => import('@/components/ProcessSection'));
const WhyUs            = dynamic(() => import('@/components/WhyUs'));
const FAQ              = dynamic(() => import('@/components/FAQ'));
const Contact          = dynamic(() => import('@/components/Contact'));

export default function Home() {
  // Śledzi z której sekcji użytkownik opuszcza stronę
  useExitTracking();

  // Ref dla każdej sekcji — wysyła eventy section_view i section_time_spent do GA4
  const heroRef     = useSectionTracking('home');
  const projectsRef = useSectionTracking('projects');
  const pricingRef  = useSectionTracking('pricing');
  const processRef  = useSectionTracking('process');
  const whyUsRef    = useSectionTracking('why_us');
  const faqRef      = useSectionTracking('faq');
  const contactRef  = useSectionTracking('contact');

  return (
    <>
      <HomeClient>
        <section ref={heroRef} data-section="home">
          <Hero />
          <ClientMarquee />
        </section>

        <section ref={projectsRef} data-section="projects">
          <FeaturedProjects />
        </section>

        <section ref={pricingRef} data-section="pricing">
          <PricingBanner />
        </section>

        <section ref={processRef} data-section="process">
          <ProcessSection />
        </section>

        <section ref={whyUsRef} data-section="why_us">
          <WhyUs />
        </section>

        <section ref={faqRef} data-section="faq">
          <FAQ />
        </section>

        <section ref={contactRef} data-section="contact">
          <Contact />
        </section>
      </HomeClient>
      <Footer />
    </>
  );
}