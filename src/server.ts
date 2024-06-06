import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import { join } from 'path';
import i18next from './config/i18n';

console.log(i18next.t('greeting'));

const fastify = Fastify({
  logger: process.env.SERVER_ENVIRONMENT === 'dev' ? false : false,
  bodyLimit: 10485760,
});

fastify.register(autoload, {
  dir: join(__dirname, 'plugins'),
});

// fastify.register(autoload, {
//   dir: join(__dirname, 'hooks'),
// });

fastify.register(autoload, {
  dir: join(__dirname, 'routes'),
  dirNameRoutePrefix: true,
  prefix: 'api/v1',
});

export default fastify;
