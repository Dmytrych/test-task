import {
  loginSchema
} from "./schemas/login.schema";
import {FastifyInstanceType} from "../../../common/types/api";
import {AuthController} from "./auth.controller";
import {registerSchema} from "./schemas/register.schema";
import {injectionHandler} from "../../../common/container-utils";

export async function authRoutes(app: FastifyInstanceType) {
  app.post(
    '/register',
    {
      schema: registerSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<AuthController>('authController').register
    )
  )
  app.post(
    '/login',
    {
      schema: loginSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<AuthController>('authController').login
    )
  )
}
