'use client';

import React from 'react';
import { Database, Cpu, CheckCircle } from 'lucide-react';

export default function TechAndDataServices() {
    return (
        <section className="py-24 bg-[#111111] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Data Services */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                            <Database size={16} />
                            <span>Data Infrastructure</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">Data Services</h2>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            Structured support for data handling, validation, and processing to improve accuracy, control, and reporting consistency.
                        </p>
                        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                            <h3 className="text-lg font-semibold mb-2 text-white">Core Capabilities</h3>
                            <ul className="space-y-2 text-zinc-400">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-500" />
                                    Data Validation & Cleansing
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-500" />
                                    Structured Processing
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-blue-500" />
                                    Reporting Consistency
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Technology Enablement */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                            <Cpu size={16} />
                            <span>Internal Capabilities</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">Technology Enablement</h2>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            Technology is deployed as an internal capability to strengthen operational control and service consistency.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Workflow orchestration', 'Knowledge repositories', 'Performance dashboards', 'Secure data handling'].map((item, index) => (
                                <div key={index} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-zinc-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-sm text-zinc-500 italic border-l-2 border-zinc-800 pl-4">
                            These capabilities enhance efficiency without forming independent revenue products.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
