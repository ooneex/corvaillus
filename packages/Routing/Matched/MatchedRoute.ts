import {
  IMatchedRoute,
  MatchedRouteParamsType,
  MatchedRouteType,
} from "../types.ts";

import {
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  HttpMethodType,
  HttpProtocolType,
} from "../deps.ts";

export class MatchedRoute implements IMatchedRoute {
  private route: MatchedRouteType;

  constructor(route: MatchedRouteType) {
    this.route = route;
  }

  public getCaptures(): string[] | null {
    return this.route.captures ?? null;
  }

  public setCaptures(captures: string[] | null): this {
    this.route.captures = captures ?? undefined;

    return this;
  }

  public getMethods(): HttpMethodType[] | null {
    return this.route.methods ?? null;
  }

  public setMethods(methods: HttpMethodType[] | null): this {
    this.route.methods = methods ?? undefined;

    return this;
  }

  public getName(): string | null {
    return this.route.name ?? null;
  }

  public setName(name: string | null): this {
    this.route.name = name ?? undefined;

    return this;
  }

  public getPath(): string | null {
    return this.route.path ?? null;
  }

  public setPath(path: string | null): this {
    this.route.path = path ?? undefined;

    return this;
  }

  public getParams(): MatchedRouteParamsType {
    return this.route.params ?? {};
  }

  public setParams(params: MatchedRouteParamsType | null): this {
    this.route.params = params ?? {};

    return this;
  }

  public getEnv(): AppEnvType | null {
    return this.route.env ?? null;
  }

  public getIp(): string | null {
    return this.route.ip ?? null;
  }

  public getHost(): string | null {
    return this.route.host ?? null;
  }

  public getLocale(): AppLocaleType | null {
    return this.route.locale ?? null;
  }

  public getMethod(): HttpMethodType | null {
    return this.route.method ?? null;
  }

  public getPort(): string | null {
    return this.route.port ?? null;
  }

  public getProtocol(): HttpProtocolType | null {
    return this.route.protocol ?? null;
  }

  public getRole(): AppRoleType | null {
    return this.route.role ?? null;
  }

  public getVersion(): AppVersionType | null {
    return this.route.version ?? null;
  }

  public setEnv(env: AppEnvType | null): this {
    this.route.env = env ?? undefined;

    return this;
  }

  public setIp(ip: string | null): this {
    this.route.ip = ip ?? undefined;

    return this;
  }

  public setHost(host: string | null): this {
    this.route.host = host ?? undefined;

    return this;
  }

  public setLocale(locale: AppLocaleType | null): this {
    this.route.locale = locale ?? undefined;

    return this;
  }

  public setMethod(method: HttpMethodType | null): this {
    this.route.method = method ?? undefined;

    return this;
  }

  public setPort(port: string | null): this {
    this.route.port = port ?? undefined;

    return this;
  }

  public setProtocol(protocol: HttpProtocolType | null): this {
    this.route.protocol = protocol ?? undefined;

    return this;
  }

  public setRole(role: AppRoleType | null): this {
    this.route.role = role ?? undefined;

    return this;
  }

  public setVersion(version: AppVersionType | null): this {
    this.route.version = version ?? undefined;

    return this;
  }
}
