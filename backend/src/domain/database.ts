import knex from 'knex';
import {AppConfig} from "../common/configuration";

export const createDatabase = async (appConfig: AppConfig) => {
  const dbConfig = {
    client: "pg",
    connection: {
      host: appConfig.db.host,
      port: appConfig.db.port,
      user: appConfig.db.user,
      password: appConfig.db.password,
      database: appConfig.db.database,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/domain/migrations", // Updated to use a relative path
    },
    seeds: {
      directory: "./src/domain/seeds",
    },
  }

  const knexInstance = knex(dbConfig)

  await knexInstance.migrate.latest();

  return knexInstance
}
