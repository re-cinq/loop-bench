Two acceptance tests are committed and pushed to `loop-bench/93`, and both are red for the reason the ticket gives.

**Strategy: `direct`.** `createChatOrchestrator` takes a scripted provider and the `afterModelResponse` hook, so the tests drive real tool rounds through `processMessage`. I read the ticket's open design choice as the sum under the existing single `usage` argument. The per-round breakdown was the other shape; the DoD records why it is out of scope.

**Files:**
- `src/orchestration/usageAcrossRounds.acceptance.test.ts` (new, two tests)
- `.lore/dod.md` (new, quotes the central claim and lists the facets)

**The two tests:**
- Two tool rounds reporting 15, 27 and 39 total tokens. The hook must receive their sum, 81.
- A partial-reporting turn must sum only the rounds that reported (40 input, 14 output, 54 total). A turn where nothing reported must still hand the hook `undefined`. The `undefined` half already holds today, so the test goes red on the partial case.

**Red bar.** Run here with Jest directly, since this repo uses Jest, not Vitest:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts
```

```
FAIL src/orchestration/usageAcrossRounds.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports the usage of every provider call in a turn that ran two tool rounds
    - Expected  - 3
    + Received  + 3
    -   "inputTokens": 60,
    -   "outputTokens": 21,
    -   "totalTokens": 81,
    +   "inputTokens": 30,
    +   "outputTokens": 9,
    +   "totalTokens": 39,
  ● afterModelResponse usage across tool rounds › counts the rounds that reported and leaves the total undefined when no round reported
    - Expected  - 3
    + Received  + 3
      Object {
        "partial": Object {
    -     "inputTokens": 40,
    -     "outputTokens": 14,
    -     "totalTokens": 54,
    +     "inputTokens": 30,
    +     "outputTokens": 9,
    +     "totalTokens": 39,
        },
        "silent": undefined,
      }
Tests:       2 failed, 2 total
```

The received value is the final round alone, which is the behaviour the ticket reports.

**Not done here, by design:**
- The spec's under-counting line in `specs/hal-engine-config-hooks/spec.md` still describes the current behaviour. I did not add a `validated by` link to it, because the link belongs on the new statement the implementation writes. The DoD lists this as a facet.
- The ticket's `build`, `test`, `typecheck`, `eslint` and `prettier:check` gate is CI's to run. I did not run the lint, typecheck or build in this pod.
- The Lore MCP server failed to connect (`CONNECTION_CLOSED`), so I could not query lore context or pass `repo` on any `lore_*` call.

**Git.** Formatted with Prettier, committed as `e1a192e`, and pushed. The branch was already level with `origin/main`, so no merge was needed. `git status` shows the branch is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}