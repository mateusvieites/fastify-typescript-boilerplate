import { FastifyInstance } from 'fastify';

export async function ping(fastify: FastifyInstance) {
  fastify.get('/', async function (request, reply) {
    return 'this is an example';
  });
}
