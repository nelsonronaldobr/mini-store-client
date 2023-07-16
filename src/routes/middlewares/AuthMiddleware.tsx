import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const AuthMiddleware = ({ children }: Props) => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <Navigate to={'/'} replace /> : <>{children}</>;
};
