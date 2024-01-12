'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useCoverImage } from '@/hooks/use-cover-Image';

export const CoverImageModal = () => {
    const { isOpen, onClose } = useCoverImage();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <h2 className='text-center text-lg font-semibold'>
                        Cover Image
                    </h2>
                </DialogHeader>
                <div>TODO: upload image</div>
            </DialogContent>
        </Dialog>
    );
};
