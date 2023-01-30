/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import { Kernel } from "@ooneex/app";
import manifest from "./fresh.gen.ts";

await Kernel.boot();

// const m = {...manifest, ...{routes: routes}};

console.log(manifest);

// await start(manifest);
