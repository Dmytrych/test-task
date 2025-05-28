import {Knex} from "knex";
import {PROJECT_TABLE_NAME, ProjectModel} from "../../../domain/models/project.model";

interface IProjectCreateParams extends Omit<ProjectModel, 'id'> {}

export interface IProjectRepository {
  create(project: IProjectCreateParams): Promise<ProjectModel>
  exists(ownerLogin: string, repositoryName: string): Promise<boolean>
  delete(id: string): Promise<boolean>
  getAll(): Promise<ProjectModel[]>
  get(id: string): Promise<ProjectModel | undefined>
  update(id: string, updatedModel: IProjectCreateParams): Promise<ProjectModel>
}

export type ProjectRepositoryDependencies = {
  db: Knex
}

export class ProjectRepository implements IProjectRepository {
  private readonly db: Knex

  constructor(dependencies: ProjectRepositoryDependencies) {
    this.db = dependencies.db;
  }

  async create(project: IProjectCreateParams): Promise<ProjectModel> {
    const [createdUser] = await this.db<ProjectModel>(PROJECT_TABLE_NAME)
      .insert(project)
      .returning("*");
    return createdUser;
  };

  async exists(ownerLogin: string, repositoryName: string): Promise<boolean> {
    const result = await this.db<ProjectModel>(PROJECT_TABLE_NAME)
      .where({
        ownerLogin,
        name: repositoryName
      });
    return result.length > 0;
  };

  async getAll(): Promise<ProjectModel[]> {
    return this.db<ProjectModel>(PROJECT_TABLE_NAME).select('*');
  };

  async get(id: string): Promise<ProjectModel | undefined> {
    return this.db<ProjectModel>(PROJECT_TABLE_NAME).where({ id }).first();
  };

  async update(id: string, updatedModel: IProjectCreateParams): Promise<ProjectModel> {
    const models = await this.db<ProjectModel>(PROJECT_TABLE_NAME).where({ id }).update(updatedModel).returning('*');
    if (models.length != 1) {
      throw new Error(`Error updating project with id ${id}: expected 1 row to be updated, but got ${models.length}`);
    }
    return models[0];
  };

  async delete(id: string): Promise<boolean> {
    const affectedRows = await this.db<ProjectModel>(PROJECT_TABLE_NAME)
      .where({ id })
      .del();
    return affectedRows > 0;
  };
}
