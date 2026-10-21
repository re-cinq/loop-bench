Fixed the three CI failures reported on `7ccea884f1d7cb84a96ee5242a0436b047ec021b`:

1. **`typecheck` & `test` (`Ajv` import + `execute` validation):** Changed `import {Ajv} from 'ajv'` to the default import `import Ajv from 'ajv'` (with `import type {ErrorObject, ValidateFunction} from 'ajv'`) so `Ajv` resolves as a constructor value under both TypeScript `NodeNext` and Node ESM, and added `inputSchema` validation inside `ToolRegistry.execute` before invoking the executor.
2. **`eslint` (`preserve-caught-error`):** Attached `{cause: error}` to the `Error` thrown in `compileSchema` in `src/orchestration/tools/registry.ts`.
3. **`eslint` (`re-lint/prefer-early-return` & `re-lint/max-member-chain`):** Guarded `if (round !== 2)` with an early return and destructured `[firstToolResult]` from `lastMessage.content` in `src/orchestration/tools/registry.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"used default Ajv import, attached error cause, fixed lint findings in registry.acceptance.test.ts, and validated tool input in ToolRegistry.execute"}}