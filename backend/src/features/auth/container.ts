import {AuthRepository} from "./repositories/auth.repository";
import {asClass} from "awilix";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controller";

export const load = () => {
  return {
    authRepository: asClass(AuthRepository),
    authService: asClass(AuthService),
    authController: asClass(AuthController)
  }
}
