The acceptance tests are already committed and pushed on branch `loop-bench/94`. The tests fail for exactly the right reasons — both `onError` and `afterSession` don't fire when `beforeSession` throws, which is precisely what the ticket reports.

**Actual failure output:**

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● onError fires when beforeSession throws, and the error still reaches the caller
    Expected: { onErrorCalled: true, onErrorArgMessage: 'session init failed', outcome: 'session init failed' }
    Received: { onErrorCalled: false, onErrorArgMessage: undefined, outcome: 'session init failed' }

  ● afterSession fires when beforeSession throws
    Expected: { afterSessionCalled: true, outcome: 'session init failed' }
    Received: { afterSessionCalled: false, outcome: 'session init failed' }
```

The two acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` are committed, pushed, and failing for the stated reason: `beforeSession` is awaited before the `try` block at line 91, so its throw skips both `catch` (`onError`) and `finally` (`afterSession`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}