import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";
import filesize from "rollup-plugin-filesize";

import packageJSON from "./package.json";

const config: RollupOptions[] = [
  {
    input: "src/bot.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      entryFileNames: "[name].cjs" // Specify .cjs extension
    },
    plugins: [typescript({ sourceMap: true }), filesize({ format: { exponent: 0 } })],
    external: Object.keys(packageJSON.dependencies)
  },
  {
    input: "src/commands/register.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      entryFileNames: "[name].cjs" // Specify .cjs extension
    },
    plugins: [typescript({ sourceMap: true })],
    external: Object.keys(packageJSON.dependencies)
  }
];

export default config;
