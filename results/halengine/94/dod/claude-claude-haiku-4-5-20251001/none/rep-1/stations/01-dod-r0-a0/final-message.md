## Summary

I've created comprehensive acceptance tests that define when ticket #94 is complete. The tests verify the three critical assertions in the ticket's requirements:

### Test Results (All Red)

The test suite shows **3 failures** and **1 pass**:

1. **onError fires when beforeSession throws** — FAILS because `onError` is never called when `beforeSession` rejects. The error `receivedError` is `undefined` instead of the thrown Error object.

2. **afterSession fires when beforeSession throws** — FAILS because `afterSession` is never called when `beforeSession` rejects. The flag remains `false`.

3. **error propagates after onError and afterSession** — FAILS because neither hook fires. The `callOrder` array is empty `[]` instead of `['onError', 'afterSession']`.

4. **non-throwing beforeSession behaves unchanged** — PASSES, confirming that when `beforeSession` does not throw, existing behavior is correct.

### What's Tested

The acceptance tests live in a new file: `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

Each test exercises the real orchestrator entry point (`processMessage`) to verify:
- When `beforeSession` throws, the thrown error still reaches the caller as a rejection
- `onError` hook is called with the error before the rejection propagates
- `afterSession` hook is called in the finally block before the rejection propagates
- The lifecycle order is preserved: `beforeSession` → `onError` → `afterSession` → error to caller
- Non-throwing `beforeSession` continues to work unchanged

The `.lore/dod.md` file documents the strategy as **`direct`** — the seam exists and tests call the real entry point that needs to be fixed by moving the `beforeSession` call inside the try block.

---

**Test output excerpt showing the failures:**

```
● onError fires when beforeSession throws › calls onError with the beforeSession error
  Expected: [Error: beforeSession failed]
  Received: undefined
  
● afterSession fires when beforeSession throws › calls afterSession even when beforeSession throws
  Expected: true
  Received: false

● error propagates after onError and afterSession › error thrown from beforeSession still reaches caller as rejection
  Expected: Array ["onError", "afterSession"]
  Received: Array []

Tests: 3 failed, 1 passed, 4 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}