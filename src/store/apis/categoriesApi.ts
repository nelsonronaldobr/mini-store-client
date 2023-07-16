import { RootState } from '..';
import { getEnvVariables, invalidateOn } from '../../helpers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    CategoriesResponse,
    CategoryResponse,
    CategoryRequest,
    SimpleResponse,
    CategoriesResponsePerPage
} from '../interfaces';
const { VITE_API_URL } = getEnvVariables();

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
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
    /* 
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
 */
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategoriesPerPage: builder.query<
            CategoriesResponsePerPage,
            { _page: number; _limit: number; _search: string }
        >({
            query: ({ _page, _limit, _search }) => ({
                params: { _page, _limit, _search },
                url: '/admin/categories'
            }),
            providesTags: ['Categories']
            /* async onCacheEntryAdded(
                params,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    const socket = io(VITE_BACKEND_URL, {
                        withCredentials: true
                    });

                    socket.on('refreshCategories', (category: Category) => {
                        console.log(category);

                        updateCachedData((draft) => {
                            draft.categories.push(category);
                        });
                    });

                    await cacheDataLoaded;
                } catch (error) {}
            } */
        }),
        createCategory: builder.mutation<CategoryResponse, CategoryRequest>({
            query: (newCategory) => ({
                url: '/admin/categories',
                method: 'POST',
                body: newCategory
            }),
            invalidatesTags: invalidateOn({ success: ['Categories' as const] })
        }),
        deleteCategory: builder.mutation<SimpleResponse, string>({
            query: (id) => ({
                url: `/admin/categories/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: invalidateOn({ success: ['Categories' as const] })
        }),
        updateCategory: builder.mutation<
            SimpleResponse,
            { id: string; updateCategory: CategoryRequest }
        >({
            query: ({ id, updateCategory }) => ({
                url: `/admin/categories/${id}`,
                method: 'PUT',
                body: updateCategory
            }),
            invalidatesTags: invalidateOn({ success: ['Categories' as const] })
        }),
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => '/categories'
        })
    })
});

export const {
    useGetCategoriesPerPageQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoriesQuery
} = categoriesApi;
