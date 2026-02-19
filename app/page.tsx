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


export const metadata = {
  title: "Java Global Access | Your Global Delivery Partner",
  description: "Java Global Access Platform (JavaGAP) delivers structured professional services, managed operational support, and scalable delivery teams for overseas clients — backed by disciplined governance and standardized workflows.",
  keywords: ["Java Global Access", "Global Delivery", "Tech Services", "Professional Services", "Managed Support", "JavaGAP", "Offshore Teams"],
  authors: [{ name: "Java Global Access" }],
  openGraph: {
    title: "Java Global Access | Your Global Delivery Partner",
    description: "Structured professional services, managed operational support, and scalable delivery teams for overseas clients — backed by disciplined governance and standardized workflows.",
    url: "https://javaglobalaccess.com",
    siteName: "Java Global Access",
    images: [
      {
        url: "/new-shareable-img.jpg",
        width: 1200,
        height: 630,
        alt: "Java Global Access — Your Global Delivery Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Java Global Access | Your Global Delivery Partner",
    description: "Structured professional services, managed operational support, and scalable delivery teams for overseas clients — backed by disciplined governance and standardized workflows.",
    images: ["/new-shareable-img.jpg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main id="main-content">
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
