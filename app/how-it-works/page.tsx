import React from 'react';
import HowItWorksHero from '@/components/HowItWorksHero';
import DeliveryLifecycle from '@/components/DeliveryLifecycle';
import BuiltInControls from '@/components/BuiltInControls';
import EngagementScope from '@/components/EngagementScope';
import HowItWorksClosing from '@/components/HowItWorksClosing';
import Footer from '@/components/Footer';

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black">
            <HowItWorksHero />
            <DeliveryLifecycle />
            <BuiltInControls />
            <EngagementScope />
            <HowItWorksClosing />
            <Footer />
        </main>
    );
}
