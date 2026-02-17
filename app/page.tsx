'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StaggeredMenu from '@/components/StaggeredMenu';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/components/Services';
import Process from '@/components/Process';
import BusinessExcellence from '@/components/BusinessExcellence';
import Footer from '@/components/Footer';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'How We Work', ariaLabel: 'Our process', link: '/how-we-work' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <section className="h-screen w-full p-[10px]">
          <div className="h-full w-full rounded-[2rem] bg-white overflow-hidden relative">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/heo.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            {/* Staggered Menu */}
            <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">
              <div className="w-full h-full pointer-events-auto">
                <StaggeredMenu
                  position="right"
                  items={menuItems}
                  socialItems={socialItems}
                  displaySocials
                  displayItemNumbering={false}
                  menuButtonColor="#000000"
                  openMenuButtonColor="#000"
                  changeMenuColorOnOpen={true}
                  colors={['#005495', '#00AEEF']}
                  logoUrl="/java-logo.jpeg"
                  accentColor="#00AEEF"
                  onMenuOpen={() => console.log('Menu opened')}
                  onMenuClose={() => console.log('Menu closed')}
                  displayLogo={false}
                />
              </div>
            </div>

            {/* Logo Container */}
            <div className="absolute left-8 sm:left-12 top-8 bg-white rounded-2xl p-2 z-20">
              <img src="/java-logo.jpeg" alt="Java Gap Logo" className="h-16 w-auto object-contain" />
            </div>

            <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-32 sm:px-12 sm:pb-40 max-w-7xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 font-['Neospeed']">
                Global Delivery for Tech <br /> & Professional Services.
              </h1>
              <p className="text-lg text-slate-200 max-w-4xl">
                Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients, backed by disciplined governance, standardized workflows, <br /> and scalable delivery teams.
              </p>
            </div>


          </div>
        </section>

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
