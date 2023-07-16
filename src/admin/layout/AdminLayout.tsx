import { Outlet } from 'react-router-dom';

import { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks';
import { getSocket } from '../../helpers';
import { Sidebar } from '../components';

export const AdminLayout = () => {
    let socket: Socket;
    const { user } = useAuthStore();
    useEffect(() => {
        socket = getSocket();
        socket.emit('setRoom', user?.role);
    }, []);

    return (
        <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main className='flex justify-center py-14 md:px-0 px-5 flex-1'>
                <div className='max-w-md md:max-w-lg xl:max-w-4xl w-full block'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
