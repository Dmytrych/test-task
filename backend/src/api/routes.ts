import {FastifyInstance} from "fastify";
import {healthcheckRoutes} from "../features/healthcheck/healthcheck.route";
import {authRoutes} from "../features/auth/controllers/auth.route";
import {projectRoutes} from "../features/project/controllers/project.route";

export const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(healthcheckRoutes, { prefix: '/healthcheck' })
  fastify.register(authRoutes, { prefix: '/auth' })
  fastify.register(projectRoutes, { prefix: '/projects' })
}
