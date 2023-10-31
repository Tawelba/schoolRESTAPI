import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    role: z.string()
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }),
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
    active: z.boolean()
})
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const loginResponseSchema = z.object({accessToken: z.string()})

export type createUserInput = z.infer<typeof createUserSchema>;
export type loginInput = z.infer<typeof loginSchema>;

export const {
    schemas: userSchemas, $ref
} = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema
});
