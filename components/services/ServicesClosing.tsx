'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesClosing() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
            {/* Floating Card Container */}
            <div className="max-w-7xl mx-auto bg-white rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">


                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-zinc-900">
                        Start Your Engagement
                    </h2>

                    <p className="text-base sm:text-xl text-zinc-600 mb-10 leading-relaxed max-w-2xl mx-auto text-justify sm:text-center">
                        Ready to begin? Contact us with your required service type, scope summary, timeline, and reporting expectations to initiate your engagement.
                    </p>

                    <div className="flex justify-center">
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="bg-[#00AEEF] hover:bg-[#008fca] text-white text-lg h-16 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.5)] group"
                            >
                                Request a service discussion
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
