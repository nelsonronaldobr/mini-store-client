import { configureStore } from '@reduxjs/toolkit';
import { authSlice, categoriesSlice, couponsSlice, productsSlice } from '.';
import { uiSlice } from './ui/uiSlice';
import { categoriesApi, couponsApi, productsApi } from './apis';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        categories: categoriesSlice.reducer,
        products: productsSlice.reducer,
        coupons: couponsSlice.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [couponsApi.reducerPath]: couponsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            productsApi.middleware,
            couponsApi.middleware
        )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
