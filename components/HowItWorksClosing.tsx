'use client';

import React from 'react';
import Link from 'next/link';

export default function HowItWorksClosing() {
    return (
        <section className="py-24 px-6 sm:px-12 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight text-justify sm:text-center">
                    If you need cross-border support delivered under defined service frameworks, we can scope an engagement aligned to your overseas operating requirements.
                </h2>

                <div className="flex flex-col items-center gap-12">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-lg hover:scale-105 transition-transform duration-300"
                    >
                        Request a service discussion
                    </Link>

                    <div className="w-full max-w-2xl h-px bg-zinc-200 dark:bg-zinc-800" />

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-normal sm:tracking-widest px-4 text-justify sm:text-center">
                        All activities remain strictly export-oriented, delivering professional and technology-enabled services exclusively to overseas clients.
                    </p>
                </div>
            </div>
        </section>
    );
}
