import {AppDirectoryType} from "../Directory/types.ts";

export type AppConfigErrorType = Record<"_404" | "_500", string>;

export type AppConfigType = {
  directories: AppDirectoryType;
  errors: AppConfigErrorType;
};

export interface IAppConfig {
  parse(): void;

  getDirectories(): AppDirectoryType | null;

  getErrors(): AppConfigErrorType | null;
}
