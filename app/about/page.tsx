import React from 'react';
import AboutHero from '@/components/AboutHero';
import GroupStructure from '@/components/GroupStructure';
import ParentCompany from '@/components/ParentCompany';
import BusinessExcellence from '@/components/BusinessExcellence';
import Governance from '@/components/Governance';
import CorporateRegistration from '@/components/CorporateRegistration';
import AboutClosing from '@/components/AboutClosing';
import Footer from '@/components/Footer';


export const metadata = {
    title: "About Us | Java Global Access Platform FZ-LLC",
    description: "Learn about Java Global Access, our structure, parent company, and governance models ensuring world-class service delivery.",
    openGraph: {
        title: "About Us | Java Global Access Platform FZ-LLC",
        description: "Learn about Java Global Access, our structure, parent company, and governance models ensuring world-class service delivery.",
        url: "https://javaglobalaccess.com/about",
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
        title: "About Us | Java Global Access Platform FZ-LLC",
        description: "Learn about Java Global Access, our structure, parent company, and governance models ensuring world-class service delivery.",
        images: ["/new-shareable-img.jpg"],
    },
};

export default function AboutPage() {
    return (
        <main id="main-content" className="min-h-screen bg-white">
            <AboutHero />
            <GroupStructure />
            <ParentCompany />
            <CorporateRegistration />
            <BusinessExcellence />
            <Governance />
            <AboutClosing />
            <Footer />
        </main>
    );
}
