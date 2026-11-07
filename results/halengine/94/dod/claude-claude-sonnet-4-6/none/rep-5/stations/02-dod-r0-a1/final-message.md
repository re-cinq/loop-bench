Everything is already done and pushed. The acceptance test exists at `src/orchestration/chatOrchestrator.acceptance.test.ts`, is committed, and fails for exactly the right reason.

**Actual failure output:**
```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession error handling › onError and afterSession both fire when beforeSession throws, and the error still reaches the caller

    expect(received).toBe(expected) // Object.is equality

    Expected: [Error: beforeSession failed]
    Received: undefined

      54 |     expect(onErrorReceived).toBe(boom);
         |                             ^
```

The test fails because `onError` receives `undefined` — `beforeSession` is called at line 91 of `chatOrchestrator.ts` before the `try` block opens, so the throw escapes without reaching `catch` or `finally`. This is precisely the behaviour the ticket reports.

The `.lore/dod.md` and spec link at `specs/hal-engine-config-hooks/spec.md#L24` are both already in place. The branch is up to date with its remote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}