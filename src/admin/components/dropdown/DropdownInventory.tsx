import { Menu, Transition } from '@headlessui/react';
import {
    ArrowDownCircleIcon,
    CubeIcon,
    CubeTransparentIcon,
    QueueListIcon,
    TagIcon
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export const DropdownInventory = () => {
    return (
        <Menu>
            <Menu.Button className={'w-full'}>
                <div className='p-2.5 mt-3 w-full flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                    <div className='flex items-center'>
                        <CubeIcon className='h-5 w-5' />
                        <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                            Inventario
                        </span>
                    </div>
                    <ArrowDownCircleIcon className='h-5 w-5' />
                </div>
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
                        'text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold flex flex-col'
                    }>
                    <Menu.Item>
                        <Link
                            to={'/admin/inventory/products'}
                            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                            <CubeTransparentIcon className='h-5 w-5' />
                            <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                                Productos
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={'/admin/inventory/categories'}
                            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                            <QueueListIcon className='h-5 w-5' />
                            <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                                Categorías
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link
                            to={'/admin/inventory/coupons'}
                            className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-amber-500 text-white'>
                            <TagIcon className='h-5 w-5' />
                            <span className='text-[15px] ml-4 text-gray-200 font-bold'>
                                Cupones
                            </span>
                        </Link>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
