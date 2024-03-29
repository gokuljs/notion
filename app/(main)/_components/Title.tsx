'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import React, { FC, useRef, useState } from 'react';

interface TitleProps {
    initialData: Doc<'documents'>;
}

interface TitleComponent extends FC<TitleProps> {
    Skeleton: FC;
    displayName?: string;
}
const Title: TitleComponent = ({ initialData }) => {
    const update = useMutation(api.documents.update);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState(initialData?.title || '');
    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(
                0,
                inputRef.current.value.length
            );
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        update({
            id: initialData._id,
            title: event.target.value || 'untitled'
        });
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            disableInput();
        }
    };
    return (
        <div className='flex items-center gap-x-1'>
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className='h-7 px-2 focus-visible:ring-transparent'
                />
            ) : (
                <Button
                    variant={'ghost'}
                    onClick={enableInput}
                    size={'sm'}
                    className='font-normal h-auto p-1'
                >
                    <span className='truncate'>{initialData?.title}</span>
                </Button>
            )}
        </div>
    );
};

export default Title;

Title.displayName = 'Title';

Title.Skeleton = () => {
    return <Skeleton className='h-9 w-16 rounded-md' />;
};

Title.Skeleton.displayName = 'Cover.Skeleton';
