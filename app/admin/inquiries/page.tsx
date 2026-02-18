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
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRightCircle, Loader2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Inquiry {
    id: string;
    created_at: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
}

interface Pipeline {
    id: string;
    name: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [pipelines, setPipelines] = useState<Pipeline[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
    const [moveFormData, setMoveFormData] = useState({
        title: '',
        pipelineId: '',
    });

    const fetchInquiries = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('inquiries')
            .select('*')
            .neq('status', 'converted') // Filter out converted inquiries
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to load inquiries');
        } else {
            setInquiries(data || []);
        }
        setLoading(false);
    };

    const fetchPipelines = async () => {
        const { data } = await supabase.from('crm_pipelines').select('*').order('order');
        if (data) setPipelines(data);
    };

    useEffect(() => {
        fetchInquiries();
        fetchPipelines();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;

        const { error } = await supabase.from('inquiries').delete().eq('id', id);
        if (error) {
            toast.error('Failed to delete inquiry');
        } else {
            toast.success('Inquiry deleted');
            setInquiries(inquiries.filter((i) => i.id !== id));
        }
    };

    const openMoveDialog = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setMoveFormData({
            title: inquiry.subject || `Inquiry from ${inquiry.name}`,
            pipelineId: pipelines[0]?.id || '',
        });
        setIsMoveDialogOpen(true);
    };

    const handleMoveToCRM = async () => {
        if (!selectedInquiry || !moveFormData.pipelineId) return;

        try {
            // 1. Ensure Contact exists (upsert)
            const { data: contactData, error: contactError } = await supabase
                .from('contacts')
                .upsert(
                    {
                        name: selectedInquiry.name,
                        email: selectedInquiry.email,
                        source: 'inquiry_converted'
                    },
                    { onConflict: 'email' }
                )
                .select('id')
                .single();

            if (contactError) throw contactError;

            // 2. Create Lead linked to Contact
            const { error: leadError } = await supabase.from('crm_leads').insert([
                {
                    // Map inquiry fields to CRM fields
                    company_name: moveFormData.title,
                    contact_name: selectedInquiry.name,
                    email: selectedInquiry.email,
                    pipeline_id: moveFormData.pipelineId,
                    contact_id: contactData.id,
                    description: `From Inquiry:\nSubject: ${selectedInquiry.subject}\nMessage: ${selectedInquiry.message}`,
                },
            ]);

            if (leadError) throw leadError;

            // 2. Update Inquiry Status (optional, but good practice)
            await supabase
                .from('inquiries')
                .update({ status: 'converted' })
                .eq('id', selectedInquiry.id);

            toast.success('Moved to CRM successfully');
            setIsMoveDialogOpen(false);
            // Optimistically remove from list
            setInquiries(prev => prev.filter(i => i.id !== selectedInquiry.id));
        } catch (error) {
            toast.error('Failed to create lead');
        }
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
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Website Inquiries</h2>
            </div>

            <div className="glass-panel p-6 rounded-3xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200/50 hover:bg-transparent">
                            <TableHead className="text-gray-600 font-bold">Date</TableHead>
                            <TableHead className="text-gray-600 font-bold">Name</TableHead>
                            <TableHead className="text-gray-600 font-bold">Subject</TableHead>
                            <TableHead className="text-gray-600 font-bold">Message</TableHead>
                            <TableHead className="text-right text-gray-600 font-bold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No inquiries found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            inquiries.map((inquiry) => (
                                <TableRow key={inquiry.id} className="hover:bg-white/40 border-b border-gray-100/20 transition-colors">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-700">
                                        {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-bold text-gray-800">{inquiry.name}</div>
                                        <div className="text-xs text-blue-600">{inquiry.email}</div>
                                    </TableCell>
                                    <TableCell className="text-gray-700">{inquiry.subject}</TableCell>
                                    <TableCell className="max-w-md truncate text-gray-600" title={inquiry.message}>
                                        {inquiry.message}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openMoveDialog(inquiry)}
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white/50"
                                        >
                                            <ArrowRightCircle className="w-4 h-4 mr-1" />
                                            To CRM
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(inquiry.id)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Move to CRM</DialogTitle>
                        <DialogDescription>
                            Create a new lead from this inquiry.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="lead-title">Company Name</Label>
                            <Input
                                id="lead-title"
                                value={moveFormData.title}
                                onChange={(e) =>
                                    setMoveFormData({ ...moveFormData, title: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pipeline">Pipeline Stage</Label>
                            <Select
                                value={moveFormData.pipelineId}
                                onValueChange={(val) =>
                                    setMoveFormData({ ...moveFormData, pipelineId: val })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pipelines.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMoveDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleMoveToCRM}>Create Lead</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
