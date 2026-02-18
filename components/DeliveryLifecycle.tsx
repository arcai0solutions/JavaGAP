'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Users, Activity, BarChart2, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const lifecycleSteps = [
    {
        number: "01",
        title: "Engagement scoping",
        description: "Confirm service type, scope boundaries, expected outcomes, timeline, and reporting expectations.",
        icon: Search
    },
    {
        number: "02",
        title: "Resource planning",
        description: "Assign the delivery team, establish coverage requirements, and set up workflows and documentation.",
        icon: Users
    },
    {
        number: "03",
        title: "Execution and supervision",
        description: "Deliver services under defined service frameworks with supervision and quality checks.",
        icon: Activity
    },
    {
        number: "04",
        title: "Performance monitoring",
        description: "Track progress against agreed outcomes and reporting cadence, with escalation where required.",
        icon: BarChart2
    },
    {
        number: "05",
        title: "Continuous improvement",
        description: "Refine workflows, reporting, and execution controls to improve consistency and outcomes over time.",
        icon: RefreshCw
    }
];

export default function DeliveryLifecycle() {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Cards Animation
            gsap.fromTo('.lifecycle-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    },
                    clearProps: "all"
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 sm:px-12 lg:px-20 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
                {/* Purple blob removed as requested */}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div ref={headerRef} className="mb-16 text-center sm:text-left">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#00AEEF] text-sm font-semibold tracking-wide uppercase mb-4">
                        The delivery lifecycle
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white max-w-2xl">
                        Each engagement follows a consistent five-step delivery structure.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lifecycleSteps.map((step, index) => (
                        <div
                            key={index}
                            className="lifecycle-card group relative p-8 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-[box-shadow,background-color] duration-300 hover:bg-white/60 dark:hover:bg-white/10"
                        >
                            <div className="absolute top-6 right-6 text-4xl font-bold text-slate-200 dark:text-slate-800 pointer-events-none group-hover:text-blue-100/50 dark:group-hover:text-blue-900/30 transition-colors">
                                {step.number}
                            </div>

                            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                                <step.icon size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-[#00AEEF] transition-colors">
                                {step.title}
                            </h3>

                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
