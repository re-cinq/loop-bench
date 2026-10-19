Branch is clean and pushed. Here's a summary of what was done and the actual failure output:

---

**Strategy: `direct`** — `createChatOrchestrator` is a real callable seam; two scripted-provider tests drive it with known per-round token counts and assert against the sum.

**Central claim quoted in `.lore/dod.md`:** `afterModelResponse` is passed `lastUsage` — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Two red acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`:

**Test 1**: Round 1 yields {10,5,15} tokens, round 2 yields {20,8,28} → expects sum {30,13,43}. Fails because the orchestrator currently assigns `lastUsage = outcome.usage ?? lastUsage`, so the hook only sees round 2's {20,8,28}.

**Test 2**: Round 1 yields {3,1,4}, round 2 yields no usage, round 3 yields {7,2,9} → expects sum of reported rounds {10,3,13}. Fails because the hook only sees round 3's {7,2,9}.

**Actual failure output:**
```
● two-round turn reports sum of both rounds usage to afterModelResponse
  Expected: {inputTokens: 30, outputTokens: 13, totalTokens: 43}
  Received: {inputTokens: 20, outputTokens:  8, totalTokens: 28}

● a round with no usage does not drop reported rounds from the total
  Expected: {inputTokens: 10, outputTokens:  3, totalTokens: 13}
  Received: {inputTokens:  7, outputTokens:  2, totalTokens:  9}
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}