import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextCoreWebVitals,
  prettier,
  {
    // React Compiler rules added by eslint-config-next 16. Existing code
    // violates them (MenuDrawer2, attendance page, dnd board); fix and move
    // back to "error" instead of adding new violations.
    rules: {
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
  {
    // Playwright fixtures expose `use`, which is not React's hook.
    files: ["tests/**"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "next-env.d.ts",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
