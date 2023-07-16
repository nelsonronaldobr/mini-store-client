import * as Yup from 'yup';

export const couponValidationSchema = Yup.object().shape({
    code: Yup.string().required('El campo code es requerido.'),
    discount: Yup.string()
        .required('El campo discount es requerido.')
        .matches(
            /^[0-9]+%$/,
            'El campo discount debe incluir un signo de porcentaje ejemplo: 10%.'
        )
    /* with_quantity: Yup.boolean().required(
        'El campo with_quantity es requerido.'
    ),
    quantity: Yup.number().when('with_quantity', ([with_quantity], schema) => {
        if (with_quantity) {
            return Yup.number().required(
                'El campo quantity es requerido cuando with_quantity es true.'
            );
        }
        return schema;
    }) */
});
