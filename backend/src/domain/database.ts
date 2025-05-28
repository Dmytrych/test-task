import knex from 'knex';
import {AppConfig} from "../common/configuration";
import config from "../../knexfile"
import {ILogger} from "../common/logger";

export const createDatabase = async (appConfig: AppConfig, logger: ILogger) => {
  const dbConfig = config[appConfig.nodeEnv];

  const knexInstance = knex(dbConfig)

  await knexInstance.migrate.latest()
    .then(() => logger.info("Database migrations are up to date"));

  return knexInstance
}
