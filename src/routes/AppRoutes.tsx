import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout, LoginPage, RegisterPage } from '../auth';
import { StorePage } from '../devstore';
import { StoreLayout } from '../devstore';
import { useCheckSession } from '../hooks';
import { ContainerSpinner, Spinner } from '../components';
import { AdminMiddleware, AuthMiddleware } from './middlewares';
import { AdminLayout } from '../admin/layout';
import {
    CategoryPage,
    CouponPage,
    DashboardPage,
    ProductPage
} from '../admin/pages';
import { CreateProduct, Gallery, UpdateProduct } from '../admin/views/product';

export const AppRoutes = () => {
    const { sessionStatus } = useCheckSession();

    if (sessionStatus === 'checking') {
        return (
            <ContainerSpinner className='flex dark:bg-gray-900 bg-amber-300 items-center justify-center h-screen'>
                <Spinner className='w-14 h-14' />
            </ContainerSpinner>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/auth/*'
                    element={
                        <AuthMiddleware>
                            <AuthLayout />
                        </AuthMiddleware>
                    }>
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route
                        path='*'
                        element={<Navigate to={'login'} replace />}
                    />
                </Route>
                <Route path='/*' element={<StoreLayout />}>
                    <Route path='store' element={<StorePage />} />
                    <Route
                        path='*'
                        element={<Navigate to={'/store'} replace />}
                    />
                </Route>
                <Route
                    path='/admin/*'
                    element={
                        <AdminMiddleware>
                            <AdminLayout />
                        </AdminMiddleware>
                    }>
                    <Route path='dashboard' element={<DashboardPage />} />
                    <Route path='inventory/*'>
                        <Route path='categories' element={<CategoryPage />} />
                        <Route path='products'>
                            <Route index element={<ProductPage />} />
                            <Route path='create' element={<CreateProduct />} />
                            <Route path=':slug' element={<UpdateProduct />} />
                            <Route path='gallery/:slug' element={<Gallery />} />
                        </Route>
                        <Route path='coupons' element={<CouponPage />} />
                        <Route
                            path='*'
                            element={<Navigate to={'dashboard'} replace />}
                        />
                    </Route>
                    <Route
                        path='*'
                        element={<Navigate to={'dashboard'} replace />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
