import { File } from "../../File/mod.ts";
import { AppDirectoryType } from "../Directory/types.ts";
import { AppConfigErrorType, AppConfigType, IAppConfig } from "./types.ts";

export class AppConfig implements IAppConfig {
  private config: AppConfigType | null = null;

  public generateAppConfigFile(): void {
    const fileContent = `import { AppConfigType } from "@ooneex/app";

const config: AppConfigType = {
  directories: {
    components: "components",
    config: "config",
    handlers: "handlers",
    islands: "islands",
    middlewares: "middlewares",
    routes: "routes",
    static: "static",
    views: "views",
  },
  errors: {
    _404: "errors/_404.tsx",
    _500: "errors/_500.tsx",
  },
};

export default config;
`;
    const file = new File("config/app.config.ts");

    if (!file.exists()) {
      file.ensure();
      file.write(fileContent);
    }
  }

  public async parse(): Promise<void> {
    this.config = (await import(`config/app.config.ts`)).default;
  }

  public getDirectories(): AppDirectoryType | null {
    return this.config?.directories || null;
  }

  public getErrors(): AppConfigErrorType | null {
    return this.config?.errors || null;
  }
}

export const appConfig = new AppConfig();
