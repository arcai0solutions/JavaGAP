'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function GroupStructure() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const fullText = "Strategic oversight, service standards, and market engagement are guided by the parent company, while execution, monitoring, and delivery functions are centralized within the Sri Lankan operation.";
    const words = fullText.split(' ');

    const benefits = [
        { image: "/Continuity of operations.png", text: "Continuity of operations" },
        { image: "/Established service governance.png", text: "Established service governance" },
        { image: "/Controlled scaling of resources.png", text: "Controlled scaling of resources" },
        { image: "/Clear accountability across jurisdictions.png", text: "Clear accountability across jurisdictions" },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Text Color Reveal Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            const totalGroups = Math.ceil(words.length / 3);
            for (let i = 0; i < totalGroups; i++) {
                tl.fromTo(`.group-struct-${i}`,
                    { opacity: 0.1, filter: 'blur(5px)' },
                    { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: "power2.out" },
                    i * 0.1
                );
            }

            // List Animation
            if (listRef.current) {
                gsap.fromTo(listRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, [words.length]);

    return (
        <section ref={containerRef} className="bg-white text-black py-24 px-6 sm:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Side */}
                <div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-[#00AEEF] mb-8">Group Structure</h2>
                    <p ref={textRef} className="text-lg sm:text-3xl font-medium leading-[1.5] text-zinc-900 tracking-normal sm:tracking-wide text-justify sm:text-left">
                        {words.map((word, index) => (
                            <React.Fragment key={index}>
                                <span className={`inline-block group-struct-${Math.floor(index / 3)} transition-all duration-300`}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                {/* Benefits List Side */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-bold mb-6 text-slate-800 text-center sm:text-left">What the group structure enables</h3>
                    <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {benefits.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center gap-2 p-2 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <Image
                                    src={item.image}
                                    alt={item.text}
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                                <span className="text-lg font-medium text-slate-700 leading-tight">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
