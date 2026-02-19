import React from 'react';
import ContactHero from '@/components/ContactHero';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ContactCard from '@/components/ContactCard';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


export const metadata = {
    title: "Contact Us | Java Global Access Platform FZ-LLC",
    description: "Get in touch with our team for your next project. We are ready to assist you with our global delivery solutions.",
    openGraph: {
        title: "Contact Us | Java Global Access Platform FZ-LLC",
        description: "Get in touch with our team for your next project. We are ready to assist you with our global delivery solutions.",
        url: "https://javaglobalaccess.com/contact",
        siteName: "Java Global Access Platform FZ-LLC",
        images: [
            {
                url: "/new-shareable-img.jpg",
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
        title: "Contact Us | Java Global Access Platform FZ-LLC",
        description: "Get in touch with our team for your next project. We are ready to assist you with our global delivery solutions.",
        images: ["/new-shareable-img.jpg"],
    },
};

export default function ContactPage() {
    return (
        <main id="main-content" className="bg-white min-h-screen">
            <ContactHero />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Contact Form + Map */}
                    <div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">Send us a Message</h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            Ready to start your next project? Fill out the form below and our team will get back to you within 24 hours.
                        </p>
                        <ContactForm />

                        {/* Map Section - Under the form */}
                        <div className="space-y-6 pt-12">
                            <h3 className="text-2xl font-semibold text-gray-900">Find Us</h3>
                            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[300px] w-full relative bg-gray-50">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    id="gmap_canvas"
                                    src="https://maps.google.com/maps?q=Compass%20Building%2C%20Al%20Shohada%20Road%2C%20Ras%20Al%20Khaimah&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    title="Google Map Location"
                                ></iframe>
                            </div>

                            <Button
                                asChild
                                className="w-full h-14 bg-[#00AEEF] hover:bg-[#0095CC] text-white rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50"
                            >
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=Compass+Building,+Al+Shohada+Road,+Ras+Al+Khaimah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Get Directions
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Contact Info */}
                    <div className="space-y-12">
                        {/* Dubai Architecture Image */}
                        <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-6">
                            <Image
                                src="/images/dubai-architecture.jpg"
                                alt="Dubai Architecture"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* 3D Contact Cards Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            <ContactCard
                                icon={MapPin}
                                title="Our Location"
                                details={[
                                    "Java Global Access Platform FZ-LLC,",
                                    "FDBC4722, Compass Building, Al Shohada Road,",
                                    "AL Hamra Industrial Zone-FZ,",
                                    "Ras Al Khaimah,",
                                    "United Arab Emirates."
                                ]}
                                delay={100}
                            />

                            <ContactCard
                                icon={Phone}
                                title="Phone & Fax"
                                details={[
                                    "Tel : +971 56 822 6844",
                                    "Fax : +971 56 543 9655"
                                ]}
                                delay={200}
                            />

                            <ContactCard
                                icon={Mail}
                                title="Email"
                                details={[
                                    "info@javagap.ae"
                                ]}
                                action={{
                                    label: "Send Email",
                                    href: "mailto:info@javagap.ae"
                                }}
                                delay={300}
                            />

                            <ContactCard
                                icon={FileText}
                                title="Company Registration"
                                details={[
                                    "Dubai Company Registration -",
                                    "REGISTRATION NO. 0000004082362",
                                    "LICENCE NO. 47029062",
                                    "LICENCE NO. 46001825",
                                    "\u00A0",
                                    "Sri Lankan Company Registration -",
                                    "PV 00351228"
                                ]}
                                delay={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
