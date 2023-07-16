import {
    Image,
    ImagesResponse,
    Product,
    ProductRequest,
    ProductResponse,
    ProductsResponse,
    ProductsResponsePerPage,
    RootState,
    SimpleResponse
} from '..';
import { getEnvVariables, getSocket, invalidateOn } from '../../helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { VITE_API_URL } = getEnvVariables();

export const productsApi = createApi({
    reducerPath: 'productsApi',
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
    /* refetchOnMountOrArgChange: true,
    refetchOnReconnect: true, */
    tagTypes: ['Products', 'Images'],
    endpoints: (builder) => ({
        getProductsPerPage: builder.query<
            ProductsResponsePerPage,
            { _page: number; _limit: number; _search: string }
        >({
            query: ({ _page, _limit, _search }) => ({
                params: { _page, _limit, _search },
                url: '/admin/products',
                method: 'GET'
            }),
            providesTags: ['Products'],
            async onCacheEntryAdded(
                params,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket.on('refreshProducts', (newProduct: Product) => {
                        updateCachedData((draft) => {
                            const newData = draft.products.map((product) => {
                                if (product._id === newProduct._id) {
                                    return newProduct;
                                } else {
                                    return product;
                                }
                            });
                            draft.products = newData;
                        });
                    });

                    socket.on('addProduct', (newProduct: Product) => {
                        updateCachedData((draft) => {
                            const newData = [...draft.products];
                            // Agregamos el nuevo producto al inicio de la lista
                            newData.unshift(newProduct);
                            draft.products = newData;
                        });
                    });

                    await cacheEntryRemoved;
                    socket.off('connect');
                    socket.off('refreshProducts');
                    socket.off('addProduct');
                } catch (error) {}
            }
        }),
        createProduct: builder.mutation<ProductResponse, ProductRequest>({
            query: (newProduct) => ({
                url: '/admin/products',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: invalidateOn({ success: ['Products' as const] })
        }),
        getProductBySlug: builder.query<ProductResponse, { _slug: string }>({
            query: ({ _slug }) => ({
                url: `/admin/products/${_slug}`,
                method: 'GET'
            }),
            providesTags: ['Products']
        }),
        updateProduct: builder.mutation<
            ProductResponse,
            { id: string; updateProduct: ProductRequest }
        >({
            query: ({ id, updateProduct }) => ({
                url: `/admin/products/${id}`,
                method: 'PUT',
                body: updateProduct
            }),
            invalidatesTags: invalidateOn({ success: ['Products' as const] })
        }),
        deleteProduct: builder.mutation<ProductResponse, { _id: string }>({
            query: ({ _id }) => ({
                url: `/admin/products/${_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: invalidateOn({ success: ['Products' as const] })
        }),
        uploadImagesByProduct: builder.mutation<
            ImagesResponse,
            { _id: string; images: FormData }
        >({
            query: ({ _id, images }) => ({
                url: `/admin/images/${_id}`,
                body: images,
                method: 'POST'
            }),
            invalidatesTags: invalidateOn({ success: ['Images' as const] })
        }),
        getImageByProduct: builder.query<ImagesResponse, { _slug: string }>({
            query: ({ _slug }) => ({
                url: `/admin/images/${_slug}`,
                method: 'GET'
            }),
            providesTags: ['Images']
        }),
        deleteImageByProduct: builder.mutation<
            SimpleResponse,
            { _id: string; imageName: string }
        >({
            query: ({ _id, imageName }) => ({
                url: `/admin/images/${_id}`,
                method: 'DELETE',
                body: { imageName }
            }),
            invalidatesTags: ['Images']
        }),
        updateOrderImagesByProduct: builder.mutation<
            ImagesResponse,
            { _id: string; images: Image[] }
        >({
            query: ({ _id, images }) => ({
                url: `/admin/images/${_id}`,
                method: 'PUT',
                body: { images }
            })
        }),
        getProductsByCategory: builder.query<ProductsResponse, void>({
            query: () => '/products'
        })
    })
});

export const {
    useGetProductsPerPageQuery,
    useCreateProductMutation,
    useGetProductBySlugQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetImageByProductQuery,
    useDeleteImageByProductMutation,
    useUploadImagesByProductMutation,
    useUpdateOrderImagesByProductMutation,
    useGetProductsByCategoryQuery
} = productsApi;
