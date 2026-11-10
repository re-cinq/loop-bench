Red acceptance test added in `src/orchestration/chatOrchestrator.acceptance.test.ts`, linked from `specs/hal-engine-config-hooks/spec.md`, and documented in `.lore/dod.md` under the `direct` strategy.

Failure output from running the acceptance test:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError non-Error rejections › wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original

    expect(received).toEqual(expected) // deep equality

    - Expected  - 12
    + Received  + 12

      Array [
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "hasCauseProperty": true,
    -     "isErrorInstance": true,
    +     "causeIsOriginal": false,
    +     "hasCauseProperty": false,
    +     "isErrorInstance": false,
          "label": "string",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "hasCauseProperty": true,
    -     "isErrorInstance": true,
    +     "causeIsOriginal": false,
    +     "hasCauseProperty": false,
    +     "isErrorInstance": false,
          "label": "plain object",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
        Object {
          "callerReceivedOriginal": true,
    -     "causeIsOriginal": true,
    -     "hasCauseProperty": true,
    -     "isErrorInstance": true,
    +     "causeIsOriginal": false,
    +     "hasCauseProperty": false,
    +     "isErrorInstance": false,
          "label": "undefined",
    -     "onErrorCalls": 1,
    +     "onErrorCalls": 0,
        },
      ]

      67 |     );
      68 |
    > 69 |     expect(observed).toEqual(
         |                      ^
      70 |       rejections.map(({label}) => ({
      71 |         label,
      72 |         onErrorCalls: 1,

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:69:22)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}