import { AppConfigType } from "@ooneex/app";

const config: AppConfigType = {
  directories: {
    components: "components",
    config: "config",
    handlers: "handlers",
    islands: "islands",
    middlewares: "middlewares",
    routes: "routes",
    static: "static",
    views: "views",
  },
  errors: {
    _404: "errors/_404.tsx",
    _500: "errors/_500.tsx",
  },
};

export default config;
