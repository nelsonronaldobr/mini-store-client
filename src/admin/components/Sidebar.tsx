import { Link } from 'react-router-dom';
import { Logo } from '../../components';
import {
    HomeIcon,
    ArrowLeftOnRectangleIcon,
    UsersIcon,
    Cog6ToothIcon,
    TruckIcon
} from '@heroicons/react/24/solid';
import { useAuthStore } from '../../hooks';
import { DropdownInventory } from './dropdown';

export const Sidebar = () => {
    const { startLogout } = useAuthStore();

    const onClickLogout = () => {
        startLogout();
    };

    return (
        <div className='md:w-72 bg-amber-400 dark:bg-gray-900'>
            <div className='text-gray-100 text-xl'>
                <Link
                    to={'/admin/dashboard'}
                    className='p-2.5 mt-1 flex items-center justify-center'>
                    <Logo className='w-12 h-12 m-0' />
                    <h1 className='font-bold font-passion-one text-xl text-gray-200 text-[15px] ml-3'>
                        Burger Queen
                    </h1>
                </Link>
                <div className='my-2 dark:bg-gray-600 h-[1px] bg-yellow-500'></div>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                <HomeIcon className='h-5 w-5' />
                <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                    Dashboard
                </span>
            </div>
            <DropdownInventory />
            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                <TruckIcon className='h-5 w-5' />
                <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                    Ordenes
                </span>
            </div>
            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                <UsersIcon className='h-5 w-5' />
                <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                    Usuarios
                </span>
            </div>
            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                <Cog6ToothIcon className='h-5 w-5' />
                <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                    Ajustes
                </span>
            </div>

            <div className='my-4 dark:bg-gray-600 h-[1px] bg-yellow-500'></div>
            <button
                onClick={onClickLogout}
                className='p-2.5 w-full mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white'>
                <ArrowLeftOnRectangleIcon className='h-5 w-5' />
                <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                    LogOut
                </span>
            </button>
        </div>
    );
};
