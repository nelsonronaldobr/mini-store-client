import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <main className='flex min-h-screen items-center justify-center bg-amber-300 dark:bg-slate-900'>
            <div className='md:mt-12 max-w-md md:max-w-lg xl:max-w-5xl w-full'>
                <Outlet />
            </div>
        </main>
    );
};
