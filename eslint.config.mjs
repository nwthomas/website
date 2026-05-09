import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      ".output/**",
      "dist/**",
      "build/**",
      "src/routeTree.gen.ts",
      ".nitro/**",
      "bun.lock",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "import/no-anonymous-default-export": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
