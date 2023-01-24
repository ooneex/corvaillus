// / <reference no-default-lib="true" />
// / <reference lib="dom" />
// / <reference lib="dom.iterable" />
// / <reference lib="dom.asynciterable" />
// / <reference lib="deno.ns" />

import { Kernel } from "@ooneex/app";
import manifest from "./fresh.gen.ts";

await Kernel.boot(manifest);
