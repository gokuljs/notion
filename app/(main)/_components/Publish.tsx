'use client';
import { Doc } from '@/convex/_generated/dataModel';
import React, { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import useOrigin from '@/hooks/useOrigin';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Check, Copy, Globe } from 'lucide-react';

interface PublishProps {
    initialData: Doc<'documents'>;
}

function Publish({ initialData }: PublishProps) {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);
    const [copied, setCopied] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);
    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublished: true
        }).finally(() => {
            setIsSubmitting(false);
        });

        toast.promise(promise, {
            loading: 'Publishing...',
            success: 'Note Published',
            error: 'Failed publish Note'
        });
    };
    const onUnPublish = () => {
        setIsSubmitting(true);
        const promise = update({
            id: initialData._id,
            isPublished: false
        }).finally(() => {
            setIsSubmitting(false);
        });

        toast.promise(promise, {
            loading: 'UnPublishing...',
            success: 'Note unpublished.',
            error: 'Failed to publish note.'
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'ghost'}>
                    Publish
                    {initialData?.isPublished && (
                        <Globe className='text-sky-500 w-4 h-4 ml-2' />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-72' align='end' alignOffset={8}>
                {initialData.isPublished ? (
                    <div className='space-y-4'>
                        <div className='flex items-center gap-x-2'>
                            <Globe className='text-sky-500 animate-pulse h-4 w-4' />
                            <p className='tex-xs font-medium'>
                                This note is live on web
                            </p>
                        </div>
                        <div className='flex items-center'>
                            <input
                                className='flex-1 px-2 text-xs rounded-l-md h-8 bg-muted truncate'
                                value={url}
                                disabled
                            />
                            <Button className='h-8 rounded-l-none'>
                                {copied ? (
                                    <Check className='h-4 w-4' />
                                ) : (
                                    <Copy
                                        className='h-4 w-4'
                                        onClick={onCopy}
                                    />
                                )}
                            </Button>
                        </div>
                        <Button
                            size='sm'
                            className='w-full text-xs'
                            disabled={submitting}
                            onClick={onUnPublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center'>
                        <Globe className='h-8 w-8 text-muted-foreground mb-2' />
                        <p className='text-sm font-medium mb-2'>
                            Publish this note
                        </p>
                        <span className='text-xs text-muted-foreground mb-4'>
                            Share your work with others
                        </span>
                        <Button
                            disabled={submitting}
                            onClick={onPublish}
                            className='w-full text-xs'
                            size='sm'
                        >
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

export default Publish;
