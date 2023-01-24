import { AppDirectoryType } from "../Directory/types.ts";
import { AppConfigErrorType } from "./types.ts";

export interface IAppConfig {
  parse(): void;
  getDirectories(): AppDirectoryType | null;
  getErrors(): AppConfigErrorType | null;
}
