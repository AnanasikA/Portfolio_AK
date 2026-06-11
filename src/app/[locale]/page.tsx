import dynamic from 'next/dynamic';
import Hero       from '@/components/Hero';
import HomeClient from '@/components/HomeClient';
import Footer     from '@/components/Footer';

const ClientMarquee    = dynamic(() => import('@/components/ClientMarquee'));
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'));
const PricingBanner = dynamic(() => import('@/components/PricingBanner'));
const ProcessSection   = dynamic(() => import('@/components/ProcessSection'));
const WhyUs            = dynamic(() => import('@/components/WhyUs'));
const FAQ              = dynamic(() => import('@/components/FAQ'));
const Contact          = dynamic(() => import('@/components/Contact'));

export default function Home() {
  return (
    <>
      <HomeClient>
        <Hero />
        <ClientMarquee />
        <FeaturedProjects />
        <Pricing />
        <ProcessSection />
        <WhyUs />
        <FAQ />
        <Contact />
      </HomeClient>
      <Footer />
    </>
  );
}