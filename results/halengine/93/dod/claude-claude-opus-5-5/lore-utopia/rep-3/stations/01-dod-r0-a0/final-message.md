I've added two acceptance tests for #93. Both fail because `afterModelResponse` only receives the usage from the turn's last provider call. They're committed and pushed to `loop-bench/93`, which already contains everything on `origin/main` and is not ahead of its upstream.

**Strategy: `direct`.** The tests call the real `createChatOrchestrator(...).processMessage` with an `afterModelResponse` hook. A scripted provider answers three rounds (two tool rounds, then a final answer), and each round reports a different known token count. The tests check what the hook's `usage` argument receives.

**Tests** in `src/orchestration/turnUsage.acceptance.test.ts`:
1. **sums the usage of every provider call in a turn driven through two tool rounds**: the hook should receive the sum of all three rounds.
2. **counts the rounds that reported usage, and reports nothing when no round did**: a round with no usage is skipped rather than turning the total into `undefined` or `NaN`, and a turn where no round reported still passes `undefined`.

The tests expect the sum as the hook's existing third argument. That fits either design the ticket weighs: a sum only, or a sum plus a per-round breakdown as an extra argument. The ticket's requirement that a turn with no tools reports what it does today is covered by the existing test `receives collected response text and usage` staying green and unedited. `.lore/dod.md` lists that test too.

Ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts --silent`:
```
● turn usage reported to afterModelResponse › sums the usage of every provider call in a turn driven through two tool rounds
    -   "inputTokens": 900,
    -   "outputTokens": 70,
    -   "totalTokens": 970,
    +   "inputTokens": 500,
    +   "outputTokens": 40,
    +   "totalTokens": 540,

● turn usage reported to afterModelResponse › counts the rounds that reported usage, and reports nothing when no round did
        "partial": Object {
    -     "inputTokens": 600,
    -     "outputTokens": 50,
    -     "totalTokens": 650,
    +     "inputTokens": 500,
    +     "outputTokens": 40,
    +     "totalTokens": 540,
        },
        "silent": undefined,

Tests:       2 failed, 2 total
```
In both cases the hook received only the last round's numbers.

Things the tests don't cover:
- **Spec citation not added yet.** The only statement about this in `specs/hal-engine-config-hooks/spec.md` describes the current under-counting, so citing these tests on it would be wrong. The ticket asks for that line to be replaced, and `.lore/dod.md` lists citing the tests on the new statement as a step for the implementation.
- **No spec-anchor stamping.** This repo has no mechanism for stamping a test with its spec anchor and no `scripts/spec-links/reanchor.mjs`.
- **Type and changelog are left to review.** The requirement that the hook's type shows it is a sum can't be checked by a runtime test, and neither can the CHANGELOG entry. `.lore/dod.md` lists both.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}