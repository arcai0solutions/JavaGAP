'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const BusinessActivities = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const trigger = triggerRef.current;

            if (section && trigger) {
                const scrollWidth = section.scrollWidth;
                const windowWidth = window.innerWidth;

                // Calculate the translation amount: total width - 1 viewport width
                const xParams = -(scrollWidth - windowWidth);

                gsap.fromTo(
                    section,
                    {
                        x: 0,
                    },
                    {
                        x: xParams,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: trigger,
                            start: 'top top',
                            end: '+=3000', // Scroll distance (300vh)
                            scrub: 1,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    const activities = [
        {
            id: '01',
            title: 'Sugar Trading',
            subtitle: 'Global Sweeteners',
            description: 'The parent company is a mainland limited liability company incorporated in Dubai, United Arab Emirates, established in 2023. Import and export of sugar.',
            image: '/sugar-bg.jpg', // Placeholder, using abstraction
        },
        {
            id: '02',
            title: 'Coffee & Tea',
            subtitle: 'Beverage Commodities',
            description: 'Import and export of coffee and tea. Sourcing premium beans and leaves from top global regions.',
            image: '/coffee-bg.jpg',
        },
        {
            id: '03',
            title: 'Spices Trading',
            subtitle: 'Exotic Flavors',
            description: 'Trading of spices. Connecting markets with high-quality aromatic spices from around the world.',
            image: '/spices-bg.jpg',
        },
        {
            id: '04',
            title: 'Corn & Soybeans',
            subtitle: 'Agricultural Staples',
            description: 'Trading of corn and soybeans. Essential agricultural commodities for global food and feed industries.',
            image: '/grains-bg.jpg',
        }
    ];

    return (
        <section className="relative bg-black" ref={triggerRef}>
            {/* Desktop View: Sticky Horizontal Scroll */}
            <div className="hidden lg:block h-[300vh]">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    {/* Fixed Header Content */}
                    <div className="absolute top-12 left-12 md:left-24 z-20">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-12 bg-blue-600"></span>
                            <span className="text-blue-500 font-bold tracking-widest text-sm uppercase">Business Activities</span>
                        </div>
                        <h2 className="text-5xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                            Global <br />
                            <span className="text-zinc-600">Trading</span>
                        </h2>
                    </div>

                    {/* Horizontal Scrolling Content */}
                    <div ref={sectionRef} className="flex gap-12 pl-[40vw] pr-[10vw] items-center h-full">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.id}
                                className="
                                    relative flex flex-col justify-between shrink-0
                                    w-[50vw] h-[65vh]
                                    rounded-3xl p-8 md:p-14
                                    border border-white/10 bg-zinc-900/50
                                    group overflow-hidden
                                    backdrop-blur-sm
                                "
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-transparent group-hover:from-blue-900/10 transition-colors duration-700"></div>
                                <span className="absolute top-4 right-6 text-[8rem] md:text-[10rem] font-bold text-white/5 select-none pointer-events-none tracking-tighter leading-none z-0">
                                    {activity.id}
                                </span>

                                <div className="relative z-10 flex flex-col gap-6 mt-auto mb-auto">
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-500 font-mono text-xs uppercase tracking-widest border border-blue-500/20 px-3 py-1 rounded-full">
                                            Step {activity.id}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl md:text-5xl font-bold text-white uppercase leading-none mb-2">
                                            {activity.title}
                                        </h3>
                                        <span className="text-zinc-500 text-sm md:text-base font-bold uppercase tracking-wide">
                                            {activity.subtitle}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                                        {activity.description}
                                    </p>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile View: Vertical Stack */}
            <div className="lg:hidden flex flex-col gap-8 py-20 px-6 bg-black">
                <div className="mb-10">
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-2 block">Business Activities</span>
                    <h2 className="text-4xl font-bold text-white uppercase tracking-tighter leading-none">
                        Global <span className="text-zinc-600">Trading</span>
                    </h2>
                </div>

                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="
                            relative flex flex-col justify-between shrink-0
                            w-full h-auto min-h-[50vh]
                            rounded-3xl p-8 md:p-10
                            border border-white/10 bg-zinc-900/50
                            group overflow-hidden
                        "
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-transparent group-hover:from-blue-900/10 transition-colors duration-700"></div>
                        <span className="absolute top-4 right-6 text-[6rem] font-bold text-white/5 select-none pointer-events-none tracking-tighter leading-none z-0">
                            {activity.id}
                        </span>

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <span className="text-blue-500 font-mono text-xs uppercase tracking-widest border border-blue-500/20 px-3 py-1 rounded-full">
                                    Step {activity.id}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white uppercase leading-none mb-2">
                                    {activity.title}
                                </h3>
                                <span className="text-zinc-500 text-sm font-bold uppercase tracking-wide">
                                    {activity.subtitle}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-base leading-relaxed">
                                {activity.description}
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BusinessActivities;
