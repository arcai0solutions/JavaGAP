import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    subValue?: string;
    icon: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    colorClass?: string;
}

export default function StatCard({ label, value, subValue, icon: Icon, colorClass = "bg-blue-500 text-white" }: StatCardProps) {
    return (
        <div className="glass-panel p-6 rounded-3xl flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="space-y-1">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</p>
                <h3 className="text-2xl font-black text-black dark:text-white">{value}</h3>
                {subValue && (
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                        {subValue}
                    </span>
                )}
            </div>
            <div className={`p-4 rounded-2xl ${colorClass} shadow-lg shadow-current/20`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
