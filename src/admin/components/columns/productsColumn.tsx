import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../../store';
import { useMemo } from 'react';
import { formatDate } from '../../../helpers';

import { DropdownOptionsProduct } from '../dropdown';
import { Status } from '..';
import { EllipsisParagraph } from '../../../components';

export const useColumnsProducts = () => {
    return useMemo<ColumnDef<Product>[]>(
        () => [
            {
                header: 'NAME',
                accessorKey: 'name',
                cell: (product) => product.getValue()
            },
            {
                header: 'DESCRIPTION',
                accessorKey: 'description',
                cell: (product) => (
                    <EllipsisParagraph>
                        {product.row.original.description}
                    </EllipsisParagraph>
                )
            },
            {
                header: 'CATEGORY',
                accessorKey: 'category',
                cell: (product) => product.getValue()
            },
            {
                header: 'STOCK',
                accessorKey: 'stock',
                cell: (product) => product.getValue()
            },
            {
                header: 'PRICE',
                accessorFn: (product) =>
                    product.price.toLocaleString('es-PE', {
                        style: 'currency',
                        currency: 'PEN'
                    }),
                id: 'price',
                cell: (product) => product.getValue()
            },
            {
                header: 'STATUS',
                accessorKey: 'status',
                enableSorting: false,
                cell: (product) => (
                    <Status status={product.row.original.status} />
                )
            },
            {
                header: 'CREATED_AT',
                accessorFn: (product) => formatDate(product.createdAt),
                id: 'createdAt',
                cell: (product) => product.getValue()
            },
            {
                header: 'UPDATED_AT',
                accessorFn: (product) => formatDate(product.updatedAt),
                id: 'updatedAt',
                cell: (product) => product.getValue()
            },
            {
                header: 'ACTIONS',
                accessorKey: 'actions',
                enableSorting: false,
                cell: (product) => (
                    <DropdownOptionsProduct product={product.row.original} />
                )
            }
        ],
        []
    );
};
