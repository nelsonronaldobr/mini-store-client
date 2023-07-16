import { toast } from 'react-hot-toast';
import {
    loginStart,
    loginSuccess,
    logout,
    registerError,
    registerStart,
    registerSuccess,
    useAppDispatch,
    useAppSelector
} from '../store';
import {
    AuthResponse,
    ErrorResponse,
    LoginValues,
    RegisterValues,
    SimpleResponse
} from '../store/interfaces';
import { devStoreApi } from '../api';

export const useAuthStore = () => {
    const { loading, sessionStatus, tokenSession, user, messages } =
        useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const startRegister = (values: RegisterValues) => {
        dispatch(registerStart());

        toast.promise(
            devStoreApi.post<SimpleResponse>('/auth/register', values),
            {
                loading: 'Loading',
                success: ({ data }) => {
                    dispatch(registerSuccess());
                    return data.messages.msg;
                },
                error: ({ response: { data } }: ErrorResponse) => {
                    dispatch(registerError());
                    if (data.errors && Object.keys(data.errors).length > 0) {
                        return Object.values(data.errors)[0]['msg'];
                    }
                    return data.messages!.msg;
                }
            },
            {
                className: 'dark:bg-gray-800 dark:text-white'
            }
        );
    };

    const startLogin = (values: LoginValues) => {
        dispatch(loginStart());
        toast.promise(
            devStoreApi.post<AuthResponse>('/auth', values),
            {
                loading: 'loading',
                success: ({ data }) => {
                    dispatch(loginSuccess(data));
                    return data.messages.msg;
                },
                error: ({ response: { data } }: ErrorResponse) => {
                    dispatch(logout());
                    if (data.errors && Object.keys(data.errors).length > 0) {
                        return Object.values(data.errors)[0]['msg'];
                    }
                    return data.messages!.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800',
                duration: 5000,
                position: 'bottom-right'
            }
        );
    };

    const startCheckSession = async () => {
        const tokenSession = localStorage.getItem('tokenSession');

        if (!tokenSession) return dispatch(logout());

        dispatch(loginStart());

        try {
            const { data } = await devStoreApi.get<AuthResponse>('/auth/renew');
            dispatch(loginSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(logout());
        }
    };

    const startLogout = () => {
        dispatch(logout());
    };

    return {
        loading,
        sessionStatus,
        tokenSession,
        user,
        messages,
        startRegister,
        startLogin,
        startCheckSession,
        isAuthenticated: user && user.email_verified,
        startLogout,
        isAdminOrSalesman: user?.role === 'admin' || user?.role === 'salesman'
    };
};
