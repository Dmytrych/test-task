import z from "zod";
import {getApiResponseSchema} from "../../../../common/schemas/request";
import {projectModelSchema} from "./common";

const getProjectsResponseSchema = z.array(projectModelSchema)

export const getProjectsSchema = {
    response: {
      200: getApiResponseSchema(getProjectsResponseSchema),
    },
  }

export type GetProjectsSchemaType = typeof getProjectsSchema
