'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const controls = [
    {
        title: "Standardized workflows",
        description: "Consistency and efficiency across every engagement.",
        image: "/clip-board.png",
        colSpan: "lg:col-span-1",
        gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
        title: "Centralized quality assurance",
        description: "Rigorous checks maintained by a dedicated oversight team.",
        image: "/drops.png",
        colSpan: "lg:col-span-1",
        gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
        title: "Secure digital infrastructure",
        description: "Enterprise-grade security protocols and data protection.",
        image: "/lock.png",
        colSpan: "lg:col-span-1",
        gradient: "from-blue-500/20 to-blue-600/20",
        dark: true
    },
    {
        title: "Defined escalation mechanisms",
        description: "Clear paths for rapid issue resolution and reporting.",
        image: "/Defined escalation mechanisms.png",
        colSpan: "lg:col-span-1",
        gradient: "from-blue-500/20 to-blue-600/20",
        dark: true
    }
];

export default function BuiltInControls() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.control-card');

            gsap.fromTo(cards,
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Hover animations handled by CSS group-hover, but we can add subtle floating here if needed
            cards.forEach((card: any) => {
                const img = card.querySelector('.control-img');
                if (img) {
                    gsap.to(img, {
                        y: -10,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 sm:px-12 lg:px-20 bg-white dark:bg-black relative overflow-hidden">

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4 border border-blue-100 dark:border-blue-800">
                        Operational Excellence
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                        Built-in controls
                    </h2>
                    <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed text-justify sm:text-center">
                        We integrate robust controls directly into our delivery model to ensure consistency, security, and quality at every step of the engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {controls.map((item, index) => (
                        <div
                            key={index}
                            className={`control-card relative p-6 rounded-[2.5rem] border shadow-lg transition-all duration-500 ${item.colSpan} flex flex-col items-center text-center overflow-hidden
                            bg-zinc-950 text-white border-zinc-800`}
                        >
                            {/* Inner Gradient Glow on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 pointer-events-none`} />

                            <div className="h-[200px] w-full flex items-center justify-center mb-6 relative z-10">
                                <div className={`relative control-img ${index === 1 ? 'w-48 h-48' :
                                    (index === 0 || index === 3) ? 'w-44 h-44' :
                                        'w-36 h-36'
                                    }`}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            <div className="mt-auto relative z-10">
                                <h3 className="text-xl font-bold mb-3 text-white">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
