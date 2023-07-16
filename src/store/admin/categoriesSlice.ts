import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category, InitialStateCategory } from '..';

const initialState = {
    page: 1,
    category: {
        _id: '',
        createdAt: '',
        name: '',
        status: '',
        updatedAt: ''
    },
    modalOptions: {
        title: '',
        show: false
    }
} as InitialStateCategory;

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        changePage(state, { payload }: PayloadAction<number>) {
            state.page = payload;
        },
        onCloseModalCategory(state) {
            if (state.modalOptions.show) {
                state.category = {
                    _id: '',
                    createdAt: '',
                    name: '',
                    status: '',
                    updatedAt: ''
                };
            }
            state.modalOptions.show = !state.modalOptions.show;
        },
        setCategory(state, { payload }: PayloadAction<Category>) {
            state.category = payload;
        },
        setModalCategoryOptions(
            state,
            { payload }: PayloadAction<{ title: string }>
        ) {
            state.modalOptions.title = payload.title;
        }
    }
});

export const {
    changePage,
    onCloseModalCategory,
    setCategory,
    setModalCategoryOptions
} = categoriesSlice.actions;
//export const categoriesReducer = categoriesSlice.reducer
