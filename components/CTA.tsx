'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black" ref={containerRef}>
            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/10 px-6 py-24 sm:py-32 lg:px-8 text-center shadow-2xl">

                    {/* Background Gradients */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6"
                        >
                            Ready to Scaling <br className="hidden sm:block" /> Without Boundaries?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
                        >
                            Join the industry leaders leveraging JavaGAP for structured, global operational excellence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-slate-200 text-lg h-14 px-8 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
                                >
                                    Start Building Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
