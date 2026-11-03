Perfect! All existing tests pass. Now let me create a summary of the work:

## Summary

I have successfully defined the Definition of Done for ticket #94 by writing **5 acceptance tests** that verify the expected behavior when `beforeSession` throws. These tests currently **FAIL for the right reason** — the behavior is absent because `beforeSession` is awaited outside the try block.

### Acceptance Tests Created

**File:** `src/orchestration/beforeSessionHooks.acceptance.test.ts`

**Tests (5 total):**

1. ✅ **error reaches the caller as a rejection** (PASSING) — Verifies the error thrown from `beforeSession` is propagated to the caller unchanged
2. ❌ **onError fires with the thrown error** (FAILING) — `onError` should be called with the error, but currently isn't because the error escapes before the `catch` block
3. ❌ **afterSession fires after beforeSession throws** (FAILING) — `afterSession` should run, but currently doesn't because the error escapes before the `finally` block
4. ❌ **hooks fire in order: beforeSession -> onError -> afterSession** (FAILING) — Expected `['beforeSession', 'onError', 'afterSession']` but got `['beforeSession']` only
5. ✅ **error still propagates after onError and afterSession run** (PASSING) — Error propagates to caller after hooks run

### Failure Output

```
● beforeSession hooks error handling › when beforeSession throws › onError fires with the thrown error
    Expected: "beforeSession failed"
    Received: undefined

● beforeSession hooks error handling › when beforeSession throws › afterSession fires after beforeSession throws
    Expected: true
    Received: false

● beforeSession hooks error handling › when beforeSession throws › hooks fire in order: beforeSession -> onError -> afterSession
    Expected: ['beforeSession', 'onError', 'afterSession']
    Received: ['beforeSession']
```

### Strategy: `direct`

The real entry points (`processMessage` and `processMessageStream`) exist and the acceptance tests call them directly through their public API, observing the actual behavior rather than mocking internals.

### Documentation

**File:** `.lore/dod.md` — Defines the Definition of Done with the central claim from the ticket, strategy explanation, and test locations.

### Verification

- ✅ Acceptance tests are red (failing)
- ✅ Tests fail for the RIGHT reason (the behavior is absent)
- ✅ All 23 existing tests in `chatOrchestrator.test.ts` still pass
- ✅ Files formatted with prettier
- ✅ Committed and pushed

The ticket is ready for implementation. Once the production code moves `beforeSession` inside the `try` block in `src/orchestration/chatOrchestrator.ts` (line 91), these tests will pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}