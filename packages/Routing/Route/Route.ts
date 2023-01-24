import { RouteChecker } from "../Checker/RouteChecker.ts";
import {
  AppDefaultEnv,
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  HttpDefaultMethods,
  HttpDefaultProtocols,
  HttpMethodType,
  HttpProtocolType,
} from "../deps.ts";
import { IMatchedRoute, IRoute, RouteType } from "../types.ts";

export class Route implements IRoute {
  public static NOT_FOUND = "NotFound";
  public static DEFAULT_LOCALE: AppLocaleType[] = [];
  private readonly route: RouteType;

  constructor(route: RouteType) {
    this.route = route;

    if (!this.route.constraint) {
      this.route.constraint = [];
    }

    this.component(this.route.component);
    this.handler(this.route.handler);
    this.middleware(this.route.middleware);
    this.method(this.route.method);
    this.protocol(this.route.protocol);
    this.host(this.route.host);
    this.ip(this.route.ip);
    this.port(this.route.port);
    this.default(this.route.default);
    this.data(this.route.data);
    this.locale(this.route.locale);
    this.role(this.route.role);
    this.env(this.route.env);
    this.version(this.route.version);
    this.description(this.route.description);
  }

  public data<T>(data: Record<string, T> = {}): this {
    this.route.data = data;

    return this;
  }

  public getData<T>(): Record<string, T> {
    return (this.route.data as T) ?? {};
  }

  public default(values: Record<string, string> = {}): this {
    this.route.default = values;

    return this;
  }

  public getDefault(): Record<string, string> {
    return this.route.default ?? {};
  }

  public description(text: string | undefined): this {
    this.route.description = text;

    return this;
  }

  public getDescription(): string | null {
    return this.route.description ?? null;
  }

  public env(env: AppEnvType[] = AppDefaultEnv): this {
    this.route.env = env;

    return this;
  }

  public getEnv(): AppEnvType[] {
    return this.route.env ?? AppDefaultEnv;
  }

  public host(host: string[] = []): this {
    this.route.host = host;

    return this;
  }

  public getHost(): string[] {
    return this.route.host ?? [];
  }

  public ip(ip: string[] = []): this {
    this.route.ip = ip;

    return this;
  }

  public getIp(): string[] {
    return this.route.ip ?? [];
  }

  public locale(locale: AppLocaleType[] = Route.DEFAULT_LOCALE): this {
    this.route.locale = locale;

    return this;
  }

  public getLocale(): AppLocaleType[] {
    return this.route.locale ?? Route.DEFAULT_LOCALE;
  }

  public component(component: string = Route.NOT_FOUND): this {
    this.route.component = component;

    return this;
  }

  public getComponent(): string {
    return this.route.component ?? Route.NOT_FOUND;
  }

  public handler(handler: string = Route.NOT_FOUND): this {
    this.route.handler = handler;

    return this;
  }

  public getHandler(): string {
    return this.route.handler ?? Route.NOT_FOUND;
  }

  public middleware(middleware?: string[]): this {
    this.route.middleware = middleware;

    return this;
  }

  public getMiddleware(): string[] | null {
    return this.route.middleware ?? null;
  }

  public method(method: HttpMethodType[] = HttpDefaultMethods): this {
    this.route.method = method;

    return this;
  }

  public getMethod(): HttpMethodType[] {
    return this.route.method ?? HttpDefaultMethods;
  }

  public name(name: string): this | string {
    this.route.name = name;

    return this;
  }

  public getName(): string {
    return this.route.name;
  }

  public path(path: string): this {
    this.route.path = path;

    return this;
  }

  public getPath(): string {
    return this.route.path;
  }

  public port(port: string[] = []): this {
    this.route.port = port ?? [];

    return this;
  }

  public getPort(): string[] {
    return this.route.port ?? [];
  }

  public protocol(protocol: HttpProtocolType[] = HttpDefaultProtocols): this {
    this.route.protocol = protocol;

    return this;
  }

  public getProtocol(): HttpProtocolType[] {
    return this.route.protocol ?? HttpDefaultProtocols;
  }

  public role(role: AppRoleType[] = []): this {
    this.route.role = role;

    return this;
  }

  public getRole(): AppRoleType[] {
    return this.route.role ?? [];
  }

  public version(version: AppVersionType[] = []): this {
    this.route.version = version;

    return this;
  }

  public getVersion(): AppVersionType[] {
    return this.route.version ?? [];
  }

  public where(name: string, value: string | number): this {
    if (this.route.constraint) {
      this.route.constraint.push({
        key: name,
        constraint: new RegExp(`^${value}$`),
        context: "where",
      });
    }

    return this;
  }

  public whereRegex(name: string, constraint: RegExp): this {
    if (this.route.constraint) {
      this.route.constraint.push({
        key: name,
        constraint,
        context: "regex",
      });
    }

    return this;
  }

  public whereAlphaNumeric(name: string): this {
    if (this.route.constraint) {
      this.route.constraint.push({
        key: name,
        constraint: /^[a-z\d]+$/i,
        context: "alphaNumeric",
      });
    }

    return this;
  }

  public whereNumber(name: string): this {
    if (this.route.constraint) {
      this.route.constraint.push({
        key: name,
        constraint: /^\d+(?:[.,]\d+)?$/,
        context: "number",
      });
    }

    return this;
  }

  public whereUuid(name: string): this {
    if (this.route.constraint) {
      this.route.constraint.push({
        key: name,
        constraint:
          /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i,
        context: "uuid",
      });
    }

    return this;
  }

  public whereIn(name: string, values: (string | number)[]): this {
    if (this.route.constraint) {
      this.route.constraint.push({
        key: name,
        constraint: new RegExp(values.join("|")),
        context: "uuid",
      });
    }

    return this;
  }

  public get<T>(key: keyof RouteType): T {
    return this.route[key] as T;
  }

  public isEquals(matchedRoute: IMatchedRoute): boolean {
    const routeChecker = new RouteChecker(this, matchedRoute);

    return routeChecker.isValid();
  }
}
