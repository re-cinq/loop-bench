Defined the Definition of Done for `#94` using strategy `direct` in `.lore/dod.md`, added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, and updated `specs/hal-engine-config-hooks/spec.md` to cite it.

### Failure Output

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator beforeSession failure › runs onError then afterSession when beforeSession throws, and still rejects to the caller

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

      56 |     const outcome = await outcomeOf(orchestrator.processMessage(createSession('hello')));
      57 |
    > 58 |     expect({outcome, onErrorSessionId, onErrorMessage, callOrder}).toEqual({
         |                                                                    ^
      59 |       outcome: 'beforeSession boom',
      60 |       onErrorSessionId: 's1',
      61 |       onErrorMessage: 'beforeSession boom',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:58:68)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}