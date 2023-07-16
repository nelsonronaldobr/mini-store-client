import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getEnvVariables, getSocket, invalidateOn } from '../../helpers';
import {
    Coupon,
    CouponRequest,
    CouponResponse,
    CouponsResponse,
    RootState
} from '..';
const { VITE_API_URL } = getEnvVariables();

export const couponsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.tokenSession;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Coupons'],
    endpoints: (builder) => ({
        getCouponsPerPage: builder.query<
            CouponsResponse,
            { _page: number; _limit: number; _search: string }
        >({
            query: ({ _limit, _page, _search }) => ({
                params: { _limit, _page, _search },
                url: '/admin/coupons'
            }),
            providesTags: ['Coupons'],
            async onCacheEntryAdded(
                params,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket.on('refreshCoupons', (newCoupon: Coupon) => {
                        updateCachedData((draft) => {
                            const newData = draft.coupons.map((coupon) => {
                                if (coupon._id === newCoupon._id) {
                                    return newCoupon;
                                } else {
                                    return coupon;
                                }
                            });
                            draft.coupons = newData;
                        });
                    });

                    socket.on('addCoupon', (newCoupon: Coupon) => {
                        updateCachedData((draft) => {
                            const newData = [...draft.coupons];
                            // Agregamos el nuevo coupon al inicio de la lista
                            newData.unshift(newCoupon);
                            draft.coupons = newData;
                        });
                    });

                    await cacheEntryRemoved;
                    socket.off('connect');
                    //socket.off('refreshCoupons');
                    socket.off('addCoupon');
                } catch (error) {}
            }
        }),
        createCoupon: builder.mutation<CouponResponse, CouponRequest>({
            query: (newCoupon) => ({
                body: newCoupon,
                url: '/admin/coupons',
                method: 'POST'
            }),
            invalidatesTags: invalidateOn({ success: ['Coupons' as const] })
        }),
        updateCoupon: builder.mutation<
            CouponResponse,
            { id: string; coupon: CouponRequest }
        >({
            query: ({ id, coupon: updateCoupon }) => ({
                url: `/admin/coupons/${id}`,
                body: updateCoupon,
                method: 'PUT'
            }),
            invalidatesTags: invalidateOn({ success: ['Coupons' as const] })
        }),
        deleteCoupon: builder.mutation<CouponResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/admin/coupons/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: invalidateOn({ success: ['Coupons' as const] })
        })
    })
});

export const {
    useGetCouponsPerPageQuery,
    useCreateCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation
} = couponsApi;
