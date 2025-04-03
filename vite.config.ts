import type { ViteUserConfig } from "vitest/config";

const config: ViteUserConfig = {
  test: {
    globals: true,
    setupFiles: ["./src/__mocks__/discord.mock.ts"] // FIXME: Use glob pattern to match any file with extension .mock.ts
  }
};

export default config;
