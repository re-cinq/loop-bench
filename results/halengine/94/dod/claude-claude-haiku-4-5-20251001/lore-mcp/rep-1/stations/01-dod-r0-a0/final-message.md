## Summary

I have successfully created acceptance tests for ticket #94 "Run onError and afterSession when beforeSession throws". The tests define the expected behavior when `beforeSession` throws:

1. **Test file created**: `src/orchestration/beforeSessionThrows.acceptance.test.ts`
2. **DoD documentation**: `.lore/dod.md` with strategy and test description

### Tests Written

The acceptance tests verify four critical behaviors:

1. **beforeSession throw reaches the caller as a rejection** ✓ PASSES — confirms the error propagates (current working behavior)

2. **onError fires when beforeSession throws** ✗ FAILS — `onErrorCalled` is false because `beforeSession` is awaited before the try block

3. **afterSession fires when beforeSession throws** ✗ FAILS — `afterSessionCalled` is false for the same reason

4. **all three hooks fire when beforeSession throws** ✗ FAILS — Only `['beforeSession']` is called, not `['beforeSession', 'onError', 'afterSession']`

### Failure Output

```
FAIL src/orchestration/beforeSessionThrows.acceptance.test.ts
  ● beforeSession throws › onError fires when beforeSession throws
    Expected: true
    Received: false
    
  ● beforeSession throws › afterSession fires when beforeSession throws
    Expected: true
    Received: false
    
  ● beforeSession throws › all three hooks fire when beforeSession throws
    - Expected  - 2
    + Received  + 0
      Array [
        "beforeSession",
    -   "onError",
    -   "afterSession",
      ]

Test Suites: 1 failed, 1 total
Tests:       3 failed, 1 passed, 4 total
```

The tests fail for the **exact reason** the ticket states: because `beforeSession` is called before the try block (line 91 in `chatOrchestrator.ts`), when it throws, the catch and finally blocks are never reached, so `onError` and `afterSession` don't fire.

When the fix moves `beforeSession` inside the try block, all three failing tests will turn green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}