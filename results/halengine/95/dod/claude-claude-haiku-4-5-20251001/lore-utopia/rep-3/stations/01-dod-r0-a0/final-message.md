Perfect! I have successfully defined the DONE for ticket #95 as executable acceptance tests that fail for the right reason. Here's what I've created:

## Summary

I've written **4 acceptance tests** in `/src/orchestration/onError-non-error-rejection.acceptance.test.ts` that verify the behavior described in the ticket:

1. **String rejection** — Verifies `onError` is called with an Error wrapping the string and the caller receives the original string unchanged
2. **Plain object rejection** — Verifies `onError` is called with an Error wrapping the object and the caller receives the original object unchanged  
3. **Undefined rejection** — Verifies `onError` is called with an Error wrapping `undefined` and the caller receives `undefined` unchanged
4. **Existing Error rejection** — Verifies that actual Error instances are passed through unchanged (no wrapping)

## Test Failures (Current Behavior)

Tests 1, 2, and 3 **fail as expected** because `onError` is not being called for non-Error rejections due to the `instanceof Error` check at line 150 of `chatOrchestrator.ts`. Test 4 passes, confirming Error instances are already handled correctly.

Here's the actual failure output for the first three tests:

```
FAIL src/orchestration/onError-non-error-rejection.acceptance.test.ts
  ● onError for non-Error rejections › calls onError with an Error wrapping the string, and caller receives the string unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "callerRejection": "string rejection",
    -   "onErrorCalled": true,
    +   "onErrorCalled": false,
      }

  ● onError for non-Error rejections › calls onError with an Error wrapping a plain object, and caller receives the object unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "callerRejection": Object {
          "code": "CUSTOM",
          "message": "Custom error object",
        },
    -   "onErrorCalled": true,
    +   "onErrorCalled": false,
      }

  ● onError for non-Error rejections › calls onError with an Error wrapping undefined, and caller receives undefined unchanged

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 1

      Object {
        "callerRejection": undefined,
        "callerThrew": true,
    -   "onErrorCalled": true,
    +   "onErrorCalled": false,
      }

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

The tests fail because the `onError` hook is NOT being called for non-Error rejections, which is exactly the bug described in the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}