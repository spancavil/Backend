
import { DenonConfig } from "https://deno.land/x/denon@2.4.9/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run --allow-net app.ts",
      desc: "A simple Deno server with React",
    },
  },
};

export default config;