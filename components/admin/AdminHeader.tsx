'use client';

import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminHeader({ title }: { title: string }) {
    return (
        <header className="flex items-center justify-between py-6 px-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">{title}</h1>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search..."
                        className="glass-input pl-10 h-11 rounded-2xl border-none text-sm placeholder:text-gray-400"
                    />
                </div>

                <button className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Bell className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-2 border-l border-gray-200/50">
                    <Avatar className="h-10 w-10 border-2 border-white/50 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
