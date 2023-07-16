import {
    onCloseModalCoupon,
    useAppDispatch,
    useAppSelector,
    setModalCouponOptions,
    Coupon,
    setCoupon
} from '../store';
export const useCouponStore = () => {
    const { modalOptions, coupon } = useAppSelector((state) => state.coupons);

    const disptach = useAppDispatch();

    const startOnCloseModalCoupon = () => {
        disptach(onCloseModalCoupon());
    };

    const startSetModalCouponOptions = (title: { title: string }) => {
        disptach(setModalCouponOptions(title));
    };

    const startSetCoupon = (coupon: Coupon) => {
        disptach(setCoupon(coupon));
    };

    return {
        startOnCloseModalCoupon,
        modalOptions,
        coupon,
        startSetModalCouponOptions,
        startSetCoupon
    };
};
