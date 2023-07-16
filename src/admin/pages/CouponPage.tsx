import { Fragment } from 'react';
import { CouponModal, CouponTable } from '../components';

export const CouponPage = () => {
    return (
        <Fragment>
            <CouponTable />
            <CouponModal />
        </Fragment>
    );
};
