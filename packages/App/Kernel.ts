import { appConfig } from "./Config/AppConfig.ts";
import { env } from "./Env/Env.ts";
import { appRouter } from "./Router/AppRouter.ts";

export class Kernel {
  public static async boot(): Promise<void> {
    env.generateEnvFile();
    await env.parse();

    appConfig.generateAppConfigFile();
    await appConfig.parse();

    await appRouter.parse();

    // await start(manifest, opts);
    // await start(manifest, {...opts, port: env.getPort() || undefined});
  }
}
