import {z} from "zod";
import {getApiResponseSchema} from "../../../../common/schemas/request";

const loginBodySchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  })
})

export const loginSchema = {
    body: loginBodySchema,
    response: {
      401: getApiResponseSchema(),
      201: getApiResponseSchema(loginResponseSchema),
    },
  }

export type LoginSchemaType = typeof loginSchema
