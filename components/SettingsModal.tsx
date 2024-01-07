import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useUserSettings } from '@/hooks/use-Settings';

const SettingsModal = () => {
    const settings = useUserSettings();
    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent className='border-b pb-3'>
                <h2 className='text-lg font-medium'>My settings</h2>
            </DialogContent>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-y-1'>
                    <Label>Appearance</Label>
                    <span>Customize how Notion looks on your device</span>
                </div>
            </div>
        </Dialog>
    );
};

export default SettingsModal;
