import type {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import fp from 'fastify-plugin'
import jwtTokenPlugin, {FastifyJwtNamespace} from "@fastify/jwt";

export type JwtTokenPluginOptions = {
  secret: string,
  expiresIn: number,
}

declare module 'fastify' {
  interface FastifyInstance extends FastifyJwtNamespace<{namespace: 'security'}> {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

function plugin(
  fastify: FastifyInstance,
  pluginOptions: JwtTokenPluginOptions,
  next: (err?: Error) => void,
) {
  fastify.register(jwtTokenPlugin, {
    secret: pluginOptions.secret,
  })
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify({ maxAge: pluginOptions.expiresIn })
    } catch (err) {
      reply.send(err)
    }
  })

  next()
}

export const tokenPlugin: FastifyPluginCallback<JwtTokenPluginOptions> =
  fp<JwtTokenPluginOptions>(plugin, {
    fastify: '5.x',
    name: 'jwt-token-plugin',
  })
