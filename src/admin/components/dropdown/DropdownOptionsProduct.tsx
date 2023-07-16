import { Menu, Transition } from '@headlessui/react';
import { TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { Product } from '../../../store';
import { Link } from 'react-router-dom';
import { useProductMutations } from '../../hooks/products';

interface Props {
    product: Product;
}

export const DropdownOptionsProduct = ({ product }: Props) => {
    const { startDelete } = useProductMutations();
    const { _id, status, slug } = product;

    const handleDelete = () => {
        startDelete({ _id: _id, status: status });
    };

    return (
        <div className='relative z-50'>
            <Menu as='div'>
                <Menu.Button className='w-full rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                    <EllipsisVerticalIcon
                        className='h-6 w-6 text-gray-600 dark:text-white font-bold'
                        aria-hidden='true'
                    />
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='absolute -top-20 right-14 w-36 origin-top-right divide-y dark:divide-gray-700 divide-gray-100 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            <Link
                                to={`/admin/inventory/products/${slug}`}
                                className={`text-gray-900 dark:text-white flex w-full items-center hover:bg-gray-50 rounded-t dark:hover:bg-gray-600 px-3 py-2 text-sm`}>
                                <ArrowPathIcon className='mr-2 h-5 w-5' />
                                Edit
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                className={`text-gray-900 dark:text-white flex w-full items-center hover:bg-gray-50 dark:hover:bg-gray-600 px-3 py-2 text-sm`}
                                onClick={handleDelete}>
                                <TrashIcon className='mr-2 h-5 w-5' />
                                {status === 'active' ? 'Delete' : 'Restore'}
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <Link
                                to={`/admin/inventory/products/gallery/${slug}`}
                                className={`text-gray-900 dark:text-white flex w-full items-center hover:bg-gray-50 rounded-b dark:hover:bg-gray-600 px-3 py-2 text-sm`}>
                                <PhotoIcon className='mr-2 h-5 w-5' />
                                Gallery
                            </Link>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
