Red acceptance tests are committed and pushed to `loop-bench/93` (commit `2314570`). The branch is in sync with its upstream and already contains `origin/main`, so no merge was needed.

**Strategy: `direct`.** The orchestrator's `afterModelResponse` hook is reachable through `createChatOrchestrator`, and a scripted provider can report known usage per round, so the tests call `processMessage` and read the hook's `usage` argument.

**Decision:** the hook keeps one `usage` argument and receives the sum over every provider call in the turn. This is the ticket's first option. The per-round breakdown was not chosen, so no wider surface is added.

**Tests** (`src/orchestration/usageAcrossRounds.acceptance.test.ts`, two tests):
1. A turn through two tool rounds, with provider calls reporting 100/300/500 input tokens, must hand the hook the summed total.
2. A middle round with no usage must not zero or NaN the total, and a turn where nothing reported must still hand the hook `undefined`.

**Run:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts --silent`

Both fail for the reason the ticket states, the last-call-only usage:

```
FAIL src/orchestration/usageAcrossRounds.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › hands the hook the usage summed over every provider call in a turn that ran two tool rounds
    - Expected
    + Received
    - "inputTokens": 900,  "outputTokens": 120,  "totalTokens": 1020,
    + "inputTokens": 500,  "outputTokens": 60,   "totalTokens": 560,

  ● afterModelResponse usage across tool rounds › counts the rounds that reported when a middle round reports none, and reports nothing when no round did
    - "inputTokens": 600,  "outputTokens": 80,  "totalTokens": 680,
    + "inputTokens": 500,  "outputTokens": 60,  "totalTokens": 560,

Tests: 2 failed, 2 total
```

The two existing tests that pin the no-tool path and the single-reporting-round path were left unedited and are named as facets in `.lore/dod.md`. I did not run them as part of this pod.

**Notes for the next round and the human:**
- The repo's runner is Jest with ts-jest, not Vitest. The new file ends in `.acceptance.test.ts`, so the existing `**/*.test.ts` match picks it up.
- `.lore/dod.md` follows the required shape. The type-clarity criterion, the spec line, the CHANGELOG entry and the CI checks are facets, since they are not runtime tests.
- The spec line that records the under-counting is unlinked. I did not add a `validated by` parenthetical, because that line is what this ticket replaces and the test is still red. It should be linked when the spec line is replaced.
- The `onError` gate on `error instanceof Error` in the same spec is a separate measured-semantics line, not this ticket's claim. I noted it as out of scope in the DoD.
- `scripts/lore-list-tests.mjs` does not emit a `spec` field, so there was no anchor to stamp.
- The Lore MCP server failed to connect (`CONNECTION_CLOSED`), so I could not query lore context or record learnings.
- I did not run lint, typecheck, build or the full suite here. CI runs them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}