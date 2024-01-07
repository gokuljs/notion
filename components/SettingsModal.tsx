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
import { ModeToggle } from './mode-toggle';

const SettingsModal = () => {
    const settings = useUserSettings();
    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent className='border-b pb-3'>
                <DialogHeader className='border-b pb-3'>
                    <h2 className='text-lg font-medium'>My settings</h2>
                </DialogHeader>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-1'>
                        <Label>Appearance</Label>
                        <span className='text-[0.8rem] text-muted-foreground'>
                            Customize how Notion looks on your device
                        </span>
                    </div>
                    <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
