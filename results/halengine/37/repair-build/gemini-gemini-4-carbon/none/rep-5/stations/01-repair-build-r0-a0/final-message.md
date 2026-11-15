Fixed the three red CI checks (`typecheck`, `eslint`, and `test`) on `loop-bench/37` and pushed `5743e5d`:

- Replaced the named `{Ajv}` import with default `import Ajv from 'ajv'` and compatible options, attached `{cause: error}` in `compileSchema`, and implemented `inputSchema` validation in `ToolRegistry.execute` without echoing or logging input values (`src/orchestration/tools/registry.ts`).
- Resolved `re-lint/prefer-early-return` and `re-lint/max-member-chain` in `src/orchestration/tools/registry.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed Ajv default import/options, error cause preservation, execute-time inputSchema validation in registry.ts, and ESLint findings in registry.acceptance.test.ts"}}