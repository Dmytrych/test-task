import {AxiosError, AxiosInstance} from "axios";
import {IGitHubRepository} from "../types";
import {z} from "zod";

const githubRepositoryResponseSchema = z.object({
  owner: z.object({
    login: z.string(),
  }),
  name: z.string(),
  html_url: z.string(),
  open_issues: z.number(),
  forks: z.number(),
  stargazers_count: z.number(),
  created_at: z.coerce.date(),
})

export interface IGithubIntegrationRepository {
  getRepository(ownerLogin: string, repositoryName: string): Promise<IGitHubRepository | null>;
}

export type GithubIntegrationRepositoryDependencies = {
  githubAxiosInstance: AxiosInstance,
}

export class GithubIntegrationRepository implements IGithubIntegrationRepository {
  private githubAxiosInstance: AxiosInstance;

  constructor(dependencies: GithubIntegrationRepositoryDependencies) {
    this.githubAxiosInstance = dependencies.githubAxiosInstance;
  }

  async getRepository(ownerLogin: string, repositoryName: string): Promise<IGitHubRepository | null> {
    const response = await this.githubAxiosInstance.get(`repos/${ownerLogin}/${repositoryName}`)
      .catch(error => {
        if (error instanceof AxiosError && error.status === 404) {
          return null;
        }
        throw error;
      })

    if (!response) {
      return null
    }

    return githubRepositoryResponseSchema.parse(response.data);
  }
}
