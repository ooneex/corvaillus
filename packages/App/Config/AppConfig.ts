import { IAppConfig } from "./IAppConfig.ts";
import { YamlParser } from "../../Parser/mod.ts";
import { File } from "../../File/mod.ts";
import { AppConfigErrorType, AppConfigType } from "./types.ts";
import { AppDirectoryType } from "../Directory/types.ts";

export class AppConfig implements IAppConfig {
  private appConfig: AppConfigType | null = null;

  public generateAppConfigFile(): void {
    const fileContent = `directories:
  components: "components"
  config: "config"
  handlers: "handlers"
  islands: "islands"
  middlewares: "middlewares"
  routes: "routes"
  static: "static"
  views: "views"
errors:
  _404: "errors/_404.tsx"
  _500: "errors/_500.tsx"
`;
    const file = new File("config/app.yml");
    file.ensure();
    file.write(fileContent);
  }

  public parse(): void {
    const file = new File("config/app.yml");
    const parser = new YamlParser(file.read());

    this.appConfig = parser.getData<AppConfigType>();
  }

  public getDirectories(): AppDirectoryType | null {
    return this.appConfig?.directories || null;
  }

  public getErrors(): AppConfigErrorType | null {
    return this.appConfig?.errors || null;
  }
}

export const appConfig = new AppConfig();
