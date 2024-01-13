'use client';
import Cover from '@/app/(main)/_components/Cover';
import ToolBar from '@/app/(main)/_components/ToolBar';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React from 'react';

interface DocumentIdProps {
    params: {
        documentId: Id<'documents'>;
    };
}

const DocumentIdPage = ({ params }: DocumentIdProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });
    if (document === undefined) {
        return <div>loading ....</div>;
    }
    if (document === null) {
        return <div>Not found</div>;
    }
    return (
        <div className='pb-40'>
            <Cover url={document.coverImage} />
            <div className='md:max-w-3xl lg:max-4-xl '>
                <ToolBar initialData={document} />
            </div>
        </div>
    );
};

export default DocumentIdPage;
