'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutClosing() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { y: 50, opacity: 0, filter: 'blur(10px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 sm:px-12 bg-black text-white text-justify sm:text-center flex items-center justify-center min-h-[60vh]">
            <div className="max-w-4xl mx-auto">
                <h2 ref={textRef} className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                    "We are positioned as a scalable export services platform within an established international group structure, supporting operational stability and sustained foreign revenue generation through cross-border service delivery."
                </h2>
            </div>
        </section>
    );
}
