Perfect! I've defined the acceptance tests for ticket #95. Here's a summary of what was created:

## Summary

I've written a complete set of acceptance tests that fail for exactly the right reason — they verify that `onError` is called for all rejections, not just `Error` instances.

### Tests Created

**File:** `src/orchestration/chatOrchestrator.onError-non-error-rejections.acceptance.test.ts`

Four acceptance tests defining the expected behavior:

1. **String rejection** — `onError` is called with an `Error` whose `cause` is the string; caller receives the original string
2. **Plain object rejection** — `onError` is called with an `Error` whose `cause` is the object; caller receives the original object  
3. **Undefined rejection** — `onError` is called with an `Error` whose `cause` is `undefined`; caller receives `undefined`
4. **Error rejection** — `onError` is called with the same `Error` instance (not wrapped), confirming existing tests stay green

### Definition of Done

**File:** `.lore/dod.md`

- **Strategy: `direct`** — The seam exists at line 150 of `chatOrchestrator.ts` where `onError` is gated on `error instanceof Error`. Tests call the real entry point and fail on this gate.
- Tests exercise the real orchestrator entry point through `processMessage()`
- No production code changes made

### Test Results

The tests fail as expected — 3 tests fail, 1 passes:

```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

**Failure reason (for string rejection, representative of all three failing tests):**

```
expect(received).toEqual(expected)
  Object {
    "callerReceivesOriginalRejection": true,
    "callerRejectionOutcome": "rejected",
-   "onErrorCalled": true,
-   "receivedErrorCause": "string rejection from provider",
-   "receivedErrorIsError": true,
-   "receivedErrorMessage": Any<String>,
+   "onErrorCalled": false,
+   "receivedErrorCause": undefined,
+   "receivedErrorIsError": false,
+   "receivedErrorMessage": undefined,
  }
```

This confirms the ticket's central claim: `onError` is not called for non-Error rejections, even though the rejection still propagates to the caller.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}