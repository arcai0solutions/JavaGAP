'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const cards = [
    {
        number: '01',

        title: 'Established in Dubai',
        subtitle: 'The Foundation',
        description:
            'The parent company is a mainland limited liability company incorporated in Dubai, United Arab Emirates, established in 2023.',
        bg: 'bg-zinc-900/50',
        smallImage: '/images/dubai-skyline.jpg',
    },
    {
        number: '02',

        title: 'Global Trade Networks',
        subtitle: 'Commercial Reach',
        description:
            'The parent company operates within established international trading networks and maintains overseas commercial relationships across multiple markets.',
        bg: 'bg-zinc-800/50',
    },
    {
        number: '03',

        title: 'Business Activities',
        subtitle: 'Core Operations',
        description:
            'Diversified commodity trading across key global markets.',
        bg: 'bg-zinc-900/50',
        wide: true,
        subcards: [
            {
                label: 'Sugar Trading',
                text: 'Import and export of sugar across international markets.',
            },
            {
                label: 'Coffee & Tea',
                text: 'Import and export of coffee and tea through established supply chains.',
            },
            {
                label: 'Spice Trading',
                text: 'Trading of spices sourced from premium global suppliers.',
            },
            {
                label: 'Corn & Soybeans',
                text: 'Trading of corn and soybeans within agricultural commodity networks.',
            },
        ],
    },
    {
        number: '04',

        title: 'Strategic Expansion',
        subtitle: 'The Growth Engine',
        description:
            'Its operational maturity, financial continuity, and exposure to cross-border trade provide the foundation for group-level expansion into technology-enabled and platform-based global service delivery models.',
        bg: 'bg-zinc-800/50',
    },
];

export default function ParentCompany() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px)', () => {
            const totalScroll = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -totalScroll,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${totalScroll + 700}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-black">
            {/* ── DESKTOP: horizontal-scroll track ── */}
            <div className="hidden lg:block">
                <div className="flex h-screen items-end pb-20 overflow-hidden">
                    {/* Sticky heading */}
                    <div className="absolute top-12 left-12 md:left-24 z-20 pb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-12 bg-[#00AEEF]" />
                            <span className="text-[#00AEEF] font-bold tracking-widest text-sm uppercase">
                                Parent Company
                            </span>
                        </div>
                        <h2 className="text-5xl font-bold text-white uppercase tracking-tighter leading-[0.9]">
                            Pey and Cey <br />
                            <span className="text-zinc-600">World Wide Sugar Trading LLC</span>
                        </h2>
                    </div>

                    {/* Scrolling cards */}
                    <div
                        ref={trackRef}
                        className="flex gap-12 pl-12 md:pl-24 pr-[10vw] items-center"
                    >
                        {cards.map((card) => (
                            <div
                                key={card.number}
                                className={`
                                    relative flex flex-col justify-center shrink-0
                                    ${card.wide ? 'w-[75vw]' : 'w-[50vw]'} h-[55vh]
                                    rounded-3xl p-6 md:p-10
                                    border border-white/10 ${card.bg}
                                    group overflow-hidden
                                `}
                            >
                                {/* Small Bottom Right Image */}
                                {card.smallImage && (
                                    <div className="absolute bottom-6 right-6 w-48 h-36 rounded-xl overflow-hidden border border-white/20 shadow-2xl z-20">
                                        <Image
                                            src={card.smallImage}
                                            alt={card.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                )}

                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/0 via-transparent to-transparent group-hover:from-[#00AEEF]/10 transition-colors duration-700" />



                                {card.wide ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                                        {/* Left Column: Title & Description */}
                                        <div className="flex flex-col justify-center gap-6">
                                            <div>
                                                <h3 className="text-3xl md:text-5xl font-bold text-white uppercase leading-none mb-2">
                                                    {card.title}
                                                </h3>
                                                <span className="text-zinc-500 text-sm md:text-base font-bold uppercase tracking-wide">
                                                    {card.subtitle}
                                                </span>
                                            </div>
                                            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Right Column: Sub-cards Grid */}
                                        {card.subcards && (
                                            <div className="grid grid-cols-2 gap-4 content-center">
                                                {card.subcards.map((sub, j) => (
                                                    <div
                                                        key={j}
                                                        className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:bg-white/10 transition-colors flex flex-col justify-center"
                                                    >
                                                        <h4 className="text-[#00AEEF] font-bold uppercase text-sm mb-2 tracking-wider">
                                                            {sub.label}
                                                        </h4>
                                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                                            {sub.text}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {/* Standard Vertical Layout */}
                                        <div className="relative z-10 flex flex-col gap-6">
                                            <div>
                                                <h3 className="text-3xl md:text-5xl font-bold text-white uppercase leading-none mb-2">
                                                    {card.title}
                                                </h3>
                                                <span className="text-zinc-500 text-sm md:text-base font-bold uppercase tracking-wide">
                                                    {card.subtitle}
                                                </span>
                                            </div>
                                            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                                                {card.description}
                                            </p>
                                        </div>

                                        {/* Sub-cards (rarely used for non-wide, but kept for safety) */}
                                        {card.subcards && (
                                            <div className="mt-8 grid gap-4 relative z-10 grid-cols-1 md:grid-cols-4">
                                                {card.subcards.map((sub, j) => (
                                                    <div
                                                        key={j}
                                                        className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                                                    >
                                                        <h4 className="text-[#00AEEF] font-bold uppercase text-sm mb-3 tracking-wider">
                                                            {sub.label}
                                                        </h4>
                                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                                            {sub.text}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Bottom hover bar */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00AEEF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MOBILE: stacked cards ── */}
            <div className="lg:hidden flex flex-col gap-8 py-20 px-6 bg-black">
                <div className="mb-10">
                    <span className="text-[#00AEEF] font-bold tracking-widest text-sm uppercase mb-2 block">
                        Parent Company
                    </span>
                    <h2 className="text-4xl font-bold text-white uppercase tracking-tighter leading-none">
                        Pey and Cey{' '}
                        <span className="text-zinc-600">World Wide Sugar Trading LLC</span>
                    </h2>
                </div>

                {cards.map((card) => (
                    <div
                        key={card.number}
                        className={`
                            relative flex flex-col justify-center shrink-0
                            w-full h-auto
                            rounded-3xl p-6 md:p-10
                            border border-white/10 ${card.bg}
                            group overflow-hidden
                        `}
                    >
                        {/* Small Bottom Right Image */}
                        {card.smallImage && (
                            <div className="absolute bottom-6 right-6 w-48 h-36 rounded-xl overflow-hidden border border-white/20 shadow-2xl z-20 hidden sm:block">
                                <Image
                                    src={card.smallImage}
                                    alt={card.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/0 via-transparent to-transparent group-hover:from-[#00AEEF]/10 transition-colors duration-700" />

                        <div className="relative z-10 flex flex-col gap-6">
                            <div>
                                <h3 className="text-3xl md:text-5xl font-bold text-white uppercase leading-none mb-2">
                                    {card.title}
                                </h3>
                                <span className="text-zinc-500 text-sm md:text-base font-bold uppercase tracking-wide">
                                    {card.subtitle}
                                </span>
                            </div>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                                {card.description}
                            </p>
                        </div>

                        {card.subcards && (
                            <div className="mt-8 grid gap-4 relative z-10 grid-cols-1">
                                {card.subcards.map((sub, j) => (
                                    <div
                                        key={j}
                                        className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <h4 className="text-[#00AEEF] font-bold uppercase text-sm mb-3 tracking-wider">
                                            {sub.label}
                                        </h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {sub.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00AEEF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>
        </section>
    );
}
