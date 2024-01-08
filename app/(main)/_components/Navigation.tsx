'use client';
import { cn } from '@/lib/utils';
import {
    ChevronsLeft,
    MenuIcon,
    PlusCircle,
    Search,
    Settings,
    Trash
} from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import UserItem from './UserItem';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Item } from './item';
import { toast } from 'sonner';
import { DocumentList } from './DocumentList';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import TrashBox from './TrashBox';
import { useSearch } from '@/hooks/use-search';
import { useUserSettings } from '@/hooks/use-Settings';
import Navbar from './Navbar';

const Navigation = () => {
    const isMobile = useMediaQuery('(max-width : 768px)');
    const search = useSearch();
    const settings = useUserSettings();
    const params = useParams();
    const pathName = usePathname();
    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<'aside'>>(null);
    const navBarRef = useRef<HTMLDivElement>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const create = useMutation(api.documents.create);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizingRef.current) {
            let newWidth = e.clientX;
            if (newWidth < 240) newWidth = 240;
            if (newWidth > 480) newWidth = 480;
            const sideBar = sideBarRef.current;
            const navbar = navBarRef.current;
            if (sideBar && navbar) {
                sideBar.style.width = `${newWidth}px`;
                navbar.style.setProperty('left', `${newWidth}px`);
                navbar.style.setProperty('width', `calc(100%-${newWidth}px)`);
            }
        } else {
            return;
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(false);
            setIsResetting(false);
            sideBarRef.current.style.width = isMobile ? '100%' : '240px';
            navBarRef.current.style.setProperty(
                'width',
                isMobile ? '0%' : 'calc(100%-240px)'
            );
            navBarRef.current.style.setProperty(
                'left',
                isMobile ? '100%' : '240px'
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sideBarRef.current.style.width = '0';
            navBarRef.current.style.setProperty('width', '100%');
            navBarRef.current.style.setProperty('left', '0');
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    useEffect(() => {
        isMobile ? collapse() : resetWidth();
    }, [isMobile]);

    useEffect(() => {
        isMobile && collapse();
    }, [isMobile, pathName]);

    const handleCreate = () => {
        const promise = create({
            title: 'Untitled'
        });
        toast.promise(promise, {
            loading: 'creating a new note ...',
            success: 'New Note created',
            error: 'Failed to create a new note.'
        });
    };

    return (
        <>
            <aside
                ref={sideBarRef}
                className={cn(
                    'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'w-0'
                )}
            >
                <div
                    onClick={collapse}
                    role='button'
                    className={cn(
                        'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
                        isMobile && 'opacity-100'
                    )}
                >
                    <ChevronsLeft className='h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral' />
                </div>
                <div>
                    <UserItem />
                    <Item
                        onClick={handleCreate}
                        label='New Page'
                        icon={PlusCircle}
                    />
                    <Item
                        onClick={search.onOpen}
                        label='Search'
                        icon={Search}
                        isSearch
                    />
                    <Item
                        onClick={settings.onOpen}
                        label='Settings'
                        icon={Settings}
                    />
                </div>
                <div className='mt-4'>
                    <DocumentList />
                    <Item
                        onClick={handleCreate}
                        label='Add a page'
                        icon={PlusCircle}
                    />
                    <Popover>
                        <PopoverTrigger className='w-full mt-4'>
                            <Item label='Trash' icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent
                            className='p-0 w-72'
                            side={isMobile ? 'bottom' : 'right'}
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={(e) => {
                        handleMouseDown(e);
                    }}
                    onMouseUp={handleMouseUp}
                    onClick={resetWidth}
                    className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
                />
            </aside>
            <div
                ref={navBarRef}
                className={cn(
                    'absolute top-0 z-[999999] left-60 w-[calc(100%-240px)]',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'left-0 w-full'
                )}
            >
                {!!params.documentId && (
                    <Navbar
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                    />
                )}
                <nav className='bg-transparent px-3 py-2 w-full'>
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            className='h-6 w-6 text-muted-background cursor-pointer'
                        />
                    )}
                </nav>
            </div>
        </>
    );
};

export default Navigation;
