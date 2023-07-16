import { createSlice } from '@reduxjs/toolkit';
import { InitialStateUi, Theme } from '../interfaces';

const initialState = { openShoppingCart: false } as InitialStateUi;

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        darkMode(state) {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            state.theme = 'dark';
        },
        lightMode(state) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
            state.theme = 'light';
        },
        getTheme(state) {
            state.theme = (localStorage.getItem('theme') as Theme) || 'dark';
            if (state.theme == 'dark') {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
        },
        toggleShoppingCart(state) {
            state.openShoppingCart = !state.openShoppingCart;
        }
    }
});

export const { darkMode, lightMode, getTheme, toggleShoppingCart } =
    uiSlice.actions;
//export const uiReducer = uiSlice.reducer
