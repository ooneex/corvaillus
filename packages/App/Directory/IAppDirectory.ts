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
