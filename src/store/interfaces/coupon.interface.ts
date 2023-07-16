import { ModalOptions } from '.';

export interface Coupon {
    _id: string;
    code: string;
    status: string;
    discount: string;
    discount_percentage: number;
    with_quantity: boolean;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface InitialStateCoupon {
    coupon: Coupon;
    modalOptions: ModalOptions;
}
