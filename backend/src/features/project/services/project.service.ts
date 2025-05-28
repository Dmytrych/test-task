import {IGithubIntegrationRepository} from "../repositories/github-integration.repository";
import {IProject} from "../types";
import {ValidationError} from "../../../common/types/errors";
import {IProjectRepository} from "../repositories/project.repository";
import {ILogger} from "../../../common/logger";

export interface IProjectService {
  add(repositoryOwner: string, repositoryName: string): Promise<IProject>;
  delete(id: string): Promise<boolean>
  getAll(): Promise<IProject[]>
  refresh(id: string): Promise<IProject>
}

export type AuthServiceDependencies = {
  githubIntegrationRepository: IGithubIntegrationRepository
  projectRepository: IProjectRepository
  logger: ILogger
}

export class ProjectService implements IProjectService {
  private readonly logger: ILogger;
  private readonly githubIntegrationRepository: IGithubIntegrationRepository
  private readonly projectRepository: IProjectRepository

  constructor(dependencies: AuthServiceDependencies) {
    this.githubIntegrationRepository = dependencies.githubIntegrationRepository
    this.projectRepository = dependencies.projectRepository
    this.logger = dependencies.logger
  }

  async add(repositoryOwner: string, repositoryName: string): Promise<IProject> {
    const exists = await this.projectRepository.exists(repositoryOwner, repositoryName);

    if (exists) {
      throw new ValidationError('Project already exists');
    }

    const fetchedRepository = await this.githubIntegrationRepository.getRepository(repositoryOwner, repositoryName);

    if (!fetchedRepository) {
      throw new ValidationError('Repository not found');
    }

    return this.projectRepository.create({
      url: fetchedRepository.html_url,
      name: fetchedRepository.name,
      ownerLogin: fetchedRepository.owner.login,
      stars: fetchedRepository.stargazers_count,
      forks: fetchedRepository.forks,
      issues: fetchedRepository.open_issues,
      repositoryCreatedAt: fetchedRepository.created_at,
    })
  }

  async delete(id: string): Promise<boolean> {
    this.logger.info(`Removing project with id ${id}`);

    return this.projectRepository.delete(id);
  }

  async getAll(): Promise<IProject[]> {
    return this.projectRepository.getAll();
  }

  async refresh(id: string): Promise<IProject> {
    const project = await this.projectRepository.get(id);

    if (!project) {
      throw new ValidationError('Project not found');
    }

    const fetchedRepository = await this.githubIntegrationRepository.getRepository(project.ownerLogin, project.name);

    if (!fetchedRepository) {
      throw new Error('Repository not found');
    }

    const updatedProject = {
      ...project,
      url: fetchedRepository.html_url,
      stars: fetchedRepository.stargazers_count,
      forks: fetchedRepository.forks,
      issues: fetchedRepository.open_issues,
      repositoryCreatedAt: fetchedRepository.created_at,
    };

    return this.projectRepository.update(id, updatedProject);
  }
}
