import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal } from '.';
import { useCouponStore } from '../../../hooks';
import { couponValidationSchema } from '../../helpers';
import { CouponRequest } from '../../../store';
import { useCouponMutations } from '../../hooks/coupons';

export const CouponModal = () => {
    const {
        modalOptions: { title, show },
        coupon: oldCoupon,
        startOnCloseModalCoupon
    } = useCouponStore();

    const { startCreate, isLoadingCreate, startUpdate, isLoadingUpdate } =
        useCouponMutations();

    const initialValues = {
        ...oldCoupon
    };
    const { _id: id } = oldCoupon;

    const onSubmit = (coupon: CouponRequest) => {
        if (id) {
            return startUpdate({ id, coupon });
        }
        startCreate(coupon);
    };

    return (
        <Modal onClose={startOnCloseModalCoupon} show={show} title={title}>
            <Formik
                initialValues={initialValues}
                validationSchema={couponValidationSchema}
                onSubmit={onSubmit}>
                {({ dirty, isValid }) => (
                    <Form className='flex flex-col justify-center gap-8'>
                        <div className='relative z-0 w-full group'>
                            <Field
                                type='text'
                                name='code'
                                id='code'
                                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                placeholder=' '
                                required
                            />
                            <label
                                htmlFor='code'
                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Code name
                            </label>
                            <ErrorMessage
                                name='code'
                                className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                component={'span'}
                            />
                        </div>

                        <div className='relative z-0 w-full group'>
                            <Field
                                type='text'
                                name='discount'
                                id='discount'
                                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                placeholder=' '
                                required
                            />
                            <label
                                htmlFor='discount'
                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                Discount
                            </label>
                            <ErrorMessage
                                name='discount'
                                className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                component={'span'}
                            />
                        </div>

                        <div className='mt-4 flex justify-end gap-3'>
                            <button
                                disabled={
                                    !(dirty && isValid) ||
                                    isLoadingCreate ||
                                    isLoadingUpdate
                                }
                                type='submit'
                                className='disabled:opacity-80 flex justify-center items-center w-24 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5'>
                                Save
                            </button>
                            <button
                                type='button'
                                className='focus:outline-none text-white bg-red-400 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700'
                                onClick={startOnCloseModalCoupon}>
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
