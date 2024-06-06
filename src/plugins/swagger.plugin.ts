import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import fs from 'node:fs';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
const awaitTime: number = 1;
const maxRequests: number = 120;
const swagger: FastifyPluginAsync = async (fastify) => {
  void fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'My api docs title',
        description: `My description docs`,
        version: '3.0.0',
      },
      servers: [{ url: '/', description: 'SIGE 2.0' }],
      components: {
        securitySchemes: {
          Bearer: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    hideUntagged: true,
  });
  void fastify.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false,
      validatorUrl: null,
    },
    uiHooks: {
      preHandler: function (_, __, next) {
        next();
      },
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _req, _quest) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
    // logo: {
    //   type: 'image/png',
    //   content: Buffer.from(
    //     fs.readFileSync('./assets/logo.png').toString('base64'),
    //     'base64'
    //   ),
    // },
    // theme: {
    //   title: 'LM Sistemas',
    //   favicon: [
    //     {
    //       filename: 'favicon.ico',
    //       rel: 'icon',
    //       sizes: '16x16',
    //       type: 'image/x-icon',
    //       content: Buffer.from(
    //         fs.readFileSync('./assets/favicon.ico').toString('base64'),
    //         'base64'
    //       ),
    //     },
    //   ],
    //   css: [
    //     {
    //       filename: 'theme.css',
    //       content: `
    //         @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap')
    //         .swagger-ui .topbar {
    //             background-color:#424242;
    //           }
    //         .swagger-ui .topbar .download-url-wrapper .download-url-button{
    //             background:#2196F3
    //         }
    //         .swagger-ui .topbar .download-url-wrapper input[type=text]{
    //           border: 2px solid #2196F3
    //         }
    //         .swagger-ui .btn.authorize{
    //           border-color:#2196F3;
    //           color:#2196F3;
    //         }
    //         .swagger-ui .btn.authorize svg{
    //           fill: #2196F3;
    //         }
    //         .swagger-ui .info .title small.version-stamp{
    //           background-color:#2196F3;
    //         }
    //         `,
    //     },
    //   ],
    // },
  });
};
export default fp(swagger, {
  name: 'swagger',
});
