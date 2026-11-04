Perfect! I've created the acceptance tests for ticket #94. Here's what was delivered:

## Summary

I've written three acceptance tests that define DONE for this ticket. They verify that when `beforeSession` throws an error:

1. **The error reaches the caller unchanged** ✅ (currently passes)
2. **`onError` hook fires with that error** ❌ (currently fails)
3. **`afterSession` hook still fires** ❌ (currently fails)

### Test Output (Confirming the Right Failures)

```
FAIL src/orchestration/beforeSessionThrows.acceptance.test.ts
  ● beforeSession hook throws — acceptance tests for #94 › when beforeSession throws, onError fires with that error

    expect(received).toEqual(expected) // deep equality
    - Expected  - 2
    + Received  + 2
      Object {
    -   "errorFired": true,
    -   "errorMessage": "beforeSession failed",
    +   "errorFired": false,
    +   "errorMessage": undefined,
        "outcome": "beforeSession failed",
      }

  ● beforeSession hook throws — acceptance tests for #94 › when beforeSession throws, afterSession still fires

    expect(received).toEqual(expected) // deep equality
    - Expected  - 1
    + Received  + 1
      Object {
    -   "afterSessionCalled": true,
    +   "afterSessionCalled": false,
        "outcome": "beforeSession broke",
      }

Test Suites: 1 failed, 1 total
Tests:       2 failed, 1 passed, 3 total
```

The failures confirm the core issue: `beforeSession`'s throw escapes before the `try` block opens, so the `catch` and `finally` never run, leaving `onError` and `afterSession` unexecuted.

**Files created:**
- `src/orchestration/beforeSessionThrows.acceptance.test.ts` — The three acceptance tests
- `.lore/dod.md` — Definition of Done with strategy, tests, and facets

Both are committed and pushed to branch `loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}