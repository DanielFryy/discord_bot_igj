import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";

import packageJSON from "./package.json" assert { type: "json" };

const config: RollupOptions = {
  input: "src/bot.ts",
  output: {
    dir: "build",
    format: "cjs",
    sourcemap: true
  },
  plugins: [typescript({ sourceMap: true })],
  external: Object.keys(packageJSON.dependencies)
};

export default config;
