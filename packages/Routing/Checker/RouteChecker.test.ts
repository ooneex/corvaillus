import { assertEquals, describe, it } from "../../../deps.ts";
import {
  MatchedRoute,
  Route,
  RouteChecker,
  RouteCheckerErrorType,
} from "../mod.ts";

describe("Htt RouteChecker", () => {
  const route = new Route({
    name: "product_show",
    path: "/products/:id",
  });

  const matchedRoute = new MatchedRoute({
    method: "GET",
    protocol: "https",
    host: "google.com",
    port: "9000",
    locale: "uk",
    role: "ROLE_ANON",
    env: "dev",
    version: "2.2.0",
  });

  const routeChecker = new RouteChecker(route, matchedRoute);

  it("isValid", () => {
    assertEquals(routeChecker.isValid(), true);
  });

  it("checkMethod", () => {
    route.method(["POST", "PUT"]);
    assertEquals(
      routeChecker.checkMethod(),
      "GET method not allowed. Expected POST or PUT.",
    );
    route.method(undefined);
    assertEquals(routeChecker.checkMethod(), true);
  });

  route.host(["api.google.com", "localhost"]);
  assertEquals(
    routeChecker.checkHost(),
    "google.com host not allowed. Expected api.google.com or localhost.",
  );
  matchedRoute.setHost("localhost");
  assertEquals(routeChecker.checkHost(), true);
  route.host(undefined);
  assertEquals(routeChecker.checkHost(), true);

  route.port(["3000", "4000"]);
  assertEquals(
    routeChecker.checkPort(),
    "9000 port not allowed. Expected 3000 or 4000.",
  );
  matchedRoute.setPort("4000");
  assertEquals(routeChecker.checkPort(), true);
  route.port(undefined);
  assertEquals(routeChecker.checkPort(), true);

  route.locale(["fr", "en"]);
  assertEquals(
    routeChecker.checkLocale(),
    "uk locale not allowed. Expected fr or en.",
  );
  matchedRoute.setLocale("en");
  assertEquals(routeChecker.checkLocale(), true);
  route.locale(undefined);
  assertEquals(routeChecker.checkLocale(), true);

  route.role(["ROLE_USER", "ROLE_ADMIN"]);
  assertEquals(
    routeChecker.checkRole(),
    "ROLE_ANON role not allowed. Expected ROLE_USER or ROLE_ADMIN.",
  );
  matchedRoute.setRole("ROLE_USER");
  assertEquals(routeChecker.checkRole(), true);
  route.role(undefined);
  assertEquals(routeChecker.checkRole(), true);

  route.env(["prod", "demo"]);
  assertEquals(
    routeChecker.checkEnv(),
    "dev env not allowed. Expected prod or demo.",
  );
  matchedRoute.setEnv("prod");
  assertEquals(routeChecker.checkEnv(), true);
  route.env(undefined);
  assertEquals(routeChecker.checkEnv(), true);

  route.version(["1.1.1", "1.3.0"]);
  assertEquals(
    routeChecker.checkVersion(),
    "2.2.0 version not allowed. Expected 1.1.1 or 1.3.0.",
  );
  matchedRoute.setVersion("1.3.0");
  assertEquals(routeChecker.checkVersion(), true);
  route.version(undefined);
  assertEquals(routeChecker.checkVersion(), true);

  matchedRoute.setParams({
    firstname: "Doe",
    id: "58806cc0-f564-45ea-8266-198967a08503",
    price: 42,
  });
  assertEquals(routeChecker.checkConstraints(), true);
  route.where("lastname", "No").where("firstname", "John");
  let errors = routeChecker.checkConstraints() as RouteCheckerErrorType;
  assertEquals(errors[0].key, "lastname");
  assertEquals(errors[0].message, '"lastname" param does not exist.');
  assertEquals(errors[1].key, "firstname");
  assertEquals(
    errors[1].message,
    '"Doe" value does not match. Expected /^John$/',
  );

  route.whereRegex("firstname", /^Obama/);
  errors = routeChecker.checkConstraints() as RouteCheckerErrorType;
  assertEquals(
    errors[2].message,
    '"Doe" value does not match. Expected /^Obama/',
  );

  route.whereAlphaNumeric("id");
  errors = routeChecker.checkConstraints() as RouteCheckerErrorType;
  assertEquals(
    errors[3].message,
    '"58806cc0-f564-45ea-8266-198967a08503" value does not match. Expected /^[a-z\\d]+$/i',
  );

  route.whereNumber("id");
  errors = routeChecker.checkConstraints() as RouteCheckerErrorType;
  assertEquals(
    errors[4].message,
    '"58806cc0-f564-45ea-8266-198967a08503" value does not match. Expected /^\\d+(?:[.,]\\d+)?$/',
  );

  route.whereUuid("price");
  errors = routeChecker.checkConstraints() as RouteCheckerErrorType;
  assertEquals(
    errors[5].message,
    '"42" value does not match. Expected /^[\\da-f]{8}-[\\da-f]{4}-4[\\da-f]{3}-[89ab][\\da-f]{3}-[\\da-f]{12}$/i',
  );

  route.whereIn("price", [32, 45]);
  errors = routeChecker.checkConstraints() as RouteCheckerErrorType;
  assertEquals(
    errors[6].message,
    '"42" value does not match. Expected /32|45/',
  );
});
