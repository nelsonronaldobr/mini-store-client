import { useEffect, useState } from 'react';
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesPerPageQuery,
    useGetCategoriesQuery,
    useUpdateCategoryMutation
} from '../../../store/apis';
import { getSocket } from '../../../helpers';
import { toast } from 'react-hot-toast';
import { customClass } from '../../helpers';
import Swal from 'sweetalert2';
import { useCategoryStore } from '../../../hooks';
import { Socket } from 'socket.io-client';
import { Category, CategoryRequest, ErrorRTKQuery } from '../../../store';

const init_page = 1;
let socket: Socket;

export const useCategoriesPerPage = ({ limit }: { limit: number }) => {
    const [page, setPage] = useState(init_page);

    const [searchValue, setSearchValue] = useState('');

    const categoriesQuery = useGetCategoriesPerPageQuery({
        _limit: limit,
        _page: page,
        _search: searchValue
    });

    const onChange = (search: string) => {
        setPage(init_page);
        setSearchValue(search);
    };

    const nextPage = (value: number) => {
        const next = Math.min(
            page + value,
            categoriesQuery.data?.numberOfPages || 1
        );
        setPage(next);
    };

    const prevPage = (value: number) => {
        const prev = Math.max(page - value, 1);
        setPage(prev);
    };

    useEffect(() => {
        socket = getSocket();
    }, []);

    useEffect(() => {
        socket.on('refreshCategories', () => {
            categoriesQuery.refetch();
        });
    }, []);

    return {
        ...categoriesQuery,
        page,
        nextPage,
        prevPage,
        onChange
    };
};

export const useCategories = () => {
    const categoriesQuery = useGetCategoriesQuery();

    return {
        ...categoriesQuery
    };
};
export const useCategoryMutations = () => {
    useEffect(() => {
        socket = getSocket();
    }, []);

    const { startOnCloseModalCategory } = useCategoryStore();

    const [createCategory, { isLoading: isLoadingCreate }] =
        useCreateCategoryMutation();

    const startCreate = (category: CategoryRequest) => {
        toast.promise(
            createCategory({ name: category.name }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages }) => {
                    socket.emit('newCategory');
                    startOnCloseModalCategory();
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };

    const [deleteCategory, { isLoading: isLoadingDelete }] =
        useDeleteCategoryMutation();

    const startDelete = async ({ status, _id }: Category) => {
        await Swal.fire({
            title: 'Estas seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText:
                status === 'active' ? '¡Sí, bórralo!' : '¡Sí, Restauralo!',
            customClass: customClass,
            showLoaderOnConfirm: true,
            showCloseButton: true,
            showClass: {
                popup: 'animate-enter '
            },
            hideClass: {
                popup: 'animate-leave'
            },
            preConfirm: () => {
                return deleteCategory(_id).unwrap();
            }
        })
            .then(({ value }) => {
                if (value?.messages) {
                    socket.emit('deleteCategory');
                    toast.success(value.messages.msg, {
                        className: 'dark:text-white dark:bg-gray-800'
                    });
                }
            })
            .catch(({ data }: ErrorRTKQuery) => {
                Swal.close();
                const msg = data.messages.msg;
                toast.error(msg, {
                    className: 'dark:text-white dark:bg-gray-800'
                });
            });
    };

    const [updateCategory, { isLoading: isLoadingUpdate }] =
        useUpdateCategoryMutation();

    const startUpdate = ({
        id,
        category
    }: {
        id: string;
        category: CategoryRequest;
    }) => {
        toast.promise(
            updateCategory({
                id: id,
                updateCategory: category
            }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages }) => {
                    socket.emit('updateCategory');
                    startOnCloseModalCategory();
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    return error.data.messages.msg;
                }
            },
            {
                className:
                    'dark:text-white dark:bg-gray-800 animate-enter animate-leave'
            }
        );
    };

    return {
        startCreate,
        isLoadingCreate,
        startDelete,
        isLoadingDelete,
        startUpdate,
        isLoadingUpdate
    };
};
