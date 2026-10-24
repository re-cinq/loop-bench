Ticket #93 is defined by two red acceptance tests, committed and pushed to `loop-bench/93`. The branch is in sync with its upstream and already contains `origin/main`, so no merge was needed.

**Strategy: `direct`.** `createChatOrchestrator` takes the provider as a parameter, so a scripted provider drives real tool rounds through `processMessage`. The defect is in the value `afterModelResponse` receives, not in how a test reaches it.

**Files**
- `src/orchestration/usageAcrossRounds.acceptance.test.ts` (new, two tests)
- `.lore/dod.md` (the DoD, quoting the ticket's claim: "what the hook receives is the usage of the final provider call alone.")

**Red bar.** I ran it with the repo's own Jest invocation. The `npm test` script wraps Jest with `--experimental-vm-modules`, so a bare `npx jest` fails on ESM before any test runs:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts
```

```
● usage reported across tool rounds › reports the summed usage of every provider call in a turn that ran two tool rounds
    - "inputTokens": 60,  "outputTokens": 21,  "totalTokens": 81   (expected)
    + "inputTokens": 30,  "outputTokens": 9,   "totalTokens": 39   (received)

● usage reported across tool rounds › still counts the rounds that reported when a middle round reports no usage
    - "inputTokens": 40,  "outputTokens": 14,  "totalTokens": 54   (expected)
    + "inputTokens": 30,  "outputTokens": 9,   "totalTokens": 39   (received)

Tests: 2 failed, 2 total
```

Both fail for the reason the ticket states: the hook receives only the final provider call's usage.

**Choices I made**
- **Shape: one summed `UsageMetadata`.** This is the ticket's first option. I rejected the per-round breakdown because it widens the hook surface for a consumer who has not asked for it. The tests assert the sum, so a later switch to the breakdown would break them on purpose.
- **Existing tests kept green, not edited.** The no-tool path is pinned by `receives collected response text and usage` in `chatOrchestrator.test.ts`. The other guards are the existing `keeps the usage an earlier round reported…` and the toolBudget usage test.
- **"Nothing reported → `undefined`" is not an acceptance test.** It passes today, so it cannot be a red bar. It is recorded as a guard in `.lore/dod.md`.
- **No spec parenthetical added.** The statement the test validates is the replacement that `specs/hal-engine-config-hooks/spec.md` line 28 needs. Linking it now would point at the line describing the behaviour being removed. That line is listed as a facet.

**Findings for the human**
- The ticket's acceptance list includes `npm run build`, `typecheck`, `eslint` and `prettier:check`. These are CI gates, not acceptance tests, so they are not in the DoD. The repo's test runner is Jest, not Vitest.
- The ticket asks for the hook's type to make the sum unambiguous. Only a doc comment on the declaration can do that; no runtime test can observe it, so it is a facet rather than a test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}