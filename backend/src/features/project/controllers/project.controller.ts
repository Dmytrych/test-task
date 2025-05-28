import {FastifyValidatedHandler} from "../../../common/types/api";
import {AddProjectSchemaType} from "./schemas/add-project.schema";
import {getSuccessResponse} from "../../../common/response-helpers";
import {ProjectService} from "../services/project.service";
import {RemoveProjectSchemaType} from "./schemas/remove-project.schema";
import {GetProjectsSchemaType} from "./schemas/get-projects.schema";
import {RefreshProjectSchemaType} from "./schemas/refresh-project.schema";

interface IProjectControllerDependencies {
  projectService: ProjectService;
}

export class ProjectController {
  private projectService: ProjectService;

  constructor(dependencies: IProjectControllerDependencies) {
    this.projectService = dependencies.projectService;
  }

  add: FastifyValidatedHandler<AddProjectSchemaType> = async (request, reply) => {
    const project = await this.projectService.add(request.body.repositoryOwner, request.body.repositoryName);

    reply.status(200).send(getSuccessResponse(project));
  }

  delete: FastifyValidatedHandler<RemoveProjectSchemaType> = async (request, reply) => {
    const deleted = await this.projectService.delete(request.params.id);

    reply.status(200).send({
      success: deleted
    });
  }

  getAll: FastifyValidatedHandler<GetProjectsSchemaType> = async (request, reply) => {
    const projects = await this.projectService.getAll();

    reply.status(200).send(getSuccessResponse(projects));
  }

  refresh: FastifyValidatedHandler<RefreshProjectSchemaType> = async (request, reply) => {
    const updatedProject = await this.projectService.refresh(request.params.id);

    reply.status(200).send(getSuccessResponse(updatedProject));
  }
}
