import { Menu, Transition } from '@headlessui/react';
import {
    ArrowLeftOnRectangleIcon,
    Cog6ToothIcon,
    UserCircleIcon
} from '@heroicons/react/24/solid';

import { useAuthStore } from '../../hooks';
import { Link } from 'react-router-dom';

export const DropdownUser = () => {
    const { user, startLogout, isAdminOrSalesman } = useAuthStore();
    const onClickLogout = () => {
        startLogout();
    };
    return (
        <Menu>
            <Menu.Button
                className={
                    'flex items-center gap-2 py-2 w-full px-3 rounded text-amber-800 dark:text-white dark:hover:text-amber-200 transition-colors'
                }>
                <UserCircleIcon className='h-8 w-8 ' />
                <span className='font-tilt-warp text-base'>
                    {user?.username}
                </span>
            </Menu.Button>
            <Transition
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Menu.Items
                    className={
                        'py-2 text-sm text-gray-700 dark:text-gray-200 z-10 absolute mt-2 bg-white rounded-lg shadow w-44 dark:bg-gray-700'
                    }>
                    <Menu.Item>
                        <Link
                            className={
                                'flex gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-amber-300 font-tilt-warp transition-colors'
                            }
                            to={`/profile/${user?.slug}`}>
                            <UserCircleIcon className='h-5 w-5' />
                            <span>Profile</span>
                        </Link>
                    </Menu.Item>
                    {isAdminOrSalesman ? (
                        <Menu.Item>
                            <Link
                                className={
                                    'flex gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-amber-300 font-tilt-warp transition-colors'
                                }
                                to={`/admin/dashboard`}>
                                <UserCircleIcon className='h-5 w-5' />
                                <span>Panel Administrativo</span>
                            </Link>
                        </Menu.Item>
                    ) : (
                        ''
                    )}

                    <Menu.Item>
                        <Link
                            className={
                                'flex gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-amber-300 font-tilt-warp transition-colors'
                            }
                            to='/account-settings'>
                            <Cog6ToothIcon className='h-5 w-5' />
                            <span>Settings</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            className={
                                'flex w-full gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-amber-300 font-tilt-warp transition-colors'
                            }
                            onClick={onClickLogout}>
                            <ArrowLeftOnRectangleIcon className='h-5 w-5' />
                            <span>Logout</span>
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
