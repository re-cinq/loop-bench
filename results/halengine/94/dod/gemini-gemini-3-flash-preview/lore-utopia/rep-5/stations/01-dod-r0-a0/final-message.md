The ticket #94 reports that when `beforeSession` throws, neither `onError` nor `afterSession` fires because the throw occurs outside the orchestrator's primary `try/catch/finally` block. I have defined the DONE state for this ticket with two acceptance tests that verify these hooks fire even when `beforeSession` fails.

I have:
1.  **Researched** the `ChatOrchestrator` implementation and identified that `beforeSession` is indeed awaited before the `try` block.
2.  **Created** `.lore/dod.md` with the `direct` strategy, mapping the acceptance criteria to a new test file.
3.  **Written** `src/orchestration/beforeSession_failure.acceptance.test.ts` which provides a throwing `beforeSession` hook and asserts that both `onError` and `afterSession` are reached.
4.  **Verified** that both tests fail on the current codebase for the correct reason (hooks are skipped).
5.  **Formatted** and **committed** the changes, then pushed them to the branch.

### Acceptance Test Failure Output
```
FAIL src/orchestration/beforeSession_failure.acceptance.test.ts
  ● beforeSession failure (acceptance) › onError fires when beforeSession throws

    expect(received).toContain(expected) // indexOf

    Expected value: "onError"
    Received array: ["beforeSession"]

      55 |
      56 |     // Currently, this fails because onError is not called when beforeSession throws.
    > 57 |     expect(callOrder).toContain('onError');
         |                       ^

  ● beforeSession failure (acceptance) › afterSession fires when beforeSession throws

    expect(received).toContain(expected) // indexOf

    Expected value: "afterSession"
    Received array: ["beforeSession"]

      80 |
      81 |     // Currently, this fails because afterSession is not called when beforeSession throws.
    > 82 |     expect(callOrder).toContain('afterSession');
         |                       ^
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}