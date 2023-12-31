'use client';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { redirect, useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Item } from './item';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';

interface DocumentListProps {
    parentDocumentId?: Id<'documents'>;
    level?: number;
    data?: Doc<'documents'>;
}

export const DocumentList = ({
    parentDocumentId,
    level = 0,
    data
}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (documentId: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }));
    };
    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    });
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };
    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        );
    }
    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined
                }}
                className={cn(
                    'hidden text-sm font-medium text-muted-foreground/80',
                    expanded && 'last:block',
                    level === 0 && 'hidden'
                )}
            >
                No pages inside
            </p>
            {documents.map((item) => (
                <div key={item._id}>
                    <Item
                        id={item._id}
                        onClick={() => {
                            onRedirect(item._id);
                        }}
                        label={item.title}
                        icon={FileIcon}
                        documentIcon={item.icon}
                        active={parentDocumentId === item._id}
                        level={level}
                        onExpand={() => {
                            onExpand(item._id);
                        }}
                        expanded={expanded[item._id]}
                    />
                    {expanded[item._id] && (
                        <DocumentList
                            parentDocumentId={item._id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    );
};
