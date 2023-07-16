import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialStateCoupon } from '../interfaces/coupon.interface';
import { Coupon } from '..';

const coupon = {
    _id: '',
    code: '',
    createdAt: '',
    discount: '',
    discount_percentage: 0,
    quantity: 0,
    status: '',
    updatedAt: '',
    with_quantity: false
};

const initialState = {
    coupon,
    modalOptions: {
        title: '',
        show: false
    }
} as InitialStateCoupon;

export const couponsSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
        setModalCouponOptions(
            state,
            { payload }: PayloadAction<{ title: string }>
        ) {
            state.modalOptions.title = payload.title;
        },
        onCloseModalCoupon(state) {
            if (state.modalOptions.show) {
                state.coupon = coupon;
            }
            state.modalOptions.show = !state.modalOptions.show;
        },
        setCoupon(state, { payload }: PayloadAction<Coupon>) {
            state.coupon = payload;
        }
    }
});

export const { onCloseModalCoupon, setModalCouponOptions, setCoupon } =
    couponsSlice.actions;
//export const couponsReducer = couponsSlice.reducer
