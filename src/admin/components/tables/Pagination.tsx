import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';
import { Spinner } from '../../../components';
import { Table } from '@tanstack/react-table';

interface Props<T> {
    isFetching: boolean;
    table: Table<T>;
}

export const Pagination = <T,>({ table, isFetching }: Props<T>) => {
    return (
        <div className='flex items-center justify-between gap-2 pt-4'>
            <div className='inline-flex gap-2'>
                <span className='flex items-center gap-1 dark:text-white'>
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    className='rounded focus:outline-none'
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option
                            key={pageSize}
                            value={pageSize}
                            className='bg-gray-800 text-white'>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className='inline-flex gap-1'>
                {isFetching ? (
                    <li className='mr-4 flex items-center'>
                        <Spinner className='w-4 h-4' mini={true} />
                    </li>
                ) : (
                    ''
                )}
                <button
                    className='block disabled:opacity-30 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}>
                    <ChevronDoubleLeftIcon className='w-5 h-5' />
                </button>
                <button
                    className='block disabled:opacity-30 px-1 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    <ChevronLeftIcon className='w-5 h-5' />
                </button>
                <button
                    className='block disabled:opacity-30 px-1 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    <ChevronRightIcon className='w-5 h-5' />
                </button>
                <button
                    className='block disabled:opacity-30 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}>
                    <ChevronDoubleRightIcon className='w-5 h-5' />
                </button>
            </div>
        </div>
    );
};
