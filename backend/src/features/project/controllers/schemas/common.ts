import {z} from "zod";

export const projectModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerLogin: z.string(),
  stars: z.number(),
  forks: z.number(),
  issues: z.number(),
  repositoryCreatedAt: z.date(),
  url: z.string()
})
