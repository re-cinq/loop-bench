Fixed the three CI failures (`typecheck`, `eslint`, and `test`) on `loop-bench/37` and pushed commit `e8b2dd8`:

- Switched `src/orchestration/tools/registry.ts` to default `import Ajv from 'ajv'`, validated tool input in `ToolRegistry.execute` using `ajv.errorsText` without leaking input values, cached dynamic schemas via `WeakMap`, and attached `{cause: error}` in `compileSchema`.
- Refactored the round guard and content block destructuring in `src/orchestration/tools/registry.acceptance.test.ts` to satisfy `re-lint/prefer-early-return` and `re-lint/max-member-chain`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Switched ajv to default import, implemented input validation in ToolRegistry.execute, and resolved preserve-caught-error, prefer-early-return, and max-member-chain lint errors"}}