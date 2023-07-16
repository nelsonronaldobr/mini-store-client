import { useGetProductsByCategoryQuery } from '../store/apis';

export const useGetProdutcs = () => {
    const productsByCategoryQuery = useGetProductsByCategoryQuery();

    return {
        ...productsByCategoryQuery
    };
};
