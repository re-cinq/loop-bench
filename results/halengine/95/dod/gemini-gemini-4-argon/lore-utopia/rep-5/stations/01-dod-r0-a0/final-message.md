Defined the Definition of Done for ticket #95 (`direct` strategy) in `.lore/dod.md`, added the failing acceptance test in `src/orchestration/chatOrchestrator.acceptance.test.ts`, and linked the new guarantee in `specs/hal-engine-config-hooks/spec.md`.

### Failure Output

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator hooks: onError non-Error rejections (specs/hal-engine-config-hooks/spec.md#8) › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 9
    + Received  + 9

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isErrorInstance": true,
    +     "causeIsOriginal": false,
    +     "isErrorInstance": false,
          "label": "string",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isErrorInstance": true,
    +     "causeIsOriginal": false,
    +     "isErrorInstance": false,
          "label": "object",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "isErrorInstance": true,
    +     "causeIsOriginal": false,
    +     "isErrorInstance": false,
          "label": "undefined",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
      ]

      58 |     );
      59 |
    > 60 |     expect(observed).toEqual([
         |                      ^
      61 |       {
      62 |         label: 'string',
      63 |         onErrorCalls: 1,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:60:22)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}