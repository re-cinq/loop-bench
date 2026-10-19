The ticket's acceptance tests are committed and pushed to `loop-bench/93`. The branch is not ahead of its upstream, and it already contained `origin/main`, so no merge was needed.

**Strategy: `direct`.** The seam exists: `createChatOrchestrator` takes a scripted provider and a real `ToolRegistry`, and `afterModelResponse` receives the usage on `processMessage`.

**Files**
- `src/orchestration/usageAcrossRounds.acceptance.test.ts` (new, two tests)
- `.lore/dod.md` (new, quotes the central claim, records the strategy, lists the tests and facets)

**Red bar, run here with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts`:**

```
● afterModelResponse usage across tool rounds › returns the summed usage of three provider calls across two tool rounds
    - Expected
    -   "inputTokens": 900,  "outputTokens": 120,  "totalTokens": 1020,
    + Received
    +   "inputTokens": 500,  "outputTokens": 60,   "totalTokens": 560,

● afterModelResponse usage across tool rounds › skips a round that reports no usage, and reports nothing when no round reports any
    - "inputTokens": 150,  "outputTokens": 25,  "totalTokens": 175,
    + "inputTokens": 50,   "outputTokens": 5,   "totalTokens": 55,

Tests: 2 failed, 2 total
```

Both fail because the hook receives only the final provider call's usage, which is the ticket's claim. The silent-turn half of the second test already passes, so it is only a guard inside a red test.

**Choices I made**
- **Shape:** one `usage` argument carrying the turn total. I rejected the per-round breakdown because no consumer asks for it and it widens the public surface. The parameter rename and the MINOR bump with changelog are facets, not tests.
- **Guards:** the two existing usage tests in `chatOrchestrator.test.ts` are listed as guards that must stay green and stay unedited.

**Deviations and findings**
- **Spec link not added.** The ticket asks for the `validated by` parenthetical on the spec statement. The statement currently describes the under-count, so linking it now would claim validation the code does not yet have. The facet says to cite the test when the spec line is rewritten.
- **Reanchor script absent.** `scripts/spec-links/reanchor.mjs` does not exist in this repo, so there was nothing to run.
- **Neighbouring problem, not in scope.** The spec's `onError` line, which gates on `error instanceof Error`, is a separate un-linked statement. It is listed as out of scope in `.lore/dod.md`.
- **Lint and typecheck not run,** per the pod rules. Prettier was applied to both new files.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}