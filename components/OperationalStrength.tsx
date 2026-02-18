'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Zap, Award, BookOpen } from 'lucide-react';

export default function OperationalStrength() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.utils.toArray('.op-card').forEach((card: any, i) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                )
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const strengths = [
        {
            title: "Proven Service Methodologies",
            desc: "Utilizing time-tested frameworks for consistent delivery.",
            icon: CheckCircle2,
            span: "col-span-1 md:col-span-2 lg:col-span-2",
            bg: "bg-blue-600 text-white"
        },
        {
            title: "Mature Delivery Standards",
            desc: "High-quality output guaranteed by rigorous protocols.",
            icon: Award,
            span: "col-span-1 md:col-span-1",
            bg: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
        },
        {
            title: "International Compliance",
            desc: "Adherence to global regulatory expectations.",
            icon: BookOpen,
            span: "col-span-1 md:col-span-1",
            bg: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
        },
        {
            title: "Operational Discipline",
            desc: "Aligned with global clients for seamless integration.",
            icon: Zap,
            span: "col-span-1 md:col-span-2 lg:col-span-2",
            bg: "bg-black text-white"
        },
    ];

    return (
        <section ref={containerRef} className="py-24 px-6 sm:px-12 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-4">Operational Strength</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Java Global Access Platform FZ-LLC adopts these group-level standards to align with international service expectations from inception.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {strengths.map((item, index) => (
                        <div
                            key={index}
                            className={`op-card ${item.span} ${item.bg} rounded-3xl p-8 flex flex-col justify-between min-h-[240px] shadow-sm hover:shadow-lg transition-all duration-300 group`}
                        >
                            <div className="mb-4">
                                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm mb-4">
                                    <item.icon size={24} className="opacity-90" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                <p className="opacity-80 text-lg">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
