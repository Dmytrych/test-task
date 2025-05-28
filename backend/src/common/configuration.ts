import { z } from "zod";

const configSchema = z.object({
  nodeEnv: z.enum(["development", "production"]),
  api: z.object({
    port: z.number(),
    host: z.string(),
    auth: z.object({
      jwtSecret: z.string(),
      jwtLifespanSeconds: z.number()
    }),
    cors: z.object({
      origin: z.string(),
    }),
  }),
  gitHub: z.object({
    host: z.string(),
  }),
  db: z.object({
    connectionString: z.string().optional(),
    host: z.string().optional(),
    port: z.coerce.number().optional(),
    user: z.string().optional(),
    database: z.string().optional(),
    password: z.string().optional(),
    ssl: z.coerce.boolean().optional()
  })
});

export type AppConfig = z.infer<typeof configSchema>;

export function loadConfig(): AppConfig {
  try {
    const config: AppConfig = {
      nodeEnv: z.enum(["development", "production"]).parse(process.env.NODE_ENV),
      api: {
        port: z.coerce.number().parse(process.env.PORT),
        host: z.coerce.string().parse(process.env.HOST),
        auth: {
          jwtSecret: z.coerce.string().parse(process.env.JWT_SECRET),
          jwtLifespanSeconds: z.coerce.number().parse(process.env.JWT_LIFESPAN_SECONDS)
        },
        cors: {
          origin: z.coerce.string().parse(process.env.CLIENT_ORIGIN),
        }
      },
      gitHub: {
        host: z.coerce.string().url().parse(process.env.GITHUB_API_HOST),
      },
      db: {
        connectionString: z.coerce.string().parse(process.env.DATABASE_URL),
        host: z.coerce.string().parse(process.env.DB_HOST),
        port: z.coerce.number().parse(process.env.DB_PORT),
        user: z.coerce.string().parse(process.env.DB_USER),
        database: z.coerce.string().parse(process.env.DB_NAME),
        password: z.coerce.string().parse(process.env.DB_PASSWORD),
        ssl: z.coerce.boolean().parse(process.env.DB_SSL)
      }
    };

    return configSchema.parse(config);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
