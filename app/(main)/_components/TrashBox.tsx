'use client';
import ConfirmModal from '@/components/modals/confirmModal';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useDeferredValue, useState } from 'react';
import { toast } from 'sonner';

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);
    const [search, setSearch] = useState('');
    const deferredQuery = useDeferredValue(search);
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });
    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };
    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<'documents'>
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });
        toast.promise(promise, {
            loading: 'Restoring Note ...',
            success: 'Note restored',
            error: 'Failed to restore note.'
        });
    };
    const onRemove = (documentId: Id<'documents'>) => {
        const promise = remove({ id: documentId });
        toast.promise(promise, {
            loading: 'Deleting Note ...',
            success: 'Note Deleted!',
            error: 'Failed to Delete Note.'
        });
        if (params.documentId === documentId) {
            router.push('/documents');
        }
    };
    if (documents === undefined) {
        return (
            <div className='h-full flex items-center justify-center'>
                <Spinner size='lg' />
            </div>
        );
    }
    return (
        <div className='text-sm'>
            <div className='flex item-center justify-center gap-x-1 p-2'>
                <div className='flex items-center justify-center'>
                    <Search className='h-4 w-4' />
                </div>
                <Input
                    value={deferredQuery}
                    onChange={(e) => setSearch(e.target.value)}
                    className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
                    placeholder='Filter by page title'
                />
            </div>
            <div className='mt-2 px-1 pb-1'>
                <p className='last:block text-xs text-center text-muted-foreground pb-2'>
                    No documents found
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        role='button'
                        onClick={() => onClick(document._id)}
                        className='text-sm rounded-sm w-full hover:bg-primary/flex flex items-center text-primary justify-between'
                    >
                        <span>{document?.title}</span>
                        <div className='truncate pl-2 flex items-center'>
                            <div
                                onClick={(e) => onRestore(e, document._id)}
                                role='button'
                                className='rounded-sm p-2 hover:bg-neutral-200'
                            >
                                <Undo className='h-4 w-4 text-muted-foreground' />
                            </div>
                            <ConfirmModal
                                onConfirm={() => {
                                    onRemove(document._id);
                                }}
                            >
                                <div
                                    role='button'
                                    className='rounded-sm p-2 hover:bg-neutral-200'
                                >
                                    <Trash className='h-4 w-4 text-muted-foreground' />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrashBox;
