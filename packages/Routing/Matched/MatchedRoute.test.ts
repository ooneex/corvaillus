import { assertEquals, describe, it } from "../../../deps.ts";
import { MatchedRoute } from "../mod.ts";

describe("MatchedRoute", () => {
  const matchedRoute = new MatchedRoute({
    name: "product_show",
    params: { id: "58806cc0-f564-45ea-8266-198967a08503" },
    path: "/products/:id",
    methods: ["HEAD", "GET"],
    captures: ["58806cc0-f564-45ea-8266-198967a08503"],
  });

  it("getName", () => {
    assertEquals(matchedRoute.getName(), "product_show");
  });

  it("getParams", () => {
    assertEquals(matchedRoute.getParams(), {
      id: "58806cc0-f564-45ea-8266-198967a08503",
    });
  });

  it("getPath", () => {
    assertEquals(matchedRoute.getPath(), "/products/:id");
  });

  it("getMethods", () => {
    assertEquals(matchedRoute.getMethods(), ["HEAD", "GET"]);
  });

  it("getCaptures", () => {
    assertEquals(matchedRoute.getCaptures(), [
      "58806cc0-f564-45ea-8266-198967a08503",
    ]);
  });
});
