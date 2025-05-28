import {initApi} from "./api"
import {configDotenv} from "dotenv";
import {loadConfig} from "./common/configuration";

async function startup() {
  configDotenv()
  const config = loadConfig()
  await initApi(config)
}

startup()
