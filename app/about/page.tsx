import React from 'react';
import AboutHero from '@/components/AboutHero';
import GroupStructure from '@/components/GroupStructure';
import ParentCompany from '@/components/ParentCompany';
import BusinessExcellence from '@/components/BusinessExcellence';
import Governance from '@/components/Governance';
import AboutClosing from '@/components/AboutClosing';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <AboutHero />
            <GroupStructure />
            <ParentCompany />
            <BusinessExcellence />
            <Governance />
            <AboutClosing />
            <Footer />
        </main>
    );
}
