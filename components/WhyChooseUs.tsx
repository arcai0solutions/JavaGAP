'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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

            // Animate images after text
            tl.to('.images-container', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out'
            }, "-=1.0"); // Start 1s before text finishes (overlap)

        }, containerRef);

        return () => ctx.revert();
    }, [words.length]);

    return (
        <section ref={containerRef} className="bg-white text-black py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-zinc-200">
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



                {/* Decor images */}
                <div className="images-container relative mt-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 opacity-0 translate-y-8">
                    {/* Image 1: Meeting */}
                    <div className="relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 rotate-[-3deg] hover:rotate-0 hover:z-10">
                        <Image
                            src="/her1.webp"
                            alt="Dubai Meeting Room"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Image 2: Architecture */}
                    <div className="relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 rotate-[3deg] hover:rotate-0 hover:z-10">
                        <Image
                            src="/her2.webp"
                            alt="Dubai Architecture"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                </div>
            </div>
        </section >
    );
}
