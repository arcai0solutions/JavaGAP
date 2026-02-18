import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactCardProps {
    icon: LucideIcon;
    title: string;
    details: string[];
    action?: {
        label: string;
        href: string;
    };
    delay?: number;
}

export default function ContactCard({ icon: Icon, title, details, action, delay = 0 }: ContactCardProps) {
    return (
        <div
            className="group relative bg-[#0a0a0a] rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/5 hover:border-white/10 shadow-xl"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Background Gradient Blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00AEEF]/20 rounded-full blur-3xl group-hover:bg-[#00AEEF]/30 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">

                {/* 3D Icon Container */}
                <div className="relative">
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00AEEF] to-[#005495] flex items-center justify-center shadow-lg shadow-blue-500/30 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        {/* Inner bevel effect */}
                        <div className="absolute inset-[1px] rounded-[14px] bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                        <Icon className="w-8 h-8 text-white drop-shadow-md" />

                        {/* Notification Dot (Optional decorative element) */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <div className="w-2 h-2 bg-[#00AEEF] rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <div className="space-y-1">
                        {details.map((detail, index) => (
                            <p key={index} className="text-gray-400 text-sm leading-relaxed font-medium">
                                {detail}
                            </p>
                        ))}
                    </div>

                    {action && (
                        <a
                            href={action.href}
                            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#00AEEF] hover:text-white transition-colors"
                        >
                            {action.label}
                            <span className="text-lg leading-none">↗</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
