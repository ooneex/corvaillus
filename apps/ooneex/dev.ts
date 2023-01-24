#!/usr/bin/env -S deno run -A --watch=static/,routes/

import { dev } from "@ooneex/app";

await dev(import.meta.url, "./main.ts");
