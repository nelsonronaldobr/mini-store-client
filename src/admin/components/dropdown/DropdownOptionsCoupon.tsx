import { Menu, Transition } from '@headlessui/react';
import {
    ArrowPathIcon,
    EllipsisVerticalIcon,
    TrashIcon
} from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { Coupon } from '../../../store';
import { useCouponStore } from '../../../hooks';
import { useCouponMutations } from '../../hooks/coupons';

interface Props {
    coupon: Coupon;
}

export const DropdownOptionsCoupon = ({ coupon }: Props) => {
    const {
        startSetModalCouponOptions,
        startOnCloseModalCoupon,
        startSetCoupon
    } = useCouponStore();

    const { startDelete, isLoadingDelete } = useCouponMutations();

    const handleUpdate = () => {
        startSetCoupon(coupon);
        startSetModalCouponOptions({ title: 'Actualizar Coupon' });
        startOnCloseModalCoupon();
    };

    const handleDelete = async () => {
        await startDelete({ id: coupon._id, coupon });
    };

    return (
        <div className='relative z-50'>
            <Menu as={'div'}>
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
                    <Menu.Items className='absolute -top-10 right-14 w-36 origin-top-right divide-y dark:divide-gray-700 divide-gray-100 rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                            <button
                                onClick={handleUpdate}
                                className={`text-gray-900 dark:text-white flex w-full items-center hover:bg-gray-50 rounded-t dark:hover:bg-gray-600 px-3 py-2 text-sm`}>
                                <ArrowPathIcon className='mr-2 h-5 w-5' />
                                Edit
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                disabled={isLoadingDelete}
                                onClick={handleDelete}
                                className={`text-gray-900 dark:text-white flex w-full items-center hover:bg-gray-50 rounded-b dark:hover:bg-gray-600 px-3 py-2 text-sm`}>
                                <TrashIcon className='mr-2 h-5 w-5' />
                                {coupon.status === 'active'
                                    ? 'Delete'
                                    : 'Restore'}
                            </button>
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};
