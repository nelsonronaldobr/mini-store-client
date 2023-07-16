import {
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon
} from '@heroicons/react/24/solid';
import { Spinner } from '../../../components';

interface Props {
    prevPage: () => void;
    nextPage: () => void;
    page: number;
    numberOfPages?: number;
    isFetching: boolean;
}

export const ButtonsPaginations = ({
    prevPage,
    nextPage,
    page,
    numberOfPages = 0,
    isFetching
}: Props) => {
    return (
        <ul className='inline-flex items-center -space-x-px gap-1'>
            {isFetching ? (
                <li className='mr-4 flex items-center'>
                    <Spinner className='w-4 h-4' mini={true} />
                </li>
            ) : (
                ''
            )}
            <li>
                <button
                    disabled={page === 1}
                    onClick={prevPage}
                    className='block disabled:opacity-30 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                    <span className='sr-only'>Previous</span>
                    <ChevronDoubleLeftIcon className='w-5 h-5' />
                </button>
            </li>

            <li>
                <button
                    disabled={page === numberOfPages}
                    onClick={nextPage}
                    className='block disabled:opacity-30 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                    <span className='sr-only'>Next</span>
                    <ChevronDoubleRightIcon className='w-5 h-5' />
                </button>
            </li>
        </ul>
    );
};
