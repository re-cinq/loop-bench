Red acceptance tests are committed and pushed to `loop-bench/93` (commit `3ec31bf`). The branch is in sync with its upstream and already contains `origin/main`, so no merge was needed.

**Strategy: `direct`.** The seam exists: `createChatOrchestrator` takes a scripted provider and the `afterModelResponse` hook. I chose the single summed `usage` argument over the per-round breakdown, since the ticket's first option keeps one argument. The DoD records that choice.

**Acceptance tests** (`src/orchestration/chatOrchestrator.turnUsage.acceptance.test.ts`):
- **reports the sum of every provider call in a turn that ran two tool rounds**: the central claim.
- **keeps the usage of an earlier round when a round in between reports none**: the silent round must neither drop earlier usage nor produce `undefined` or `NaN`.

**Red output** (`npx jest --runTestsByPath src/orchestration/chatOrchestrator.turnUsage.acceptance.test.ts`):
```
● turn usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds
    - "inputTokens": 900,  "outputTokens": 120,  "totalTokens": 1020,
    + "inputTokens": 500,  "outputTokens": 60,   "totalTokens": 560,

● turn usage across tool rounds › keeps the usage of an earlier round when a round in between reports none
    - "inputTokens": 18,   "outputTokens": 5,    "totalTokens": 23,
    + "inputTokens": 7,    "outputTokens": 2,    "totalTokens": 9,

Tests: 2 failed, 2 total
```
Both fail because the hook receives only the final provider call's usage, which is the ticket's stated claim.

**Other changes:**
- `.lore/dod.md` quotes the claim, sets the strategy, lists the two tests, the existing tests that must stay green, and the facets.
- `specs/hal-engine-config-hooks/spec.md` gets a `validated by` link on the one un-linked statement this ticket changes. The statement's text still describes the current under-counting; the implementation round rewrites it.

**Not covered and why:**
- The ticket's "nothing reported still reports nothing" case passes today, so it cannot be a red test. It is listed as a facet for the implementation round to guard.
- I did not run the existing tests the DoD names. The contract only asks for that under `mechanical`, and I ran only the new file.
- I did not run lint, typecheck or the full suite. CI runs `npm run test:coverage` and the other gates on push.
- The `lore_*` tools were unavailable: the lore MCP server failed to connect. I could not record a memory, but the work does not depend on it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}