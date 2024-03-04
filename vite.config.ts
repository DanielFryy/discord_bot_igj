import type { UserConfig } from "vitest/config";

const config: UserConfig = {
  test: {
    globals: true,
    setupFiles: ["./src/__mocks__/discord.mock.ts"] // Fix: Use glob pattern to match any file with extension .mock.ts
  }
};

export default config;
