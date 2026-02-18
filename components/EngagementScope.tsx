'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, ClipboardList, Clock, BarChart } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const scopeItems = [
    {
        label: "Service type",
        detail: "(Professional Services, Managed Services)",
        icon: FileText
    },
    {
        label: "Scope summary and expected outcomes",
        detail: "",
        icon: ClipboardList
    },
    {
        label: "Timeline requirements",
        detail: "",
        icon: Clock
    },
    {
        label: "Reporting, monitoring, or compliance expectations",
        detail: "",
        icon: BarChart
    }
];

export default function EngagementScope() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.scope-item',
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 sm:px-12 lg:px-20 bg-zinc-900 text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black z-0" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6">
                        What to send to<br />scope an engagement
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 max-w-md">
                        To help us understand your needs and provide an accurate proposal, please include the following details in your initial request.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-full bg-[#00AEEF] text-white font-medium hover:bg-[#0095CC] transition-colors"
                    >
                        Request a service discussion
                    </Link>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 sm:p-10 border border-white/10">
                    <ul className="space-y-6">
                        {scopeItems.map((item, index) => (
                            <li key={index} className="scope-item flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="p-2 rounded-lg bg-blue-500/20 text-[#00AEEF]">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-white">{item.label}</h4>
                                    {item.detail && (
                                        <p className="text-zinc-400 text-sm mt-1">{item.detail}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
