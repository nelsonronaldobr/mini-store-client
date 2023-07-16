import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El campo nombre de producto es requerido')
        .min(2, 'El campo nombre de producto debe tener al menos 2 caracteres')
        .max(
            50,
            'El campo nombre de producto debe tener como máximo 50 caracteres'
        ),
    // Otros campos y validaciones pueden agregarse aquí
    description: Yup.string()
        .required('El campo nombre de producto es requerido')
        .min(2, 'El campo nombre de producto debe tener al menos 2 caracteres')
        .max(
            200,
            'El campo nombre de producto debe tener como máximo 50 caracteres'
        ),
    stock: Yup.number()
        .integer('El campo stock debe ser un número entero')
        .positive('El campo stock debe ser un número positivo')
        .required('El campo stock es requerido'),

    price: Yup.number()
        .positive('El campo precio debe ser un número positivo')
        .moreThan(0, 'El campo precio debe ser mayor que cero')
        .required('El campo precio es requerido'),
    category: Yup.string().required('Debes seleccionar una categoría'),
    toppings: Yup.boolean(),
    extraItems: Yup.boolean(),
    complements: Yup.boolean(),
    options: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('El campo Hamburguesa es requerido')
        })
    ),
    typeOfPersons: Yup.number()
        .integer('El campo typeOfPersons debe ser un número entero')
        .positive('El campo typeOfPersons debe ser un número positivo')
        .required('El campo typeOfPersons es requerido')
});
