Fixed all CI findings from commit `7ccea88`:
1. **Typecheck & ESM test import failures**: Updated `src/orchestration/tools/registry.ts` to use default import `import Ajv from 'ajv'` instead of named import `import {Ajv} from 'ajv'`, fixing TS2693 and ESM loader export resolution error.
2. **ESLint `preserve-caught-error`**: Added `{cause: error}` to the rethrown error in `compileSchema` within `src/orchestration/tools/registry.ts`.
3. **ESLint `prefer-early-return` & `max-member-chain`**: Refactored the `sendMessage` provider stub in `src/orchestration/tools/registry.acceptance.test.ts` to guard with early return `if (round !== 2)` and split `lastMessage.content[0]?.content` into separate statements.
4. Formatted all changed files with Prettier, verified unit tests pass locally, committed, and pushed to `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"default-imported Ajv in registry.ts, added cause to compileSchema error, and resolved prefer-early-return and member chain depth in acceptance test"}}