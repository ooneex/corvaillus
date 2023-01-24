import { MiddlewareHandlerContext } from "../deps.ts";
import { env } from "../Env/Env.ts";
import { appConfig } from "../Config/AppConfig.ts";
import { AppDirectoryType } from "../Directory/types.ts";
import { AppConfigErrorType } from "../Config/types.ts";
import { AppEnvVarsType } from "../Env/types.ts";

interface IMiddlewareState {
  app: {
    env: AppEnvVarsType;
    config: {
      directories: AppDirectoryType | null;
      errors: AppConfigErrorType | null;
    };
  };
}

export class ProxyMiddleware {
  public async handler(
    request: Request,
    ctx: MiddlewareHandlerContext<IMiddlewareState>,
  ) {
    // Env variables
    // const envData: Record<string, DotEnvValueType> = JSON.parse(Deno.env.get("OONEEX_APP_ENV") as string);
    // env.setData(envData);

    // App config
    // const appConfigData: AppConfigType = JSON.parse(localStorage.getItem("OONEEX_APP_APP_CONFIG") as string);
    // const directory = new AppDirectory(appConfigData.directories);

    ctx.state.app = {
      env: env.getData(),
      config: {
        directories: appConfig.getDirectories(),
        errors: appConfig.getErrors(),
      },
    };

    return await ctx.next();
  }
}
