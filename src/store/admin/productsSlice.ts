import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialStateProduct, Product } from '..';

const initialState = {
    product: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        toppings: false,
        extraItems: false,
        addon: false,
        options: [] as {
            name: string;
        }[],
        typeOfPersons: 1,
        _id: '',
        createdAt: '',
        slug: '',
        status: '',
        updatedAt: '',
        image_paths: ['']
    }
} as InitialStateProduct;

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct(state, { payload }: PayloadAction<Product>) {
            state.product = payload;
        }
    }
});

export const { setProduct } = productsSlice.actions;
//export const productsReducer = productsSlice.reducer
