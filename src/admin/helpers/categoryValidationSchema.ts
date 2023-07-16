import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('El campo nombre de categoría es requerido')
        .min(2, 'El campo nombre de categoría debe tener al menos 2 caracteres')
        .max(
            50,
            'El campo nombre de categoría debe tener como máximo 50 caracteres'
        )
    // Otros campos y validaciones pueden agregarse aquí
});
