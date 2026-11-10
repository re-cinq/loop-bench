Reproduced and fixed all CI failures reported on `7ccea88`:
1. Fixed `Ajv` import in `src/orchestration/tools/registry.ts` from named import to default `import Ajv from 'ajv'`, fixing `error TS2693: 'Ajv' only refers to a type` and the runtime Jest `SyntaxError: The requested module 'ajv' does not provide an export named 'Ajv'`.
2. Attached `{cause: error}` when rethrowing the error in `compileSchema` to satisfy `preserve-caught-error`.
3. Inverted the tail guard in `src/orchestration/tools/registry.acceptance.test.ts` to `if (round !== 2)` to eliminate `re-lint/prefer-early-return`, and destructured `lastMessage.content` to keep member access depth within 2 hops for `re-lint/max-member-chain`.
4. Implemented input validation in `ToolRegistry.execute` using precompiled static schemas and dynamic schema caching, returning a rejection `ToolResponse` on failure without invoking the executor or leaking property values in output or logs.
5. Formatted changes with Prettier, committed, and pushed to `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv default export mismatch, lint rules in acceptance tests, and missing input validation in ToolRegistry.execute"}}