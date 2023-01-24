import { HandlerContext, Handlers, RouteConfig } from "../deps.ts";

export const proxyConfig: RouteConfig = {
  routeOverride: "/.*",
};

const handlerCallback = async (_req: Request, ctx: HandlerContext) => {
  // Render view if it defined in route definition
  const resp = await ctx.render(ctx.state);
  // resp.headers.set("X-Custom-Header", "Hello World");
  return resp;
};

export const proxyHandler: Handlers = {
  DELETE: handlerCallback,
  GET: handlerCallback,
  HEAD: handlerCallback,
  OPTIONS: handlerCallback,
  PATCH: handlerCallback,
  POST: handlerCallback,
  PUT: handlerCallback,
};
