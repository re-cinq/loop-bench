The Definition of Done for ticket #94 is defined by a new acceptance test that verifies `onError` and `afterSession` hooks are executed even when `beforeSession` throws.

The strategy used is `direct` as the `ChatOrchestrator` already supports installing hooks, allowing the test to observe the missing behavior directly.

### Changes
- Created `src/orchestration/beforeSession-error.acceptance.test.ts` with a test case that fails because `onError` and `afterSession` are currently skipped when `beforeSession` throws.
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the recorded flaw with the new guarantee, linked to the new acceptance test.
- Updated `CHANGELOG.md` to reflect the behavioral change for consumers.
- Initialized `.lore/dod.md` with the strategy and task list.

### Test Failure Output
```text
FAIL src/orchestration/beforeSession-error.acceptance.test.ts
  ● beforeSession error handling acceptance › runs onError and afterSession when beforeSession throws

    expect(received).toContain(expected) // indexOf

    Expected value: "onError"
    Received array: ["beforeSession"]

      55 |     await expect(orchestrator.processMessage(session)).rejects.toThrow('beforeSession failure');
      56 |
    > 57 |     expect(callOrder).toContain('onError');
         |                       ^
      58 |     expect(callOrder).toContain('afterSession');
      59 |     expect(receivedError).toBe(error);
      60 |   });
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}