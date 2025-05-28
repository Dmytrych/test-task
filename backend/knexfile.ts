import { configDotenv } from "dotenv";
import type { Knex } from "knex";

configDotenv()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/domain/migrations", // Updated to use a relative path
    },
    seeds: {
      directory: "./src/domain/seeds",
    },
  },
};

export default config;

