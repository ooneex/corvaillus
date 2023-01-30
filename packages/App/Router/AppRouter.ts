import { appConfig } from "../Config/AppConfig.ts";
import { Directory, File, Route, Router, RouteType } from "../deps.ts";

export class AppRouter {
  private routes: Record<string, Route> = {};

  public async parse(): Promise<void> {
    const routesDir = appConfig.getDirectories()?.routes;
    if (!routesDir) {
      // TODO: Set error message and catch it in the front
      console.log(
        "Routes not found in configuration file. Check config/app.config.ts file",
      );
      Deno.exit(1);
    }

    const directory = new Directory(routesDir);
    if (!directory.exists()) {
      // TODO: Set error message and catch it in the front
      console.log(`Directory ${routesDir} not found.`);
      Deno.exit(1);
    }

    let routesDef = directory.files(/\.ts$/i);

    const directories = directory.directories(null, true);
    directories.map((dir) => {
      routesDef = [...routesDef, ...dir.files(/\.ts$/i)];
    });

    let importContent = "";
    let arrayContent = `const routes = [\n`;

    routesDef.map((routeDef, index) => {
      importContent += `import \$${index} from "${routeDef.getPath()}";\n`;
      arrayContent += `  \$${index},\n`;
    });

    const content =
      `${importContent}\n${arrayContent}];\n\nexport default routes;\n`;

    const file = new File("var/cache/routes.ts");

    file.ensure();
    file.write(content);

    const routes: RouteType[] = (await import(`var/cache/routes.ts`)).default;

    routes.map((route) => {
      const r = new Route(route);
      this.routes[r.getName()] = r;
    });
  }

  public getRouter(): Router {
    const router = new Router();
    router.set(this.routes);

    return router;
  }
}

export const appRouter = new AppRouter();
