Excellent! I have successfully created the acceptance tests for ticket #94. Here's a summary of what was delivered:

## Acceptance Tests Created

I created **5 acceptance tests** in `src/orchestration/chatOrchestrator.beforeSession-error.acceptance.test.ts` that verify the expected behavior when `beforeSession` throws:

### Test Results

**Failing tests (expected - feature not implemented):**
- ❌ `onError fires for beforeSession throw` — onError not being called (caughtError is undefined)
- ❌ `afterSession fires for beforeSession throw` — afterSession not being called (afterSessionCalled is false)
- ❌ `both onError and afterSession fire for beforeSession throw` — neither hook fires (callOrder is empty)

**Passing tests (verify existing behavior unchanged):**
- ✅ `error from beforeSession still reaches the caller as a rejection` — error correctly propagates to caller
- ✅ `non-throwing beforeSession behaves exactly as today` — happy path works correctly

### Failure Output

```
Tests:       3 failed, 2 passed, 5 total
```

Each failing test fails for exactly the reason stated in the ticket:
- When `beforeSession` throws, `onError` doesn't fire (expected to fail until `beforeSession` moved inside try block)
- When `beforeSession` throws, `afterSession` doesn't fire (expected to fail until `beforeSession` moved inside try block)

### Definition of Done

Created `.lore/dod.md` documenting:
- The ticket's central claim (verbatim from ticket)
- Strategy: `direct` (seam exists at line 91 of chatOrchestrator.ts)
- All 5 acceptance tests with their behavior descriptions
- Facets for the implementation work needed
- Out of scope items

The tests are committed and pushed to the branch. When the implementation moves `beforeSession` inside the try block, these 3 failing tests will pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}