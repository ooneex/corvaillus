import { afterAll, assertEquals, describe, it } from "../../../deps.ts";
import { appConfig } from "./AppConfig.ts";

appConfig.generateAppConfigFile();
appConfig.parse();

describe("App config default file", () => {
  afterAll(() => {
    try {
      Deno.removeSync("config/app.yml");
    } catch (e) {
      console.log(e.message);
    }
  });

  describe("Errors", () => {
    const errors = appConfig.getErrors();

    it("404", () => {
      assertEquals(errors?._404, "errors/_404.tsx");
    });

    it("500", () => {
      assertEquals(errors?._500, "errors/_500.tsx");
    });
  });
});
