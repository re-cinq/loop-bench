The acceptance tests are already committed and pushed to `origin/loop-bench/93`. Both tests fail for exactly the right reason — the orchestrator currently passes only the last round's usage instead of the sum.

**Actual failure output:**

**Test 1 — "reports summed usage across all provider rounds to afterModelResponse":**
```
Expected: {inputTokens: 30, outputTokens: 13, totalTokens: 43}
Received: {inputTokens: 20, outputTokens: 8, totalTokens: 28}
```
(Only the last round's `r2` values, not `r1 + r2`)

**Test 2 — "counts only rounds that reported usage, skipping rounds that did not":**
```
Expected: {inputTokens: 15, outputTokens: 6, totalTokens: 21}
Received: {inputTokens: 10, outputTokens: 4, totalTokens: 14}
```
(Only the last round's `r3` values, not `r1 + r3`)

Both tests fail because `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` replaces rather than accumulates, which is exactly the claim the ticket makes.

The acceptance test file is at `src/orchestration/chatOrchestrator.acceptance.test.ts`, the DoD is at `.lore/dod.md`, strategy is `direct`, and the branch is already up to date with `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}