'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ServicesClosing() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-blue-500 mb-8">
                    <MessageSquare size={32} />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Start Your Engagement
                </h2>

                <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                    To scope a service engagement, contact us with your required service type, scope summary, timeline, and reporting expectations.
                </p>

                <Link href="/contact">
                    <Button
                        size="lg"
                        className="bg-[#00AEEF] hover:bg-[#008fca] text-white text-lg h-14 px-8 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.5)] group"
                    >
                        Request a service discussion
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
