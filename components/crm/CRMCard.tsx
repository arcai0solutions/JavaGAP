'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Trash2 } from 'lucide-react';

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

interface CRMCardProps {
    lead: Lead;
    index: number;
}

export default function CRMCard({ lead, index, onDelete, onPreview }: CRMCardProps & { onDelete: (id: string) => void; onPreview: (lead: Lead) => void }) {
    return (
        <Draggable draggableId={lead.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-3 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                    style={{ ...provided.draggableProps.style }}
                >
                    <Card className="hover:shadow-md transition-all cursor-grab active:cursor-grabbing border-none shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group">
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start gap-2">
                                <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-tight line-clamp-2">
                                    {lead.company_name}
                                </CardTitle>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onPreview(lead); }}
                                        className="p-1 hover:bg-blue-50 rounded text-blue-500 transition-colors"
                                        title="Preview"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDelete(lead.id); }}
                                        className="p-1 hover:bg-red-50 rounded text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">{lead.contact_name}</p>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="flex justify-between items-end mt-3 border-t border-gray-100 pt-3">
                                <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full">
                                    {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
}
