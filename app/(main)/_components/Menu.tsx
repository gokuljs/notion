'use client';
import { Id } from '@/convex/_generated/dataModel';
import React, { FC } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuProps {
    documentId: Id<'documents'>;
}

interface MenuComponent extends FC<MenuProps> {
    Skeleton: FC;
    displayName?: string;
}
const Menu: MenuComponent = ({ documentId }) => {
    const { user } = useUser();
    const router = useRouter();
    const archive = useMutation(api.documents.archive);
    const onArchive = () => {
        const promise = archive({ id: documentId });
        toast.promise(promise, {
            loading: 'Moving to trash...',
            success: ' Note Moved to trash',
            error: 'Failed to archive note'
        });
        router.push('/documents');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'sm'} variant={'ghost'}>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-60'
                align='end'
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className='h-4 w-4 mr-2 ' />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className='text-xs text-muted-foreground p-2'>
                    last Edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.displayName = 'Menu';

Menu.Skeleton = () => {
    return <Skeleton className='h-10 w-10' />;
};
Menu.Skeleton.displayName = 'Cover.Skeleton';

export default Menu;
