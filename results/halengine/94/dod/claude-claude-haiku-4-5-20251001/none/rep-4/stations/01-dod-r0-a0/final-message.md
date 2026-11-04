## Summary

I have successfully defined the acceptance tests for ticket #94 "Run onError and afterSession when beforeSession throws".

### Test File Created
**`src/orchestration/beforeSession-error-handling.acceptance.test.ts`** — 5 tests validating the ticket's central claim

### Test Results

The tests fail for the **right reasons** (the behaviour is absent, not a test defect):

```
FAIL src/orchestration/beforeSession-error-handling.acceptance.test.ts
  ✓ beforeSession throw reaches caller as rejection (PASSES)
  ✓ non-throwing beforeSession still works as before (PASSES)
  ✗ onError fires when beforeSession throws (FAILS: onErrorCalled is false, expected true)
  ✗ afterSession fires when beforeSession throws (FAILS: afterSessionCalled is false, expected true)
  ✗ both onError and afterSession fire in correct order when beforeSession throws (FAILS: callOrder is [], expected ['onError', 'afterSession'])

Tests: 3 failed, 2 passed, 5 total
```

### What the Tests Validate

1. **onError fires when beforeSession throws** — `onError` hook receives the error and is called
2. **afterSession fires when beforeSession throws** — `afterSession` hook is called even when `beforeSession` fails  
3. **beforeSession throw reaches caller as rejection** — Error still propagates to caller (already works)
4. **both onError and afterSession fire in correct order** — Hooks execute in documented order: `onError` → `afterSession`
5. **non-throwing beforeSession still works as before** — Existing behavior preserved (already works)

### Why Tests Fail

The tests fail because `beforeSession` is awaited at line 91 of `chatOrchestrator.ts`, **outside** the try block that starts at line 93. When `beforeSession` throws, the exception escapes before the catch block (which calls `onError`) and the finally block (which calls `afterSession`) exist.

### Definition of Done

The `.lore/dod.md` file documents:
- The ticket's central claim (quoted verbatim from the issue)
- Strategy: **`direct`** — The try/catch/finally seam already exists; moving `beforeSession` inside will fix it
- The 5 acceptance tests that define success
- Implementation facets needed

### Branch Status

- Tests committed and pushed: `e4280c3`
- Branch up to date with `origin/main`
- Working tree clean
- Ready for implementation round

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}