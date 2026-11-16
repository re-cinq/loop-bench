I fixed all the findings CI named and pushed them. I ran no tests, typecheck or lint here, so CI will be the first check of the push.

- **Ajv import (typecheck and test):** `registry.ts` now does `import AjvModule from 'ajv'` and uses `AjvModule.default`. The named `{Ajv}` import is what caused the TS2693 error and the "does not provide an export named 'Ajv'" failure in the three suites.
- **Error cause (`registry.ts`):** the "Invalid inputSchema" error now passes `{cause: error}`.
- **Lint in `registry.acceptance.test.ts`:** the `round === 2` block became an early return, `if (round !== 2)`. The three-hop member chain is replaced by destructuring the first content block.

Prettier left both files unchanged. `origin/main` was already merged, and the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv ESM import (default import .default), error cause, and two lint findings in registry.acceptance.test.ts; not re-run locally, CI to judge"}}