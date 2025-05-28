import z from "zod";
import {getApiResponseSchema} from "../../../../common/schemas/request";
import {projectModelSchema} from "./common";

const refreshProjectParamsSchema = z.object({
  id: z.string(),
})

export const refreshProjectSchema = {
    params: refreshProjectParamsSchema,
    response: {
      200: getApiResponseSchema(projectModelSchema),
    },
  }

export type RefreshProjectSchemaType = typeof refreshProjectSchema
