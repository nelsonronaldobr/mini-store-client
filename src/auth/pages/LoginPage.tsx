import { Link } from 'react-router-dom';
import { Logo, Spinner } from '../../components';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { LoginValues } from '../../store';
import { loginValidationSchema } from '../helpers';
import { useAuthStore } from '../../hooks';

const initialValues = {
    email: '',
    password: ''
};

export const LoginPage = () => {
    const { startLogin, loading } = useAuthStore();
    const onSubmit = (values: LoginValues) => {
        startLogin(values);
    };

    return (
        <div className='grid xl:grid-cols-2 flex-1 md:bg-white rounded md:shadow md:dark:bg-gray-700 xl:pt-0 pt-8 animate__animated animate__fadeIn'>
            <div className='w-full grid place-content-center'>
                <Link to={'/'}>
                    <Logo className='lg:w-full w-44' />
                </Link>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={onSubmit}>
                {({ isValid, dirty }) => (
                    <Form className='flex flex-col justify-center gap-9 md:gap-6 font-open-sans font-semibold md:p-14 p-8'>
                        <h1 className='text-5xl text-center font-passion-one text-yellow-950 dark:text-white'>
                            Inicia Sesión
                        </h1>
                        <div className='relative'>
                            <Field
                                type='email'
                                className='auth-form-input dark:text-white'
                                placeholder='Ingresa tu email'
                                name='email'
                            />
                            <ErrorMessage
                                name='email'
                                className='auth-form-input--error animate__animated animate__fadeInDown'
                                component={'span'}
                            />
                        </div>
                        <div className='relative'>
                            <Field
                                type='password'
                                className='auth-form-input'
                                placeholder='Ingresa tu password'
                                name='password'
                            />
                            <ErrorMessage
                                name='password'
                                className='auth-form-input--error animate__animated animate__fadeInDown'
                                component={'span'}
                            />
                        </div>
                        <button
                            disabled={!(dirty && isValid) || loading}
                            className={`auth-form-submit-btn`}
                            type='submit'>
                            {loading ? (
                                <Spinner className='w-6 h-6' />
                            ) : (
                                'Ingresar'
                            )}
                        </button>
                        <div className='flex justify-center flex-col items-center gap-3'>
                            <p className='text-[13px] text-amber-950 dark:text-white'>
                                ¿No tienes cuenta?{' '}
                                <Link
                                    to={'/auth/register'}
                                    className='font-bold hover:underline dark:text-white text-yellow-950 hover:text-yellow-900'>
                                    Registrate
                                </Link>
                            </p>
                            <div>
                                <p className='text-gray-500 font-open-sans dark:text-amber-500 font-light text-xs text-center'>
                                    Una cuenta en{' '}
                                    <span className='font-semibold'>
                                        Burger Queen
                                    </span>{' '}
                                    te permitira hacer tus compras desde
                                    cualquier parte del Perú, accede a
                                    promociones, cupones y mucho más.
                                </p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
