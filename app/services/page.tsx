import React from 'react';
import ServicesHero from '@/components/services/ServicesHero';
import ProfessionalServices from '@/components/services/ProfessionalServices';
import ManagedServices from '@/components/services/ManagedServices';
import TechAndDataServices from '@/components/services/TechAndDataServices';
import DeliveryLifecycle from '@/components/DeliveryLifecycle';
import RiskManagement from '@/components/services/RiskManagement';
import ServicesClosing from '@/components/services/ServicesClosing';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Services | Java Global Access Platform FZ-LLC',
    description: 'Professional services and managed services delivered cross-border to overseas clients, supported by standardized workflows and secure digital infrastructure.',
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <ServicesHero />
            <ProfessionalServices />
            <ManagedServices />
            <TechAndDataServices />

            {/* Delivery model section */}
            <DeliveryLifecycle />

            <RiskManagement />
            <ServicesClosing />
            <Footer />
        </main>
    );
}
