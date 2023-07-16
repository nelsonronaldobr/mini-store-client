import { useEffect } from 'react';
import { useAuthStore, useUiStore } from '.';

export const useCheckSession = () => {
    const { startCheckSession, sessionStatus } = useAuthStore();
    const { startGetTheme } = useUiStore();

    useEffect(() => {
        startCheckSession();
        startGetTheme();
    }, []);

    return {
        sessionStatus
    };
};
