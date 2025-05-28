import bcrypt from "bcrypt";
import { createSigner } from "fast-jwt";
import { LoginResult, RegistrationResult } from "../auth.types";
import { ValidationResult } from "../../../common/validation-result";
import { IAuthRepository } from "../repositories/auth.repository";
import { AppConfig } from "../../../common/configuration";
import { ILogger } from "../../../common/logger";
import { AuthError } from "../errors";

export interface IAuthService {
  register(email: string, password: string, name: string): Promise<RegistrationResult>;
  login(email: string, password: string): Promise<ValidationResult<LoginResult>>;
}

export type AuthServiceDependencies = {
  authRepository: IAuthRepository;
  appConfig: AppConfig;
  logger: ILogger;
}

export class AuthService implements IAuthService {
  private readonly authRepository: IAuthRepository
  private readonly appConfig: AppConfig
  private readonly logger: ILogger

  constructor(dependencies: AuthServiceDependencies) {
    this.authRepository = dependencies.authRepository
    this.appConfig = dependencies.appConfig
    this.logger = dependencies.logger
  }

  async register(email: string, password: string, name: string): Promise<RegistrationResult> {
    const existingUser = await this.authRepository.getUser(email);

    if (existingUser) {
      throw new AuthError("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authRepository.createUser({ email, password: hashedPassword, name });

    if (!user) {
      throw new Error("User creation failed");
    }

    this.logger.info(`User registered: ${user.email}`);

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
    };
  }

  async login(email: string, password: string): Promise<ValidationResult<LoginResult>> {
    const user = await this.authRepository.getUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.info(`Failed to login: ${email}`);

      return {
        success: false,
        error: {
          message: "Invalid credentials",
        },
      };
    }

    this.logger.info(`Login successful: ${email}`);

    const signer = createSigner({
      key: this.appConfig.api.auth.jwtSecret,
      expiresIn: this.appConfig.api.auth.jwtLifespanSeconds * 1000,
    });
    const accessToken = signer({ id: user.id, email: user.email });

    return {
      success: true,
      data: {
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    };
  }
}
