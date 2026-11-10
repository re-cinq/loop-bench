Defined the Definition of Done (`direct` strategy) in `.lore/dod.md`, linked the specification guarantee in `specs/hal-engine-config-hooks/spec.md`, and verified the red acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator hooks — beforeSession failure › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 2

      Object {
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorMessage": "beforeSession boom",
    -   "onErrorSessionId": "s1",
    +   "onErrorMessage": undefined,
    +   "onErrorSessionId": undefined,
        "outcome": "beforeSession boom",
      }

      61 |     const outcome = await outcomeOf(orchestrator.processMessage(createSession('hello')));
      62 |
    > 63 |     expect({outcome, onErrorSessionId, onErrorMessage, callOrder}).toEqual({
         |                                                                    ^
      64 |       outcome: 'beforeSession boom',
      65 |       onErrorSessionId: 's1',
      66 |       onErrorMessage: 'beforeSession boom',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:63:68)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}