import { UserConfig } from "vitest/config";

const config: UserConfig = {
  test: {
    globals: true,
    setupFiles: ["./src/__mocks__/globalMocks.ts"]
  }
};

export default config;
