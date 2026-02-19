import React from 'react';
import HowItWorksHero from '@/components/HowItWorksHero';
import DeliveryLifecycle from '@/components/DeliveryLifecycle';
import BuiltInControls from '@/components/BuiltInControls';
import EngagementScope from '@/components/EngagementScope';
import HowItWorksClosing from '@/components/HowItWorksClosing';
import Footer from '@/components/Footer';


export const metadata = {
    title: "How It Works | Java Global Access Platform FZ-LLC",
    description: "Discover our delivery lifecycle, built-in controls, and engagement scope ensuring transparency and efficiency.",
    openGraph: {
        title: "How It Works | Java Global Access Platform FZ-LLC",
        description: "Discover our delivery lifecycle, built-in controls, and engagement scope ensuring transparency and efficiency.",
        url: "https://javaglobalaccess.com/how-it-works",
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
        title: "How It Works | Java Global Access Platform FZ-LLC",
        description: "Discover our delivery lifecycle, built-in controls, and engagement scope ensuring transparency and efficiency.",
        images: ["/new-shareable-img.jpg"],
    },
};

export default function HowItWorksPage() {
    return (
        <main id="main-content" className="min-h-screen bg-white dark:bg-black">
            <HowItWorksHero />
            <DeliveryLifecycle />
            <BuiltInControls />
            <EngagementScope />
            <HowItWorksClosing />
            <Footer />
        </main>
    );
}
