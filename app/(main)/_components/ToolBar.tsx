import IconPicker from '@/components/icon-picker';
import { Doc } from '@/convex/_generated/dataModel';
import React from 'react';

interface TollBarProps {
    initialData: Doc<'documents'>;
    preview?: boolean;
}

const ToolBar = ({ initialData, preview }: TollBarProps) => {
    return (
        <div className='pl-[54px] group relative'>
            {!!initialData?.icon && !preview && (
                <div className='flex items-center gap-x-2 group/icon pt-6'>
                    <IconPicker onChange={() => {}}>
                        <p className='text-6xl hover:opacity-75 transition'>
                            {initialData.icon}
                        </p>
                    </IconPicker>
                </div>
            )}
        </div>
    );
};

export default ToolBar;
