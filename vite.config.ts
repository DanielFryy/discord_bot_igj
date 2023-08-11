import { UserConfig } from "vitest/config";

const config: UserConfig = {
  test: {
    globals: true,
    setupFiles: ["./src/test/setupTestsBeforeEnv.ts"]
  }
};

export default config;
