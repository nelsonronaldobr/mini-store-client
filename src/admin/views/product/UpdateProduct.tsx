import { ChangeEvent } from 'react';
import { useCategories } from '../../hooks/categories';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { productValidationSchema } from '../../helpers';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useProductBySlug, useProductMutations } from '../../hooks/products';
import { Product } from '../../../store';
import { Spinner } from '../../../components';
import { FormSkeleton } from '../../components/skeleton';

export const UpdateProduct = () => {
    const {
        isFetching,
        isLoading: isLoadingCategory,
        data: categories
    } = useCategories();

    const { startUpdate, isLoadingUpdate } = useProductMutations();

    const onSubmit = async (value: Product) => {
        startUpdate(value);
    };
    const { slug } = useParams();

    const {
        product,
        isError,
        isLoading: isLoadingProduct
    } = useProductBySlug(slug || '');

    const initialValues = {
        ...product
    } as Product;

    if (isError) {
        return <Navigate to={'/admin/inventory/products'} replace={true} />;
    }

    return (
        <>
            {isLoadingProduct ? (
                <FormSkeleton />
            ) : (
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={productValidationSchema}>
                    {({ handleChange, setFieldValue, values, dirty }) => (
                        <Form
                            className='flex flex-col gap-3'
                            autoComplete='off'>
                            <h1 className='text-3xl font-semibold dark:text-white text-center mb-5'>
                                Update Product
                            </h1>

                            <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 w-full mb-6 group'>
                                    <Field
                                        autoComplete={'off'}
                                        type='text'
                                        name='name'
                                        id='name'
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required
                                    />
                                    <label
                                        htmlFor='name'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                        Name Product
                                    </label>
                                    <ErrorMessage
                                        name='name'
                                        className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                        component={'span'}
                                    />
                                </div>
                                <div className='relative z-0 w-full mb-6 group'>
                                    <Field
                                        type='number'
                                        name='price'
                                        id='price'
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required
                                    />
                                    <label
                                        htmlFor='price'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                        Price Product
                                    </label>
                                    <ErrorMessage
                                        name='price'
                                        className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                        component={'span'}
                                    />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-6'>
                                <div className='relative z-0 w-full mb-6 group'>
                                    <Field
                                        type='number'
                                        name='stock'
                                        id='stock'
                                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                        placeholder=' '
                                        required
                                    />
                                    <label
                                        htmlFor='stock'
                                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                        Stock Product
                                    </label>
                                    <ErrorMessage
                                        name='stock'
                                        className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                        component={'span'}
                                    />
                                </div>
                                <div className='relative'>
                                    <Field
                                        as={'select'}
                                        id='category'
                                        name='category'
                                        disabled={
                                            isFetching || isLoadingCategory
                                        }
                                        onChange={(
                                            e: ChangeEvent<HTMLSelectElement>
                                        ) => {
                                            handleChange(e);
                                            switch (e.target.value) {
                                                case '6494d040a8e41d5f5bb516a5':
                                                    setFieldValue(
                                                        'typeOfPersons',
                                                        1
                                                    );
                                                    setFieldValue('options', [
                                                        {
                                                            name: ''
                                                        }
                                                    ]);
                                                    break;
                                                case '6494d048a8e41d5f5bb516b5':
                                                    setFieldValue(
                                                        'typeOfPersons',
                                                        2
                                                    );
                                                    setFieldValue('options', [
                                                        {
                                                            name: ''
                                                        }
                                                    ]);
                                                    break;
                                                default:
                                                    setFieldValue(
                                                        'typeOfPersons',
                                                        1
                                                    );
                                                    setFieldValue(
                                                        'options',
                                                        []
                                                    );
                                                    break;
                                            }
                                        }}
                                        className='block disabled:opacity-50 px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-500  bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
                                        <option
                                            value=''
                                            className='bg-gray-800 text-gray-500 text-base'>
                                            Select Category
                                        </option>
                                        {categories?.categories.map(
                                            ({ _id, name }) => (
                                                <option
                                                    key={_id}
                                                    value={_id}
                                                    className='bg-gray-800 text-base'>
                                                    {name}
                                                </option>
                                            )
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name='category'
                                        className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                        component={'span'}
                                    />
                                </div>
                            </div>
                            <div className='relative z-0 w-full mb-6 group col-span-2'>
                                <Field
                                    as={'textarea'}
                                    name='description'
                                    id='description'
                                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                    placeholder=' '
                                    required
                                />
                                <label
                                    htmlFor='description'
                                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                    Description
                                </label>
                                <ErrorMessage
                                    name='description'
                                    className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                    component={'span'}
                                />
                            </div>
                            <div className='flex flex-wrap justify-between items-center'>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <Field
                                        type='checkbox'
                                        name='toppings'
                                        className='sr-only peer'
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                        Add Toppings
                                    </span>
                                </label>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <Field
                                        type='checkbox'
                                        name='extraItems'
                                        className='sr-only peer'
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                        Add Extra Items
                                    </span>
                                </label>
                                <label className='relative inline-flex items-center cursor-pointer'>
                                    <Field
                                        type='checkbox'
                                        name='addon'
                                        className='sr-only peer'
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                        Add Complements
                                    </span>
                                </label>
                            </div>
                            <FieldArray name='options'>
                                {(arrayHelpers) => {
                                    const options = values.options;

                                    return (
                                        <div className='flex flex-col gap-3'>
                                            {options?.length ? (
                                                <div className='animate__animated animate__fadeIn'>
                                                    <h2 className='text-xl font-semibold dark:text-white text-center mt-5'>
                                                        Añade las Hamburguesas
                                                    </h2>
                                                    <p className='text-center dark:text-white text-xs'>
                                                        Esta categoría indica
                                                        que tienes que añadir
                                                        opciones para que el
                                                        usuario pueda
                                                        seleccionar
                                                    </p>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            {options?.map((value, index) => {
                                                return (
                                                    <div
                                                        className='relative z-0 w-full mb-6 group animate__animated animate__fadeIn'
                                                        key={index}>
                                                        <Field
                                                            type='text'
                                                            name={`options.${index}.name`}
                                                            id={`options.${index}.name`}
                                                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                            placeholder=' '
                                                            required
                                                        />
                                                        <label
                                                            htmlFor={`options.${index}.name`}
                                                            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
                                                            Añade una amburguesa
                                                        </label>
                                                        <ErrorMessage
                                                            name={`options.${index}.name`}
                                                            className='auth-form-input--error animate__animated animate__fadeInDown mt-2'
                                                            component={'span'}
                                                        />
                                                        <button
                                                            type='button'
                                                            disabled={
                                                                options?.length ===
                                                                1
                                                            }
                                                            className='text-white absolute disabled:opacity-50 -top-7 right-0 mt-8 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                                                            onClick={() =>
                                                                arrayHelpers.remove(
                                                                    index
                                                                )
                                                            }>
                                                            -
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            {options?.length ? (
                                                <div>
                                                    <button
                                                        type='button'
                                                        className='text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                                        onClick={() =>
                                                            arrayHelpers.push({
                                                                name: ''
                                                            })
                                                        }>
                                                        +
                                                    </button>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    );
                                }}
                            </FieldArray>

                            <div className='flex justify-between items-center'>
                                <Link
                                    to='/admin/inventory/products'
                                    className='text-white mt-8 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                                    Go Back
                                </Link>
                                <button
                                    disabled={!dirty || isLoadingUpdate}
                                    type='submit'
                                    className='text-white disabled:opacity-50 mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                                    {isLoadingUpdate ? (
                                        <Spinner
                                            className='w-5 h-5'
                                            mini={true}
                                        />
                                    ) : (
                                        'Update Product'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};
