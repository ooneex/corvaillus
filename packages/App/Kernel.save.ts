// import {
//   AppDirectoryType,
//   Directory,
//   DotEnv,
//   File,
//   Helper,
//   Manifest,
//   Output,
//   Path,
//   RouteType,
//   start,
//   StartOptions,
//   YamlParser,
// } from "./deps.ts";
//
// const dotEnv = new DotEnv();
// const output = new Output();
// const cacheDirectory = new Directory(Path.normalize("var/cache"));
//
// export class Kernel {
//   private rootDir: string | null = null;
//
//   public async boot(manifest: Manifest, opts: StartOptions = {}) {
//     this.rootDir = Path.dirname(manifest.baseUrl);
//     await this.loadEnvFiles();
//     this.loadConfigFiles();
//     await start(manifest, opts);
//   }
//
//   public async loadEnvFiles() {
//     await dotEnv.parse(".env");
//     await dotEnv.parse(".env.local");
//
//     const data = dotEnv.getData();
//     if (!Helper.hasProperty(data, "ENV")) {
//       data["ENV"] = "dev";
//     }
//     cacheDirectory.ensure();
//     const content = `export default ${JSON.stringify(data)}`;
//     cacheDirectory.touch("env.ts", content);
//
//     localStorage.setItem("EnvConfig", JSON.stringify(data));
//
//     dotEnv.fromJson(data);
//   }
//
//   private loadConfigFiles() {
//     // Create log dir
//     (new Directory("var/log")).ensure();
//
//     // Create cache dir
//     const cacheConfigDir = new Directory("var/cache");
//     cacheConfigDir.ensure();
//
//     // Look for .yml files in config directory
//     const configDir = new Directory("config");
//     const directories = configDir.directories(null, true);
//     directories.push(configDir);
//
//     directories.map((directory) => {
//       cacheConfigDir.mkdir(directory.getPath());
//       const files = directory.files(/\.ya?ml$/i);
//       files.map((file) => {
//         const yaml = new YamlParser(file.read());
//         const data = yaml.getData();
//         const path = file.getPath().replace(/\.ya?ml$/, ".ts");
//         if (path === `config${Path.DS}app.ts`) {
//           // @ts-ignore:
//           data["directories"]["root"] = this.rootDir;
//         }
//         cacheConfigDir.touch(path, `export default ${JSON.stringify(data)}`);
//       });
//     });
//
//     const file = new File("config/app.yml");
//     const yaml = new YamlParser(file.read());
//     const data = yaml.getData<
//       Record<"directories", AppDirectoryType>
//     >();
//     this.loadRoutes(data.directories);
//   }
//
//   private loadRoutes(appDirectories: AppDirectoryType) {
//     // Create cache dir
//     const cacheConfigDir = new Directory("var/cache");
//     cacheConfigDir.ensure();
//
//     const routesDir = new Directory(appDirectories.routes);
//     const directories = routesDir.directories(null, true);
//     directories.push(routesDir);
//
//     const routes: Record<string, RouteType> = {};
//
//     directories.map((directory) => {
//       const files = directory.files(/\.ya?ml$/i);
//       files.map((file) => {
//         const yaml = new YamlParser(file.read());
//         const data = yaml.getData<Record<string, RouteType>>();
//         Object.keys(data).map((name) => {
//           data[name]["name"] = name;
//           // Add details
//           data[name]["_details"] = {
//             component: null,
//             handler: null,
//             middleware: null,
//             file: file.getPath(),
//           };
//
//           // Add details for component
//           const component = data[name].component;
//           if (component) {
//             const fileName = `${appDirectories.views}/${component}.tsx`;
//             const file = new File(fileName);
//
//             if (file.exists()) {
//               // @ts-ignore:
//               data[name]["_details"].component = fileName;
//             } else {
//               output.warning(`File '${fileName}' not found`, false);
//               output.newLine();
//             }
//           }
//
//           // Add details for component
//           const handler = data[name].handler;
//           if (handler) {
//             const fileName = `${appDirectories.handlers}/${handler}.ts`;
//             const file = new File(fileName);
//             if (file.exists()) {
//               // @ts-ignore:
//               data[name]["_details"].handler = fileName;
//             } else {
//               output.warning(`File '${fileName}' not found`, false);
//               output.newLine();
//             }
//           }
//
//           // Add details for component
//           const middlewares = data[name].middleware;
//           if (middlewares) {
//             middlewares.map((middleware) => {
//               const fileName = `${appDirectories.middlewares}/${middleware}.ts`;
//               const file = new File(fileName);
//               if (file.exists()) {
//                 // @ts-ignore:
//                 if (!data[name]["_details"].middleware) {
//                   // @ts-ignore:
//                   data[name]["_details"].middleware = [];
//                 }
//
//                 // @ts-ignore:
//                 data[name]["_details"].middleware.push(fileName);
//               } else {
//                 output.warning(`File '${fileName}' not found`, false);
//                 output.newLine();
//               }
//             });
//           }
//
//           routes[name] = data[name];
//         });
//       });
//     });
//
//     cacheConfigDir.touch(
//       "routes.ts",
//       `export default ${JSON.stringify(routes)}`,
//     );
//   }
// }
