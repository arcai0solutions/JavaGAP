'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, ClipboardList, Globe } from 'lucide-react';
import ThreeDCubeCard from './ThreeDCubeCard';

gsap.registerPlugin(ScrollTrigger);

const BusinessExcellence = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Refs for animation elements
    const lockRef = useRef<SVGSVGElement>(null);
    const workflowRef = useRef<SVGSVGElement>(null);
    const governanceRef = useRef<HTMLDivElement>(null);
    const shippingImageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Animation for Cards
            const cards = gsap.utils.toArray('.bento-card');
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // 2. Mini Animations (Triggered when cards appear)

            // Scalable Execution: Bar Chart Growth - REMOVED

            // Secure Digital Operations: Lock Pulse
            if (lockRef.current) {
                gsap.to(lockRef.current, {
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // Standardized Delivery: Scale/Pulse Icon
            if (workflowRef.current) {
                gsap.fromTo(workflowRef.current,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        scrollTrigger: { trigger: workflowRef.current, start: "top 85%" }
                    }
                );
            }

            // Centralized Governance: Nodes Stagger
            if (governanceRef.current) {
                const nodes = governanceRef.current.querySelectorAll('.node');
                gsap.fromTo(nodes,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        scrollTrigger: { trigger: governanceRef.current, start: "top 80%" }
                    }
                );
            }

            // International Orientation: Shipping Image Rotation
            if (shippingImageRef.current) {
                gsap.to(shippingImageRef.current, {
                    rotation: 360,
                    duration: 100,
                    repeat: -1,
                    ease: "linear"
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900" ref={containerRef}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Why JavaGAP
                    </h2>
                </div>

                {/* 
            Grid Layout:
            Row 1: Scalable (Large 2x2), Secure (Tall 1x2), Standardized (1x1)
            Row 2: (Scalable continues), (Secure continues), Centralized (1x1)
            Row 3: International (Full 4x1 or 2x1) 
            
            Revised for 5 items:
            [ Scalable (2x2) ] [ Secure (1x2) ] [ Standardized (1x1) ]
                                             [ Centralized (1x1)  ]
            [ International Orientation (4x1) ]
        */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. New 3D Cube Card - Takes full height on left (2x3) */}
                    <div className="col-span-1 md:col-span-2 row-span-3 h-full min-h-[600px] lg:min-h-auto">
                        <ThreeDCubeCard />
                    </div>

                    {/* 2. Secure Digital Operations - (1x2) */}
                    <div className="bento-card col-span-1 md:col-span-1 row-span-2 bg-black text-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
                        <div className="flex-1 flex items-center justify-center py-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                                <Lock
                                    ref={lockRef}
                                    className="w-20 h-20 text-blue-400 relative z-10"
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-semibold mb-2">Secure Digital Operations</h3>
                            <p className="text-slate-400 text-sm">
                                Designed for controlled access and data handling
                            </p>
                        </div>
                    </div>

                    {/* 3. Standardized Delivery - (1x1) */}
                    <div className="bento-card col-span-1 md:col-span-1 row-span-1 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div className="flex justify-end">
                            <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-full">
                                <ClipboardList ref={workflowRef} className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Standardized Delivery</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Clear accountability and repeatable workflows</p>
                        </div>
                    </div>

                    {/* 4. Centralized Governance - (1x1) Placed below Standardized */}
                    <div className="bento-card col-span-1 md:col-span-1 row-span-1 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div className="flex justify-center py-2" ref={governanceRef}>
                            {/* Visualizing Hierarchy */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="node w-4 h-4 rounded-full bg-slate-800 dark:bg-white"></div>
                                <div className="flex gap-4">
                                    <div className="node w-3 h-3 rounded-full bg-slate-400"></div>
                                    <div className="node w-3 h-3 rounded-full bg-slate-400"></div>
                                    <div className="node w-3 h-3 rounded-full bg-slate-400"></div>
                                </div>
                                <div className="flex gap-8">
                                    <div className="node w-2 h-2 rounded-full bg-slate-300"></div>
                                    <div className="node w-2 h-2 rounded-full bg-slate-300"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Centralized Governance</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Defined escalation and reporting mechanisms</p>
                        </div>
                    </div>

                    {/* 5. International Orientation - (2x1) Placed at bottom right */}
                    <div className="bento-card col-span-1 md:col-span-2 row-span-1 bg-black text-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="w-full md:w-1/2 relative z-10">
                            <Globe className="w-12 h-12 text-blue-400 mb-4 opacity-80" />
                            <h3 className="text-2xl font-semibold mb-2">International Orientation</h3>
                            <p className="text-slate-400 text-sm max-w-lg">Designed for diversified overseas markets</p>
                        </div>
                        <div className="w-full md:w-1/2 h-full relative flex items-center justify-center">
                            {/* Rotating Shipping Image */}
                            <div className="relative w-48 h-48">
                                <Image
                                    ref={shippingImageRef}
                                    src="/shippinng.webp"
                                    alt="Global Shipping"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BusinessExcellence;
