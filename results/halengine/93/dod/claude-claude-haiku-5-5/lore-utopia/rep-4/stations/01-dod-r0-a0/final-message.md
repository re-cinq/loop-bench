The acceptance tests are committed and pushed to `loop-bench/93`, and both fail for the reason the ticket gives.

**Strategy: `direct`.** The orchestrator and the `afterModelResponse` hook are already reachable through `createChatOrchestrator` with a scripted provider, so no seam was needed.

**Tests** (`src/orchestration/usageAcrossRounds.acceptance.test.ts`):
1. **Reports the sum of every provider call in a turn that ran two tool rounds.** Expects 1100/150/1250 across three scripted calls.
2. **Sums only the rounds that reported usage, and reports nothing when no round did.** Expects 800/100/900 when the middle round reports nothing, and `undefined` when no round reports.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts`):
```
Tests:       2 failed, 2 total

● usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds
-   "inputTokens": 1100,
+   "inputTokens": 700,
...
● usage across tool rounds › sums only the rounds that reported usage, and reports nothing when no round did
-   "inputTokens": 800,
+   "inputTokens": 700,
```
The hook receives only the final call's 700/80/780, which is the under-count the reporter describes. I ran only this file, with no lint, typecheck or build.

**Choices I made for you to check:**
- **Shape:** the tests pin the sum as the single existing `usage` argument, not the "pass both" shape. If the implementer picks "pass both", these assertions must change.
- **Spec:** I added a `validated by` link to the spec sentence about under-counting. That sentence is what the ticket replaces, so it now links to a test that contradicts it until the implementation round rewrites it.
- **Spec heading:** the "Measured semantics — out of scope" heading in `specs/hal-engine-config-hooks/spec.md` says this issue changes nothing. That will need editing too.
- **Existing tests:** `keeps the usage an earlier round reported when a later round reports none` should still pass under the sum, since one reporting round sums to itself.

**Finding, not in scope:** the spec's `onError` bullet is also unlinked, and it describes a separate `instanceof Error` gate. I left it alone.

`.lore/dod.md` records the triage. The branch is pushed and not ahead of its upstream. It was already up to date with `origin/main`, so no merge was needed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}