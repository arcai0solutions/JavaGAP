'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import CRMColumn from './CRMColumn';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Pipeline {
    id: string;
    name: string;
    order: number;
}

interface Lead {
    id: string;
    company_name: string;
    contact_name: string;
    email: string;
    phone?: string;
    created_at: string;
    pipeline_id: string;
    order: number;
}

export default function CRMBoard() {
    const [pipelines, setPipelines] = useState<Pipeline[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // Fetch Pipelines
        const { data: pipelinesData } = await supabase
            .from('crm_pipelines')
            .select('*')
            .order('order');

        // Fetch Leads
        const { data: leadsData } = await supabase
            .from('crm_leads')
            .select('*')
            .order('order');

        if (pipelinesData) setPipelines(pipelinesData);
        if (leadsData) setLeads(leadsData);
        setLoading(false);
    };

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourcePipelineId = source.droppableId;
        const destPipelineId = destination.droppableId;

        // Optimistic Update
        const newLeads = Array.from(leads);
        const movedLeadIndex = newLeads.findIndex((l) => l.id === draggableId);
        if (movedLeadIndex === -1) return;

        const movedLead = { ...newLeads[movedLeadIndex] };

        // Remove from old position
        // We strictly filter by pipeline to find the correct indices within the visual column
        // But since we have a flat list of leads, this logic is tricky.
        // Easier approach: update the lead's pipeline_id and re-sort/re-order locally.

        movedLead.pipeline_id = destPipelineId;
        newLeads[movedLeadIndex] = movedLead;
        setLeads(newLeads);

        try {
            // Update DB
            const { error } = await supabase
                .from('crm_leads')
                .update({ pipeline_id: destPipelineId })
                .eq('id', draggableId);

            if (error) throw error;
            toast.success('Lead updated');
        } catch (error) {
            toast.error('Failed to update lead');
            fetchData(); // Revert on error
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    const handleDeleteLead = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;

        const { error } = await supabase.from('crm_leads').delete().eq('id', id);

        if (error) {
            toast.error('Failed to delete lead');
        } else {
            toast.success('Lead deleted');
            setLeads(leads.filter(l => l.id !== id));
        }
    };



    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex h-full gap-4 overflow-x-auto pb-4">
                    {pipelines.map((pipeline) => {
                        const pipelineLeads = leads
                            .filter((lead) => lead.pipeline_id === pipeline.id)
                            .sort((a, b) => a.order - b.order);

                        return (
                            <CRMColumn
                                key={pipeline.id}
                                pipeline={pipeline}
                                leads={pipelineLeads}
                                onDelete={handleDeleteLead}
                                onPreview={setSelectedLead}
                            />
                        );
                    })}
                </div>
            </DragDropContext>

            {/* Lead Preview Dialog */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedLead.company_name}</h3>
                                <p className="text-sm text-gray-500">{selectedLead.contact_name}</p>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl space-y-1">
                                <p className="text-xs text-gray-400 uppercase font-semibold">Contact Details</p>
                                <p className="text-sm font-medium">{selectedLead.email}</p>
                                {selectedLead.phone && <p className="text-sm text-gray-600">{selectedLead.phone}</p>}
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl space-y-1">
                                <p className="text-xs text-blue-400 uppercase font-semibold">Created</p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    {new Date(selectedLead.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
