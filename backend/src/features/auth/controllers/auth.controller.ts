import {FastifyValidatedHandler} from "../../../common/types/api";
import {IAuthService} from "../services/auth.service";
import {getErrorResponse, getSuccessResponse} from "../../../common/response-helpers";
import {toApiResponse} from "../../../common/validation-result";
import {RegisterSchemaType} from "./schemas/register.schema";
import {LoginSchemaType} from "./schemas/login.schema";
import {AuthError} from "../errors";

type AuthControllerDependencies = {
  authService: IAuthService
}

export class AuthController {
  private readonly authService: IAuthService

  constructor(dependencies: AuthControllerDependencies) {
    this.authService = dependencies.authService
  }

  register: FastifyValidatedHandler<RegisterSchemaType> = async (request, reply) => {
    try {
      const { email, password, name } = request.body;
      const user = await this.authService.register(email, password, name);

      reply.status(201).send(getSuccessResponse(user));
    } catch (error) {
      if (error instanceof AuthError) {
        reply.status(400).send(getErrorResponse({
          message: error.message,
        }));
        return
      }
      throw error;
    }
  }

  login: FastifyValidatedHandler<LoginSchemaType> = async (request, reply) => {
    const { email, password } = request.body;
    const result = await this.authService.login(email, password);

    if (!result.success) {
      reply.status(401).send(toApiResponse(result));
      return;
    }

    reply.status(201).send(toApiResponse(result));
  }
}
