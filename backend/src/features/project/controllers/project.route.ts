import {FastifyInstanceType} from "../../../common/types/api";
import {injectionHandler} from "../../../common/container-utils";
import {addProjectSchema} from "./schemas/add-project.schema";
import {ProjectController} from "./project.controller";
import {asValue} from "awilix";
import {IUser} from "../../../common/types/types";
import {removeProjectSchema} from "./schemas/remove-project.schema";
import {getProjectsSchema} from "./schemas/get-projects.schema";
import {refreshProjectSchema} from "./schemas/refresh-project.schema";

export async function projectRoutes(app: FastifyInstanceType) {
  app.addHook('preHandler', app.auth([
    app.auth([app.authenticate])
  ]))

  app.addHook('preHandler', (req, res, done) => {
    req.diScope.register('user', asValue(req.user as IUser));
    done()
  })

  app.post(
    '/',
    {
      schema: addProjectSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ProjectController>('projectController').add
    )
  )
  app.delete(
    '/:id',
    {
      schema: removeProjectSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ProjectController>('projectController').delete
    )
  )
  app.get(
    '/',
    {
      schema: getProjectsSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ProjectController>('projectController').getAll
    )
  )
  app.post(
    '/:id/refresh',
    {
      schema: refreshProjectSchema,
    },
    injectionHandler(
      (diScope) => diScope.resolve<ProjectController>('projectController').refresh
    )
  )
}
