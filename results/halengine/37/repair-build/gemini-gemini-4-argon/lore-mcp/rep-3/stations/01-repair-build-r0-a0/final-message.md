Fixed all three CI failures reported on `7ccea884f1d7cb84a96ee5242a0436b047ec021b`:
1. Switched `src/orchestration/tools/registry.ts` from named `{Ajv}` import to default `Ajv` import with `{allErrors: true, format: false}`, resolving both `TS2693` in `typecheck` and the Jest ESM `SyntaxError` in `test`.
2. Validated tool input against the compiled `inputSchema` in `ToolRegistry.execute` before invoking the executor, returning a `ToolResponse` describing the schema errors without logging or echoing offending property values.
3. Attached `{cause: error}` in `compileSchema` (`preserve-caught-error`) and refactored round 2 handling in `src/orchestration/tools/registry.acceptance.test.ts` (`re-lint/prefer-early-return` and `re-lint/max-member-chain`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv default ESM import and options, implemented inputSchema validation in ToolRegistry.execute, and resolved ESLint errors in registry.ts and registry.acceptance.test.ts"}}