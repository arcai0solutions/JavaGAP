import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import Process from '@/components/Process';
import BusinessExcellence from '@/components/BusinessExcellence';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <Hero />

        <WhyChooseUs />
        <BusinessExcellence />
        <Services />
        <Process />
        <FAQ />

        <CTA />
      </main>

      <Footer />
    </div>
  );
}
