import { FastifyInstance } from "fastify";
import { createUserHandler, getActiveUsersHandler, loginHandler } from "./users.controller";
import { $ref } from "./users.schema";

export const userRoutes = async(server: FastifyInstance) => {
    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler);

    server.post('/',{
        preHandler: [server.auth],
        schema: {
            body: $ref('createUserSchema'),
            response: {
                201: $ref('createUserResponseSchema')
            }
        }
    }, createUserHandler);

    server.get('/', {
        preHandler: [server.auth]
    }, getActiveUsersHandler)
};