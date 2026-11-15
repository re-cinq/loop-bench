Acceptance tests are now committed and pushed. Here's the failure output showing the tests fail for exactly the right reasons:

**Test Failures:**

```
FAIL src/orchestration/beforeSessionThrows.acceptance.test.ts
  ● beforeSession throws › onError fires when beforeSession throws

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      66 |     expect(onErrorCalled).toBe(true);

  ● beforeSession throws › afterSession fires when beforeSession throws

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      90 |     expect(afterSessionCalled).toBe(true);

  ● beforeSession throws › onError and afterSession both fire when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 1

    - Array [
    -   "onError",
    -   "afterSession",
    - ]
    + Array []

      116 |     expect(callOrder).toEqual(['onError', 'afterSession']);
```

**Definition of Done documented in `.lore/dod.md`:**

The ticket's central claim: `beforeSession` is awaited before the `try` block opens, so throws escape before the `catch` and `finally` exist—neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `beforeSession` call at line 91 of `chatOrchestrator.ts` sits immediately before the try block. Moving it inside will let exceptions reach the existing error handling path.

**Tests written:**
1. **beforeSession throwing still propagates to caller as rejection** — Verifies the error still reaches the caller (passes; behavior unchanged)
2. **onError fires when beforeSession throws** — Verifies `onError` is called (fails; not called currently)
3. **afterSession fires when beforeSession throws** — Verifies `afterSession` is called (fails; not called currently)
4. **onError and afterSession both fire when beforeSession throws** — Verifies both fire in order (fails; neither called)

Existing tests pin that non-throwing `beforeSession` works unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}