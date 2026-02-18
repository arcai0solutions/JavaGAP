'use client';

import React from 'react';
import { Settings, ShieldCheck, Share2, ArrowUpRight } from 'lucide-react';

const services = [
    {
        title: 'Operational support',
        description: 'Delivered under structured service management frameworks to ensure reliability and consistency.',
        icon: Settings
    },
    {
        title: 'Network & systems coordination',
        description: 'Comprehensive coordination services to maintain robust and secure network infrastructures.',
        icon: ShieldCheck
    },
    {
        title: 'Social media app development',
        description: 'End-to-end development and ongoing operational management support for social media applications.',
        icon: Share2
    }
];

export default function ManagedServices() {
    return (
        <section className="py-32 bg-[#111111] border-t border-zinc-800 relative overflow-hidden">
            {/* Ambient Background Glow - Adjusted for Dark Mode */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />


            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-20">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-8">
                        Managed Services
                    </h2>
                    <p className="text-xl text-zinc-300 max-w-3xl leading-relaxed">
                        Continuous operational support functions delivered through dedicated teams operating under defined service frameworks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 lg:p-10 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-950 flex items-center justify-center text-[#00AEEF] group-hover:scale-110 group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-500 shadow-sm border border-zinc-800">
                                        <service.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <ArrowUpRight className="text-zinc-600 group-hover:text-white transition-colors duration-500" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00AEEF] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 flex-grow">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
