'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
    {
        number: '01',
        title: 'Engagement scoping',
        description: 'We define the scope of the engagement, outlining deliverables, timelines, and key objectives to ensure alignment from day one.',
    },
    {
        number: '02',
        title: 'Resource planning',
        description: 'We identify and allocate the right resources and expertise needed to execute the project efficiently and effectively.',
    },
    {
        number: '03',
        title: 'Execution and supervision',
        description: 'Our team executes the plan with precision, maintaining rigorous supervision to ensure quality and adherence to timelines.',
    },
    {
        number: '04',
        title: 'Performance monitoring',
        description: 'We continuously monitor performance metrics to track progress, identify issues early, and ensure project success.',
    },
    {
        number: '05',
        title: 'Continuous improvement',
        description: 'We leverage insights and feedback to refine processes and outcomes, driving ongoing value and innovation.',
    },
];

export default function Process() {
    return (
        <div className="py-24 bg-white text-black">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column: Fixed Content */}
                <div className="lg:sticky lg:top-32 h-fit space-y-8">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <h2 className="text-sm font-medium tracking-wide text-gray-800 uppercase">
                            Our process
                        </h2>
                    </div>

                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                        How delivery works
                    </h3>

                    <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed max-w-lg">
                        Each client engagement follows a structured lifecycle to ensure predictable, high-quality outcomes.
                    </p>

                    <div className="pt-4">
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                className="rounded-full px-8 py-6 text-lg border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300 group"
                            >
                                Let&apos;s get started
                                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Scrolling Steps */}
                <div className="space-y-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group p-8 sm:p-10 rounded-2xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl transition-all duration-300"
                        >
                            <span className="block text-gray-400 text-lg sm:text-xl font-medium mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                {step.number}.
                            </span>
                            <h4 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                {step.title}
                            </h4>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
