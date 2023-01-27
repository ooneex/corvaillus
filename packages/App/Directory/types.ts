export type AppDirectoryType = Record<
  | "components"
  | "config"
  | "handlers"
  | "islands"
  | "middlewares"
  | "routes"
  | "static"
  | "views",
  string
>;

export interface IAppDirectory {
  getComponents(): string;

  getConfig(): string;

  getHandlers(): string;

  getIslands(): string;

  getMiddlewares(): string;

  getRoutes(): string;

  getStatic(): string;

  getViews(): string;
}
