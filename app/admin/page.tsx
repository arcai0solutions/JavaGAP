'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { Wallet, TrendingUp, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal, Divide, CreditCard as CreditCardIcon, Briefcase, Activity } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import ActivityChart from '@/components/admin/ActivityChart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export default function AdminPage() {
    const [stats, setStats] = useState({
        totalInquiries: 0,
        pendingInquiries: 0,
        totalContacts: 0,
        totalLeads: 0,
        totalValue: 0,
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        // Load notes from local storage
        const savedNotes = localStorage.getItem('admin_dashboard_notes');
        if (savedNotes) setNotes(savedNotes);

        const fetchStats = async () => {
            // Inquiries
            const { count: inquiriesCount } = await supabase
                .from('inquiries')
                .select('*', { count: 'exact', head: true });

            const { count: pendingInquiriesCount } = await supabase
                .from('inquiries')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'new');

            // Contacts
            const { count: contactsCount } = await supabase
                .from('contacts')
                .select('*', { count: 'exact', head: true });

            // CRM Leads
            const { data: leads, count: leadsCount } = await supabase
                .from('crm_leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            // Set Stats
            setStats({
                totalInquiries: inquiriesCount || 0,
                pendingInquiries: pendingInquiriesCount || 0,
                totalContacts: contactsCount || 0,
                totalLeads: leadsCount || 0,
                // Mock value calculation purely for visual demo as 'value' field was removed
                totalValue: 0,
            });

            if (leads) {
                setRecentLeads(leads);
            }
        };

        fetchStats();
    }, []);

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setNotes(newValue);
        localStorage.setItem('admin_dashboard_notes', newValue);
    };

    return (
        <div className="space-y-6 pb-8 pt-6">

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                <StatCard
                    label="Total Inquiries"
                    value={stats.totalInquiries.toString()}
                    icon={Briefcase}
                    colorClass="bg-blue-100 text-blue-600"
                />
                <StatCard
                    label="Pending Inquiries"
                    value={stats.pendingInquiries.toString()}
                    icon={Activity}
                    colorClass="bg-yellow-100 text-yellow-600"
                />
                <StatCard
                    label="Active Leads"
                    value={stats.totalLeads.toString()}
                    icon={CreditCardIcon}
                    colorClass="bg-orange-100 text-orange-600"
                />
                <StatCard
                    label="Saved Contacts"
                    value={stats.totalContacts.toString()}
                    icon={Users}
                    colorClass="bg-emerald-100 text-emerald-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 mt-8">
                {/* Main Chart Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Inquiry Activity</h3>
                        </div>
                        <div className="relative">
                            <ActivityChart />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-3xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Quick Notes</h3>
                        </div>
                        <Textarea
                            value={notes}
                            onChange={handleNoteChange}
                            placeholder="Type your notes here..."
                            className="bg-white/50 border-none resize-none h-[200px] focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                    </div>

                    <div className="glass-panel p-6 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Leads</h3>
                            <button className="text-xs text-blue-500 font-semibold hover:underline">See all</button>
                        </div>
                        <div className="space-y-4">
                            {recentLeads.length > 0 ? recentLeads.map((lead) => (
                                <div key={lead.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600">
                                            <AvatarFallback className="rounded-xl font-bold bg-blue-100 text-blue-600">
                                                {lead.company_name?.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-colors">
                                                {lead.company_name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {lead.contact_name}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                        Pipeline
                                    </span>
                                </div>
                            )) : (
                                <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
