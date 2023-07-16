import { useEffect, useMemo, useState } from 'react';
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductBySlugQuery,
    useGetProductsPerPageQuery,
    useUpdateProductMutation
} from '../../../store/apis';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { ErrorRTKQuery, Product, ProductRequest } from '../../../store';
import { toast } from 'react-hot-toast';
import { Socket } from 'socket.io-client';
import { getSocket } from '../../../helpers';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { customClass } from '../../helpers';
import { useProductStore } from '../../../hooks';
let socket: Socket;

export const useProducts = () => {
    const [search, setSearch] = useState('');

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const { data, isFetching, isLoading, isError, refetch } =
        useGetProductsPerPageQuery(
            {
                _page: pageIndex,
                _limit: pageSize,
                _search: search
            },
            {
                refetchOnMountOrArgChange: true
            }
        );

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize]
    );

    const onChange = (search: string) => {
        setSearch(search);
        refetch();
    };

    const defaultData = useMemo(() => [], []);

    return {
        isFetching,
        isLoading,
        isError,
        pagination,
        defaultData,
        setPagination,
        columnVisibility,
        setColumnVisibility,
        sorting,
        setSorting,
        onChange,
        data
    };
};
export const useProductMutations = () => {
    useEffect(() => {
        socket = getSocket();
    }, []);

    const navigate = useNavigate();

    const [createProduct, { isLoading: isLoadingCreate }] =
        useCreateProductMutation();

    const [updateProduct, { isLoading: isLoadingUpdate }] =
        useUpdateProductMutation();

    const [deleteProduct, { isLoading: isLoadingDelete }] =
        useDeleteProductMutation();

    const startCreate = (product: ProductRequest) => {
        toast.promise(
            createProduct(product).unwrap(),
            {
                loading: 'loading',
                success: ({ messages, product }) => {
                    socket.emit('createProduct', product);
                    navigate('/admin/inventory/products', { replace: true });
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    navigate('/admin/inventory/products', { replace: true });
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };

    const startUpdate = (product: Product) => {
        toast.promise(
            updateProduct({ id: product._id, updateProduct: product }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages, product }) => {
                    socket.emit('updateProduct', product);
                    navigate('/admin/inventory/products', { replace: true });
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    console.log(error);

                    navigate('/admin/inventory/products', { replace: true });
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };

    const startDelete = async ({
        _id,
        status
    }: {
        _id: string;
        status: string;
    }) => {
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
                return deleteProduct({ _id }).unwrap();
            }
        })
            .then(({ value }) => {
                if (value?.messages) {
                    socket.emit('deleteProduct', value.product);
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

    return {
        startCreate,
        isLoadingCreate,
        startUpdate,
        isLoadingUpdate,
        startDelete,
        isLoadingDelete
    };
};

export const useProductBySlug = (_slug: string) => {
    const { startSetProduct } = useProductStore();
    const { isLoading, isError, data } = useGetProductBySlugQuery(
        { _slug },
        {
            refetchOnMountOrArgChange: true
        }
    );

    useEffect(() => {
        if (data?.product) {
            startSetProduct(data.product);
        }
    }, [data]);

    return {
        isLoading,
        isError,
        product: data?.product
    };
};
