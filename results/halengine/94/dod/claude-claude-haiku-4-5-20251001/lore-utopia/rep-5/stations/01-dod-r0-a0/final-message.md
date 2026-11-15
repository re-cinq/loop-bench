## Summary

I've created acceptance tests that define the desired behavior for issue #94. The tests verify that when `beforeSession` throws:

1. The error still reaches the caller as a rejection (already working)
2. The `onError` hook fires with the error (currently fails)
3. The `afterSession` hook fires even on error (currently fails)
4. Both hooks fire in the correct order (currently fails)

**Test file:** `src/orchestration/beforeSession-error-handling.acceptance.test.ts`

**Red bar output:**

```
Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total

FAIL: onError hook fires with the error from beforeSession
  - onErrorCalled: false (expected true)
  - errorMessage: undefined (expected "beforeSession failed")

FAIL: afterSession hook fires even when beforeSession throws
  - afterSessionCalled: false (expected true)

FAIL: both onError and afterSession fire when beforeSession throws
  - callOrder: [] (expected ['onError', 'afterSession'])
```

The tests fail for exactly the right reason: `beforeSession` is called on line 91 of `chatOrchestrator.ts` **before** the `try` block, so a throw escapes before the `catch`/`finally` exist. Once the implementation moves `beforeSession` inside the `try` block, these tests will pass.

**Files committed:**
- `.lore/dod.md` — Definition of Done with strategy, tests, and facets
- `src/orchestration/beforeSession-error-handling.acceptance.test.ts` — 4 acceptance tests (1 passes, 3 fail as expected)

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}