I have defined the **Definition of Done** for ticket #94 and implemented the corresponding acceptance tests.

The tests verify that when the `beforeSession` hook throws an error:
1. The error is caught and passed to the `onError` hook.
2. The `afterSession` hook is still executed.
3. The orchestrator rejects the message processing with the original error.

I have also updated the project documentation:
- `specs/hal-engine-config-hooks/spec.md`: Replaced the "recorded-flaw" line with the new guarantee and added a note about what hooks can assume when `beforeSession` fails.
- `CHANGELOG.md`: Added an entry describing the change and its benefits for resource management.
- `CLAUDE.md`: Updated the hook lifecycle description to reflect the new behavior.

### Acceptance Test Failure Output

```text
FAIL src/orchestration/chatOrchestrator.hooks.acceptance.test.ts
  ● ChatOrchestrator hooks (acceptance) › runs onError when beforeSession throws

    expect(received).toBeDefined()

    Received: undefined

      41 |     
      42 |     await expect(orchestrator.processMessage(createSession())).rejects.toThrow('beforeSession failed');
    > 43 |     expect(errorPassedToHook).toBeDefined();
         |                               ^
      44 |     expect(errorPassedToHook?.message).toBe('beforeSession failed');
      45 |   });

  ● ChatOrchestrator hooks (acceptance) › runs afterSession when beforeSession throws

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      60 |     
      61 |     await expect(orchestrator.processMessage(createSession())).rejects.toThrow('beforeSession failed');
    > 62 |     expect(afterSessionCalled).toBe(true);
         |                                ^
      63 |   });
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}