import {z} from "zod";
import {getApiResponseSchema} from "../../../../common/schemas/request";

const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
})

const registerResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

export const registerSchema = {
  body: registerBodySchema,
  response: {
    201: getApiResponseSchema(registerResponseSchema)
  }
}

export type RegisterSchemaType = typeof registerSchema
