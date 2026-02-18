'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Loader2, Mail, Phone, Building } from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    source: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to load contacts');
        } else {
            setContacts(data || []);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between glass-panel p-4 rounded-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Contacts</h2>
            </div>

            <div className="glass-panel p-6 rounded-3xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200/50 hover:bg-transparent">
                            <TableHead className="text-gray-600 font-bold">Name</TableHead>
                            <TableHead className="text-gray-600 font-bold">Email</TableHead>
                            <TableHead className="text-gray-600 font-bold">Company</TableHead>
                            <TableHead className="text-gray-600 font-bold">Source</TableHead>
                            <TableHead className="text-gray-600 font-bold">Added Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No contacts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <TableRow key={contact.id} className="hover:bg-white/40 border-b border-gray-100/20 transition-colors">
                                    <TableCell className="font-medium text-gray-700">{contact.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Mail className="w-3 h-3 text-blue-500" />
                                            {contact.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {contact.company && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Building className="w-3 h-3 text-gray-400" />
                                                {contact.company}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="capitalize text-gray-600">
                                        <span className="bg-white/50 px-2 py-1 rounded-md border border-gray-100 text-xs font-semibold">
                                            {contact.source?.replace('_', ' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {format(new Date(contact.created_at), 'MMM d, yyyy')}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
