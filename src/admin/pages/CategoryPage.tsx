import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { CategoryTable, ShowRange } from '../components/tables';
import { PaginationPractice } from '../components/tables';
import { ButtonsPaginations } from '../components/tables/ButtonsPaginations';
import { useCategoryStore } from '../../hooks';
import { ChangeEvent, useRef } from 'react';
import { useCategoriesPerPage } from '../hooks/categories';
import { CategoryModal } from '../components/modals/CategoryModal';
import { SkeletonTable } from '../components';

const limit = 3;
type Timeout = ReturnType<typeof setTimeout>;

export const CategoryPage = () => {
    const {
        modalOptions: { show },
        startSetModalCategoryOptions,
        startOnCloseModalCategory
    } = useCategoryStore();
    const { data, isFetching, isLoading, page, nextPage, prevPage, onChange } =
        useCategoriesPerPage({ limit });

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

    const handleAdd = () => {
        startSetModalCategoryOptions({
            title: 'Agregar Categoría'
        });
        startOnCloseModalCategory();
    };

    return (
        <div className='max-w-md md:max-w-lg xl:max-w-4xl w-full'>
            <div className='pb-4 flex flex-wrap gap-5 justify-center md:justify-between items-center'>
                <div>
                    <label htmlFor='table-search' className='sr-only'>
                        Search
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type='text'
                            id='table-search'
                            className='block focus-visible:no-underline p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                            placeholder='Search for items'
                            onChange={onQueryChange}
                        />
                    </div>
                </div>
                <button
                    type='button'
                    onClick={handleAdd}
                    className='focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5'>
                    Add
                </button>
            </div>
            <CategoryModal show={show} onClose={startOnCloseModalCategory} />
            <div className='relative overflow-x-auto'>
                {isLoading ? (
                    <SkeletonTable />
                ) : (
                    <CategoryTable categories={data?.categories} />
                )}

                <PaginationPractice>
                    <ShowRange
                        limit={limit}
                        page={page}
                        totalDocuments={data?.totalDocuments}
                    />

                    <ButtonsPaginations
                        prevPage={() => prevPage(1)}
                        nextPage={() => nextPage(1)}
                        isFetching={isFetching}
                        numberOfPages={data?.numberOfPages}
                        page={page}
                    />
                </PaginationPractice>
            </div>
        </div>
    );
};
