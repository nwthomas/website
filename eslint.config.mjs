import { defineConfig, globalIgnores } from "eslint/config";

import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import stylexPlugin from "@stylexjs/eslint-plugin";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "@stylexjs": stylexPlugin,
    },
    rules: {
      "@stylexjs/no-unused": "error",
      "@stylexjs/sort-keys": "warn",
      "@stylexjs/valid-shorthands": "warn",
      "@stylexjs/valid-styles": "error",
      "import/no-anonymous-default-export": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
