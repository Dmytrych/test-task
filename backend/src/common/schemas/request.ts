import {z} from "zod";

export const getApiResponseSchema = <DataType extends z.ZodTypeAny>(dataSchema?: DataType) => {
  return z.object({
    success: z.boolean(),
    error: z.object({
      message: z.string().optional(),
      details: z.any().optional(),
    }).optional(),
    data: dataSchema ?? z.undefined(),
  })
}
