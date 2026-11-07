I have defined the Definition of Done for ticket #94 by creating a new acceptance test that verifies the missing behavior. I also updated the project's specification and changelog to reflect the new guarantee that `onError` and `afterSession` hooks will fire even if `beforeSession` throws.

The strategy used was `direct`, as `createChatOrchestrator` provides a clean seam for injecting hooks. The test confirms that currently, a rejection in `beforeSession` escapes the orchestrator's primary `try/catch/finally` block, causing both `onError` and `afterSession` to be skipped.

### Summary of Changes
- **Test**: Added `src/orchestration/beforeSessionThrow.acceptance.test.ts` which demonstrates the failure.
- **Spec**: Updated `specs/hal-engine-config-hooks/spec.md` to replace the "recorded-flaw" line with a new guarantee, linked to the new acceptance test.
- **Changelog**: Added a `Fixed` entry to `CHANGELOG.md` for the upcoming release.
- **DoD**: Created `.lore/dod.md` to track the strategy and progress.

### Acceptance Test Failure Output
```
FAIL src/orchestration/beforeSessionThrow.acceptance.test.ts
  ● beforeSession throw acceptance › runs onError and afterSession when beforeSession throws

    expect(received).toEqual(expected) // deep equality

    - Expected  - 2
    + Received  + 0

      Array [
        "beforeSession",
    -   "onError",
    -   "afterSession",
      ]

      54 |     await expect(orchestrator.processMessage(session)).rejects.toThrow(beforeSessionError);
      55 |
    > 56 |     expect(order).toEqual(['beforeSession', 'onError', 'afterSession']);
         |                   ^
      57 |   });
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}