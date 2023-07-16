import { Outlet } from 'react-router-dom';
import { Navbar } from '..';

export const StoreLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};
