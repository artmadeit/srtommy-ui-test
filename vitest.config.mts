import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname) } },
  test: {
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      // Only the pure logic that has unit tests; UI flows are covered by e2e.
      include: [
        "app/(api)/date.tsx",
        "app/(components)/helpers/withOutSorting.tsx",
        "app/(components)/hook-customization/usePagination.tsx",
        "app/portal/[[]locId]/location/Roles.tsx",
        "app/portal/[[]locId]/person/board/reorder.tsx",
        "app/env.ts",
      ],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
