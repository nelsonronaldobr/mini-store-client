import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
interface Props {
    children: JSX.Element | JSX.Element[];
}
export const AdminMiddleware = ({ children }: Props) => {
    const { isAdminOrSalesman } = useAuthStore();

    return isAdminOrSalesman ? <>{children}</> : <Navigate to={'/'} replace />;
};
