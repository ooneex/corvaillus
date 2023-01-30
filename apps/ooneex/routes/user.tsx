import {
  HandlerContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";

export const handler: Handlers = async (_req: Request, ctx: HandlerContext) => {
  const resp = await ctx.render();
  resp.headers.set("X-Custom-Header", "Hello World");
  return resp;
};

export const config: RouteConfig = {
  routeOverride: "/users/:id",
};

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.id}</div>;
}
