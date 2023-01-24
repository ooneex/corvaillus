import {
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  HttpMethodType,
  HttpProtocolType,
} from "../deps.ts";

import {
  IMatchedRoute,
  IRoute,
  IRouteChecker,
  RouteCheckerErrorType,
  RouteConstraintType,
} from "../types.ts";

export class RouteChecker implements IRouteChecker {
  private errors: RouteCheckerErrorType = [];

  constructor(private route: IRoute, private matchedRoute: IMatchedRoute) {
    this.check(route, matchedRoute);
  }

  public check(route: IRoute, matchedRoute: IMatchedRoute): this {
    this.route = route;
    this.matchedRoute = matchedRoute;
    this.errors = [];

    let error = this.checkMethod();
    if (error !== true) {
      this.errors.push({ key: "method", message: error as string });
    }

    // error = this.checkProtocol();
    // if (error !== true) {
    // 	this.errors.push({ key: "protocol", message: error as string });
    // }

    error = this.checkHost();
    if (error !== true) {
      this.errors.push({ key: "host", message: error as string });
    }

    error = this.checkPort();
    if (error !== true) {
      this.errors.push({ key: "port", message: error as string });
    }

    error = this.checkLocale();
    if (error !== true) {
      this.errors.push({ key: "locale", message: error as string });
    }

    error = this.checkRole();
    if (error !== true) {
      this.errors.push({ key: "role", message: error as string });
    }

    error = this.checkEnv();
    if (error !== true) {
      this.errors.push({ key: "env", message: error as string });
    }

    error = this.checkVersion();
    if (error !== true) {
      this.errors.push({ key: "version", message: error as string });
    }

    const errors = this.checkConstraints();
    if (errors !== true) {
      this.errors.push({
        key: "constraint",
        message: "Failed to validate constraints.",
        errors: errors as RouteCheckerErrorType,
      });
    }

    return this;
  }

  public isValid(): boolean {
    return this.errors.length === 0;
  }

  public getErrors(): RouteCheckerErrorType {
    return this.errors;
  }

  public checkMethod(): boolean | string {
    const methods = this.route.get<HttpMethodType[]>("method");
    const method = this.matchedRoute.getMethod();

    if (!method) {
      return "Method not found.";
    }

    if (!methods.includes(method)) {
      return `${method} method not allowed. Expected ${methods.join(" or ")}.`;
    }

    return true;
  }

  public checkProtocol(): boolean | string {
    const protocols = this.route.get<HttpProtocolType[]>("protocol");
    const protocol = this.matchedRoute.getProtocol();

    if (!protocol) {
      return "Protocol not found.";
    }

    if (!protocols.includes(protocol)) {
      return `${protocol} protocol not allowed. Expected ${
        protocols.join(" or ")
      }.`;
    }

    return true;
  }

  public checkHost(): boolean | string {
    const hosts = this.route.get<string[]>("host") ?? [];
    const host = this.matchedRoute.getHost();

    if (hosts.length === 0) {
      return true;
    }

    if (!host) {
      return "Host not found.";
    }

    if (!hosts.includes(host)) {
      return `${host} host not allowed. Expected ${hosts.join(" or ")}.`;
    }

    return true;
  }

  public checkPort(): boolean | string {
    const ports = this.route.get<string[]>("port");
    const port = this.matchedRoute.getPort();

    if (ports.length === 0) {
      return true;
    }

    if (!port) {
      return "Port not found.";
    }

    if (!ports.includes(port)) {
      return `${port} port not allowed. Expected ${ports.join(" or ")}.`;
    }

    return true;
  }

  public checkLocale(): boolean | string {
    const locales = this.route.get<AppLocaleType[]>("locale");
    const locale = this.matchedRoute.getLocale();

    if (locales.length === 0) {
      return true;
    }

    if (!locale) {
      return "Locale not found.";
    }

    if (!locales.includes(locale)) {
      return `${locale} locale not allowed. Expected ${locales.join(" or ")}.`;
    }

    return true;
  }

  public checkRole(): boolean | string {
    const roles = this.route.get<AppRoleType[]>("role");
    const role = this.matchedRoute.getRole();

    if (roles.length === 0) {
      return true;
    }

    if (!role) {
      return "Role not found.";
    }

    if (!roles.includes(role)) {
      return `${role} role not allowed. Expected ${roles.join(" or ")}.`;
    }

    return true;
  }

  public checkEnv(): boolean | string {
    const envs = this.route.get<AppEnvType[]>("env");
    const env = this.matchedRoute.getEnv();

    if (envs.length === 0) {
      return true;
    }

    if (!env) {
      return "Env not found.";
    }

    if (!envs.includes(env)) {
      return `${env} env not allowed. Expected ${envs.join(" or ")}.`;
    }

    return true;
  }

  public checkVersion(): boolean | string {
    const versions = this.route.get<AppVersionType[]>("version");
    const version = this.matchedRoute.getVersion();

    if (versions.length === 0) {
      return true;
    }

    if (!version) {
      return "Version not found.";
    }

    if (!versions.includes(version)) {
      return `${version} version not allowed. Expected ${
        versions.join(" or ")
      }.`;
    }

    return true;
  }

  public checkConstraints(): boolean | RouteCheckerErrorType {
    const constraints = this.route.get<RouteConstraintType[]>("constraint");
    const params = this.matchedRoute.getParams();

    const errors: RouteCheckerErrorType = [];

    constraints.map((constraint) => {
      const key = constraint.key;
      const regex = constraint.constraint;
      const context = constraint.context;

      const value = params[key] as string;

      if (!value) {
        errors.push({
          key,
          message: `"${key}" param does not exist.`,
          context,
        });

        return;
      }

      if (!regex.test(value)) {
        errors.push({
          key,
          message: `"${value}" value does not match. Expected ${regex}`,
          context,
        });
      }
    });

    return (errors.length === 0) ? true : errors;
  }
}
