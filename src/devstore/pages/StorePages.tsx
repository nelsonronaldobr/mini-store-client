import { useGetProdutcs } from '../../hooks';

export const StorePage = () => {
    const { data } = useGetProdutcs();
    return <div>TAREA</div>;
};
