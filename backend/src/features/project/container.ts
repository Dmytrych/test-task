import {asClass, asValue} from "awilix";
import {GithubIntegrationRepository} from "./repositories/github-integration.repository";
import {ProjectService} from "./services/project.service";
import {ProjectController} from "./controllers/project.controller";
import {AxiosInstance} from "axios";
import {ProjectRepository} from "./repositories/project.repository";

export const load = (githubAxiosInstance: AxiosInstance) => {
  return {
    githubIntegrationRepository: asClass(GithubIntegrationRepository),
    projectService: asClass(ProjectService),
    projectController: asClass(ProjectController),
    githubAxiosInstance: asValue(githubAxiosInstance),
    projectRepository: asClass(ProjectRepository),
  }
}
