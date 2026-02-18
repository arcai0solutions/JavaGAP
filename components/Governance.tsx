'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gavel, FileCheck, Scale } from 'lucide-react';

export default function Governance() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );

            gsap.fromTo('.gov-feature',
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%"
                    }
                }
            );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const mechanisms = [
        "Defined approval hierarchies",
        "Periodic performance reviews",
        "Group-aligned policy frameworks"
    ];

    return (
        <section ref={containerRef} className="py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Introduction */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#00AEEF] text-sm font-medium">
                            <Scale size={16} />
                            <span>Governance & Oversight</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                            Unified Group Oversight Model
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">
                            Governance is maintained through a unified group oversight model, with strategic direction provided by the parent company and operational accountability exercised at the local entity level.
                        </p>
                    </div>

                    {/* Right: Mechanisms & Compliance */}
                    <div className="space-y-8">

                        {/* Mechanisms List */}
                        <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Gavel size={20} className="text-[#00AEEF]" />
                                Governance Mechanisms
                            </h3>
                            <ul className="space-y-4">
                                {mechanisms.map((item, index) => (
                                    <li key={index} className="gov-feature flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                        <div className="h-2 w-2 rounded-full bg-[#00AEEF]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compliance Note */}
                        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FileCheck size={120} />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 relative z-10">Compliance Practices</h3>
                            <p className="opacity-90 relative z-10">
                                Compliance practices appropriate for international service delivery include contractual compliance, internal audits, and continuous monitoring mechanisms.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
