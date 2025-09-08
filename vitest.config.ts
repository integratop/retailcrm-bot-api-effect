import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    sequence: { hooks: "list" },
    testTimeout: 60_000,
    clearMocks: true,
    // setupFiles: ["dotenv/config"],
    include: ["**/*.test.ts"],
    exclude: ["node_modules"],
    passWithNoTests: true,
  },
});
