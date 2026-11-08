I have defined the **Definition of Done** for ticket #94 by updating the specification and adding a set of acceptance tests that pin the required behavior.

I updated `specs/hal-engine-config-hooks/spec.md` to replace the "recorded flaw" with new guarantees: `beforeSession` throws must propagate to the caller, fire `onError`, and allow `afterSession` cleanup. I also updated the `CHANGELOG.md` to reflect these changes for future consumers.

The acceptance tests in `src/orchestration/beforeSession-error.acceptance.test.ts` verify these three requirements. As expected, they currently fail because `beforeSession` is called outside the orchestrator's primary `try/catch/finally` block.

### Acceptance Test Failure Output

```text
FAIL src/orchestration/beforeSession-error.acceptance.test.ts
  ● beforeSession error handling acceptance › fires onError when beforeSession throws

    expect(received).toContain(expected) // indexOf

    Expected value: "onError"
    Received array: []

      57 |     }
      58 |
    > 59 |     expect(calls).toContain('onError');
         |                   ^

  ● beforeSession error handling acceptance › fires afterSession when beforeSession throws

    expect(received).toContain(expected) // indexOf

    Expected value: "afterSession"
    Received array: []

      80 |     }
      81 |
    > 82 |     expect(calls).toContain('afterSession');
         |                   ^
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}