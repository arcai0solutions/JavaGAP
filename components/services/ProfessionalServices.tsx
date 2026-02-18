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
        title: 'Network and systems coordination services',
        tags: ['#NetworkSecurity', '#SystemsCoordination'],
        description: 'Ensuring your IT infrastructure is robust, secure, and seamlessly integrated for optimal performance.'
    },
    {
        title: 'Technology consulting and documentation support',
        tags: ['#TechConsulting', '#Documentation'],
        description: 'Providing expert guidance and comprehensive documentation to support your technology initiatives.'
    },
    {
        title: 'Social media application development & management',
        tags: ['#AppDevelopment', '#SocialMedia'],
        description: 'Developing engaging social media applications and providing ongoing operational management support.'
    },
    {
        title: 'Data handling, validation, and structured processing',
        tags: ['#DataProcessing', '#DataValidation'],
        description: 'Implementing rigorous data validation and structured processing techniques for accurate and reliable data.'
    },
];

export default function ProfessionalServices() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-white text-black py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-zinc-100" id="professional-services">
            <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full space-y-8"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-black mb-6 -translate-y-8">
                        Professional Services
                    </h2>
                    <p className="text-black text-lg leading-relaxed max-w-2xl font-medium">
                        Remote advisory, analytical, coordination, and structured consulting support provided to overseas entities.
                    </p>
                </motion.div>

                {/* Accordion List */}
                <div className="w-full border-t border-zinc-200">
                    {services.map((service, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                className="group relative border-b border-zinc-200"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between py-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors"
                                    aria-expanded={isActive}
                                >
                                    <div className="flex items-center gap-8 md:gap-12">
                                        <span className={`text-xl font-mono transition-colors duration-300 ${isActive ? 'text-[#00AEEF]' : 'text-zinc-400 group-hover:text-black'}`}>
                                            /{String(index + 1).padStart(3, '0')}
                                        </span>
                                        <h3 className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wide transition-colors duration-300 ${isActive ? 'text-black font-normal' : 'text-zinc-800 group-hover:text-black'}`}>
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 ${isActive ? 'rotate-45' : 'rotate-0'}`}>
                                        <Plus className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 ${isActive ? 'text-[#00AEEF]' : 'text-zinc-400 group-hover:text-black'}`} strokeWidth={1} />
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
                                                    <p className="text-lg text-black leading-relaxed font-medium">
                                                        {service.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {service.tags.map((tag, i) => (
                                                            <span key={i} className="text-sm font-mono text-[#00AEEF] bg-[#00AEEF]/10 px-3 py-1 rounded-full font-bold">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
