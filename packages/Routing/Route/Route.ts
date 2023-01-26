import {RouteChecker} from "../Checker/RouteChecker.ts";
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
import {IMatchedRoute, IRoute, RouteType} from "../types.ts";

export class Route implements IRoute {
  public static DEFAULT_LOCALE: AppLocaleType[] = [];
  private readonly route: RouteType;

  constructor(route: RouteType) {
    this.route = route;

    if (!this.route.constraint) {
      this.route.constraint = [];
    }
  }

  public setData<T>(data: Record<string, T> = {}): this {
    this.route.data = data;

    return this;
  }

  public getData<T>(): Record<string, T> {
    return (this.route.data as T) ?? {};
  }

  public setDefault(values: Record<string, string> = {}): this {
    this.route.default = values;

    return this;
  }

  public getDefault(): Record<string, string> {
    return this.route.default ?? {};
  }

  public setFixture(fixture: string | undefined): this {
    this.route.fixture = fixture;

    return this;
  }

  public getFixture(): string | null {
    return this.route.fixture ?? null;
  }

  public setDescription(text: string | undefined): this {
    this.route.description = text;

    return this;
  }

  public getDescription(): string | null {
    return this.route.description ?? null;
  }

  public setEnv(env: AppEnvType[] = AppDefaultEnv): this {
    this.route.env = env;

    return this;
  }

  public getEnv(): AppEnvType[] {
    return this.route.env ?? AppDefaultEnv;
  }

  public setHost(host: string[] = []): this {
    this.route.host = host;

    return this;
  }

  public getHost(): string[] {
    return this.route.host ?? [];
  }

  public setIp(ip: string[] = []): this {
    this.route.ip = ip;

    return this;
  }

  public getIp(): string[] {
    return this.route.ip ?? [];
  }

  public setLocale(locale: AppLocaleType[] = Route.DEFAULT_LOCALE): this {
    this.route.locale = locale;

    return this;
  }

  public getLocale(): AppLocaleType[] {
    return this.route.locale ?? Route.DEFAULT_LOCALE;
  }

  public setComponent(component?: string): this {
    this.route.component = component;

    return this;
  }

  public getComponent(): string | null {
    return this.route.component ?? null;
  }

  public setHandler(handler?: string): this {
    this.route.handler = handler;

    return this;
  }

  public getHandler(): string | null {
    return this.route.handler ?? null;
  }

  public setMiddleware(middleware?: string[]): this {
    this.route.middleware = middleware;

    return this;
  }

  public getMiddleware(): string[] | null {
    return this.route.middleware ?? null;
  }

  public setMethod(method: HttpMethodType[] = HttpDefaultMethods): this {
    this.route.method = method;

    return this;
  }

  public getMethod(): HttpMethodType[] {
    return this.route.method ?? HttpDefaultMethods;
  }

  public setName(name: string): this | string {
    this.route.name = name;

    return this;
  }

  public getName(): string {
    return this.route.name;
  }

  public setPath(path: string): this {
    this.route.path = path;

    return this;
  }

  public getPath(): string {
    return this.route.path;
  }

  public setPort(port: string[] = []): this {
    this.route.port = port ?? [];

    return this;
  }

  public getPort(): string[] {
    return this.route.port ?? [];
  }

  public setProtocol(protocol: HttpProtocolType[] = HttpDefaultProtocols): this {
    this.route.protocol = protocol;

    return this;
  }

  public getProtocol(): HttpProtocolType[] {
    return this.route.protocol ?? HttpDefaultProtocols;
  }

  public setRole(role: AppRoleType[] = []): this {
    this.route.role = role;

    return this;
  }

  public getRole(): AppRoleType[] {
    return this.route.role ?? [];
  }

  public setVersion(version: AppVersionType[] = []): this {
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
