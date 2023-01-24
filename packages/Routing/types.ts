import { RouteCollection } from "./Collection.ts";
import {
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  HttpMethodType,
  HttpProtocolType,
} from "./deps.ts";

export type RouteConstraintType = {
  key: string;
  constraint: RegExp;
  context: string;
};
export type RouteType = {
  /**
   * Name of route
   */
  name: string;
  /**
   * Path schema
   * @example /products/:id /users/:id/edit
   */
  path: string;
  /**
   * Handler to trigger if this route matched
   */
  handler?: string;
  /**
   * Component to render if this route matched
   */
  component?: string;
  /**
   * Middlewares to trigger if this route matched
   */
  middleware?: string[];
  /**
   * Allowed methods for this route
   */
  method?: HttpMethodType[];
  /**
   * Protocol type
   * @example https http
   */
  protocol?: HttpProtocolType[];
  /**
   * Allow hosts for this route
   * @example ["api.ooneex.io"]
   */
  host?: string[];
  /**
   * Allow ips for this route
   * @example ["127.0.0.1"]
   */
  ip?: string[];
  /**
   * Port of route
   * @default 80
   * @example 8000
   */
  port?: string[];
  /**
   * Constraints for route params
   * @example {id: /^[0-9]+$/}
   */
  constraint?: RouteConstraintType[];
  /**
   * Default values for route params
   */
  default?: Record<string, string>;
  /**
   * Additional data for this route
   */
  data?: Record<string, unknown>;
  /**
   * Allowed locales for this route
   */
  locale?: AppLocaleType[];
  // username?: string;
  // password?: string;
  /**
   * Allowed roles for this route
   */
  role?: AppRoleType[];
  /**
   * Allowed environment for this route
   * @example ["dev"] ["prod", "dev"] ["test", "demo"]
   */
  env?: AppEnvType[];
  /**
   * Version of this route
   */
  version?: AppVersionType[];
  /**
   * Route description. Used for documentation
   */
  description?: string;

  _details?: {
    component?: (() => void) | null;
    handler?: (() => void) | null;
    middleware?: (() => void)[] | null;
    file?: string;
  };
};

export interface IRoute {
  getName(): string;
  getProtocol(): HttpProtocolType[];
  getHost(): string[];
  getIp(): string[];
  getPort(): string[];
  getPath(): string;
  // where(name: string, value: string | number): this;
  // whereRegex(name: string, constraint: RegExp): this;
  // whereNumber(name: string): this;
  // whereAlphaNumeric(name: string): this;
  // whereUuid(name: string): this;
  // whereIn(name: string, values: string[]): this;
  getDefault(): Record<string, string>;
  getHandler(): string | null;
  getComponent(): string | null;
  getMiddleware(): string[] | null;
  getMethod(): HttpMethodType[];
  getData<T>(): Record<string, T>;
  getLocale(): AppLocaleType[];
  getRole(): AppRoleType[];
  getEnv(): AppEnvType[];
  getVersion(): AppVersionType[];
  getDescription(): string | null;
  get<T>(key: keyof RouteType): T;
  isEquals(matchedRoute: IMatchedRoute): boolean;
}

export type MatchedRouteParamsType = Record<
  string | number,
  string | number | undefined
>;

export type MatchedRouteType = {
  captures?: string[];
  methods?: HttpMethodType[];
  name?: string;
  path?: string;
  params?: MatchedRouteParamsType;
  method?: HttpMethodType;
  protocol?: HttpProtocolType;
  ip?: string;
  host?: string;
  port?: string;
  locale?: AppLocaleType;
  role?: AppRoleType;
  env?: AppEnvType;
  version?: AppVersionType;
};
export interface IMatchedRoute {
  getCaptures(): string[] | null;
  getMethods(): HttpMethodType[] | null;
  getName(): string | null;
  getPath(): string | null;
  getParams(): MatchedRouteParamsType;
  getMethod(): HttpMethodType | null;
  getProtocol(): HttpProtocolType | null;
  getIp(): string | null;
  getHost(): string | null;
  getPort(): string | null;
  getLocale(): AppLocaleType | null;
  getRole(): AppRoleType | null;
  getEnv(): AppEnvType | null;
  getVersion(): AppVersionType | null;
}

export type RouteCheckerErrorType = {
  key: string;
  message: string;
  context?: string;
  errors?: RouteCheckerErrorType;
}[];

export interface IRouteChecker {
  check(route: IRoute, MatchedRoute: IMatchedRoute): this;
  isValid(): boolean;
  getErrors(): RouteCheckerErrorType;
  checkMethod(): boolean | string;
  checkProtocol(): boolean | string;
  checkHost(): boolean | string;
  checkPort(): boolean | string;
  checkLocale(): boolean | string;
  checkRole(): boolean | string;
  checkEnv(): boolean | string;
  checkVersion(): boolean | string;
  checkConstraints(): boolean | RouteCheckerErrorType;
}

export interface IRouter {
  count(): number;
  findByName(name: string): IRoute | undefined;
  getCollection(): RouteCollection;
}
