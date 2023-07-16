import * as Yup from 'yup';
export const registerValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(
            2,
            'Por favor ingrese su nombre de usuario (mínimo de 2 caracteres).'
        )
        .max(
            50,
            'Por favor ingrese su nombre de usuario (límite de 200 caracteres).'
        )
        .required(
            'Por favor ingrese su nombre de usuario (mínimo de 2 caracteres).'
        ),
    password: Yup.string()
        .min(6, 'La contraseña debe tener un mínimo de 8 caracteres')
        .required('La contraseña debe tener un mínimo de 8 caracteres'),
    email: Yup.string()
        .email('Por favor, ingresa una dirección de correo electrónico válida.')
        .required(
            'Por favor, ingresa una dirección de correo electrónico válida.'
        )
});
export const loginValidationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'La contraseña debe tener un mínimo de 8 caracteres')
        .required('La contraseña debe tener un mínimo de 8 caracteres'),
    email: Yup.string()
        .email('Por favor, ingresa una dirección de correo electrónico válida.')
        .required(
            'Por favor, ingresa una dirección de correo electrónico válida.'
        )
});
