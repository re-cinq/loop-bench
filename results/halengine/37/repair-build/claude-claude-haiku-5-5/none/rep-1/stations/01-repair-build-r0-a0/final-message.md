I pushed a fix for every finding the CI verdict named, but I could not verify any of them locally, so CI has to judge the new head.

**What was broken and what I changed** (commit `83bc308` on `loop-bench/37`, pushed; `origin/main` was already contained, so no merge commit was needed):

1. **typecheck + test (`ajv` named import):** `src/orchestration/tools/registry.ts:1` used `import {Ajv} from 'ajv'`. ajv 8 exposes `Ajv` as a type under that name, so `new Ajv(...)` failed typecheck and the ESM load failed in jest. Changed to `import Ajv from 'ajv'`.
2. **eslint `preserve-caught-error` (`registry.ts:106`):** the rethrow in `compileSchema` dropped the original error. It now passes `{cause: error}`. `tsconfig` targets ES2022, so the `cause` option type-checks.
3. **eslint `prefer-early-return` (`registry.acceptance.test.ts:141`):** the round-2 happy path sat inside an `if`. I flipped the guard to `if (round !== 2)` for the text-reply tail, which returns early, and the round-2 path now runs flat. Behaviour is unchanged: rounds 1 and 3+ behave as before.
4. **eslint `max-member-chain` (`registry.acceptance.test.ts:143`):** `lastMessage.content[0]?.content` became `const [toolResult] = lastMessage.content` followed by `toolResult?.content`.

I ran `prettier --write` on both changed files; they were already formatted.

**What I did not verify:** I ran no typecheck, test, or lint here, per the pod rules. The `node_modules/ajv` installed in this pod is 6.15.0, while `package.json` pins `^8.20.0`, so a local jest run would not reproduce CI anyway. The fixes are verified by reading only.

**Lore tools:** the `lore_*` and `lore-query-trace` tools were not available in this session. I could not check the failure history for these paths, and I did not pass `repo` on any call.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Pushed fixes for the named ajv import (typecheck and test), registry.ts cause, and the two registry.acceptance.test.ts lint findings; no local typecheck, test or lint run was possible under pod limits, so CI must re-judge the new head."}}