Perfect! All acceptance tests are created, committed, and pushed. Let me provide a summary of what was delivered:

## Summary

I've created acceptance tests for ticket #94 "Run onError and afterSession when beforeSession throws". These tests verify the core requirement: **when `beforeSession` throws, both `onError` and `afterSession` hooks should fire**.

### Files Created

1. **`src/orchestration/beforeSessionError.acceptance.test.ts`** — 5 acceptance tests covering:
   - ✓ Error reaches caller unchanged (currently passing)
   - ✗ `onError` hook fires on `beforeSession` error (currently failing)
   - ✗ `afterSession` hook fires on `beforeSession` error (currently failing)
   - ✗ Hooks fire in correct order: onError then afterSession (currently failing)
   - ✓ Non-throwing `beforeSession` unchanged (currently passing)

2. **`.lore/dod.md`** — Definition of Done documenting:
   - The ticket's central claim (verbatim from ticket.md)
   - Strategy: `direct` (seam exists in orchestrator's try/catch/finally)
   - All 5 acceptance tests that must pass

### Current Test Status

```
Tests: 3 failed, 2 passed, 5 total
```

**Failures (the bug):**
```
● beforeSession error triggers onError hook
  - Expected onErrorCalled: true
  - Received onErrorCalled: false

● beforeSession error triggers afterSession hook
  - Expected afterSessionCalled: true
  - Received afterSessionCalled: false

● beforeSession error triggers both onError and afterSession in correct order
  - Expected callOrder: ['onError', 'afterSession']
  - Received callOrder: []
```

These failures confirm the bug described in the ticket: `beforeSession` is awaited outside the try block, so when it throws, neither `onError` nor `afterSession` executes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}