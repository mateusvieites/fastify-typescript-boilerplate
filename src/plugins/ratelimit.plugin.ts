import fastifyRateLimit from '@fastify/rate-limit';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const awaitTime: number = 1;

const timeRequests = 1000; //1 minuto

const rateLimit: FastifyPluginAsync = async (fastify) => {
  void fastify.register(fastifyRateLimit, {
    global: false,
    max: async (request) => {
      return 120;
    },
    timeWindow: timeRequests,
    errorResponseBuilder: (_request, _context) => {
      return {
        statusCode: 429, // Código de status HTTP para limite de taxa excedido
        error: 'Rate Limit Exceeded',
        message: `Você atingiu o limite de taxa de solicitações. Tente novamente em ${awaitTime} minuto.`,
      };
    },
  });
};
export default fp(rateLimit, {
  name: 'rateLimit',
});
