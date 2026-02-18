'use client';

import { useState } from 'react';
import CRMBoard from '@/components/crm/CRMBoard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function CRMPage() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isAddPipelineOpen, setIsAddPipelineOpen] = useState(false);
    const [newLead, setNewLead] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: ''
    });
    const [newPipeline, setNewPipeline] = useState('');

    const handleAddLead = async () => {
        if (!newLead.companyName || !newLead.contactName || !newLead.email) {
            toast.error("Please fill in required fields");
            return;
        }

        try {
            // Get first pipeline
            const { data: pipelines } = await supabase
                .from('crm_pipelines')
                .select('id')
                .order('order')
                .limit(1)
                .single();

            if (!pipelines) {
                toast.error('No pipelines found');
                return;
            }

            // 1. Check/Insert Contact
            // Using upsert based on email to ensure uniqueness and persistence
            const { data: contactData, error: contactError } = await supabase
                .from('contacts')
                .upsert(
                    {
                        name: newLead.contactName,
                        email: newLead.email,
                        phone: newLead.phone,
                        company: newLead.companyName,
                        source: 'crm_manual'
                    },
                    { onConflict: 'email' }
                )
                .select('id')
                .single();

            if (contactError) throw contactError;

            // 2. Create Lead
            const { error } = await supabase.from('crm_leads').insert([
                {
                    company_name: newLead.companyName,
                    contact_name: newLead.contactName,
                    email: newLead.email,
                    phone: newLead.phone,
                    pipeline_id: pipelines.id,
                    contact_id: contactData.id // Link to the persistent contact
                },
            ]);

            if (error) throw error;

            toast.success('Lead and Contact added successfully');
            setIsAddDialogOpen(false);
            setNewLead({ companyName: '', contactName: '', email: '', phone: '' });

            window.location.reload();
        } catch (error) {
            toast.error('Failed to add lead');
            console.error(error);
        }
    };

    const handleAddPipeline = async () => {
        if (!newPipeline) return;

        try {
            const { error } = await supabase.from('crm_pipelines').insert([
                {
                    name: newPipeline,
                },
            ]);

            if (error) throw error;

            toast.success('Pipeline added successfully');
            setIsAddPipelineOpen(false);
            setNewPipeline('');
            window.location.reload(); // Reload to show new pipeline
        } catch (error) {
            toast.error('Failed to add pipeline');
            console.error('Error adding pipeline:', error);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] space-y-6">
            <div className="flex items-center justify-between glass-panel p-4 rounded-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">CRM</h2>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white/50 border-0 hover:bg-white/80" onClick={() => setIsAddPipelineOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Pipeline
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lead
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden glass-panel p-6 rounded-3xl">
                <CRMBoard />
            </div>

            {/* Add Lead Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Lead</DialogTitle>
                        <DialogDescription>
                            Create a new lead card for the CRM.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                value={newLead.companyName}
                                onChange={(e) =>
                                    setNewLead({ ...newLead, companyName: e.target.value })
                                }
                                placeholder="Acme Corp"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contactName">Contact Name</Label>
                            <Input
                                id="contactName"
                                value={newLead.contactName}
                                onChange={(e) =>
                                    setNewLead({ ...newLead, contactName: e.target.value })
                                }
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newLead.email}
                                onChange={(e) =>
                                    setNewLead({ ...newLead, email: e.target.value })
                                }
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={newLead.phone}
                                onChange={(e) =>
                                    setNewLead({ ...newLead, phone: e.target.value })
                                }
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddLead}>Add Lead</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Pipeline Dialog */}
            <Dialog open={isAddPipelineOpen} onOpenChange={setIsAddPipelineOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Pipeline</DialogTitle>
                        <DialogDescription>
                            Create a new column for your CRM board.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="pipeline-name">Pipeline Name</Label>
                            <Input
                                id="pipeline-name"
                                value={newPipeline}
                                onChange={(e) => setNewPipeline(e.target.value)}
                                placeholder="e.g. Negotiation"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddPipelineOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddPipeline}>Add Pipeline</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
