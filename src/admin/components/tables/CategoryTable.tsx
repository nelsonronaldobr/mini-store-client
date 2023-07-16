import { formatDate } from '../../../helpers';
import { useCategoryStore } from '../../../hooks';
import { Category } from '../../../store';

import { useCategoryMutations } from '../../hooks/categories';

interface Props {
    categories?: Category[];
}

export const CategoryTable = ({ categories }: Props) => {
    const {
        startSetCategory,
        startSetModalCategoryOptions,
        startOnCloseModalCategory
    } = useCategoryStore();

    const { startDelete, isLoadingDelete } = useCategoryMutations();
    const handleDelete = (value: Category) => {
        startDelete(value);
    };

    const handleUpdate = (category: Category) => {
        startSetModalCategoryOptions({
            title: 'Actualizar Categoría'
        });
        startSetCategory(category);
        startOnCloseModalCategory();
    };

    return (
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center'>
                <tr>
                    <th scope='col' className='px-6 py-3'>
                        Categoria
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Status
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Created At
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Updated At
                    </th>
                    <th scope='col' className='px-6 py-3'>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories?.length ? (
                    categories?.map((category) => (
                        <tr
                            key={category._id}
                            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                            <td
                                scope='row'
                                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                {category.name}
                            </td>
                            <td className='px-6 py-4'>
                                <div className='flex items-center'>
                                    {category.status === 'active' ? (
                                        <div className='flex items-center'>
                                            <div className='h-2.5 w-2.5 rounded-full bg-blue-500 mr-2'></div>{' '}
                                            Activo
                                        </div>
                                    ) : (
                                        <div className='flex items-center'>
                                            <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div>{' '}
                                            Retirado
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className='px-6 py-4'>
                                {formatDate(category.createdAt.toString())}
                            </td>
                            <td className='px-6 py-4'>
                                {formatDate(category.updatedAt.toString())}
                            </td>
                            <td className='px-6 py-4 text-right flex flex-wrap gap-2'>
                                <button
                                    onClick={() => handleUpdate(category)}
                                    type='button'
                                    disabled={isLoadingDelete}
                                    className='focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5'>
                                    Update
                                </button>
                                <button
                                    type='button'
                                    disabled={isLoadingDelete}
                                    onClick={() => handleDelete(category)}
                                    className='focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700'>
                                    {category.status === 'active'
                                        ? 'Delete'
                                        : 'Restore'}
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td
                            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'
                            colSpan={5}>
                            No hay registros
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
