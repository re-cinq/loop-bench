Perfect! I've completed the acceptance test definition for ticket #95. Here's what I've delivered:

## Summary

I've written acceptance tests that validate the ticket's requirements and confirm the bug exists. The tests are now committed and pushed.

**Test file**: `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

**Tests written**:
1. **String rejection** — Verifies `onError` is called with wrapped Error when provider rejects with a string
2. **Plain object rejection** — Verifies `onError` is called with wrapped Error when provider rejects with an object
3. **Undefined rejection** — Verifies `onError` is called with wrapped Error when provider rejects with undefined
4. **Error rejection** — Verifies Error instances pass through unchanged (this test passes, confirming the bug)

**Failure output** confirms the bug:
```
FAIL src/orchestration/onError-non-error-rejection.acceptance.test.ts
  ✓ passes when Error is thrown (existing behavior works)
  ✗ fails for string: expect(receivedError).toBeDefined() — Received: undefined
  ✗ fails for object: expect(receivedError).toBeDefined() — Received: undefined  
  ✗ fails for undefined: expect(receivedError).toBeDefined() — Received: undefined

Test Suites: 1 failed, 1 total
Tests: 3 failed, 1 passed, 4 total
```

The failures confirm that `onError` is NOT being called for non-Error rejections due to the `instanceof Error` gate at line 150 of `src/orchestration/chatOrchestrator.ts`.

The `.lore/dod.md` file documents the strategy (direct seam exists) and exact acceptance criteria quoted from the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}