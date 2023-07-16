import { ColumnDef } from '@tanstack/react-table';
import { Coupon } from '../../../store';
import { useMemo } from 'react';
import { formatDate } from '../../../helpers';
import { DropdownOptionsCoupon, Status } from '..';

export const useColumnsCoupons = () => {
    return useMemo<ColumnDef<Coupon>[]>(
        () => [
            {
                header: 'CODE',
                accessorKey: 'code',
                cell: (coupon) => coupon.getValue()
            },
            {
                header: 'DISCOUNT',
                accessorKey: 'discount',
                cell: (coupon) => coupon.getValue()
            },
            {
                header: 'DISCOUNT PERCENTAGE',
                accessorKey: 'discount_percentage',
                cell: (coupon) => coupon.getValue()
            },
            {
                header: 'STATUS',
                accessorKey: 'status',
                enableSorting: false,
                cell: (coupon) => <Status status={coupon.row.original.status} />
            },
            {
                header: 'CREATED_AT',
                accessorFn: (coupon) => formatDate(coupon.createdAt),
                enableSorting: false,
                id: 'createdAt',
                cell: (coupon) => coupon.getValue()
            },
            {
                header: 'UPDATED_AT',
                accessorFn: (coupon) => formatDate(coupon.updatedAt),
                enableSorting: false,
                id: 'updatedAt',
                cell: (coupon) => coupon.getValue()
            },
            {
                header: 'ACTIONS',
                accessorKey: 'actions',
                enableSorting: false,
                cell: (coupon) => (
                    <DropdownOptionsCoupon coupon={coupon.row.original} />
                )
            }
        ],
        []
    );
};
