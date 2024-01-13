'use client';
import React from 'react';
import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { useTheme } from 'next-themes';
import '@blocknote/react/style.css';

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        }
    });

    console.log(editor, 'ssss');

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            />
        </div>
    );
};

export default Editor;
