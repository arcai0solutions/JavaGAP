'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyChooseUs() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const fullText = "We operate as a Sri Lanka-based global delivery and execution hub under a structured group model. Operations are built around standardized processes, centralized governance, scalable human resources, and secure digital infrastructure.";

    // Split text into individual words
    const words = fullText.split(' ');

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // Better approach: use a loop to animate groups
            const totalGroups = Math.ceil(words.length / 3);
            for (let i = 0; i < totalGroups; i++) {
                tl.fromTo(`.group-${i}`,
                    { opacity: 0, y: 20, filter: 'blur(10px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: "power2.out" },
                    i * 0.15 // Absolute delay for each group
                );
            }

        }, containerRef);

        return () => ctx.revert();
    }, [words.length]);

    return (
        <section ref={containerRef} className="bg-white text-black py-32 sm:py-48 px-6 sm:px-12 lg:px-20 border-t border-zinc-200">
            <div className="max-w-5xl mx-auto">
                <p ref={textRef} className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.6] text-zinc-900 text-justify tracking-wide">
                    {words.map((word, index) => (
                        <React.Fragment key={index}>
                            <span className={`word-span inline-block group-${Math.floor(index / 3)}`}>
                                {word}
                            </span>
                            {' '}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </section>
    );
}
