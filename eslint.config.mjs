import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import reLint from "@re-cinq/eslint-plugin-re-lint";

export default tseslint.config(
  { ignores: ["**/node_modules/**", "results/**", "runs/**", "site/**", "artifacts/**", "proposals/**"] },
  {
    files: ["**/*.{ts,mts}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
      globals: { ...globals.node },
    },
    plugins: { "re-lint": reLint },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "re-lint/no-catch-as-control-flow": "error",
      "re-lint/no-forwarding-class": "error",
      "re-lint/require-colocated-tests": "error",
      "re-lint/max-boolean-operators": ["error", { max: 2 }],
      "re-lint/test-imports-its-subject": "error",
      "re-lint/prefer-early-return": "error",
      "re-lint/require-fetch-timeout": "error",
      "re-lint/no-nested-if": "error",
      "re-lint/no-nested-loop": "error",
      "no-nested-ternary": "error",
      "max-nested-callbacks": ["error", { max: 3 }],
    },
  },
);
