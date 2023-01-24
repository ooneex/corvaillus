import { AppEnvType } from "./types.ts";
import { AppLocaleType } from "../types.ts";
import { DotEnvValueType } from "../deps.ts";

export interface IEnv {
  parse(): void;

  getAppEnv(): AppEnvType | null;

  isDev(): boolean;

  isProd(): boolean;

  isTest(): boolean;

  getLocale(): AppLocaleType | null;

  getCountry(): string | null;

  getVersion(): string | null;

  getSecret(): string | null;

  isDebug(): boolean;

  getPort(): number | null;

  get<T>(key: Uppercase<string>): T | undefined;

  getData(): Record<string, DotEnvValueType>;
}
