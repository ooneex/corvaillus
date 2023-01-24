import { assertEquals } from "../../../deps.ts";
import { MatchedRoute } from "../mod.ts";
import { Route } from "./Route.ts";

Deno.test("Route - Should handle Route", () => {
  const route = new Route({
    name: "product_show",
    path: "/products/:id",
  });

  const matchedRoute = new MatchedRoute({
    protocol: "https",
    env: "test",
  });

  matchedRoute.setMethod("GET");
  assertEquals(route.isEquals(matchedRoute), true);
});
