import {USER_TABLE_NAME, UserModel} from "../../../domain/models/user.model";
import {Knex} from "knex";

interface IUserCreateParams extends Omit<UserModel, 'id' | 'created_at' | 'updated_at'> {}

export interface IAuthRepository {
  getUser(email: string): Promise<UserModel | undefined>;
  createUser(user: IUserCreateParams): Promise<UserModel>;
}

export type AuthRepositoryDependencies = {
  db: Knex
}

export class AuthRepository implements IAuthRepository {
  private readonly db: Knex

  constructor(dependencies: AuthRepositoryDependencies) {
    this.db = dependencies.db;
  }

  async getUser(email: string) {
    return this.db<UserModel>(USER_TABLE_NAME)
      .select("*")
      .where({ email })
      .first();
  }

  async createUser(user: IUserCreateParams): Promise<UserModel> {
    const [createdUser] = await this.db<UserModel>(USER_TABLE_NAME)
      .insert(user)
      .returning("*");
    return createdUser;
  };
}

