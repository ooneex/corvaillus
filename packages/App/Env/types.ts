import { DotEnvValueType } from "../../DotEnv/mod.ts";

export type AppEnvVarsType = Record<
  | "APP_ENV"
  | "LOCALE"
  | "COUNTRY"
  | "VERSION"
  | "SECRET"
  | "DEBUG"
  | "PORT"
  | `${Uppercase<string>}`,
  DotEnvValueType
>;

export type AppEnvType =
  | "dev"
  | "prod"
  | "test"
  | string;

export const AppDefaultEnv: AppEnvType[] = [
  "dev",
  "prod",
  "test",
];
