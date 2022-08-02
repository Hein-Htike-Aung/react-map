import { object, string, array, ref, boolean, mixed, number } from 'yup';

export const registerSchema = object({
    body: object({
        members: array().of(
            object().shape({
                username: string().required(),
                email: string().email(),
                password: string()
                    .min(6, 'Password is too short - should be 6 chars minimum.')
                    .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
            })
        )
    })
})

export const loginSchema = object({
    params: object({
        email: string().email(),
        password: string()
            .min(6, 'Password is too short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    })
})