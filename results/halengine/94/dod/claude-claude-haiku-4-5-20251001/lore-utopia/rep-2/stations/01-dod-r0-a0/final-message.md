## Summary

I've defined DONE for ticket #94 by writing acceptance tests that verify the required behavior. Here's what was created:

### Test File: `chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

This file contains 5 acceptance tests:

1. **rejection from beforeSession reaches caller** ✓ PASSES — Verifies that when `beforeSession` throws, the error still propagates to the caller (unchanged behavior)

2. **onError fires when beforeSession throws** ✗ FAILS — Verifies that `onError` hook is called with the error when `beforeSession` throws

3. **afterSession fires when beforeSession throws** ✗ FAILS — Verifies that `afterSession` hook runs after `beforeSession` throws

4. **full hook lifecycle when beforeSession throws** ✗ FAILS — Verifies the complete hook order is `beforeSession` → `onError` → `afterSession` with no intermediate hooks

5. **afterSession fires even when both beforeSession and onError throw** ✗ FAILS — Verifies `afterSession` runs in the finally block even when both `beforeSession` and `onError` throw

### Definition of Done (`.lore/dod.md`)

Documents the ticket's central claim, strategy (direct), the 5 acceptance tests, and the facets of work needed to make them pass.

### Test Failures

The failing tests demonstrate the problem exactly as stated in the ticket:

```
● ChatOrchestrator beforeSession throws › onError fires when beforeSession throws
  expect(received).toEqual(expected)
  Expected: onErrorCalled: true, onErrorMessage: "beforeSession failed"
  Received: onErrorCalled: false, onErrorMessage: ""

● ChatOrchestrator beforeSession throws › full hook lifecycle when beforeSession throws
  expect(received).toEqual(expected)
  Expected callOrder: ['beforeSession', 'onError', 'afterSession']
  Received callOrder: ['beforeSession']
```

These tests will pass once `beforeSession` is moved inside the `try` block in `src/orchestration/chatOrchestrator.ts` (line 91 moves into line 93).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}