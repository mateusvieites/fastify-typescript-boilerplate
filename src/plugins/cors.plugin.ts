import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import fastifycors from '@fastify/cors';

const cors: FastifyPluginAsync = async (fastify) => {
  void fastify.register(fastifycors, {
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTION'],
  });
};
export default fp(cors, {
  name: 'cors',
});
