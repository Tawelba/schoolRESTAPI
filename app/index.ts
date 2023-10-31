import { FastifyReply, FastifyRequest } from 'fastify';
import { server } from '../server';
import { userRoutes } from './modules/users/users.routes';
import { userSchemas } from './modules/users/users.schema';
import { fastifyJwt } from '@fastify/jwt';
import { schoolRoutes } from './modules/schools/schools.routes';

// Define routes and plugins.
server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({message: 'Ok'});
});

server.register(fastifyJwt, {secret: 'diew0qiwieonsiradnaririeqirnqirir'});
server.decorate('auth',async (request:FastifyRequest, reply:FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (e) {
    return reply.send(e)
  }
})

for(const schema of userSchemas){
  server.addSchema(schema)
}
server.register(userRoutes, {prefix: '/api/users'})
server.register(schoolRoutes, {prefix: '/api/schools'})
// Start the server.
server.listen();