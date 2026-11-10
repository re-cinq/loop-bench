Defined the Definition of Done for `#94` using strategy `direct` in `.lore/dod.md`, added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, and updated `specs/hal-engine-config-hooks/spec.md` with its test citation.

### Failure output

```text
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

      43 |     const outcome = await outcomeOf(orchestrator.processMessage(createSession('hello')));
      44 |
    > 45 |     expect({outcome, onErrorSessionId, onErrorMessage, callOrder}).toEqual({
         |                                                                    ^
      46 |       outcome: 'beforeSession boom',
      47 |       onErrorSessionId: 's1',
      48 |       onErrorMessage: 'beforeSession boom',

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:45:68)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}