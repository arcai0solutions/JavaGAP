'use client';

import { Droppable } from '@hello-pangea/dnd';
import CRMCard from './CRMCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Pipeline {
    id: string;
    name: string;
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

interface CRMColumnProps {
    pipeline: Pipeline;
    leads: Lead[];
    onDelete: (id: string) => void;
    onPreview: (lead: Lead) => void;
}

export default function CRMColumn({ pipeline, leads, onDelete, onPreview }: CRMColumnProps) {
    return (
        <div className="flex flex-col h-full w-80 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-sm">{pipeline.name}</h3>
                <span className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">
                    {leads.length}
                </span>
            </div>

            <ScrollArea className="flex-1 p-3">
                <Droppable droppableId={pipeline.id}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`min-h-[150px] transition-colors rounded-md ${snapshot.isDraggingOver ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                                }`}
                        >
                            {leads.map((lead, index) => (
                                <CRMCard
                                    key={lead.id}
                                    lead={lead}
                                    index={index}
                                    onDelete={onDelete}
                                    onPreview={onPreview}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </ScrollArea>
        </div>
    );
}
