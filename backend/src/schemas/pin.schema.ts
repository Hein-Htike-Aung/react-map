import { object, string, array, ref, boolean, mixed, number } from 'yup';

export const createPinSchema = object({
    body: object({
        members: array().of(
            object().shape({
                username: string().required(),
                title: string().required(),
                desc: string().required().min(3),
                rating: number().required().min(0).max(5),
                longitude: number().required(),
                latitude: number().required()
            })
        )
    })
})