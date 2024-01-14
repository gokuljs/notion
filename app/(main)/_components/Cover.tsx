'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-Image';
import { useEdgeStore } from '@/lib/edgestore';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

interface CoverImageProps {
    url?: string;
    preview?: boolean;
    isArchived?: boolean;
}
interface CoverComponent extends FC<CoverImageProps> {
    Skeleton: FC;
    displayName?: string;
}
const Cover: CoverComponent = ({ url, preview, isArchived }) => {
    const [mounted, setIsMounted] = useState(false);
    const params = useParams();
    const coverImage = useCoverImage();
    const remove = useMutation(api.documents.removeCoverImage);
    const { edgestore } = useEdgeStore();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const removeImage = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            });
            remove({
                id: params.documentId as Id<'documents'>
            });
        }
    };
    if (!mounted) {
        return null;
    }
    return (
        <div
            className={cn(
                'w-full h-[35vh] relative group mt-14',
                !url && 'h-[12vh]',
                url && 'bg-muted',
                isArchived && 'mt-24',
                preview && 'mt-0'
            )}
        >
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt='Cover'
                    className='object-cover object-center'
                />
            )}
            {!!url && !preview && (
                <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className='text-muted-foreground text-xs'
                        variant='outline'
                        size='sm'
                    >
                        <ImageIcon className='h-4 w-4 mr-2' />
                        Change Cover
                    </Button>
                    <Button
                        onClick={removeImage}
                        className='text-muted-foreground text-xs'
                        variant='outline'
                        size='sm'
                    >
                        <X className='h-4 w-4 mr-2' />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Cover;

Cover.displayName = 'Cover';

Cover.Skeleton = () => {
    return <Skeleton className='w-full h-[12vh]' />;
};

Cover.Skeleton.displayName = 'Cover.Skeleton';
