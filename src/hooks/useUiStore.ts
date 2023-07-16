import { useAppDispatch, useAppSelector } from '../store';
import {
    darkMode,
    getTheme,
    lightMode,
    toggleShoppingCart
} from '../store/ui/uiSlice';

export const useUiStore = () => {
    const { theme, openShoppingCart } = useAppSelector((state) => state.ui);
    const dispatch = useAppDispatch();
    const startLightMode = () => {
        dispatch(lightMode());
    };
    const startDarkMode = () => {
        dispatch(darkMode());
    };
    const startGetTheme = () => {
        dispatch(getTheme());
    };
    const startToggleShoppingCart = () => {
        dispatch(toggleShoppingCart());
    };

    return {
        theme,
        startDarkMode,
        startLightMode,
        startGetTheme,
        startToggleShoppingCart,
        openShoppingCart
    };
};
