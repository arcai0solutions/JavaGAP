'use client';

import React from 'react';
import { Database, Cpu, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TechAndDataServices() {
    return (
        <section className="py-24 bg-white text-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Data Services */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 text-[#00AEEF] text-sm font-medium border border-blue-100">
                            <Database size={16} />
                            <span>Data Infrastructure</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">Data Services</h2>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Structured support for data handling, validation, and processing to improve accuracy, control, and reporting consistency.
                        </p>
                        <div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                            <h3 className="text-lg font-semibold mb-6 text-zinc-900">Core Capabilities</h3>
                            <ul className="space-y-4 text-zinc-600">
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-[#00AEEF] flex-shrink-0" />
                                    Data Validation & Cleansing
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-[#00AEEF] flex-shrink-0" />
                                    Structured Processing
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-[#00AEEF] flex-shrink-0" />
                                    Reporting Consistency
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Technology Enablement */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 text-[#00AEEF] text-sm font-medium border border-blue-100">
                            <Cpu size={16} />
                            <span>Internal Capabilities</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">Technology Enablement</h2>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Technology is deployed as an internal capability to strengthen operational control and service consistency.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Workflow orchestration', 'Knowledge repositories', 'Performance dashboards', 'Secure data handling'].map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -4 }}
                                    className="p-5 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-center gap-3 hover:border-blue-100 transition-all duration-300"
                                >
                                    <div className="relative flex items-center justify-center w-3 h-3">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#00AEEF] opacity-75 animate-ping"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00AEEF]"></span>
                                    </div>
                                    <span className="text-zinc-700 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-sm text-zinc-500 italic border-l-2 border-zinc-200 pl-4 py-1">
                            These capabilities enhance efficiency without forming independent revenue products.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
