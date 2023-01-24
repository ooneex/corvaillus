import {
  assertArrayIncludes,
  assertEquals,
  assertInstanceOf,
  assertMatch,
  assertNotMatch,
  assertObjectMatch,
  describe,
  it,
} from "../../../deps.ts";
import {
  AppDefaultEnv,
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  HttpDefaultMethods,
  HttpDefaultProtocols,
  HttpMethodType,
  YamlParser,
} from "../deps.ts";
import { Route, RouteConstraintType, Router } from "../mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;

const router = new Router();

describe("Http Router", () => {
  const action = "HomePage.ts";

  it("Should handle Router", () => {
    let route = router.register("products_show_create", "/products/:id", [
      "GET",
      "POST",
    ], action);
    assertEquals(route.get("name"), "products_show_create");
    assertEquals(route.get("path"), "/products/:id");
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["GET", "POST"]);

    route = router.get("products_show", "/products/:id", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["GET"]);

    route = router.post("products_create", "/products", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["POST"]);

    route = router.put("products_update", "/products/:id", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["PUT"]);

    route = router.patch("products_patch", "/products/:id", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["PATCH"]);

    route = router.head("products_head", "/products/:id", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["HEAD"]);

    route = router.options("products_options", "/products/:id", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["OPTIONS"]);

    route = router.delete("products_delete", "/products/:id", action);
    assertArrayIncludes(route.get<HttpMethodType[]>("method"), ["DELETE"]);

    assertEquals(router.count(), 8);
  });

  it("Should handle default values", () => {
    const route = new Route({ name: "route_name", path: "/products" });
    assertEquals(route.get("method"), HttpDefaultMethods);
    assertEquals(route.get("protocol"), HttpDefaultProtocols);
    assertEquals(route.get("host"), []);
    assertEquals(route.get("port"), []);
    assertEquals(route.get("default"), {});
    assertEquals(route.get("data"), {});
    assertEquals(route.get("locale"), Route.DEFAULT_LOCALE);
    assertEquals(route.get("role"), []);
    assertEquals(route.get("env"), AppDefaultEnv);
    assertEquals(route.get("version"), []);
    assertEquals(route.get("description"), undefined);
  });

  it("Should create routes yaml file", () => {
    const content = Deno.readTextFileSync(__dirname + "example.test.yml");

    const yaml = new YamlParser(content);

    router.fromYaml(yaml.getData());

    const route = router.findByName("homepage");
    assertInstanceOf(route, Route);
    assertEquals(route?.get("path"), "/products/:id/:name");
    assertArrayIncludes(route?.get<HttpMethodType[]>("method"), [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
      "HEAD",
    ]);
    assertArrayIncludes(route?.get<HttpMethodType[]>("protocol"), [
      "https",
      "http",
    ]);
    assertArrayIncludes(route?.get<HttpMethodType[]>("host"), [
      "api.ooneex.io",
      "ooneex.io",
    ]);
    assertArrayIncludes(route?.get<string[]>("port"), ["80", "8000"]);
    assertObjectMatch(route?.get("default"), {
      id: "58806cc0-f564-45ea-8266-198967a08503",
      name: "Doe",
    });
    assertObjectMatch(route?.get("data"), {
      color: "red",
      size: 42,
    });
    assertArrayIncludes(route?.get<AppLocaleType[]>("locale"), ["fr", "en"]);
    assertArrayIncludes(route?.get<AppRoleType>("role"), [
      "ROLE_ANON",
      "ROLE_USER",
      "ROLES_ADMIN",
    ]);
    assertArrayIncludes(route?.get<AppEnvType[]>("env"), [
      "dev",
      "prod",
      "test",
      "demo",
    ]);
    assertArrayIncludes(route?.get<AppVersionType[]>("version"), [
      "1.2.3",
      "2.0.0",
    ]);
    assertEquals(route?.get("description"), "Route description");

    const constraints = route?.get<RouteConstraintType[]>("constraint");
    assertMatch("30", constraints[0].constraint);
    assertMatch("keyboard", constraints[1].constraint);
    assertMatch("123", constraints[2].constraint);
    assertNotMatch("abc", constraints[2].constraint);
    assertMatch("doe123", constraints[3].constraint);
    assertNotMatch("doe-123", constraints[3].constraint);
    assertMatch("23", constraints[4].constraint);
    assertMatch("23.45", constraints[4].constraint);
    assertMatch("23,45", constraints[4].constraint);
    assertNotMatch("23.,45", constraints[4].constraint);
    assertNotMatch("23q", constraints[4].constraint);
    assertMatch("23", constraints[5].constraint);
    assertMatch("b23F5", constraints[5].constraint);
    assertNotMatch("34-d3", constraints[5].constraint);
    assertMatch(
      "58806cc0-f564-45ea-8266-198967a08503",
      constraints[6].constraint,
    );
    assertNotMatch(
      "58806cc0-f564-45ea-8266-198967a0850z",
      constraints[6].constraint,
    );
    assertMatch("Obama", constraints[7].constraint);
    assertMatch("Doe", constraints[7].constraint);
    assertNotMatch("doe", constraints[7].constraint);
  });
});
