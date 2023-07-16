import { useEffect, useMemo, useState } from 'react';
import {
    useCreateCouponMutation,
    useDeleteCouponMutation,
    useGetCouponsPerPageQuery,
    useUpdateCouponMutation
} from '../../../store/apis';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { Coupon, CouponRequest, ErrorRTKQuery } from '../../../store';
import { toast } from 'react-hot-toast';
import { useCouponStore } from '../../../hooks';
import { Socket } from 'socket.io-client';
import { getSocket } from '../../../helpers';
import Swal from 'sweetalert2';
import { customClass } from '../../helpers';

let socket: Socket;
export const useCoupons = () => {
    const [search, setSearch] = useState('');

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5
    });

    const [columnVisibility, setColumnVisibility] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [couponData, setCouponData] = useState<Coupon[]>([]);

    const { data, isFetching, isLoading, isError } = useGetCouponsPerPageQuery({
        _page: pageIndex,
        _limit: pageSize,
        _search: search
    });

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize]
    );

    const defaultData = useMemo(() => [], []);

    useEffect(() => {
        if (data?.coupons) {
            setCouponData(data.coupons);
        }
    }, [data]);

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
        couponData,
        data
    };
};

export const useCouponMutations = () => {
    useEffect(() => {
        socket = getSocket();
    }, []);
    const { startOnCloseModalCoupon } = useCouponStore();
    const [createCoupon, { isLoading: isLoadingCreate }] =
        useCreateCouponMutation();

    const startCreate = (coupon: CouponRequest) => {
        toast.promise(
            createCoupon(coupon).unwrap(),
            {
                loading: 'loading',
                success: ({ messages, coupon }) => {
                    socket.emit('createCoupon', coupon);
                    startOnCloseModalCoupon();
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    console.log(error);
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };

    const [updateCoupon, { isLoading: isLoadingUpdate }] =
        useUpdateCouponMutation();

    const startUpdate = ({
        id,
        coupon
    }: {
        id: string;
        coupon: CouponRequest;
    }) => {
        toast.promise(
            updateCoupon({
                id,
                coupon
            }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages, coupon }) => {
                    socket.emit('updateCoupon', coupon);
                    startOnCloseModalCoupon();
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

    const [deleteCoupon, { isLoading: isLoadingDelete }] =
        useDeleteCouponMutation();

    const startDelete = async ({
        id,
        coupon
    }: {
        id: string;
        coupon: Coupon;
    }) => {
        await Swal.fire({
            title: 'Estas seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText:
                coupon.status === 'active'
                    ? '¡Sí, bórralo!'
                    : '¡Sí, Restauralo!',
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
                return deleteCoupon({ id }).unwrap();
            }
        })
            .then(({ value }) => {
                if (value?.messages) {
                    socket.emit('deleteCoupon', value.coupon);
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
