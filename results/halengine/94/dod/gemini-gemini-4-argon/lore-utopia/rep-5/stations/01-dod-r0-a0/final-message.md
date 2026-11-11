Added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked it in `specs/hal-engine-config-hooks/spec.md`, and recorded the `direct` triage strategy in `.lore/dod.md`.

### Failure output

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator hooks — beforeSession throw › runs onError then afterSession when beforeSession throws, and still rejects to the caller

    expect(received).toEqual(expected) // deep equality

    - Expected  - 7
    + Received  + 2

      Object {
    -   "afterSessionSameSession": true,
    +   "afterSessionSameSession": false,
        "callOrder": Array [
          "beforeSession",
    -     "onError",
    -     "afterSession",
        ],
    -   "onErrorReceived": Object {
    -     "message": "beforeSession boom",
    -     "sameSession": true,
    -   },
    +   "onErrorReceived": undefined,
        "outcome": "beforeSession boom",
      }

      63 |     const outcome = await outcomeOf(orchestrator.processMessage(session));
      64 |
    > 65 |     expect({outcome, callOrder, onErrorReceived, afterSessionSameSession}).toEqual({
         |                                                                            ^
      66 |       outcome: 'beforeSession boom',
      67 |       callOrder: ['beforeSession', 'onError', 'afterSession'],
      68 |       onErrorReceived: {sameSession: true, message: 'beforeSession boom'},

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:65:76)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}