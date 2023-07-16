import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { RegisterValues } from '../../store';
import { useAuthStore } from '../../hooks';
import { registerValidationSchema } from '../helpers';
import { Logo } from '../../components';

const initialValues = {
    email: '',
    password: '',
    username: ''
};
export const RegisterPage = () => {
    const { startRegister, loading } = useAuthStore();

    const onSubmit = (values: RegisterValues) => {
        startRegister(values);
    };

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 flex-1 md:bg-white rounded md:shadow md:dark:bg-gray-700 xl:pt-0 pt-14 animate__animated animate__fadeIn'>
            <div className='w-full grid place-content-center order-1  xl:order-none'>
                <Link to={'/'}>
                    <Logo className='lg:w-full w-44' />
                </Link>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                onSubmit={onSubmit}>
                {({ isValid, dirty }) => (
                    <Form className='flex flex-col justify-center gap-9 md:gap-6 font-open-sans font-semibold md:p-14 p-8 order-2 xl:order-none'>
                        <h1 className='text-5xl block text-center font-passion-one text-yellow-950 dark:text-white'>
                            Crea tu Cuenta
                        </h1>
                        <div className='relative'>
                            <Field
                                type='text'
                                className='auth-form-input'
                                placeholder='Ingresa un username'
                                name='username'
                            />
                            <ErrorMessage
                                name='username'
                                component={'span'}
                                className='auth-form-input--error animate__animated animate__fadeInDown'
                            />
                        </div>
                        <div className='relative'>
                            <Field
                                type='email'
                                className='auth-form-input'
                                placeholder='Ingresa un email'
                                name='email'
                            />
                            <ErrorMessage
                                name='email'
                                component={'span'}
                                className='auth-form-input--error animate__animated animate__fadeInDown'
                            />
                        </div>

                        <div className='relative'>
                            <Field
                                type='password'
                                className='auth-form-input'
                                placeholder='Ingresa un password'
                                name='password'
                            />
                            <ErrorMessage
                                name='password'
                                component={'span'}
                                className='auth-form-input--error animate__animated animate__fadeInDown'
                            />
                        </div>
                        <button
                            disabled={!(dirty && isValid) || loading}
                            type='submit'
                            className='auth-form-submit-btn'>
                            Crear Cuenta
                        </button>
                        <div className='flex justify-center'>
                            <span className='text-[13px] text-amber-950 dark:text-white'>
                                ¿Ya tienes cuenta?{' '}
                                <Link
                                    to={'/auth/login'}
                                    className='font-bold hover:underline dark:text-white text-yellow-950 hover:text-yellow-900'>
                                    Ingresa
                                </Link>
                            </span>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
