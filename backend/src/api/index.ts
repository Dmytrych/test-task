import Fastify, {FastifyInstance} from 'fastify'
import auth from '@fastify/auth'
import {registerRoutes} from "./routes";
import {serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {diContainer, fastifyAwilixPlugin} from '@fastify/awilix'
import {AppConfig} from "../common/configuration";
import load from "./container";
import {tokenPlugin} from "../plugins/token-plugin";
import {errorHandler} from "./error-handler";
import fastifyCors from "@fastify/cors";

const initPlugins = async (fastify: FastifyInstance, config: AppConfig) => {
  await fastify.register(fastifyAwilixPlugin, {
    container: diContainer,
    disposeOnClose: true,
    asyncDispose: true,
    asyncInit: true,
    eagerInject: true,
    disposeOnResponse: false,
  })

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(auth)
  await fastify.register(tokenPlugin, {
    secret: config.api.auth.jwtSecret,
    expiresIn: config.api.auth.jwtLifespanSeconds,
  })

  await fastify.register(fastifyCors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
}

export const initApi = async (config: AppConfig) => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    }
  }).withTypeProvider<ZodTypeProvider>();

  await initPlugins(fastify, config);

  fastify.diContainer.register(await load(config, fastify.log))

  fastify.setErrorHandler(errorHandler)

  await fastify.register(registerRoutes, { prefix: '/v1' })

  try {
    await fastify.listen({ port: config.api.port, host: config.api.host })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
