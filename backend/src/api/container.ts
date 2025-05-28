import {asValue} from "awilix";
import {createDatabase} from "../domain/database";
import {AppConfig} from "../common/configuration";
import {ILogger} from "../common/logger";
import * as authContainer from "../features/auth/container";
import * as projectContainer from "../features/project/container";
import axios from "axios";

export default async (config: AppConfig, logger: ILogger) => {
  return {
    db: asValue(await createDatabase(config, logger)),
    appConfig: asValue(config),
    logger: asValue(logger),
    ...authContainer.load(),
    ...projectContainer.load(axios.create({
      baseURL: config.gitHub.host,
    })),
  }
}
