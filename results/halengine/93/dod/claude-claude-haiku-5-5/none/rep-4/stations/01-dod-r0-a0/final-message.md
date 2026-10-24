The acceptance tests are committed and pushed to `loop-bench/93` (commit `6ecd2b3`), and the branch is level with its upstream. `origin/main` was already merged in, so no merge was needed.

**Strategy: `direct`.** `createChatOrchestrator` takes a scripted provider and an `afterModelResponse` hook, so a multi-round turn can be driven through `processMessage` today.

**Decision:** the hook receives the sum of usage across every provider call in the turn, keeping the single `usage` argument. Passing both a total and a per-round breakdown was rejected as a wider surface than the billing consumer needs. This is recorded in `.lore/dod.md`.

**Acceptance tests** (`src/orchestration/chatOrchestrator.usage.acceptance.test.ts`):
- **reports usage covering every provider call in a turn driven through two tool rounds**: three provider calls report 14, 36 and 58 total tokens; the hook must receive 108.
- **still counts the rounds that reported when a middle round reports no usage**: rounds reporting 7 and 4 with a silent round between must sum to 11.

**Red bar**, run here with `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts --silent`:

```
FAIL src/orchestration/chatOrchestrator.usage.acceptance.test.ts
  ● ... › reports usage covering every provider call in a turn driven through two tool rounds
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 90,
    -   "outputTokens": 18,
    -   "totalTokens": 108,
    +   "inputTokens": 50,
    +   "outputTokens": 8,
    +   "totalTokens": 58,
      }

  ● ... › still counts the rounds that reported when a middle round reports no usage
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 8,
    -   "outputTokens": 3,
    -   "totalTokens": 11,
    +   "inputTokens": 3,
    +   "outputTokens": 1,
    +   "totalTokens": 4,
      }

Tests:       2 failed, 2 total
```

Both fail on the reported value, which is the under-count the ticket describes: the hook gets only the final provider call's usage.

**No-tool guard:** the existing test `afterModelResponse receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` passes today (`1 passed`), and the ticket asks for it to stay unedited. The existing `keeps the usage an earlier round reported when a later round reports none` test should also still pass under a sum.

**Gaps and findings for the implementer:**
- "A turn where nothing reported still reports nothing" has no test. Any test for it passes today, so an acceptance test would not be red. The implementer must keep it by hand.
- The ticket's type-clarity criterion and the spec and CHANGELOG edits are not testable by a behaviour test, so they are facets in `.lore/dod.md`, not tests.
- The config-hooks spec's "out of scope" block also records the `instanceof Error` gate on `onError`. That is a separate neighbouring problem, not part of this ticket.

I did not run the repository's full suite, lint, typecheck or build, as the contract requires.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}