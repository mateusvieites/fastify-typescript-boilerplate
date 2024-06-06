import env from './config/dotenv';
import fastify from './server';

fastify.listen({ host: env.host, port: env.port }, (err, address) => {
  if (err) process.exit(1);
  if (process.env['SERVER_ENVIRONMENT'] === 'dev')
    console.log(`Servidor iniciado no endereço ${address}`);
});
