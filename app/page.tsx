import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import Process from '@/components/Process';
import BusinessExcellence from '@/components/BusinessExcellence';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <Hero />

        <WhyChooseUs />
        <BusinessExcellence />
        <Services />
        <Process />

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-slate-400 mb-10">
              Start building your next project with our modern Next.js starter template.
            </p>
            <Button size="lg" className="text-base h-12 px-8">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
