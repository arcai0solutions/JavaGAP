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
  title: "Home | Java Global Access Platform FZ-LLC",
  description: "Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients.",
  keywords: ["Java Global Access", "Global Delivery", "Tech Services", "Professional Services", "Managed Support"],
  authors: [{ name: "Java Global Access" }],
  openGraph: {
    title: "Home | Java Global Access Platform FZ-LLC",
    description: "Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients.",
    url: "https://javaglobalaccess.com",
    siteName: "Java Global Access Platform FZ-LLC",
    images: [
      {
        url: "/share-img.png",
        width: 1200,
        height: 630,
        alt: "Java Global Access Platform FZ-LLC",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Java Global Access Platform FZ-LLC",
    description: "Java Global Access Platform (JavaGAP) provides structured professional services and managed operational support for overseas clients.",
    images: ["/share-img.png"],
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
