import {z} from "zod";
import {getApiResponseSchema} from "../../../../common/schemas/request";
import {projectModelSchema} from "./common";

const addProjectBodySchema = z.object({
  repositoryOwner: z.string(),
  repositoryName: z.string(),
})

export const addProjectSchema = {
    body: addProjectBodySchema,
    response: {
      400: getApiResponseSchema(),
      200: getApiResponseSchema(projectModelSchema),
    },
  }

export type AddProjectSchemaType = typeof addProjectSchema
