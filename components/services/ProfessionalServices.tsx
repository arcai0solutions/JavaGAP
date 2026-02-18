'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
    {
        title: 'Business and operational process support',
        tags: ['#ProcessOptimization', '#Operations'],
        description: 'Streamlining your business workflows to enhance efficiency and reduce operational bottlenecks.'
    },
    {
        title: 'Technology consulting and documentation support',
        tags: ['#TechConsulting', '#Documentation'],
        description: 'Providing expert guidance and comprehensive documentation to support your technology initiatives.'
    },
    {
        title: 'Structured coordination aligned to defined outcomes',
        tags: ['#ProjectManagement', '#Coordination'],
        description: 'Ensuring all activities are strategically aligned with your defined business outcomes and goals.'
    },
];

export default function ProfessionalServices() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-[#111111] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" id="professional-services">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">

                {/* Header Section */}
                <div className="w-full space-y-8">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6 -translate-y-8">
                        Professional Services
                    </h2>
                    <p className="text-[#F5F5F5]/40 text-lg leading-relaxed max-w-2xl">
                        Remote advisory, analytical, coordination, and structured consulting support provided to overseas entities.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="w-full border-t border-white/10">
                    {services.map((service, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className="group relative border-b border-white/10"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between py-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] transition-colors"
                                    aria-expanded={isActive}
                                >
                                    <div className="flex items-center gap-8 md:gap-12">
                                        <span className={`text-xl font-mono transition-colors duration-300 ${isActive ? 'text-[#00AEEF]' : 'text-[#F5F5F5]/20 group-hover:text-[#F5F5F5]/40'}`}>
                                            /{String(index + 1).padStart(3, '0')}
                                        </span>
                                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#F5F5F5] group-hover:text-white'}`}>
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 ${isActive ? 'rotate-45' : 'rotate-0'}`}>
                                        <Plus className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${isActive ? 'text-[#00AEEF]' : 'text-[#F5F5F5]/40 group-hover:text-white'}`} strokeWidth={1} />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-0 md:pl-[calc(3ch+3rem)] pb-10 pr-4 md:pr-12">
                                                <div className="pt-2 space-y-6">
                                                    <p className="text-lg text-[#F5F5F5]/70 leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {service.tags.map((tag, i) => (
                                                            <span key={i} className="text-sm font-mono text-[#00AEEF]/80 bg-[#00AEEF]/10 px-3 py-1 rounded-full">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
