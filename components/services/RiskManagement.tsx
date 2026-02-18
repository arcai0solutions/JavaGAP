'use client';

import React from 'react';
import { ShieldAlert, Lock, TrendingUp, CheckCircle, FileText, Activity } from 'lucide-react';

const risks = [
    { title: 'Market diversification risk', icon: TrendingUp, color: 'text-blue-400' },
    { title: 'Service continuity risk', icon: ShieldAlert, color: 'text-rose-400' },
    { title: 'Data & information security', icon: Lock, color: 'text-emerald-400' },
    { title: 'Operational scaling risk', icon: Activity, color: 'text-amber-400' }
];

export default function RiskManagement() {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                <div className="mb-24 text-center md:text-left">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold tracking-wide uppercase mb-6 border border-red-500/20">
                        Governance & Control
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6">
                        Risk Management
                    </h2>
                    <p className="text-xl text-zinc-300 max-w-2xl leading-relaxed">
                        Key risks are managed through structured controls, standardized processes, and rigorous oversight mechanisms.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Key Risks Area - Spans 7 columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {risks.map((risk, index) => (
                            <div key={index} className="group bg-zinc-900/30 border border-white/10 p-10 rounded-[2rem] hover:bg-zinc-900/60 hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[220px]">
                                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${risk.color} mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
                                    <risk.icon size={30} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                                    {risk.title}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Mitigation & Policies Area - Spans 5 columns */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Mitigation Card */}
                        <div className="flex-1 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                <ShieldAlert size={180} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Mitigation Strategy</h3>
                            <p className="text-zinc-300 leading-relaxed relative z-10 mb-8">
                                Mitigation is achieved through standardized processes, secure systems, and periodic internal reviews. Every operational step consists of multiple checkpoints.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 relative z-10">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>Standardized Workflows</span>
                            </div>
                        </div>

                        {/* Policies Card */}
                        <div className="flex-1 bg-zinc-900/30 border border-white/10 p-10 rounded-[2.5rem] hover:bg-zinc-900/50 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-6">Internal Policies</h3>
                            <ul className="space-y-4">
                                {['Financial control & reporting', 'Information security protocols', 'Operational monitoring', 'HR governance'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-zinc-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
