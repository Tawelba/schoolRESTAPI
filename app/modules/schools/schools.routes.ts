import { FastifyInstance } from "fastify";
import { createSchoolHandler, getSchoolsHandler, updateSchoolHandler } from "./schools.controller";

export const schoolRoutes = async (server: FastifyInstance) => {
    server.post('/', createSchoolHandler)
    server.get('/', getSchoolsHandler)
    server.put('/:id', updateSchoolHandler)
}