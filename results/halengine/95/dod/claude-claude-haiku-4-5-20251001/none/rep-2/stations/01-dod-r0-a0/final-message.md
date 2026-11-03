## Summary

I've successfully created acceptance tests for ticket #95 ("Call onError for a rejection that is not an Error"). Here's what was delivered:

### Acceptance Tests Created
**File: `src/orchestration/chatOrchestrator.acceptance.test.ts`**

Four tests defining the complete behavior:

1. **calls onError with an Error whose cause is a string rejection, and caller receives original string** — Verifies that string rejections are wrapped in an Error before calling `onError`, but the caller still receives the original string unchanged

2. **calls onError with an Error whose cause is a plain object rejection, and caller receives original object** — Verifies the same wrapping behavior for plain object rejections

3. **calls onError with an Error whose cause is undefined rejection, and caller receives undefined** — Verifies the same behavior for undefined rejections

4. **passes an Error rejection unchanged to onError, not wrapped** — Ensures that actual Error rejections are NOT wrapped (same instance passed through)

### Definition of Done
**File: `.lore/dod.md`**

Documents the ticket's strategy and scope:
- **Strategy: `direct`** — The orchestrator's `catch` handler already exists as a seam
- **Acceptance tests** — All four tests listed above define when the ticket is complete
- **Facets** — Implementation steps needed (wrap non-Errors, preserve re-thrown value, update spec/CHANGELOG)

### Test Results
Currently **3 failing, 1 passing**:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ✓ passes an Error rejection unchanged to onError, not wrapped
  ✗ calls onError with an Error whose cause is a string rejection, and caller receives original string
    Expected: receivedErrorIsError=true, receivedErrorCause="test rejection string"
    Received: receivedErrorIsError=false, receivedErrorCause=undefined
  ✗ calls onError with an Error whose cause is a plain object rejection, and caller receives original object
    Expected: receivedErrorIsError=true, receivedErrorCause=Object{...}
    Received: receivedErrorIsError=false, receivedErrorCause=undefined
  ✗ calls onError with an Error whose cause is undefined rejection, and caller receives undefined
    Expected: receivedErrorIsError=true
    Received: receivedErrorIsError=false

Test Suites: 1 failed, 1 total
Tests: 3 failed, 1 passed, 4 total
```

The failures are exactly right — `onError` is not being called at all for non-Error rejections due to the `error instanceof Error` gate at line 150 of `chatOrchestrator.ts`. The tests fail because the feature hasn't been implemented yet, which is the definition of a red bar acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}