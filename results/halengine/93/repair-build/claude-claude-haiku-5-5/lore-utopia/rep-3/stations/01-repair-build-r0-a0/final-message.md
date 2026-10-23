The lint findings are fixed and pushed as `34b2181` on `loop-bench/93`. I have not confirmed CI's verdict on the new head.

**What was broken:** eslint in `src/orchestration/orchestratorHelpers.test.ts` reported three tests with no spec link and one test with two `expect` calls.

**Changes:**
- `orchestratorHelpers.test.ts`: split the "returns the defined side" test into two single-expect tests, one per operand position.
- `specs/hal-engine-config-hooks/spec.md`: added three statements under the usage bullets, each with a `validated by` link to the matching `accumulateUsage` test. They cover summing two defined operands, returning the defined side when one is undefined, and returning `undefined` when both are.

**Checks run:** `npx prettier --write` on both changed files reported them unchanged. I did not run eslint, the test suite, or a typecheck, per the pod rules. The lint fix rests on the annotation line numbers, which I re-read after the split (35, 40, 45).

**Branch state:** the branch had not moved past the judged sha `19eaa4d`. A fetch and merge of `origin/main` produced nothing, since `main` is already an ancestor. `git status` shows the branch in sync with its upstream.

**Not done:** `lore-query-trace` returned HTTP 403 (the token lacks `read` scope), so I could not check prior failures on this file. The round-brief verdict named only lint findings, so I did not touch anything else.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint require-spec-link and max-expects in orchestratorHelpers.test.ts; split a two-expect test and added spec links in specs/hal-engine-config-hooks/spec.md"}}