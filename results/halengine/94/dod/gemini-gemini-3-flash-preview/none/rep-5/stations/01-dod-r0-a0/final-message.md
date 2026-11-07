I have defined the Definition of Done for ticket #94 and provided executable acceptance tests that fail as expected on the current codebase.

I created `.lore/dod.md` to track the requirements and wrote `src/orchestration/chatHooks.acceptance.test.ts` which uses manual mocks to verify that `onError` and `afterSession` hooks fire when `beforeSession` throws. I also updated `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee and linked it to the tests, and updated `CHANGELOG.md` with the planned behavior change.

The tests fail because `beforeSession` is currently awaited before the `try` block in `src/orchestration/chatOrchestrator.ts`, so its exceptions escape before the error handling and cleanup hooks are active.

### Test Failure Output

```
FAIL src/orchestration/chatHooks.acceptance.test.ts
  ● ChatOrchestrator hooks acceptance › onError fires when beforeSession throws

    expect(received).toBe(expected) // Object.is equality

    Expected: {"entries": [{"content": "hello", "role": "user", "timestamp": "2026-01-01T00:00:00.000Z"}], "sessionId": "s1", "userId": "u1"}
    Received: undefined

      50 |     await expect(orchestrator.processMessage(session)).rejects.toThrow('beforeSession failed');
      51 |
    > 52 |     expect(capturedSession).toBe(session);
         |                             ^
      53 |     expect(capturedError).toBe(error);
      54 |   });

  ● ChatOrchestrator hooks acceptance › afterSession fires when beforeSession throws

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      74 |     await expect(orchestrator.processMessage(session)).rejects.toThrow('beforeSession failed');
      75 |
    > 76 |     expect(afterSessionCalled).toBe(true);
         |                                ^
      77 |     expect(capturedSession).toBe(session);
      78 |   });
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}