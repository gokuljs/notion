'use client';
import React, { useEffect, useState } from 'react';
import SettingsModal from '../SettingsModal';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <>
            <SettingsModal />
        </>
    );
};

export default ModalProvider;
