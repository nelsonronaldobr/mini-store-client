import { Product, setProduct, useAppDispatch, useAppSelector } from '../store';

export const useProductStore = () => {
    const { product } = useAppSelector((state) => state.products);
    const dispacth = useAppDispatch();

    const startSetProduct = (product: Product) => {
        dispacth(setProduct(product));
    };

    return {
        product,
        startSetProduct
    };
};
