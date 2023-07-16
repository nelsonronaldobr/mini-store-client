import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useColumnsProducts } from '../columns';
import { useProducts } from '../../hooks/products';
import { Pagination } from '.';
import { Product } from '../../../store';
import {
    ArrowLongDownIcon,
    ArrowLongUpIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ChangeEvent, useRef } from 'react';
import { SkeletonTable } from '..';

type Timeout = ReturnType<typeof setTimeout>;

export const ProductTable = () => {
    const {
        data,
        isFetching,
        pagination,
        setPagination,
        defaultData,
        isLoading,
        columnVisibility,
        setColumnVisibility,
        sorting,
        setSorting,
        onChange
    } = useProducts();

    const columns = useColumnsProducts();

    const debounceRef = useRef<Timeout>();

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        const { value } = event.target;

        debounceRef.current = setTimeout(() => {
            onChange(value);
        }, 550);
    };

    const table = useReactTable({
        data: data?.products ?? defaultData,
        columns: columns,
        pageCount: data?.numberOfPages ?? -1,
        state: {
            pagination,
            columnVisibility,
            sorting
        },
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        debugTable: true
    });

    return (
        <>
            <div className='pb-4 flex gap-5 flex-wrap flex-col md:flex-row justify-center md:justify-between items-center'>
                <div className='relative z-0 mb-6 group w-full md:w-1/2'>
                    <div className='absolute inset-y-0 right-0 flex items-center pl-3'>
                        <MagnifyingGlassIcon className='h-5 w-5 text-gray-400 peer-focus:text-blue-600' />
                    </div>
                    <input
                        autoComplete={'off'}
                        onChange={onQueryChange}
                        type='search'
                        name='table-search'
                        id='table-search'
                        placeholder=' '
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        required
                    />
                    <label
                        htmlFor='table-search'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                        Search for items
                    </label>
                </div>
                <Link
                    to={'/admin/inventory/products/create'}
                    className='focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5'>
                    Add
                </Link>
            </div>
            {/* modal */}
            {isLoading ? (
                <SkeletonTable />
            ) : (
                <div className='overflow-x-auto relative'>
                    <div className='flex flex-wrap gap-1 select-none mb-3 dark:text-white '>
                        <label>
                            <input
                                {...{
                                    type: 'checkbox',
                                    checked: table.getIsAllColumnsVisible(),
                                    onChange:
                                        table.getToggleAllColumnsVisibilityHandler(),
                                    className: 'accent-blue-600'
                                }}
                            />{' '}
                            Toggle All
                        </label>
                        {table.getAllLeafColumns().map((column) => {
                            return (
                                <div key={column.id} className='px-1'>
                                    <label>
                                        <input
                                            {...{
                                                type: 'checkbox',
                                                checked: column.getIsVisible(),
                                                onChange:
                                                    column.getToggleVisibilityHandler(),
                                                className: 'accent-blue-600'
                                            }}
                                        />{' '}
                                        {column.id}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center'>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className='px-6 py-3'>
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        {...{
                                                            className:
                                                                header.column.getCanSort()
                                                                    ? 'cursor-pointer select-none flex gap-1'
                                                                    : '',
                                                            onClick:
                                                                header.column.getToggleSortingHandler()
                                                        }}>
                                                        {flexRender(
                                                            header.column
                                                                .columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: (
                                                                <ArrowLongUpIcon className='w-4 h-4 text-white' />
                                                            ),
                                                            desc: (
                                                                <ArrowLongDownIcon className='w-4 h-4 text-white' />
                                                            )
                                                        }[
                                                            header.column.getIsSorted() as string
                                                        ] ?? null}
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {data?.products.length ? (
                                table.getRowModel().rows.map((row) => {
                                    return (
                                        <tr
                                            key={row.id}
                                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                    <td
                                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'
                                        colSpan={9}>
                                        No hay registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <Pagination<Product> table={table} isFetching={isFetching} />
        </>
    );
};
