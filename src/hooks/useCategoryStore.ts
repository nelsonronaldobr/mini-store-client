import {
    Category,
    onCloseModalCategory,
    setCategory,
    setModalCategoryOptions,
    useAppDispatch,
    useAppSelector
} from '../store';

export const useCategoryStore = () => {
    const { category, modalOptions } = useAppSelector(
        (state) => state.categories
    );
    const dispacth = useAppDispatch();

    const startOnCloseModalCategory = () => {
        dispacth(onCloseModalCategory());
    };

    const startSetCategory = (category: Category) => {
        dispacth(setCategory(category));
    };

    const startSetModalCategoryOptions = ({ title }: { title: string }) => {
        dispacth(setModalCategoryOptions({ title }));
    };

    return {
        startOnCloseModalCategory,
        startSetCategory,
        category,
        startSetModalCategoryOptions,
        modalOptions
    };
};
