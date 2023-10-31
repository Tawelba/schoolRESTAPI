import fastify, { FastifyInstance } from 'fastify';

export const server: FastifyInstance = fastify();

declare module 'fastify' {
  export interface FastifyInstance {
    auth: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJwt {
    user: {
      id: string,
      email: string,
      role: string,
      active: boolean
    }
  }
}
// Start the server.
server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server ready at ${address}`);
});