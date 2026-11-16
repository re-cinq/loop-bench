Branch is pushed and up to date.

**Actual failure output:**

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession throws › onError fires with the error when beforeSession throws

    expect(received).toBe(expected) // Object.is equality
    Expected: [Error: beforeSession failed]
    Received: undefined

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:56:27)

  ● beforeSession throws › afterSession fires when beforeSession throws

    expect(received).toBe(expected) // Object.is equality
    Expected: true
    Received: false

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:71:32)

Tests: 2 failed, 1 passed, 3 total
```

**Strategy: `direct`** — `createChatOrchestrator` has a real callable seam.

The two failing tests fail because `beforeSession` is awaited on line 91 of `chatOrchestrator.ts`, before the `try` block opens at line 93, so its throw bypasses both `catch` (which calls `onError`) and `finally` (which calls `afterSession`). The third test passes, confirming the throw already propagates to the caller today (no regression there).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}